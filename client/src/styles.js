import { makeStyles } from '@material-ui/core/styles';
import cardBackground from './images/contentBackground.jpg';

export default makeStyles((theme) => ({
    body: {
      flexGrow: 1,
    },
    root:{
      flexGrow: 1,
      minHeight: '80vh',
      padding: theme.spacing(1),
      width: '100%',
      [theme.breakpoints.down('sm')]: { 
        padding: '8px 0',
      },
    },
    appBarContainer: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'flex-start',
      padding: theme.spacing(1),
      backgroundColor: 'transparent',
      minHeight: '90vh',
      [theme.breakpoints.down('sm')]: { 
        margin: '12px auto'
      },
    },
    appBar: {
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(2)
      },
      image: {
        marginLeft: '15px',
        [theme.breakpoints.down('sm')]: { 
          marginLeft: 0,
        },
      },
      tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: theme.spacing(2),
        background: `url(${cardBackground})`,
        backgroundSize: 'cover',
      },
      link: {        
        textTransform: 'none',
        textDecoration: 'none',
        fontWeight: '600',
      },
      content: {
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: { 
          padding: '2px',
        },
      },
      menu: {
        color: 'orange',
      }
}));