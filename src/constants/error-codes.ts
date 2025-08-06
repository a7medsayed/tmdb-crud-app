export const ErrorCodes = {
  /**
   * Invalid Param MUST have => fields: {}
   */
  INVALID_PARAMS: {
    code: "INVALID_PARAMS",
    message: {
      en: "Invalid Params",
      ar: "يوجد قيم غير صحيحه",
    },
    fields: {},
  },
  UNEXPECTED_ERROR: {
    code: "UNEXPECTED_ERROR",
    message: {
      en: "Unexpected error , try again later",
      ar: "حدث مشكله غير متوقعه , برجاء المحاوله لاحقا",
    },
  },
  INVALID_CREDENTIALS: {
    code: "INVALID_CREDENTIALS",
    message: {
      en: "Invalid credentials",
      ar: "خطآ في بيانات الدخول",
    },
  },
};
