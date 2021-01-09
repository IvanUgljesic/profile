import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
   root:{
    flexGrow: 1,
    maxWidth: '100%',
    padding: theme.spacing(1),
    },
    media: {
      height: 0,
      paddingTop: '56.25%',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      backgroundBlendMode: 'darken',
      backgroundPosition: 'top left',
    },
    border: {
      border: 'solid',
    },
    fullHeightCard: {
      height: '100%',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderRadius: '15px',
      height: '100%',
      position: 'relative',
      margin: theme.spacing(1),
      border: `2px solid ${theme.palette.primary.main}`
    },
    singleCard: {
      marginBottom: '8px',
      opacity: 0.7
    },
    overlay: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      color: 'white',
      backgroundColor: theme.palette.primary.main,
      padding: theme.spacing(2),
      borderRadius: '5px'
    },
    overlay2: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      color: 'white',
    },
    grid: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '20px'
    },
    title: {
      padding: '0 16px',
    },
    cardActions: {
      padding: '0 16px 8px 16px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    loadingBox: {
      minHeight: '60vh'
    }
}));