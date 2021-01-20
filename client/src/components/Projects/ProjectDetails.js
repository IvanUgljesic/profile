import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { Button, Box, IconButton } from '@material-ui/core';

import { GiAerialSignal } from 'react-icons/gi';
import { AiFillGithub } from 'react-icons/ai';

//icons
import { technologies } from '../Skills/technologies';
import { CardActions } from '@material-ui/core';
import { BsFillGridFill } from 'react-icons/bs';

const LinksTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  arrow: {
   color: theme.palette.primary.main,
  }
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'space-between'
    },
    content: {
    },
    cover: {    
      height: 0,
      paddingTop: '100%',
      backgroundPosition: 'top left',
      backgroundSize: '100% 100%'
    },
    controls: {
    },
    playIcon: {
      height: 38,
      width: 38,
    },
    gridBtn: {
      color: theme.palette.primary.main
    },
    projectContent: {
      minHeight: '35vh',
      position: 'relative',
      "& .MuiCardActions-root":{
        position: 'absolute',
        bottom: 0,
        selfAlign: 'space-between'
      },
      [theme.breakpoints.down('sm')]:{
        minHeight: '40vh',
      },
      [theme.breakpoints.down('xs')]:{
        minHeight: '50vh',
      },
    },
    projectLinks: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'space-between'
    }
  }));

const ProjectDetails = ({ currentProject, setGrid, setCurrentProject }) => {
    const classes = useStyles();

    const handleClick = () => {
      setGrid(true);
      setCurrentProject(null);
    }

    return (
      <div className={classes.root}>
        <Box><IconButton edge="start" size="medium" className={classes.gridBtn} onClick={handleClick}><BsFillGridFill /></IconButton></Box>
        <Card>
        <Grid container align="space-between">
          <Grid item xs={12} md={6} align="center" className={classes.projectContent}>
              <CardContent>
                <Typography component="h5" variant="h5" gutterBottom align="center">
                  {currentProject.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom align="center">
                  {currentProject.description}
                </Typography>   
                <Typography gutterBottom variant="caption" align="center">technologies:<br/>
                {
                  technologies.map(tech => currentProject.tags.includes(tech.name) ? <LinksTooltip key={tech.name} title={tech.name}><IconButton size="small" style={{color:tech.color}}>{tech.icon}</IconButton></LinksTooltip>:null)
                }
                </Typography>
              </CardContent>
              <CardActions className={classes.projectLinks}>                   
                <LinksTooltip title={currentProject.liveUrl ? "visit live version of this project":" currently there is no live version of this project" }>
                  <Button size="small" style={{color: currentProject.liveUrl ? '#43a047': 'grey' , textTransform: 'none'}} href={currentProject.liveUrl} target="_blank" rel="noreferrer">
                      <GiAerialSignal/>
                      &nbsp; Live
                  </Button>
                </LinksTooltip>
                <LinksTooltip arrow title="visit Git repository of this project">
                  <Button size="small" style={{color: 'black', textTransform: 'none'}} href={currentProject.gitUrl} target="_blank" rel="noreferrer">
                      <AiFillGithub />
                      &nbsp; GitRepo
                  </Button>
                </LinksTooltip>
              </CardActions>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardMedia
              className={classes.cover}
              image={currentProject.selectedFile}
              title={currentProject.title}
            />
          </Grid>
        </Grid>
        </Card>
      </div>
    )
}

export default ProjectDetails;
