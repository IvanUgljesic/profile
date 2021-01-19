import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root:{
        flexGrow: 1,
        width: '100%',
        left: 0,
        right: 0,
        minHeight: '90vh',
        backgroundColor: 'inherit',
        borderRadius: '20px',
        [theme.breakpoints.down('sm')]:{
            padding: 0,
            margin: 0,
        }
    },
    canvas: {
        opacity: "1"
    },
    techBox: {
        margin: '0 8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'no-wrap',
        [theme.breakpoints.down('sm')]:{
            margin: '0 2px',
        },
        [theme.breakpoints.down('md')]:{
            margin: '0 4px',
        },
        [theme.breakpoints.down('xs')]:{
            margin: '0 1px',
        },
    },
    techName: {
        'z-index': '1500',
        fontSize: '1.em',
        [theme.breakpoints.down('sm')]:{
            fontSize: '0.3em',
        },
        [theme.breakpoints.down('md')]:{
            fontSize: '0.8em',
        },
        [theme.breakpoints.down('xs')]:{
            fontSize: '0.25em',
        },
    },
    techIcons: {
        [theme.breakpoints.down('sm')]:{
            width: '100%',
            height: 'auto',
            overflow: 'hidden'
        },
    },
    techPaper: {
        minWidth: '100%',
        minHeight: '55vh',
        margin: '0 auto',
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'center',
        opacity: 0.85,
        border: `2px solid ${theme.palette.primary.main}`,
        [theme.breakpoints.down('md')]:{
            minHeight: '50vh',
        },
        [theme.breakpoints.down('xs')]:{
            minHeight: '30vh',
        },
    },
    techBars: {
        minWidth: '100%',
        height: '450px',
        margin: '0 auto',
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        [theme.breakpoints.down('md')]:{
            height: '400px',
        },
        [theme.breakpoints.down('sm')]:{
            height: '350px',
        },
        [theme.breakpoints.down('xs')]:{
            height: '300px',
        },
    },
    tracker: {
        minWidth: '100%',
        minHeight: '6vh',
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '0',
        [theme.breakpoints.down('sm')]:{
            minHeight: '1vh',
        },
    },
    trackerBar: {
        margin: '0 8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'no-wrap',
        [theme.breakpoints.down('sm')]:{
            margin: '0 2px',
        },
        [theme.breakpoints.down('md')]:{
            margin: '0 4px',
        },
        [theme.breakpoints.down('xs')]:{
            margin: '0 1px',
        },
    },
    techControlsPaper: {
        margin: '2vh auto',
        width: '80%',
        minHeight: '20vh',
        display: 'flex',
        opacity: 0.7,
        justifyContent: 'center',
        border: `2px solid ${theme.palette.primary.main}`,
        [theme.breakpoints.down('sm')]:{
            width: '100%',
        },
    },
    techControls: {
        margin: '0 auto',
    },
    message: {
        justifyContent: 'center',
        maxWidth: '100%',
        margin: '0 10px',
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        padding: theme.spacing(2),
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]:{
            margin: '0',
        },
    },
    infoIcon: {
        maxHeight: '2vh',
        width: 'auto',
        padding: '0 4px'
    },
    controls: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    algoInfo: {
        padding: theme.spacing(1),
        height: '15vh',
        maxHeight: '15vh',
        [theme.breakpoints.down('sm')]:{
            fontSize: '0.3em'
        },
    },
    algoInfoText: {
        [theme.breakpoints.down('sm')]:{
            fontSize: '0.65rem',
            textAlign: 'justify',
            textJustify: 'inter-word'
        },
    },
    errorInfo: {
        padding: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '6vh',
    },
    controlBtn: {
    }
}));