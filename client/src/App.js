import React from 'react';
import { Container, Tabs, Tab, Box  } from '@material-ui/core';
import { Route, Switch, NavLink } from "react-router-dom";
import Admin from './components/Admin';
import Profile from './components/Profile/Profile';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import NoMatch from './components/NoMatch';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { useSelector } from 'react-redux';


import useStyles from './styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { theme1, theme2, theme3, theme4, theme5 } from './themes';
  
const a11yProps = (index) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
        value: index,
    };
}


const App = () => {
    let currentPage = window.location.pathname;
    const classes = useStyles();
    const [value, setValue] = React.useState(() => {
      switch(currentPage){
        case '/':
          return 0;
        case '/skills':
          return 1;
        case '/projects':
          return 2;
        case '/contact':
          return 3;
        default:
          return 0;
      }
    });
    const [anchorEl, setAnchorEl] = React.useState(null);
    const currentTheme = useSelector((state) => state.theme);
    const themes = [theme1, theme2, theme3, theme4, theme5];
    
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: currentTheme.color
        },
      },
      typography: {
        fontFamily: [
          currentTheme.font,
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ].join(','),
        "fontSize": 18,
        "fontWeightLight": 400,
        "fontWeightRegular": currentTheme.font.includes('Roboto') ? 400 : 500,
        "fontWeightMedium": currentTheme.font.includes('Roboto') ? 500 : 600,
      }
    });

    const handleChange = (e, newValue) => {
      setValue(newValue);
      setAnchorEl(null);
    };

    return (
      <MuiThemeProvider theme={theme}>
        <div style={themes[currentTheme.colorIndex]}>
        <Container maxWidth="lg" className={classes.root}>     
        <Header handleChange={handleChange} a11yProps={a11yProps} NavLink={NavLink} setAnchorEl={setAnchorEl} value={value} anchorEl={anchorEl} />  
        <div className={classes.appBarContainer}>
          <Box display={{ xs: 'none', sm: 'none', md: 'flex' }}>
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                className={classes.tabs}
                textColor='primary'
                TabIndicatorProps={{style: {background:currentTheme.color}}}                
            >
                <Tab style={{ color: currentTheme.color, opacity: value === 0 ? 1:0.7}} className={classes.link} label="Profile" {...a11yProps(0)} component={NavLink} to="/"/>
                <Tab style={{ color: currentTheme.color, opacity: value === 1 ? 1:0.7}} className={classes.link} label="Skills" {...a11yProps(1)} component={NavLink} to="/skills"/>
                <Tab style={{ color: currentTheme.color, opacity: value === 2 ? 1:0.7}} className={classes.link} label="Projects" {...a11yProps(2)} component={NavLink} to="/projects"/>
                <Tab style={{ color: currentTheme.color, opacity: value === 3 ? 1:0.7}} className={classes.link} label="Contact" {...a11yProps(3)} component={NavLink} to="/contact"/>
            </Tabs>
            </Box>
            <Container className={classes.content}>
            <Switch>
                <Route path="/" exact render={() => <Profile contactLink={() => setValue(3)} />} />
                <Route path="/skills" component={Skills} />
                <Route path='/projects' component={Projects} />
                <Route path='/contact' component={Contact} />
                <Route path='/admin' component={Admin} />
                <Route component={NoMatch} />
            </Switch>     
            </Container>  
        </div>        
        <Footer/> 
        </Container>
        </div>
      </MuiThemeProvider>  
    )
}


export default App;