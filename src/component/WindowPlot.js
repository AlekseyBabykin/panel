import React, { useEffect, useState } from "react";
import line1 from "../icons/Line1.svg";
import line2 from "../icons/Line2.svg";
import square from "../icons/chart-legend-item.svg";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "right",
      min: 0,
      max: 25000,
      stepSize: 1000,
    },
  },
};

function WindowPlot({ dataForPlot, userEmail }) {
  const data = {
    labels: dataForPlot.map((i) => moment(i.created_at).format("DD.MM.YY")),
    datasets: [
      {
        data: dataForPlot.map((i) => i.amount),
        borderColor: "#1C64F2",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 180);
          gradient.addColorStop(0, "#1C64F2"); // Fix the typo here
          gradient.addColorStop(1, "black"); // Fix the typo here
          return gradient;
        },
        yAxisID: "y",
        label: userEmail,
        fill: false,
        tension: 0.1,
      },
    ],
  };
  useEffect(() => {
    // Example: Log the received data when the component mounts
    console.log("dataForPlot:", dataForPlot);
    console.log("userEmail:", userEmail);

    // Your other logic using dataForPlot and userEmail
  }, [dataForPlot, userEmail]);
  return (
    <div className="contPlot">
      <div className="emailCloseSection">
        <div className="emailPlot">email</div>
        <div>
          <img src={line1} />
          <img src={line2} />
        </div>
      </div>
      <div className="usetoken">Использование токенов</div>
      <div className="plotPlot">
        <Line options={options} data={data} />
      </div>
      <div className="contSquareEmail">
        <img src={square} />
        <div className="plotNameBelow">{userEmail}</div>
      </div>
      <div className="line"></div>
      <div className="usetoken">История операций</div>
      <table className="tablePanel">
        <thead>
          <tr className="firstLine">
            <th>Тип</th>
            <th>Сумма</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          {dataForPlot.slice(0, 7).map((info) => (
            <tr key={info.id}>
              <td style={{ color: "white" }}>{info.type}</td>
              {info.type === "REPLENISH" && (
                <td style={{ color: "#1ABB34" }}>+ {info.amount} BTKN</td>
              )}
              {info.type === "WRITE_OFF" && (
                <td style={{ color: "#FE4242" }}>- {info.amount} BTKN</td>
              )}
              <td style={{ color: "white" }}>{info.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WindowPlot;
