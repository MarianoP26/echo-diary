import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Avatar, Toolbar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import echoLogo from '../../images/echo-logo.jpg';
import decode from 'jwt-decode';

const Navbar = () => {

  const classes = useStyles();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const logout = () => {
		dispatch({type: 'LOGOUT'});
		history.push('/');
		setUser(null);
	};

	useEffect(()=>{
		const token = user?.token;

		//JWT
		if(token){
			const decodedToken = decode(token);
			if(decodedToken.exp * 1000 < new Date().getTime()) logout();
		}


		setUser(JSON.parse(localStorage.getItem('profile')));
	}, [location]);

  return (
    <AppBar className={classes.appBar}
    position="static"
		color="inherit"
		>
			<div className={classes.brandContainer}>
				<Typography component={Link} to="/" className={classes.heading}
				variant="h2"
				align="center">Echoes</Typography>
					<img className={classes.image}
					src={echoLogo}
					alt="echoes"
					height="60"/>
			</div>
			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Avatar className={classes.purple}
						alt={user.result.name}
						src={user.result.imageUrl}>
							{user.result.name.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant="h6">
							{user.result.name}
						</Typography>
						<Button onClick={logout} variant="contained" className={classes.logout} color="secondary">
							Log out
						</Button>
					</div>
				): (
					<Button component={Link} to="/auth" variant="contained" color="primary">
						Sign in
					</Button>

				)}
			</Toolbar>
    
    </AppBar>
    )
};

export default Navbar;
