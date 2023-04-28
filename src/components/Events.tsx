import { Button } from "@mui/material";
import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function Events({ events }: any) {
  const [chartType, setChartType] = useState<any>("number");

  var props: any = [];
  if (Object.keys(events).length > 0) {
    props = Object.keys(events.reduce((o: any, c: any) => Object.assign(o, c)));
  }

  //Filtra os items com X igual
   events = events.filter(
    (v: any, i: any, a: any) => a.findLastIndex((v2: any) => v2.x === v.x) === i
  ); 

  const handleType = () => {
    chartType === "number" ? setChartType("category") : setChartType("number");
  };

  return (
    <>
      <LineChart
        width={730}
        height={250}
        data={events}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="x"
          name="x"
          domain={["dataMin", "dataMax"]}
          type={chartType}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        {props.map((event: any, index: number) => {
          if (event !== "x") {
            return (
              <Line
                dataKey={event}
                key={index}
                stroke={index === 0 ? "#8884d8" : "#D038E8"}
              />
            );
          } else {
            return null;
          }
        })}
      </LineChart>
      <Button variant="contained" onClick={() => handleType()}>
        Mudar eixo X
      </Button>
    </>
  );
}
