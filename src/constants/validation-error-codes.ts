export class ValidationErrorCodeModel {
  // key: string;
  en: string;
  ar: string;
}

export const ValidationErrorCodes = {
  isNumber: {
    // key: '',
    en: 'must be a number',
    ar: 'يجب ان يكون رقم',
  },
  isLength: {
    // key: '',
    en: 'wrong number of chars',
    ar: 'عدد الحروف غير صحيح',
  },
  arrayMaxSize: {
    en: 'incorrect count of elements',
    ar: 'عدد العناصر غير صحيح',
  },
  notExists: {
    // key: '',
    en: 'value not exists',
    ar: 'القيمه غير موجوده',
  },
  isMongoId: {
    // key: '',
    en: 'must be valid mongo object id',
    ar: 'يجب ان يكون قيمه مونجو صحيحه',
  },
  isPositive: {
    // key: '',
    en: 'should not be empty',
    ar: 'يجب الا يكون فارغ',
  },
  isExists: {
    en: 'value already exists',
    ar: 'القيمه موجود بالفعل',
  },
  isBoolean: {
    en: 'must be a boolean value',
    ar: 'يجب ان يكون [true, false]',
  },
  isEmail: {
    en: 'Email format is not correct',
    ar: 'الايميل غير صحيح',
  },
  emailIsExists: {
    en: 'Email have been used before',
    ar: 'الايميل مستخدم من قبل مستخدم اخر',
  },
  invalidEmail: {
    en: 'Invalid Email',
    ar: 'الايميل غير صالح',
  }
};
