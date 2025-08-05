import axios, { AxiosRequestConfig } from "axios";
import { ErrorCodes } from "../constants/error-codes";

export async function DoHttpRequest(requestConfig: AxiosRequestConfig) {
  const result = { data: null, error: null };
  try {
    const axiosResponse = await axios(requestConfig);
    result.data = axiosResponse.data;
  } catch (exception) {
    if (axios.isAxiosError(exception)) {
      // handle Axios Error
      LogAxiosErrorDetails(exception);
      if (exception.response?.status === 401) {
      } else if (exception.response?.status === 404) {
      } else {
        result.data = exception.response.data["exception"];
      }
    } else {
      // handle Unexpected Error
      console.log(exception);
      result.error = ErrorCodes.UNEXPECTED_ERROR;
    }
  }
  return result;
}

function LogAxiosErrorDetails(exception) {
  console.log("exception.isAxiosError", exception.isAxiosError);
  console.log("exception.message", exception.message);
  console.log("exception.name", exception.name);
  //
  console.log("exception.response.status", exception.response.status);
  console.log("exception.response.data", exception.response.data);
  console.log("exception.response.statusText", exception.response.statusText);
  console.log("exception.response.config", exception.response.config);
}
