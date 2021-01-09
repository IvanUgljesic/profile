import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
 
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        title: '',
        description: '',
        tags: '',
        selectedFile: '',
        liveUrl: null,
        gitUrl: ''
    });
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId): null);

    console.log(post)

    useEffect(() => {
        if(post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId, postData));
        } else {
            dispatch(createPost(postData));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: '',
            description: '',
            tags: '',
            selectedFile: '',
            gitUrl: '',
            liveUrl: null
        });

    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Edit':'Create'} Project</Typography>
                <TextField 
                name="title" 
                variant="outlined" 
                label="Title" 
                fullWidth
                value={postData.title}
                onChange={(e) => setPostData({ ...postData, title: e.target.value })}    
                />
                <TextField 
                name="description" 
                variant="outlined" 
                label="Description" 
                fullWidth
                value={postData.description}
                onChange={(e) => setPostData({ ...postData, description: e.target.value })}    
                />
                <TextField 
                name="liveUrl" 
                variant="outlined" 
                label="Live URL" 
                fullWidth
                defaultValue={postData.liveUrl}
                onChange={(e) => setPostData({ ...postData, liveUrl: e.target.value })}    
                />
                <TextField 
                name="gitUrl" 
                variant="outlined" 
                label="Git URL" 
                fullWidth
                value={postData.gitUrl}
                onChange={(e) => setPostData({ ...postData, gitUrl: e.target.value })}    
                />
                <TextField 
                name="tags" 
                variant="outlined" 
                label="Tags" 
                fullWidth
                value={postData.tags}
                onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}    
                />
                <div className={classes.fileInput}>
                    <FileBase 
                     type="file"
                     multiple={false}
                     onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}   
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>

        </Paper>
    )
}

export default Form;
