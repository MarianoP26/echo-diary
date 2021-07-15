import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//utils

//Components
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';
//styles

//images

const App = () => {

  return(
		<BrowserRouter>
			<Container maxidth="lg">
				<Navbar />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/auth" exact component={Auth} />
				</Switch>
			</Container>
		</BrowserRouter>
    
  )
}

export default App;