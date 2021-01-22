import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(2),
        border: `3px solid ${theme.palette.primary.main}`,
      },
      expressIcon: {
        height: '4vh',
        width: 'auto',
        '&:hover':{
          color: 'yellow'
        }
      },
      mongoIcon: {
        '&:hover':{
          color: '#449837'
        }
      },
      reactIcon: {
        '&:hover':{
          color: '#30b5de'
        }
      },
      nodeIcon: {
        '&:hover':{
          color: '#9bbd4f',
        }
      },
      rxjsIcon: {
        '&:hover':{
          color: '#e01d84',
        }
      },
      youtubeIcon: {
        '&:hover':{
          color: '#FF0000',
        }
      },
      iconBtnGit:{
        '&:hover':{
          color: 'white',
          backgroundColor: 'black'
        }
      },
      muiIcon:{
        '&:hover':{
          color: '#1976d2',
        }
      },
}));
