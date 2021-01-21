import React from 'react';
import { Container } from '@material-ui/core';
import { Route, Switch, NavLink } from "react-router-dom";
import Admin from './components/Admin/Admin';
import Profile from './components/Profile/Profile';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import NoMatch from './components/NoMatch';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Auth from './components/Admin/Auth';

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
        { currentPage !== '/admin' && currentPage !== '/auth' && <Header handleChange={handleChange} a11yProps={a11yProps} NavLink={NavLink} setAnchorEl={setAnchorEl} value={value} anchorEl={anchorEl} /> } 
        <div className={classes.appBarContainer}>
          <Container className={classes.content}>
            <Switch>
              <Route path="/" exact render={() => <Profile contactLink={() => setValue(3)} />} />
              <Route path="/skills" component={Skills} />
              <Route path='/projects' component={Projects} />
              <Route path='/contact' component={Contact} />
              <Route path='/admin' component={Admin} />
              <Route path='/auth' component={Auth} />
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