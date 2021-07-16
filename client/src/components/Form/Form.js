import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles.js';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts.js'

//Get current id

const Form = ( {currentId, setCurrentId }) => {

    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    });

	const user = JSON.parse(localStorage.getItem('profile'));
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
	const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(()=>{
        if(post) setPostData(post);
    },[post]);

    const handleSubmit = async (e) => {
		e.preventDefault();

        if(currentId === 0){
            dispatch(createPost({...postData, name: user?.result?.name }));
        }
        else{
			console.log('UPDATE');
            dispatch(updatePost({ ...postData, name: user?.result?.name}));
        }

        clear();
    };

	const clear = () => {
        setCurrentId(0);
        setPostData({
        title: '',
        message: '',
        tags: '',
        selectedFile: '', })
	};

	if(!user?.result?.name) {
		return(
			<Paper className={classes.paper}>
				<Typography variant="h6" align="center">
					Please sign in to create your own memories and like other's memories.
				</Typography>
			</Paper>
		)
	}

    return(
        <Paper className={classes.paper}>
            <form autoComplete="off"
            noValidate
            className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}
            >
                <Typography variant="h6">{currentId ? 'Editing' : 'Create'} an Echo</Typography>
                <TextField name="title"
                variant ="outlined"
                label="Title"
                fullWidth
                value={postData.title}
                onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField name="message"
                variant ="outlined"
                label="Message"
                fullWidth
                value={postData.message}
                onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField name="tags"
                variant ="outlined"
                label="Tags"
                fullWidth
                value={postData.tags}
                onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})}
                />
				<div className={classes.fileInput}>
					<FileBase type="file"
					multiple={false}
					onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}>	
					</FileBase>
				</div>
				<Button 
				variant="contained"
				color="primary"
				size="large"
				type="submit"
				fullWidth>
					Submit
				</Button>
				<Button className={classes.buttonSubmit}
				variant="contained"
				color="secondary"
				size="small"
				onClick={clear}
				fullWidth>
					Clear
				</Button>
            </form>
        </Paper>
    );
};

export default Form;