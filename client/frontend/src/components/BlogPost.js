import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const MAX_LENGTH = 100;



const BlogPost = (props) => {
    const card = (
        <>
          <CardContent>
            <Typography variant="h5">
                {props.title}
            </Typography>
            <Typography variant="body">
            {
                props.content.length > MAX_LENGTH ?
                    <div>
                        {`${props.content.substring(0, MAX_LENGTH)}...`}
                    </div>
                :
                    <p>{props.content}</p>
            }
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="medium" onClick = {props.callback}>See Post</Button>
            <Typography align = 'right' sx={{ fontSize: 12 }} color="text.secondary">
                Author: {props.username}
            </Typography>
          </CardActions>
        </>
      );
    return  (
        <Box sx={{ maxWidth: 300, minWidth: 300, minHeight: 180 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    )
}

export default BlogPost

/*
 <>
            <div >{props.title}</div>
            <div>{props.username}</div>
            {
                props.content.length > MAX_LENGTH ?
                    <div>
                        {`${props.content.substring(0, MAX_LENGTH)}...`}
                    </div>
                :
                    <p>{props.content}</p>
            }
        </>
*/