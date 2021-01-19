import { makeStyles } from '@material-ui/core/styles';
import cardBackground from '../../images/contentBackground.jpg';

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: 'white',
    opacity: 0.8,
    "&:hover": {
      opacity: 1,
    }
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    alignItems: 'center',
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column'
  },
  stepper: {
    backgroundColor: 'inherit'
  },
  form: {
    padding: '3em',
    minHeight: '60vh',
    minWidth: '80%',
    background: `url(${cardBackground})`,
    backgroundSize: 'cover',
    left:0,
    right: 0,
    top: 0
  }
}));