import { HttpStatus } from "../http-status-enum";
import { HttpException } from "./http-exception";

/**
 * Defines an HTTP exception for *Internal Server Error* type errors.
 */
export class InternalServerErrorException extends HttpException {
  /**
   * Instantiate an `InternalServerErrorException` Exception.
   *
   * @example
   * `throw new InternalServerErrorException()`
   *
   * @usageNotes
   * The HTTP response status code will be 500.
   * - The `objectOrError` argument defines the JSON response body or the message string.
   * - The `description` argument contains a short description of the HTTP error.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(
    description: string | Record<any, any> = "Internal Server Error"
  ) {
    super(description, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
