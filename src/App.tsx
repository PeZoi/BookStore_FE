/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./App.css";
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footer";
import HomePage from "./layouts/pages/HomePage";

function App() {
	return (
		<div>
			<Navbar />
			<HomePage />
			<Footer />
		</div>
	);
}

export default App;
