import axios from 'axios';
import Cookies from 'js-cookie';
import { getAuth } from 'firebase/auth';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const newToken = await user.getIdToken(true);
          Cookies.set('userToken', newToken, { expires: 1 });
          error.config.headers['Authorization'] = `Bearer ${newToken}`;

          return axiosInstance(error.config);
        }
      } catch (refreshError) {
        console.error('토큰 갱신 실패, 로그아웃 처리', refreshError);
        Cookies.remove('userToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
