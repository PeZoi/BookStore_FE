/* eslint-disable jsx-a11y/anchor-is-valid */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footer";
import HomePage from "./layouts/pages/HomePage";
import About from "./layouts/about/About";
import BookDetail from "./layouts/products/BookDetail";
import FilterPage from "./layouts/pages/FilterPage";
import MyFavoriteBooksPage from "./layouts/pages/MyFavoriteBooksPage";
import CartPage from "./layouts/pages/CartPage";
import RegisterPage from "./layouts/user/RegisterPage";
import LoginPage from "./layouts/user/LoginPage";
import ProfilePage from "./layouts/user/ProfilePage";
import ActiveAccount from "./layouts/user/ActiveAccount";

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
				<Route
					path='/my-favorite-books'
					element={<MyFavoriteBooksPage />}
				/>
				<Route path='/cart' element={<CartPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/profile' element={<ProfilePage />} />
				<Route
					path='/active/:email/:activationCode'
					element={<ActiveAccount />}
				/>
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
