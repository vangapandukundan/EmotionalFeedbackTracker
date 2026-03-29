import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const useCharts = () => {
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  const createLineChart = (canvasRef, data, options) => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        ...options
      }
    });
  };

  const createBarChart = (canvasRef, data, options) => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        ...options
      }
    });
  };

  const updateChart = (newData) => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.data = newData;
      chartInstanceRef.current.update('none');
    }
  };

  return {
    createLineChart,
    createBarChart,
    updateChart,
    chartInstanceRef
  };
};

export default useCharts;