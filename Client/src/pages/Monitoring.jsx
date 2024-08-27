// src/components/Monitoring.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LineChart from '../components/LineChart';

const Monitoring = () => {
  const [cpuData, setCpuData] = useState(null);
  const [memoryData, setMemoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 메모리 데이터를 사람이 읽기 쉬운 단위로 변환하는 함수
  const formatMemory = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);  // 데이터 로드 시작

        // CPU 데이터 가져오기
        const cpuResponse = await axios.get('http://117.16.251.24/prometheus/api/v1/query_range', {
          params: {
            query: 'node_cpu_seconds_total',
            start: new Date(Date.now() - 60 * 60 * 1000).toISOString(),  // 1시간 전
            end: new Date().toISOString(),  // 현재 시각
            step: '5s',
          },
        });

        // 메모리 데이터 가져오기 
        const memoryResponse = await axios.get('http://117.16.251.24/prometheus/api/v1/query_range', {
          params: {
            query: 'node_memory_MemAvailable_bytes',
            start: new Date(Date.now() - 60 * 60 * 1000).toISOString(),  // 1시간 전
            end: new Date().toISOString(),  // 현재 시각
            step: '1m',
          },
        });

        // CPU 데이터 처리
        const cpuLabels = cpuResponse.data.data.result[0].values.map((entry) =>
          new Date(entry[0] * 1000).toLocaleTimeString()
        );
        const cpuValues = cpuResponse.data.data.result[0].values.map((entry) => entry[1]);

        setCpuData({
          labels: cpuLabels,
          datasets: [
            {
              label: 'CPU Usage',
              data: cpuValues,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        });

        // 메모리 데이터 처리 (숫자로 처리)
        const memoryLabels = memoryResponse.data.data.result[0].values.map((entry) =>
          new Date(entry[0] * 1000).toLocaleTimeString()
        );
        const memoryValues = memoryResponse.data.data.result[0].values.map((entry) => parseFloat(entry[1]));

        setMemoryData({
          labels: memoryLabels,
          datasets: [
            {
              label: 'Memory Usage',
              data: memoryValues,
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
            },
          ],
        });

        setLoading(false);  // 데이터 로드 완료
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);  // 에러 발생 시에도 로딩 종료
      }
    };

    fetchMetrics();  // 최초 실행

    // 10초마다 갱신
    const intervalId = setInterval(fetchMetrics, 10000);  // 10초마다 갱신

    // 컴포넌트 언마운트 시 인터벌 제거
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Monitoring Dashboard</h1>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, margin: '10px' }}>
            {cpuData && <LineChart data={cpuData} title="CPU Usage Over Time" />}
          </div>
          <div style={{ flex: 1, margin: '10px' }}>
            {memoryData && <LineChart data={memoryData} title="Memory Usage Over Time" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Monitoring;
