import React from 'react';
import { AppBar, Box, IconButton, withStyles, Tooltip, Typography, Grid } from '@material-ui/core';


import { DiMongodb, DiReact, DiNodejs } from 'react-icons/di';
import { FaYoutube } from 'react-icons/fa';
import { GitHub } from '@material-ui/icons';
import RxjsIcon from '../Skills/rxjs';
import ExpressIcon from '../../images/icons/express1.png';
import useStyles from './styles';

const SocialTooltip = withStyles((theme) => ({
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

const Footer = () => {
    const classes = useStyles();

    return (        
        <AppBar className={classes.appBar} position="static" color="inherit"> 
          <Grid container>
            <Grid item xs={12} md={4} align="center">
              <Typography variant="caption" color="primary">technologies used for this project:</Typography>
              <Box>
                <SocialTooltip title="MongoDB" arrow><IconButton className={classes.mongoIcon}><DiMongodb /></IconButton></SocialTooltip>
                <SocialTooltip title="React JS" arrow><IconButton className={classes.reactIcon}><DiReact /></IconButton></SocialTooltip>
                <SocialTooltip title="Node JS" arrow><IconButton className={classes.nodeIcon}><DiNodejs /></IconButton></SocialTooltip>
                <SocialTooltip title="Express JS" arrow><IconButton className={classes.expressIcon}><img src={ExpressIcon} alt="express JS" className={classes.expressIcon}/></IconButton></SocialTooltip>        
                <SocialTooltip title="RxJS" arrow><IconButton  className={classes.rxjsIcon}><RxjsIcon /></IconButton></SocialTooltip>        
              </Box>
            </Grid>
            <Grid item xs={12} md={4} align="center">
              <Typography variant="caption" color="primary">Client side GitRepo:</Typography>
              <Box>
                <SocialTooltip title="GitHub" arrow>
                <IconButton href="https://github.com/IvanUgljesic/profile" target="_blank"><GitHub className={classes.iconBtnGit} /></IconButton>
                </SocialTooltip>   
              </Box>              
            </Grid>
            <Grid item xs={12} md={4} align="center">
              <Typography variant="caption" color="primary">YouTube tutorial by JavaScript Mastery:</Typography>
              <Box>
                <SocialTooltip title="YouTube" arrow>
                <IconButton className={classes.youtubeIcon} href="https://www.youtube.com/watch?v=ngc9gnGgUdA" target="_blank"><FaYoutube /></IconButton>
                </SocialTooltip>      
              </Box>              
            </Grid>
          </Grid>
        </AppBar>
    )
}

export default Footer;
