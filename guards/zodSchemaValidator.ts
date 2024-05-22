import * as Z from "zod";
import { BadRequestException } from "../exceptions/bad-request";
import { Guard } from "../utils/routes";

type DataWithBody<T extends Z.ZodTypeAny> = {
  body: Z.infer<T>;
};

/**
 * alters the `.body` field
 */
export function parseBodySchema<T extends Z.ZodTypeAny>(
  schema: T
): Guard<DataWithBody<T>> {
  return async (data, req) => {
    try {
      const parsedVal = schema.parse(req.body) as Z.infer<T>;
      data.body = parsedVal;
    } catch (err) {
      throw new BadRequestException(err as Z.ZodError);
    }
  };
}
