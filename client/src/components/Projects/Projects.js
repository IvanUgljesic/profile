import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../../actions/posts';
import  Project from './Project';

import useStyles from './styles';

const Projects = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.posts);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getPosts());
        if(projects.length !== 0) setIsLoaded(true);
    }, [dispatch, projects.length]);

    return (
        isLoaded ?
        <Grid container spacing={1} justify="flex-start" alignItems="stretch" className={classes.root}>
            {
                projects.map((project) => (
                    <Grid key={project._id} item xs={12} sm={6} md={4} className={classes.singleCard}>
                        <Project project={project}/>
                    </Grid>
                ))
            }
        </Grid>
        :
        <Grid container justify="center" alignItems="baseline" alignContent="center" className={classes.loadingBox}>
            <CircularProgress style={{color: 'white'}}/>
        </Grid>
    )
}

export default Projects;
