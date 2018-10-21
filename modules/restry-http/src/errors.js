import httpStatuses from "./statuses";
export class HttpError extends Error {
  code = null;
  constructor(...args) {
    super(...args);
    if (new.target === HttpError) {
      throw new TypeError("A HttpError must not be instantiated directly");
    }
  }
}
export class HttpBadRequestError extends HttpError {
  code = httpStatuses.badRequest;
}
export class HttpUnauthorizedError extends HttpError {
  code = httpStatuses.unauthorized;
}
export class HttpPaymentRequiredError extends HttpError {
  code = httpStatuses.paymentRequired;
}
export class HttpForbiddenError extends HttpError {
  code = httpStatuses.forbidden;
}
export class HttpNotFoundError extends HttpError {
  code = httpStatuses.notFound;
}
export class HttpMethodNotAllowedError extends HttpError {
  code = httpStatuses.methodNotAllowed;
}
export class HttpNotAcceptableError extends HttpError {
  code = httpStatuses.notAcceptable;
}
export class HttpProxyAuthenticationRequiredError extends HttpError {
  code = httpStatuses.proxyAuthenticationRequired;
}
export class HttpRequestTimedOutError extends HttpError {
  code = httpStatuses.requestTimedOut;
}
export class HttpConflictError extends HttpError {
  code = httpStatuses.conflict;
}
export class HttpGoneError extends HttpError {
  code = httpStatuses.gone;
}
export class HttpLengthRequiredError extends HttpError {
  code = httpStatuses.lengthRequired;
}
export class HttpPreconditionFailedError extends HttpError {
  code = httpStatuses.preconditionFailed;
}
export class HttpPayloadTooLargeError extends HttpError {
  code = httpStatuses.payloadTooLarge;
}
export class HttpUriTooLongError extends HttpError {
  code = httpStatuses.uriTooLong;
}
export class HttpUnsupportedMediaTypeError extends HttpError {
  code = httpStatuses.unsupportedMediaType;
}
export class HttpExpectationFailedError extends HttpError {
  code = httpStatuses.expectationFailed;
}
export class HttpImATeapotError extends HttpError {
  code = httpStatuses.imATeapot;
}
export class HttpMisdirectedRequestError extends HttpError {
  code = httpStatuses.misdirectedRequest;
}
export class HttpUnprocessableEntityError extends HttpError {
  code = httpStatuses.unprocessableEntity;
}
export class HttpLockedError extends HttpError {
  code = httpStatuses.locked;
}
export class HttpFailedDependencyError extends HttpError {
  code = httpStatuses.failedDependency;
}
export class HttpUpgradeRequiredError extends HttpError {
  code = httpStatuses.upgradeRequied;
}
export class HttpPreconditionRequiredError extends HttpError {
  code = httpStatuses.preconditionRequired;
}
export class HttpTooManyRequestsError extends HttpError {
  code = httpStatuses.tooManyRequests;
}
export class HttpRequestHeaderFieldsTooLargeError extends HttpError {
  code = httpStatuses.requestHeaderFieldsTooLarge;
}
export class HttpUnavailableForLegalReasonsError extends HttpError {
  code = httpStatuses.unavailableForLegalReasons;
}
export class HttpInternalServerError extends HttpError {
  code = httpStatuses.internalServerError;
}
export class HttpNotImplementedError extends HttpError {
  code = httpStatuses.notImplemented;
}
export class HttpBadGatewayError extends HttpError {
  code = httpStatuses.badGateway;
}
export class HttpServiceUnavailableError extends HttpError {
  code = 503;
}
export class HttpGatewayTimeoutError extends HttpError {
  code = httpStatuses.serviceUnavailable;
}
export class HttpVersionNotSupportedError extends HttpError {
  code = httpStatuses.versionNotSupported;
}
export class HttpVariantAlsoNegotiatesError extends HttpError {
  code = httpStatuses.variantAlsoNegotiates;
}
export class HttpInsufficientStorageError extends HttpError {
  code = httpStatuses.insufficientStorage;
}
export class HttpLoopDetectedError extends HttpError {
  code = httpStatuses.loopDetected;
}
export class HttpNotExtendedError extends HttpError {
  code = httpStatuses.notExtended;
}
export class HttpNetworkAuthenticationRequiredError extends HttpError {
  code = httpStatuses.networkAuthenticationRequired;
}
