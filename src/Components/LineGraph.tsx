import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph: React.FC = () => {
  const [graphData, setGraphData] = useState<any>();
  const api_URL = "https://disease.sh/v3/covid-19/historical/all?lastdays=100";

  const buildChartData = (data: any, casesType = "cases") => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch(api_URL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, "cases");
          setGraphData(chartData);
        });
    };
    fetchData();
  }, []);

  return (
    <div className=" w-11/12 mt-5 m-auto">
      <h1 className=" text-blue-600 font-semibold text-xl text-center my-3">
        Line Graph of Covid Cases
      </h1>
      <div className="chart-container w-11/12">
        {graphData?.length > 0 && (
          <Line
            data={{
              datasets: [
                {
                  label: "cases",
                  backgroundColor: "rgba(204, 16, 52, 0.5)",
                  borderColor: "#CC1034",
                  data: graphData,
                },
              ],
            }}
          />
        )}
      </div>
    </div>
  );
};

export default LineGraph;
