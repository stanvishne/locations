import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Categories from './categories/Categories.js';
import Locations from './locations/Locations.js';
import Title from './Title.jsx';

const Home = () => (
	<div className='home'>
      <Title title='My Locations App'/>
			<Link className='nav-link' to='/categories'>Categories</Link>
			<Link className='nav-link' to='/locations'>Locations</Link>
	</div>
);
	

const MainScreen = () => (
  <div className='locations-app'>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/categories' component={Categories}/>
      <Route path='/locations' component={Locations}/>
    </Switch>
  </div>
);

export default MainScreen;