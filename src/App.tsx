/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footer";
import HomePage from "./layouts/pages/HomePage";
import About from "./layouts/about/About";
import BookDetail from "./layouts/products/BookDetail";

function App() {
	const [keySearch, setKeySearch] = useState("");

	return (
		<BrowserRouter>
			<Navbar setKeySearch={setKeySearch} />
			<Routes>
				<Route path='/' element={<HomePage keySearch={keySearch} />} />
				<Route
					path='/genre/:idGenre'
					element={<HomePage keySearch={keySearch} />}
				/>
				<Route path='/book/:idBook' element={<BookDetail />} />
				<Route path='/about' element={<About />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
