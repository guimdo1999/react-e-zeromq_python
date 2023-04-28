import { List, ListItem, ListItemText } from "@mui/material";


interface EventsProps {
  messages: string[];
}

export function Messages({ messages }: EventsProps) {
  return (
    <List>
      {messages.map((message, index) => (
        <ListItem key={index} alignItems="flex-start">
          <ListItemText >{message}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
} 

