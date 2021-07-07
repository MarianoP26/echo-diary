import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post.js';
import useStyles from './styles.js';
import { Grid, CircularProgress } from '@material-ui/core';

const Posts = () => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    console.log(posts, "ahea");

    return(
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container}
            container
            alignItems="stretch"
            spacing={3}
            >
                {posts.map((post) => (
                    <Grid item key={post._id} xs={12} sm={6} md={6}>
                        <Post post={post}/>
                    </Grid>
                ))}
            </Grid>
        )
    );
};

export default Posts;