import { makeStyles } from '@material-ui/core/styles';
import cardBackground from '../../images/contentBackground.jpg';

export default makeStyles((theme) => ({
   root:{
    flexGrow: 1,
    opacity: 1,
      [theme.breakpoints.up('sm')]: { 
        padding: '0 2px',
      },
    },
   cardBody: {
    position: 'relative',
    paddingTop: '3rem',
    clear: 'both',
    backgroundColor: 'white',
    [theme.breakpoints.up('sm')]: { 
      paddingTop: '4rem',
    },
    [theme.breakpoints.up('md')]: { 
      paddingTop: '5rem',
    },
   }, 
   profilePaper: {
    backgroundColor:'white',
    color: '#000',
   },
   cardImgBlock: {
    float:'left',
    width:'100%',
    height:'auto',
    overflow:'hidden'
  },
  mongoIcon: {
    height: '5vh',
    width: 'auto',
    color: '#449837'
  },
  reactIcon: {
    height: '5vh',
    width: 'auto',
    color: '#30b5de'
  },
  nodeIcon: {
    color: '#9bbd4f',
    height: '10vh',
    width: 'auto'
  },
  icon1: {
    height: '10vh',
    width: 'auto'
  },
  iconAndText: {
    display: 'flex',
    alignItems : 'center'
  },
  iconBlock: {
      padding: '2rem',
      float: 'left',
      width: '100%',
  },
  iconBtnGit:{
    color: 'white',
    backgroundColor: 'black'
  },
  iconBtnIn:{
    color: '#0073b1',
    backgroundColor: 'white'
  },
  iconBtnCode:{
    color: '#bb432c',
    backgroundColor: 'black'
  },
  profileImage: {
      borderRadius: '50%',
      position: 'absolute',       
      top: '-50px',
      left: '20%',
      maxWidth: '100px',
      border: `3px solid ${theme.palette.primary.main}`,
      WebkitTransform: 'translate(-50%, 0%)',
      transform: 'translate(-50%, 0%)',
      [theme.breakpoints.up('sm')]: { 
        top: '-55px',
        left: '15%',
        maxWidth: '110px',
      },
      [theme.breakpoints.up('md')]: { 
        top: '-75px',
        left: '20%',
        maxWidth: '150px',
      },
      [theme.breakpoints.up('lg')]: { 
        left: '15%',
      },
  },
  imgFluid: {
      width: '100%',
      height: 'auto',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
  },
  txtIndent: {
      textIndent: '0.5em',
      fontSize: 'inherit',
      color: 'rgba(0, 0, 0, 0.87)'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  readMore: {
    marginLeft: 'auto',
  },
  contactBtn: {
      textTransform: 'none',
      fontSize: 'inherit',
  },
  genInfo: {
    width: '100%',
    padding: '3px',
    minHeight: '100%',
    background: `url(${cardBackground})`,
    backgroundSize: 'cover',
  },
  jokeBox: {
    width: '100%',
    padding: '3px',
    minHeight: '100%',
    backgroundColor: theme.palette.primary.main,
    color: 'white'
  },
  jokeBtn: {
    color: 'white'
  },
  joke: {
    minHeight: '20vh'
  },
  jokeHeading: {
    minHeight: '10vh',
  },
  jokeBtnBox: {
    marginLeft: 'auto'
  },
  chip: {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    opacity: 0.75
  },
  jokeAndGenInfoBox: {
    left: 0,
    right: 0,
    width: '100%',
    margin: '0 auto',
  }
}));