import { List, ListItem, ListItemText } from "@mui/material";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface EventsProps {
  events: number[];
}

/* export function Events({ events }: EventsProps) {
  return (
    <List>
      {events.map((event, index) => (
        <ListItem alignItems="flex-start">
          <ListItemText key={index}>{event}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
} */

export function Events({ events }: any) {
  return (
    <>
      <LineChart
        width={730}
        height={250}
        data={events}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="message" stroke="#8884d8" />
      </LineChart>
      {/* <List>
        {events.map((event, index) => (
          <ListItem alignItems="flex-start">
            <ListItemText key={index}>{event}</ListItemText>
          </ListItem>
        ))}
      </List> */}
    </>
  );
}
