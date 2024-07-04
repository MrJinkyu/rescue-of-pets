export const PASSWORD_MIN_LENGRH = 8;
export const PASSWORD_REGEX_ERROR_MESSAGE =
  "비밀번호는 숫자 영문을 포함하여 8자 이상입니다";
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,}$/
);
