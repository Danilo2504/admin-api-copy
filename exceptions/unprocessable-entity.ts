import { HttpStatus } from "../http-status-enum";
import { HttpException } from "./http-exception";

/**
 * Defines an HTTP exception for *UnprocessableEntity* type errors.
 */
export class UnprocessableEntityException extends HttpException {
  /**
   * Instantiate a `UnprocessableEntityException` Exception.
   *
   * @example
   * `throw new UnprocessableEntityException()`
   *
   * @usageNotes
   * The HTTP response status code will be 422.
   * - The `objectOrError` argument defines the JSON response body or the message string.
   * - The `description` argument contains a short description of the HTTP error.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(
    description: string | Record<string, any> = "UnprocessableEntity"
  ) {
    super(description, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
