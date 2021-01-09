import React from 'react';
import { Paper, CardContent, Typography } from '@material-ui/core';
import useStyles from './styles';

const GeneralInfo = () => {
    const classes = useStyles();

    return (        
        <Paper elevation={5} className={classes.genInfo}>
        <CardContent component="div">
            <Typography color="primary" variant="h5" gutterBottom>
            General Info
            </Typography>
            <Typography color="textSecondary" variant="caption" component="div">
            Name: <br/><Typography className={classes.txtIndent} >Ivan Uglješić</Typography>
            </Typography>
            <Typography color="textSecondary" variant="caption" component="div">
            Nationality: <br/><Typography className={classes.txtIndent} >Serbian</Typography>
            </Typography>
            <Typography color="textSecondary" variant="caption" align="justify" component="div">
            Address:<br/><Typography className={classes.txtIndent} >Djuriceva 30, </Typography>
            <Typography className={classes.txtIndent} >Belgrade 11000, Serbia</Typography>
            </Typography>
            <Typography variant="caption" color="textSecondary" align="justify">
            Languages: <br/><Typography className={classes.txtIndent} >Serbian(Native)</Typography>
            <Typography className={classes.txtIndent} >English(Intermediate)</Typography>
            </Typography>
            <Typography variant="caption" color="textSecondary" component="div" align="justify">
            Phone: <br/><Typography className={classes.txtIndent} > +381 60 448 4584</Typography>
            </Typography>
            <Typography variant="caption" color="textSecondary" component="div" align="justify">
            Email: <br/><Typography className={classes.txtIndent} > ivanugljesic@gmail.com</Typography>
            </Typography>                    
        </CardContent>
        </Paper>
    )
}

export default GeneralInfo;
