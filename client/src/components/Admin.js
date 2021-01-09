import React, { useState, useEffect } from 'react';
import {  Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from '../actions/posts';
import Posts from './Posts/Posts';
import Form from './Form/Form';

import useStyles from '../styles';

const Admin = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);


    return (
        <Container  maxWidth="lg">        
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography variant="h2" align="center" color="primary">Admin</Typography>
            </AppBar>
            <Grow in>
                <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Grow>
        </Container>    
    )
}

export default Admin;