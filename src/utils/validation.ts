/**
 * 아이디 유효성 검사 함수
 * - 조건: 영문자(소문자 필수) + 선택적으로 숫자, `_` 포함. 4~20자
 * @param id - 검사할 아이디 문자열
 * @returns boolean - 유효성 검사 결과
 */
export const isValidId = (id: string): boolean => {
  const idRegex = /^(?=.*[a-z])[a-z0-9_]{4,20}$/;
  return idRegex.test(id);
};

/**
 * 비밀번호 유효성 검사 함수
 * - 조건: 8-64자, 하나 이상의 영문(대소문자), 숫자, 특수 문자 포함
 * @param password - 검사할 비밀번호 문자열
 * @returns boolean - 유효성 검사 결과
 */
export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,64}$/;
  return passwordRegex.test(password);
};
