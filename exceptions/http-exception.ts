export class HttpException extends Error {
  /**
   * Instantiate a plain HTTP Exception.
   *
   * @example
   * `throw new HttpException()`
   *
   * @usageNotes
   * The constructor arguments define the response and the HTTP response status code.
   * - The `response` argument (required) defines the JSON response body.
   * - The `status` argument (required) defines the HTTP Status Code.
   *
   * @param response string or object describing the error condition.
   * @param status HTTP response status code.
   */
  constructor(
    private readonly response: string | Record<string, any>,
    private readonly status: number
  ) {
    super();
  }

  public getResponse(): string | object {
    return this.response;
  }

  public getStatus(): number {
    return this.status;
  }
}
