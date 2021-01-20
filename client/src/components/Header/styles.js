import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green, blue } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';


export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(2),
        opacity: 0.75,
        backgroundColor: 'white'
        //border: `3px solid ${theme.palette.primary.main}`
      },
      menu: {
        color: theme.palette.primary.main
      },
      radioGroup: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
      },
      title: {
        color: theme.palette.primary.main,
        opacity: 1,   
        justifyContent: 'center',
        fontWeight: 700,
        marginLeft: theme.spacing(1)   
      },
      currentPage: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }
}));

export const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);


export const BlueRadio = withStyles({
  root: {
    color: blue[400],
    '&$checked': {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);


export const OrangeRadio = withStyles({
  root: {
    color: '#36A39A',
    '&$checked': {
      color: '#36A39A',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export const RedRadio = withStyles({
  root: {
    color: '#4D76A3',
    '&$checked': {
      color: '#4D76A3',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);