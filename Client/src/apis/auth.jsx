import apiClient from './base';

// 회원가입 API 호출 함수
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/api/v1/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Something went wrong');
  }
};

// 로그인 API 호출 함수
export const loginUser = async (loginData) => {
  try {
    const response = await apiClient.post('/api/v1/auth/login', loginData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Something went wrong');
  }
};
