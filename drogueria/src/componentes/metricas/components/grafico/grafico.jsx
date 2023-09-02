
import { Line } from "react-chartjs-2";
import {
    Chart as chartjs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js"

chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler

)

// eslint-disable-next-line react/prop-types
export const Grafico = ({valores1}) => {
    
  // eslint-disable-next-line react/prop-types
  const valores = [].concat(...valores1.map(item => item.valor))
  // eslint-disable-next-line react/prop-types
  const dias = [].concat(...valores1.map(item => item.dia))
  

  const data = {
    labels: dias,
    datasets: [
      {
        label: "ventas diarias",
        data: valores,
        borderColor: "black",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
      <Line data={data} options={options} />

  );
};
