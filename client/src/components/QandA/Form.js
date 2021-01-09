import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { useDispatch } from 'react-redux';
 
import useStyles from './styles';
import { createQandA } from '../../actions/qanda';

const Form = () => {
    
    const [postData, setPostData] = useState({
        question: '',
        answer: '',
        category: ''
    });
    const classes = useStyles();
    const dispatch = useDispatch();
    const categories = ['Java', 'JavaScript', 'NodeJS', 'ReactJS', 'Other'];

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createQandA(postData));
        clear();
    }

    const clear = () => {
        setPostData({
            question: '',
            answer: '',
            category: ''
        });

    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6"> New QandA</Typography>
                <TextField 
                name="question" 
                variant="outlined" 
                label="Question" 
                fullWidth
                value={postData.question}
                onChange={(e) => setPostData({ ...postData, question: e.target.value })}    
                />
                <TextField 
                name="answer" 
                variant="outlined" 
                label="Answer" 
                multiline
                rows={5}
                fullWidth
                value={postData.answer}
                onChange={(e) => setPostData({ ...postData, answer: e.target.value })}    
                />
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={postData.category}
                    onChange={(e) => setPostData({ ...postData, category: e.target.value })}
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
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>

        </Paper>
    )    
}

export default Form;
