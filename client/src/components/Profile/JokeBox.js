import React, { useState, useEffect } from 'react';
import { Paper, IconButton, Typography, CircularProgress, Grid } from '@material-ui/core';
import useStyles from './styles';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';


const JokeBox = () => {
    const classes = useStyles();
    const [randNo, setRandNo] = useState(1);
    const [joke, setJoke] = useState({});
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setIsLoading(true)
      fetch(
        `https://official-joke-api.appspot.com/jokes/programming/random`,
        {
          method: "GET",
          headers: new Headers({
            Accept: ""
          })
        }
      )
        .then(res => res.json())
        .then(response => {
          setJoke(response);
          setIsLoading(false);
        })
        .catch(error => console.log(error));
        return () => {
            setJoke({});
        }
    }, [randNo]);

    return (        
        <Paper elevation={5} className={classes.jokeBox}>
            <Grid container justify="space-evenly" direction="column" spacing={3}>
                <Grid item xs={12} className={classes.jokeHeading} align="center">
                    <Typography variant="subtitle2" align="center">Programmers Joke</Typography>
                </Grid>
                <Grid item xs={12}>
                        
                        <Grid container spacing={3} className={classes.joke} align="center">
                         {
                            !isLoading ? 
                            (
                            <>
                            <Grid item xs={12}>
                                <Typography variant="body2" gutterBottom>
                                    {joke[0].setup}
                                </Typography> 
                                <Typography variant="body2">
                                    {joke[0].punchline}
                                </Typography> 
                            </Grid>
                            </>
                            ) : <Grid  item xs={12}><CircularProgress style={{color: 'white'}}/></Grid>

                         }
                        </Grid>          
                </Grid>
                <Grid item xs={12} align="center">
                    <IconButton disabled={isLoading} className={classes.jokeBtn} size="medium" onClick={() => setRandNo(Math.random())}><GiPerspectiveDiceSixFacesRandom /></IconButton>
                </Grid>   
                <Grid item xs={12} className={classes.jokeHeading} align="center">
                    <Typography variant="caption">Programmers are funny, once u get them...</Typography>
                </Grid>
            </Grid>        
        </Paper>
    )
}

export default JokeBox;
