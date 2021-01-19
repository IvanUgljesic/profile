import React, { useEffect, useState } from 'react';
import { Grid, Card, Typography, Collapse } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';

import { getPosts } from '../../actions/posts';
import  Project from './Project';
import  ProjectDetails from './ProjectDetails';

import useStyles from './styles';

const Projects = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.posts);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [grid, setGrid] = useState(true);

    useEffect(() => {
        dispatch(getPosts());
        if(projects.length !== 0) setIsLoaded(true);
    }, [dispatch, projects.length]);


    return (
        isLoaded ?
            <>  
            <Collapse in={grid} timeout={300} collapsedHeight={130}>
            <Grid container spacing={1} className={grid ? classes.root:classes.rootCollapse}>
                <Grid item xs={12} align="flex-start">
                    <Typography variant="caption" style={{color: 'white'}}>* click on a project for details</Typography>
                </Grid>
                {
                    projects.map((project) => (
                        <Grid key={project._id} item xs={grid ? 12:2} sm={grid ? 6:2} md={grid ? 4:2} className={grid ? classes.singleCard:classes.singleCardCollapse}>
                            <Project grid={grid} project={project} setCurrentProject={setCurrentProject} setGrid={setGrid} currentProject={currentProject}/>
                        </Grid>
                    ))
                }   
             </Grid>
            </Collapse>  
            { currentProject && <Collapse in={!grid}> <ProjectDetails currentProject={currentProject} setGrid={setGrid} setCurrentProject={setCurrentProject}/> </Collapse> }
            </>       
        :
        <Grid container spacing={1} className={classes.root}>{/* sceleton placeholder while app fetch data */}
            <Grid item xs={12} align="flex-start">
                <Typography className={classes.sceletonText}>
                  <Skeleton animation="wave" variant="rect" height={'5vh'} width={'20vw'}/>
                </Typography>
            </Grid>
            {
                [1,2,3,4,5,6].map(no => (
                <Grid key={no} item xs={grid ? 12:2} sm={grid ? 6:2} md={grid ? 4:2}>
                    <Card  className={classes.singleCardSceleton}>
                    <Skeleton animation="wave" variant="rect" height={370} width={"100%"}/>
                    </Card>
                </Grid>
                ))
            }
        </Grid>
    )
}

export default Projects;
