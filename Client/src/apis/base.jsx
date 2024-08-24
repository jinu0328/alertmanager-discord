import axios from 'axios';

// Axios 기본 설정
const apiClient = axios.create({
  baseURL: 'http://localhost:8000',  // Django 서버 URL
  withCredentials: true,  // 쿠키 기반 세션 유지
});

export default apiClient;
