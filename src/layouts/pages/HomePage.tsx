import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import BookList from "../products/BookList";
import HotBookList from "../products/HotBookList";
import NewBookList from "../products/NewBookList";

interface HomePageProps {
	totalCart: any;
	setTotalCart: any;
}

const HomePage: React.FC<HomePageProps> = (props) => {
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
			<HotBookList
				setTotalCart={props.setTotalCart}
				totalCart={props.totalCart}
			/>
			{/* New Product */}
			<NewBookList
				setTotalCart={props.setTotalCart}
				totalCart={props.totalCart}
			/>
			{/* Product List */}
			<BookList
				setTotalCart={props.setTotalCart}
				totalCart={props.totalCart}
				size={8}
			/>
		</>
	);
};

export default HomePage;
