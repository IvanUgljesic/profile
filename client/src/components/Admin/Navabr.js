import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useStyles from './styles';

const Navabr = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        history.push('/auth');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (        
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography variant="h2" align="center" color="primary">Admin</Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h5">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="primary" onClick={logout}>Logout</Button>
                    </div>
                ):(
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navabr;
