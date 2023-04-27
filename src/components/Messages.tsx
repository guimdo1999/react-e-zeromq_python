import { List, ListItem, ListItemText } from "@mui/material";


interface EventsProps {
  messages: string[];
}

export function Messages({ messages }: EventsProps) {
  return (
    <List>
      {messages.map((message, index) => (
        <ListItem alignItems="flex-start">
          <ListItemText key={index}>{message}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
} 

