// src/apis/prometheus.js
import axios from 'axios';

// Prometheus 서버 URL 설정
const PROMETHEUS_URL = 'http://117.16.251.24:9090';  // Prometheus 서버 주소

// 현재 메트릭 데이터를 가져오는 함수
export const fetchMetrics = async (query) => {
  try {
    const response = await axios.get(`http://117.16.251.24:9090/api/v1/query`, {
      params: {
        query: query,  // PromQL 쿼리
      },
    });
    return response.data.data.result;  // 메트릭 데이터 반환
  } catch (error) {
    console.error('Error fetching metrics:', error);
    throw error;
  }
};
