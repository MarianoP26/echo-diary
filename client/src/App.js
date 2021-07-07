import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
//Components
import Posts from './components/Posts/Posts.js'
import Form from './components/Form/Form.js'
//styles
import useStyles from './styles.js';
//images
import echoLogo from './images/echo-logo.jpg';
const App = () => {
    const classes = useStyles();

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
                    <Grid container justify="space-between"
                    alignItems="stretch"
                    spacing={3}>
                        <Grid item cs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item cs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;