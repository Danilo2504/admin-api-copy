import { HttpStatus } from "../http-status-enum";
import { HttpException } from "./http-exception";

/**
 * Defines an HTTP exception for *Unauthorized* type errors.
 */
export class UnauthorizedException extends HttpException {
  /**
   * Instantiate an `UnauthorizedException` Exception.
   *
   * @example
   * `throw new UnauthorizedException()`
   *
   * @usageNotes
   * The HTTP response status code will be 401.
   * - The `objectOrError` argument defines the JSON response body or the message string.
   * - The `description` argument contains a short description of the HTTP error.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(description: string | Record<any, any> = "Unauthorized") {
    super(description, HttpStatus.UNAUTHORIZED);
  }
}
