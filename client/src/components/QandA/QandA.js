import React, { useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import Form from './Form';
import { useSelector } from 'react-redux';
import QandAsList from './QandAsList';
import { getQandAs } from '../../actions/qanda';
import { useDispatch } from 'react-redux';

const QandA = () => {
    const qandas = useSelector((state) => state.qanda);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getQandAs());
    }, [dispatch]);

    console.log(qandas)

    return (
        <Container maxWidth="lg">
            <Grid container>
                <Grid item xs={4}><Form /></Grid>
                <Grid item xs={8}><QandAsList qandas={qandas} /></Grid>
            </Grid>
        </Container>
    )
}

export default QandA;
