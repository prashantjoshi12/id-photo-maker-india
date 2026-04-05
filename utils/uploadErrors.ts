export type UploadErrorCode = "UNSUPPORTED_TYPE" | "FILE_TOO_LARGE";

export class UploadValidationError extends Error {
  readonly code: UploadErrorCode;

  constructor(code: UploadErrorCode) {
    super(code);
    this.name = "UploadValidationError";
    this.code = code;
  }
}
