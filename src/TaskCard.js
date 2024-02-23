import * as React from 'react';
import {Card, CardHeader, CardContent, Typography, Avatar} from '@material-ui/core'



export default function TaskCard({avatar, title, priority, taskData}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            {avatar}
          </Avatar>
        }
        title={title}
        subheader={`Priority ${priority}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {taskData}
        </Typography>
      </CardContent>
    </Card>
  );
}
