import { Response } from "express";

interface ResponseData {
  statusCode?: number;
  status?: string;
  data: any;
}

function writeResponse(res: Response, responseData: ResponseData) {
  const response = {
    status: responseData.status,
    data: responseData.data || undefined,
  };

  res.status(responseData.statusCode || 204).json(response);
}

export default writeResponse;
