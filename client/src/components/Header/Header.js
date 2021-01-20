import React from 'react';
import { AppBar, Grid, IconButton, MenuItem, Menu, Typography, Box } from '@material-ui/core';
import ThemeSwticher from './ThemeSwitcher';


//icons
import MenuIcon from '@material-ui/icons/Menu';

import useStyles from './styles';

const Header = ({ handleChange, a11yProps, NavLink, setAnchorEl, value, anchorEl}) => {
    const classes = useStyles();
    const currentPage = ['Profile', 'Skills', 'Projects', 'Contact' ];
    
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    return (        
        <AppBar className={classes.appBar} position="static" color="inherit">   
        <Grid container spacing={2} alignItems="center">     
        <Grid item xs={1}>
        <Box display={{ xs: 'flex', sm: 'flex', md: 'flex' }}>
          <IconButton edge="start" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color="primary">
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}           
          >
            <MenuItem className={classes.menu} onClick={() => handleChange(null, 0)} {...a11yProps(0)} component={NavLink} to="/">Profile</MenuItem>
            <MenuItem className={classes.menu} onClick={() => handleChange(null, 1)} {...a11yProps(1)} component={NavLink} to="/skills">Skills</MenuItem>
            <MenuItem className={classes.menu} onClick={() => handleChange(null, 2)} {...a11yProps(2)} component={NavLink} to="/projects">Projects</MenuItem>
            <MenuItem className={classes.menu} onClick={() => handleChange(null, 3)} {...a11yProps(3)} component={NavLink} to="/contact">Contact</MenuItem>
          </Menu>
          </Box>
          </Grid>
          <Grid item xs={10} className={classes.currentPage}>        
            <Typography variant="h5" align="center" className={classes.title}>  {currentPage[value]}</Typography>
          </Grid>
          <Grid item xs={1}>
            <ThemeSwticher />
          </Grid>
          </Grid> 
        </AppBar>
    )
}

export default Header;
