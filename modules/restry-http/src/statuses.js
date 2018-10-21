export const informationalHttpStatuses = {
  continue: 100,
  switchingProtocols: 101,
  processing: 101,
  earlyHints: 102
};

export const successHttpStatuses = {
  ok: 200,
  created: 201,
  accepted: 202,
  nonAuthorativeInformation: 203,
  noContent: 204,
  resetContent: 205,
  partialContent: 206,
  multiStatus: 207,
  alreadyReported: 208,
  imUsed: 226
};

export const redirectionHttpStatuses = {
  multipleChoices: 300,
  movedPermenently: 301,
  found: 302,
  seeOther: 303,
  notModified: 304,
  useProxy: 305,
  switchProxy: 306,
  temporaryRedirect: 307,
  permenantRedirect: 308
};

export const clientErrorHttpStatuses = {
  badRequest: 400,
  unauthorized: 401,
  paymentRequired: 402,
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  notAcceptable: 406,
  proxyAuthenticationRequired: 407,
  requestTimedOut: 408,
  conflict: 409,
  gone: 410,
  lengthRequired: 411,
  preconditionFailed: 412,
  payloadTooLarge: 413,
  uriTooLong: 414,
  unsupportedMediaType: 415,
  expectationFailed: 416,
  imATeapot: 417,
  misdirectedRequest: 421,
  unprocessableEntity: 422,
  locked: 423,
  failedDependency: 424,
  upgradeRequied: 426,
  preconditionRequired: 428,
  tooManyRequests: 429,
  requestHeaderFieldsTooLarge: 431,
  unavailableForLegalReasons: 451
};

export const serverHttpStatuses = {
  internalServerError: 500,
  notImplemented: 501,
  badGateway: 502,
  serviceUnavailable: 504,
  versionNotSupported: 505,
  variantAlsoNegotiates: 506,
  insufficientStorage: 507,
  loopDetected: 508,
  notExtended: 510,
  networkAuthenticationRequired: 511
};

export default {
  ...informationalHttpStatuses,
  ...successHttpStatuses,
  ...redirectionHttpStatuses,
  ...clientErrorHttpStatuses,
  ...serverHttpStatuses
};
