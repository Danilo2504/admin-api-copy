import { isObject } from "class-validator";
import { Request, RequestHandler, Response } from "express";
import { HttpStatus } from "../http-status-enum";
import * as z from "zod";

type respObj = {
  statusCode?: HttpStatus;
};

type RequestHandlerResp<T> = Promise<
  T extends {
    [key: string]: any;
  }
    ? T & respObj
    : T
>;

type SimpleRequestHandler<T> = (
  req: Request,
  res: Response
) => RequestHandlerResp<T>;

export function JSONendpoint<Resp>(
  requestFn: SimpleRequestHandler<Resp>
): RequestHandler {
  return async (req, res, next) => {
    try {
      const toResp = await requestFn(req, res);

      if (isObject(toResp)) {
        const resp = toResp as Record<any, any> & respObj;
        const status = resp.statusCode ?? 200;

        delete resp.statusCode;
        res.status(status).json(resp);
      } else {
        res.json(toResp);
      }
    } catch (err) {
      next(err);
    }
  };
}

type SimpleRequestHandlerWBody<T, V> = (
  req: Request,
  res: Response,
  body: V
) => RequestHandlerResp<T>;

export function JSONendpointWBody<Resp, V>(
  zodSchema: z.ZodSchema<V>,
  fn: SimpleRequestHandlerWBody<Resp, V>
): RequestHandler {
  return async (req, res, next) => {
    try {
      const validationResult = zodSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          errors: validationResult.error.formErrors.fieldErrors,
        });
      }

      const toResp = await fn(req, res, validationResult.data);

      if (isObject(toResp)) {
        const resp = toResp as Record<any, any> & respObj;
        const status = resp.statusCode ?? 200;

        delete resp.statusCode;
        res.status(status).json(resp);
      } else {
        res.json(toResp);
      }
    } catch (err) {
      next(err);
    }
  };
}

type SimpleRequestHandlerWQuery<T, V> = (
  req: Request,
  res: Response,
  body: V
) => RequestHandlerResp<T>;

export function JSONendpointWQuery<Resp, V>(
  zodSchema: z.ZodSchema<V>,
  fn: SimpleRequestHandlerWQuery<Resp, V>
): RequestHandler {
  return async (req, res, next) => {
    const validationResult = zodSchema.safeParse(req.query);

    if (!validationResult.success) {
      const errors = validationResult.error.issues
        .map((issue) => issue.message)
        .flat();
      return res.status(400).json(errors);
    }

    try {
      const toResp = await fn(req, res, validationResult.data);

      if (isObject(toResp)) {
        const resp = toResp as Record<any, any> & respObj;
        const status = resp.statusCode ?? 200;

        delete resp.statusCode;
        res.status(status).json(resp);
      } else {
        res.json(toResp);
      }
    } catch (err) {
      next(err);
    }
  };
}

type GuardResultFields<T extends object> = { [K in keyof T]: T[K] };

export type Guard<T extends object> = (
  mutableDataResult: GuardResultFields<T>,
  req: Request
) => Promise<any> | any;

export function JSONendpointWGuards<T extends object, JsonResp = void>(
  guards: (Guard<T> | (() => Guard<T>))[],
  callbackHandler: (
    req: Request,
    mutableDataResult: GuardResultFields<T>
  ) => Promise<JsonResp>
): RequestHandler {
  return async (req, res, next) => {
    const mutableDataResult: GuardResultFields<T> = {} as GuardResultFields<T>;
    try {
      for (const guard of guards) {
        const preppedGuard = await guard(mutableDataResult, req);
        if (typeof preppedGuard === "function") {
          // it's a function like this,
          // it's setting up a guard in this case:
          // ({ user }) => incomeExists(user.id)
          await preppedGuard(mutableDataResult, req);
        }
      }
      const resp = await callbackHandler(req, mutableDataResult);
      res.json(resp);
    } catch (err) {
      next(err);
    }
  };
}
