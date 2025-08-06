export class ValidationErrorCodeModel {
  // key: string;
  en: string;
  ar: string;
  code?: string;
  message?: {
    en: string;
    ar: string;
  };
}

export const ValidationErrorCodes = {
  isNumber: {
    code: "IS_NUMBER",
    message: {
      en: "must be a number",
      ar: "يجب ان يكون رقم",
    },
  },
  isLength: {
    code: "IS_LENGTH",
    message: {
      en: "wrong number of chars",
      ar: "عدد الحروف غير صحيح",
    },
  },
  arrayMaxSize: {
    code: "ARRAY_MAX_SIZE",
    message: {
      en: "incorrect count of elements",
      ar: "عدد العناصر غير صحيح",
    },
  },
  notExists: {
    code: "NOT_EXISTS",
    message: {
      en: "value not exists",
      ar: "القيمه غير موجوده",
    },
  },
  isMongoId: {
    code: "IS_MONGO_ID",
    message: {
      en: "must be valid mongo object id",
      ar: "يجب ان يكون قيمه مونجو صحيحه",
    },
  },
  isPositive: {
    code: "IS_POSITIVE",
    message: {
      en: "should not be empty",
      ar: "يجب الا يكون فارغ",
    },
  },
  isExists: {
    code: "IS_EXISTS",
    message: {
      en: "value already exists",
      ar: "القيمه موجود بالفعل",
    },
  },
  isBoolean: {
    code: "IS_BOOLEAN",
    message: {
      en: "must be a boolean value",
      ar: "يجب ان يكون [true, false]",
    },
  },
  isEmail: {
    code: "IS_EMAIL",
    message: {
      en: "Email format is not correct",
      ar: "الايميل غير صحيح",
    },
  },
  emailIsExists: {
    code: "EMAIL_IS_EXISTS",
    message: {
      en: "Email have been used before",
      ar: "الايميل مستخدم من قبل مستخدم اخر",
    },
  },
  invalidEmail: {
    code: "INVALID_EMAIL",
    message: {
      en: "Invalid Email",
      ar: "الايميل غير صالح",
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
