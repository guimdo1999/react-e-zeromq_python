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

interface Props {
  evento: Event[];
}

interface Event {
  foo?: number;
  x?: number;
  y?: number;
}

export function Events({ evento }: Props) {
  const [chartType, setChartType] = useState<"category" | "number">("number");

  var props: any = [];
  if (Object.keys(evento).length >= 1) {
    props = Object.keys(evento.reduce((o:Event, c:Event) => Object.assign(o, c)));
  }

  //Filtra os items com X igual ---- Lidar com primeiro valor sumindo aqui.
  /* evento = evento.filter(
    (v: any, i: any, a: any) => a.findLastIndex((v2: any) => v2.x === v.x) === i
  );  */
  /* if (evento.length > 10) {
    if (evento[evento.length - 1].foo === evento[0].foo) {
      evento.splice(evento.length - 1);
    }
  } */
  console.log(evento)

  const handleType = () => {
    chartType === "number" ? setChartType("category") : setChartType("number");
  };

  return (
    <>
      <LineChart
        width={730}
        height={250}
        data={evento}
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
        {props.map((event: any, index: any) => {
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
