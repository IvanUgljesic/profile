import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Tooltip, withStyles } from '@material-ui/core';

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

const Project = ({ project }) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={project.selectedFile} title={project.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{project.title}</Typography>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{project.tags.map((tag)=> `#${tag.trim()} `)}</Typography>
            </div>
                <Typography variant="h5" className={classes.title} gutterBottom>{project.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="primary" component="p">{project.description}</Typography>
            </CardContent>
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
        </Card>
    )
}

export default Project;