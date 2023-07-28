import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from "@mui/material/Button";
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function VoteCard({question, answers}){
  
  return(
    <>
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Card sx={{ minWidth: 275 }} elevation = {1}>
        <h1>bla {question.text}</h1>
        <ul>{answers.length > 0 ? (
          answers.map(item => (
            <li key={item.id}>
              {item.answer}
            </li>
          ))
          ):<li>empty</li>}
        </ul>
        <CardActions>
            <Button size="small">Edit</Button>
            <Button size="small">Delete</Button>
        </CardActions>
      </Card>
    </Grid>
    </>
  )
}