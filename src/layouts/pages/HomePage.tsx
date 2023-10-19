import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import BookList from "../products/BookList";
import HotBookList from "../products/HotBookList";
import NewBookList from "../products/NewBookList";

function HomePage() {
	return (
		<>
			{/* Banner */}
			<Banner />
			{/* Underline */}
			<div className='d-flex justify-content-center align-items-center pb-4'>
				<hr className='w-100 mx-5' />
			</div>
			{/* Slide img */}
			<div className='container'>
				<Carousel />
			</div>
			{/* Hot Product */}
			<HotBookList />
			{/* New Product */}
			<NewBookList />
			{/* Product List */}
			<BookList size={8} />
		</>
	);
}

export default HomePage;
