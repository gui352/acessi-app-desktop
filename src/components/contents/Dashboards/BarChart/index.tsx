import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { PCDService } from 'services/PCD/PCDService';

export default function BarChart() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  let labels: string[] = [];
  let numbers: number[] = [];

  useEffect(() => {
    new PCDService().GetDisabilityTypeCount().then((res) => {
      labels = res.data.map(disability => disability.disabilityTypeName);
      numbers = res.data.map(disability => disability.disabilityTypeCount);

      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Pessoas com deficiência',
            data: numbers,
            backgroundColor: 'rgb(50, 79, 130)',
            borderColor: 'rgb(60, 79, 130)',
            borderWidth: 1
          }
        ]
      };
      const options = {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };

      setChartData(data);
      setChartOptions(options);
    });
  }, []);

  return (
    <div className="card">
      <Chart type="bar" data={chartData} options={chartOptions} />
    </div>
  )
}
