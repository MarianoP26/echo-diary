import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
//utils
import { getPosts } from './actions/posts';
//Components
import Posts from './components/Posts/Posts.js'
import Form from './components/Form/Form.js'
//styles
import useStyles from './styles.js';
//images
import echoLogo from './images/echo-logo.jpg';
const App = () => {

    const [currentId, setCurrentId] = useState(null);

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
        console.log('fetching posts');
    },[dispatch]);

    return(
        <Container maxidth="lg">
            <AppBar className={classes.appBar}
            position="static"
            color="inherit">
                <Typography className={classes.heading}
                variant="h2"
                align="center">Echoes</Typography>
                <img className={classes.image}
                src={echoLogo}
                alt="echoes"
                height="60"/>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justifyContent="space-between"
                    alignItems="stretch"
                    spacing={3}>
                        <Grid item cs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item cs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;