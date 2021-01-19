import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
   root:{
    flexGrow: 1,
    maxWidth: '100%',
    padding: theme.spacing(1),
    alignItems: 'flex-start'
    },
    rootCollapse: {
      height: '100%'
    },
    media: {
      height: 0,
      paddingTop: '100%', // 16:9,
      backgroundSize: '100% 100%',
      backgroundPosition: 'top left',
    },
    mediaCollapsed: {
      height: "130px",
      backgroundSize: 'cover',
      width: '100%',
    },
    border: {
      border: 'solid',
    },
    fullHeightCard: {
      height: '100%',
    },
    card: {
      maxWidth: '100%',
      overflow: 'hidden',
    },
    markedCard: {
      maxWidth: '100%',
      overflow: 'hidden',
      border: `2px solid ${theme.palette.primary.main}`
    },
    singleCard: {
      marginBottom: '8px',
      height: '100%'
    },
    singleCardSceleton: {
      marginBottom: '8px',
      minHeight: '100%',
      backgroundColor: '#FFF'
    },
    sceletonText: {
      backgroundColor: '#FFF',
      maxWidth: '20vw',
      borderRadius: '2px'
    },
    singleCardCollapse: {
      height: '120px'
    },
    overlay: {
      position: 'absolute',
      top: '0',
      left: '0',
      color: '#FFF',
      backgroundColor: "#000",
      opacity: 0.75,
      width: '100%',
      height: '100%',
      textShadow: '2px 2px rgba(0,0,0,0.09)',
    },
    displayNone : {
      display: 'none'
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
    },
}));