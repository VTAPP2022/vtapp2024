export enum CheckInStatusCode {
  SUCCESS = 200,
  INVALID_TICKET = 400,
  ALREADY_CHECKED_IN = 409,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  SERVER_ERROR = 500,
}

export interface CheckInResponse {
  success: boolean;
  code: CheckInStatusCode;
  details?: AlreadyScannedDetails;
}

export interface AlreadyScannedDetails {
  scannedAt: string;
  scannedBy: string;
}

export interface CheckInInput {
  ticketId: string;
}
