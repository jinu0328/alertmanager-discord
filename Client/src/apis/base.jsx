import axios from 'axios';
import { getCsrfToken } from '../utils/csrf';  // CSRF 토큰을 가져오는 함수

const apiClient = axios.create({
  baseURL: 'http://117.16.251.24',  // Django API 서버 주소
  withCredentials: true,  // 쿠키를 포함하여 요청
});

// Axios 요청 시마다 CSRF 토큰을 헤더에 추가
apiClient.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken();
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
});

export default apiClient;
