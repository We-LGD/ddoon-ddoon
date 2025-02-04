export const isValidPassword = (password: string): boolean => {
  // 8-64자, 하나 이상의 영문(대소문자), 숫자, 특수 문자 포함
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,64}$/;
  return passwordRegex.test(password);
};
