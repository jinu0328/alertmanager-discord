// src/components/Monitoring.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LineChart from '../components/LineChart';

const Monitoring = () => {
  const [cpuData, setCpuData] = useState(null);
  const [memoryData, setMemoryData] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // CPU 데이터 가져오기
        const cpuResponse = await axios.get('http://localhost:9090/api/v1/query_range', {
          params: {
            query: 'node_cpu_seconds_total',
            start: new Date(Date.now() - 60 * 60 * 1000).toISOString(),  // 1시간 전
            end: new Date().toISOString(),  // 현재 시각
            step: '5s',
          },
        });
        
        const memoryResponse = await axios.get('http://localhost:9090/api/v1/query_range', {
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

        // 메모리 데이터 처리
        const memoryLabels = memoryResponse.data.data.result[0].values.map((entry) =>
          new Date(entry[0] * 1000).toLocaleTimeString()
        );
        const memoryValues = memoryResponse.data.data.result[0].values.map((entry) => entry[1]);

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
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div>
      <h1>Monitoring Dashboard</h1>

      <div style={{ margin: '20px 0' }}>
        {cpuData && <LineChart data={cpuData} title="CPU Usage Over Time" />}
      </div>

      <div style={{ margin: '20px 0' }}>
        {memoryData && <LineChart data={memoryData} title="Memory Usage Over Time" />}
      </div>
    </div>
  );
};

export default Monitoring;
