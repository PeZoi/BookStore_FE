import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import BookList from "../products/BookList";
function HomePage() {
	return (
		<>
			{/* Banner */}
			<Banner />
			{/* Underline */}
			<div className='d-flex justify-content-center align-items-center pb-4'>
				<hr className='w-75' />
			</div>
			{/* Slide img */}
			<div className='container'>
				<Carousel />
			</div>
			{/* Product List */}
			<BookList />
		</>
	);
}

export default HomePage;
