import React, { useState, useEffect } from 'react';
import {  Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Navabr from './Navabr';

import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useHistory } from 'react-router-dom';

const Admin = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    if(!user?.result?.name){
        history.push('/auth');
    }

    return (
        <Container  maxWidth="lg">
            <Navabr />
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
