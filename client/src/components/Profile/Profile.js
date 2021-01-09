import React from 'react';
import useStyles from './styles';
import { Grid, Box, CardContent, Typography, IconButton, Paper, CardActions, Collapse, Tooltip, withStyles, Button  } from '@material-ui/core';
import { GitHub, LinkedIn, ExpandMore } from '@material-ui/icons';
import GeneralInfo from './GeneralInfo';
import JokeBox from './JokeBox';
import clsx from 'clsx';
import { DiMongodb, DiReact, DiNodejs } from 'react-icons/di';
import { SiCodewars } from 'react-icons/si';

import background from '../../images/background.jpg';
import profile from '../../images/profile.jpg';
import ExpressIcon from '../../images/icons/express.png';
import { useHistory } from 'react-router-dom';

const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.palette.primary.main,
      fontSize: 11,
      border: `1px solid ${theme.palette.primary.main}`,
    },
}))(Tooltip);

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

const Profile = ({ contactLink }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const history = useHistory();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleContact = () => {
        contactLink();
        let path = '/contact';
        history.push(path);
    }


    return (
        <Grid container spacing={3} alignItems="flex-start" className={classes.root}>
            <Grid item sm={12} md={4} lg={3}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6} md={12}><GeneralInfo /></Grid>
                    <Grid item xs={12} sm={6} md={12}><JokeBox /></Grid>           
                </Grid>
            </Grid>
            <Grid item sm={12} md={8} lg={9}>
                <Paper elevation={24} className={classes.profilePaper}>
                    <div className={classes.cardImgBlock}>
                        <img className={classes.imgFluid} src={background} alt="background" />
                    </div>
                    <CardContent className={classes.cardBody}>
                        <img src={profile} alt="profile" className={classes.profileImage} />
                        <Typography variant="h5" paragraph>Ivan Ugljesic</Typography>
                        <Typography variant="caption" paragraph color="primary">Junior Web Developer</Typography>
                        <Typography variant="body1" align="justify" component="div" gutterBottom>Hi, my name is Ivan and I am a self-taught developer. 
                        I first started with Java, where I learned basic programming concepts such as data structures, oop, and the core java programming.                      
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                        After learning all the basics, I spent most of my programming time on the online platform named codewars, developing my problem-solving skills.
                        </Collapse>
                        </Typography>  
                        <Typography variant="body1" align="justify" component="div" gutterBottom>
                            After that, I started working with front-end technologies, making web presentations for small businesses of my friends and acquaintances.                     
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                        For these needs I mostly used the online server platform "mars", product of "enon-solutions" company, where I spent three weeks as an intern.
                        I used free themes and snippets, customizing them with the help of bootstrap and JQuery, and a little bit of Vue.js
                        (at the time i didnt really know what component is).
                        </Collapse>
                        </Typography>
                        <Typography variant="body1" align="justify" component="div" gutterBottom>
                        I've been working with React.js for the last couple of months, in fact this website is my first
                        <LightTooltip title={
                            <Grid container spacing={0} direction="column" alignContent="center">
                                <Grid item className={classes.iconAndText}><DiMongodb className={classes.mongoIcon}/><Typography variant="caption">MongoDB</Typography></Grid>
                                <Grid item className={classes.iconAndText}><img src={ExpressIcon} alt="express JS" className={classes.icon1}/></Grid>
                                <Grid item className={classes.iconAndText}><DiReact className={classes.reactIcon}/><Typography variant="caption">React.js</Typography></Grid>
                                <Grid item className={classes.iconAndText}><DiNodejs className={classes.nodeIcon}/></Grid>                          
                            </Grid>
                        }>
                            <Button size="small"><Typography variant="body1" className={classes.contactBtn} color="primary">MERN</Typography></Button>
                        </LightTooltip>
                         stack application (I hope you like it).
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                         Stacking technologies up, aiming towards full-stack developer level.
                        </Collapse>
                        </Typography>
                        <Typography variant="body1" align="justify" paragraph>
                        Anyhow, I am currently looking for an opportunity for further learning and self-development as an intern or junior developer.
                        </Typography>
                        <Grid container alignItems="baseline" direction="row">
                        <Typography variant="body1" align="justify" paragraph>
                        Feel free to 
                        </Typography>
                        <Button className={classes.contactBtn} size="medium" onClick={handleContact}><Typography variant="body1" color="primary">contact me!</Typography></Button>
                        </Grid>
                    </CardContent>
                    <CardActions disableSpacing>
                        <SocialTooltip title="GitHub" arrow>
                        <IconButton href="https://github.com/IvanUgljesic" target="_blank"><GitHub className={classes.iconBtnGit} /></IconButton>
                        </SocialTooltip>
                        <SocialTooltip title="LinkedIn" arrow>
                        <IconButton href="https://www.linkedin.com/in/ivan-ugljesic/" target="_blank"><LinkedIn className={classes.iconBtnIn}/></IconButton>
                        </SocialTooltip>
                        <SocialTooltip title="Codewars" arrow>
                        <IconButton href="https://www.codewars.com/users/Meeko" target="_blank"><SiCodewars className={classes.iconBtnCode}/></IconButton>
                        </SocialTooltip>
                        <Box className={classes.readMore}>
                        <Typography variant="caption" color="primary">{expanded ? 'less':'more'}</Typography>
                        <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        label="read more"
                        >  
                        <ExpandMore color="primary"/>
                        </IconButton>
                        </Box>
                    </CardActions>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Profile;
