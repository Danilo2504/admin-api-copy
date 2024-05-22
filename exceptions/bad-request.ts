import { HttpStatus } from "../http-status-enum";
import { HttpException } from "./http-exception";

/**
 * Defines an HTTP exception for *Bad Request* type errors.
 */
export class BadRequestException extends HttpException {
  /**
   * Instantiate a `BadRequestException` Exception.
   *
   * @example
   * `throw new BadRequestException()`
   *
   * @usageNotes
   * The HTTP response status code will be 400.
   * - The `objectOrError` argument defines the JSON response body or the message string.
   * - The `description` argument contains a short description of the HTTP error.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(description: string | Record<string, any> = "Bad Request") {
    super(description, HttpStatus.BAD_REQUEST);
  }
}
