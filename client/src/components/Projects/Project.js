import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Tooltip, withStyles, CardActionArea } from '@material-ui/core';

import { GiAerialSignal } from 'react-icons/gi';
import { AiFillGithub } from 'react-icons/ai';
import useStyles from './styles';

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

const Project = ({ project, setCurrentProject, setGrid, grid, currentProject }) => {
    const classes = useStyles();
    const [showDetails, setShowDetails] = React.useState(false);

    const handleClick = () => {
        setGrid(false);
        setCurrentProject(project);
    }

    return (
        project ?
        <Card 
        className={project !== currentProject ? classes.card:classes.markedCard} 
        onClick={handleClick}       
        onMouseOver={() => setShowDetails(true)}
        onMouseOut={() => setShowDetails(false)}
        >
        <CardActionArea>        
        <CardMedia 
        className={grid ? classes.media: classes.mediaCollapsed} 
        image={project.selectedFile} 
        title={project.title}         
        />
            <div className={showDetails ? classes.overlay:classes.displayNone}>
            <CardContent>
                <Typography variant={grid ? "subtitle1":"caption"} align="center" style={{opacity: "1"}} gutterBottom>{project.title}</Typography>
            </CardContent>            
            </div>
        </CardActionArea>
            <CardActions className={classes.cardActions}>
                <LinksTooltip title={project.liveUrl ? "visit live version of this project":" currently there is no live version of this project" }>
                <Button size="small" style={{color: project.liveUrl ? '#43a047': 'grey' , textTransform: 'none'}} href={project.liveUrl} target="_blank" rel="noreferrer">
                    <GiAerialSignal/>
                    &nbsp; Live
                </Button>
                </LinksTooltip>
                <LinksTooltip arrow title="visit Git repository of this project">
                <Button size="small" style={{color: 'black', textTransform: 'none'}} href={project.gitUrl} target="_blank" rel="noreferrer">
                    <AiFillGithub />
                    &nbsp; GitRepo
                </Button>
                </LinksTooltip>
            </CardActions>
        </Card>:''
    )
}

export default Project;