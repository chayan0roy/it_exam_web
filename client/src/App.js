import { BrowserRouter } from 'react-router-dom';
import './App.css';
import React, { useState } from 'react'

import Header from './components/header_footer/Header';
import PrivateComponent from './components/privateComponent/PrivateComponent';

function App() {

	const [isLogin, setIsLogin] = useState(true);

	return (
		<div className="App">
			<BrowserRouter>
				<Header isLogin={isLogin} setIsLogin={setIsLogin} />
				<PrivateComponent isLogin={isLogin} setIsLogin={setIsLogin} />
			</BrowserRouter>
		</div>
	);
}

export default App;



