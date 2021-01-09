import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';

import useStyles from './styles';
import { HiOutlineMail } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';
import { BiMessageDetail } from 'react-icons/bi';
import { SiProbot } from 'react-icons/si';
import clsx from 'clsx';

import { useSelector } from 'react-redux';


const getSteps = () => {
  return ['Your email address', 'Your name', 'Message, Sugestion, Question', `"I'm not a robot" part`];
}
const ColorlibStepIcon = (props) => {
    const classes = useStyles();
    const { active, completed } = props;
    const color = useSelector((state) => state.theme.color);
  
    const icons = {
      1: <HiOutlineMail style={{color: color, height: '1em', width: '1em', fontSize: '1.93rem'}}/>,
      2: <CgProfile style={{color: color, height: '1em', width: '1em', fontSize: '1.93rem'}}/>,
      3: <BiMessageDetail style={{color: color, height: '1em', width: '1em', fontSize: '1.93rem'}}/>,
      4: <SiProbot style={{color: color, height: '1em', width: '1em', fontSize: '1.93rem'}}/>,
    };
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
}

const Contact = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [error, setError] = React.useState({
    email: '',
    name: '',
    content: '',
    sum: ''
  });
  const [state, setState] = React.useState({
      email: '',
      name: '',
      content: '',
      sum: '',
      randNo1: Math.floor(Math.random()*10+1),
      randNo2: Math.floor(Math.random()*10+1),
  });
  const [result, setResult] = React.useState(null);
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleChange = (e) => {
    let name = e.target.name;
    setError(err => {
      return {
        ...err,
        [name]: ''
      }
    });
    setState({
        ...state,
        [name]: e.target.value
    })
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <TextField color="primary" fullWidth defaultValue={state.email} name="email" label="email" variant="outlined" onChange={handleChange}/>;
      case 1:
        return <TextField color="primary" fullWidth defaultValue={state.name} name="name" label="name" variant="outlined" onChange={handleChange}/>;
      case 2:
        return <TextField color="primary" fullWidth defaultValue={state.content} name="content" label="content" variant="outlined" multiline rows={4} onChange={handleChange}/>;
      case 3: 
        return <TextField color="primary" fullWidth defaultValue={state.sum} size="small" name="sum" label={state.randNo1+" + "+ state.randNo2+" = "} variant="outlined" onChange={handleChange}/>;
      default:
        return 'Unknown step';
    }
  };

  const handleNext = () => {
    let step = activeStep + 1;
    let flag = false;
      // fields validation
      switch(activeStep){
        case 0:
          flag = state.email.match(emailRegex) ? true:false;
          setError(err => {
            return {
              ...err,
              email: state.email.match(emailRegex) ? '':'email address not in a right format'
            }
          });
          break;
        case 1:
          flag = state.name !== '';
          setError(err => {
            return {
              ...err,
              name: state.name !== '' ? '':'name field is empty'
            }
          });
          break;
        case 2:
          flag = state.content !== '';
          setError(err => {
            return {
              ...err,
              content: state.content !== '' ? '':'field is empty'
            }
          });
          break;
        case 3:
          flag = Number(state.sum) === (state.randNo1 + state.randNo2);
          setError(err => {
            return {
              ...err,
              sum: Number(state.sum) === (state.randNo1 + state.randNo2) ? '':'wrong sum'
            }
          });
          break;
        default:
          break;
      }
      step = flag ? step:step-1;
    setActiveStep(step);
    if(step === 4)sendEmail();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setState({
        email: '',
        name: '',
        content: '',
        sum: '',
        randNo1: Math.floor(Math.random()*10+1),
        randNo2: Math.floor(Math.random()*10+1),
    }); 
    setActiveStep(0);
    setResult(null);
  };

  const sendEmail = () => {
    axios
     .post('/send', { ...state })
     .then(response => {
       setResult(response.data);
     })
     .catch((err) => {
       setResult({ success: false, message: 'Something went wrong. Try again later'});
   });
  }

  return (
    <div className={classes.root}>
    <Paper elevation={6} variant="elevation" className={classes.form}>
      <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            <StepContent>
              <Typography component="div">{getStepContent(index)}</Typography>
              <Typography component="div" color="error">{Object.values(error)[index]}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                    color="primary"
                    variant="contained"
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Send' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={6} className={classes.resetContainer}>
          { !result ?
          <CircularProgress style={{color: 'primary'}}/> :
          <Typography color={result && result.success ? "primary":"error"}>{result && result.message}</Typography>
          }
          <Button disabled={!result} variant="contained" color="primary" onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
      </Paper>
    </div>
  );
}
export default Contact;
