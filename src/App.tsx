/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footer";
import HomePage from "./layouts/pages/HomePage";
import About from "./layouts/about/About";
import BookDetail from "./layouts/products/BookDetail";
import FilterPage from "./layouts/pages/FilterPage";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/book/:idBook' element={<BookDetail />} />
				<Route path='/about' element={<About />} />
				<Route path='/search/:idGenreParam' element={<FilterPage />} />
				<Route path='/search' element={<FilterPage />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
