import { HttpStatus } from "../http-status-enum";
import { HttpException } from "./http-exception";

/**
 * Defines an HTTP exception for *Not Found* type errors.
 */
export class NotFoundException extends HttpException {
  /**
   * Instantiate a `NotFoundException` Exception.
   *
   * @example
   * `throw new NotFoundException()`
   *
   * @usageNotes
   * The HTTP response status code will be 404.
   * - The `objectOrError` argument defines the JSON response body or the message string.
   * - The `description` argument contains a short description of the HTTP error.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(description: string | Record<any, any> = "Not Found") {
    super(description, HttpStatus.NOT_FOUND);
  }
}
