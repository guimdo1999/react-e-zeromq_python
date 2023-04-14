import { List, ListItem, ListItemText } from "@mui/material";

interface EventsProps {
  events: string[];
}

export function Events({ events }: EventsProps) {
  return (
    <List>
      {events.map((event, index) => (
        <ListItem alignItems="flex-start">
          <ListItemText key={index}>{event}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
}
