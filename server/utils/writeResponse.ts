import { Response } from 'express';

interface ResponseData {
  httpStatus?: number;
  messageKey?: string;
  data: never;
}

function writeResponse(res: Response, responseData: ResponseData) {
  const response = {
    messageKey: responseData.messageKey,
    data: responseData.data || undefined,
  };

  res
    .status(responseData.httpStatus || 204)
    .json(response)
    .end();
}

export default writeResponse;
