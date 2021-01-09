import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, Grid, FormControl, InputLabel, Select, MenuItem, AccordionDetails, AccordionSummary, Typography, Paper } from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(1),
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '75%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      width: '100%'
    },
    filterArea: {
        padding: theme.spacing(2),
        margin: '12px auto'
    },
    filterSelect: {
        align: 'right'
    }
  }));

const  QandAsList = ({qandas}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const categories = ['Java', 'JavaScript', 'NodeJS', 'ReactJS', 'All'];
    const [currentQandAs, setCurrentQandAs] = React.useState(qandas);
    const [currCategory, setCurrCategory] = React.useState('All');
    console.log(qandas)
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const handleFilter = (e) => {
        let cat = e.target.value;
        setCurrentQandAs([...qandas.filter(qanda => cat === 'All' ? qanda : qanda.category === cat)]);
        setCurrCategory(cat);
    }

    return (
        <div className={classes.root}>
        <Paper elevation={5} className={classes.filterArea}>
        <Grid container alignItems="flex-end" justify="space-between">
            <Grid item xs={3}><Typography color="primary">filters</Typography></Grid>
            <Grid item xs={3} className={classes.filterSelect}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={currCategory}
                    margin="dense"                    
                    onChange={(e) => handleFilter(e)}
                    label="Category"
                    >
                    {
                        categories.map(cat => {
                            return (
                                <MenuItem value={cat} key={cat}>{cat}</MenuItem>
                            )                                
                        })
                    }
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
        </Paper>
        { currentQandAs.map(qanda => {
            return (
                <Accordion key={qanda._id} expanded={expanded === qanda._id} onChange={handleChange(qanda._id)}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                    <Typography className={classes.heading}>{qanda.question}</Typography>
                    <Typography className={classes.secondaryHeading} align="right">{qanda.category}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography color="primary">
                        {qanda.answer}
                    </Typography>
                    </AccordionDetails>
                </Accordion>
            )
        }) 
        }         
        </div>
    )
}

export default QandAsList
