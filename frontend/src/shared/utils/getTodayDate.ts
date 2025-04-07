const getTodayDate = () => {
  return new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식 반환
};

export default getTodayDate;
