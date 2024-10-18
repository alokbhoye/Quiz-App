// Components/GaugeChart.js
import React, { useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GaugeChart = ({ value = 0 }) => {
  const needleRef = useRef(null);

  // Data for the semi-circle gauge
  const data = {
    datasets: [
      {
        data: [value, 100 - value], // Dynamic value input
        backgroundColor: (ctx) => {
            const { chartArea, ctx: chartCtx } = ctx.chart;
            if (!chartArea) return; // Ensure chart area is available
  
            const gradient = chartCtx.createLinearGradient(
              chartArea.left,
              0,
              chartArea.right,
              0
            );
  
            // Gradient from green to yellow to red
            gradient.addColorStop(1, 'rgba(0, 255, 0, 1)'); // Green
            gradient.addColorStop(0.5, 'rgba(255, 255, 0, 1)'); // Yellow
            gradient.addColorStop(0, 'rgba(255, 0, 0, 1)'); // Red
  
            return gradient;
        },
        borderWidth: 0,
        cutout: '85%', // Hollow center
        rotation: -90, // Start from the top center
        circumference: 180, // Semi-circle only
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
  };

  useEffect(() => {
    const canvas = needleRef.current;
    const ctx = canvas.getContext('2d');

    // Center and radius setup
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 + 50; // Adjust to align with the arc
    const radius = 100;

    // Calculate the angle (in radians) based on the value (0-100)
    const angle = (Math.PI * value) / 100 - Math.PI;

    // Calculate the needle's tip coordinates along the arc
    const needleX = centerX + radius * Math.cos(angle);
    const needleY = centerY + radius * Math.sin(angle);

    // Clear canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw triangular needle
    ctx.save(); // Save current canvas state
    ctx.beginPath();
    ctx.moveTo(centerX, centerY); // Base of the needle at the center
    ctx.lineTo(
      centerX + 10 * Math.cos(angle - Math.PI / 2),
      centerY + 10 * Math.sin(angle - Math.PI / 2)
    ); // Left side of the triangle
    ctx.lineTo(needleX, needleY); // Tip of the needle
    ctx.lineTo(
      centerX + 10 * Math.cos(angle + Math.PI / 2),
      centerY + 10 * Math.sin(angle + Math.PI / 2)
    ); // Right side of the triangle
    ctx.closePath();

    // Fill the triangle needle
    ctx.fillStyle = '#000'; // Black needle color
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 8;
    ctx.fill();

    ctx.restore(); // Restore canvas state
  }, [value]);

  return (
    <div className="absolute w-[350px] h-[350px]">
      {/* Needle Canvas */}
      <canvas ref={needleRef} className="absolute inset-0" width="300" height="300" />
      
      {/* Doughnut Gauge */}
      <Doughnut data={data} options={options}/>

      {/* Display the percentage in the center */}
      
      

    </div>
  );
};

export default GaugeChart;
