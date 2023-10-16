import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import BookList from "../products/BookList";
import HotBookList from "../products/HotBookList";
import NewBookList from "../products/NewBookList";
import { useParams } from "react-router-dom";

interface HomePageProps {
	keySearch: string;
}

function HomePage({ keySearch }: HomePageProps) {
	// Lấy value từ ở trong url (http://localhost:8080?idGenre=1), thì sẽ lấy ra value là 1
	const { idGenre } = useParams();

	let idGenreNumber = 0;

	try {
		idGenreNumber = parseInt(idGenre + ""); // Có thể nó làm object nên phải + thêm chuỗi rỗng vào

		if (Number.isNaN(idGenreNumber)) {
			idGenreNumber = 0;
		}
	} catch (error) {
		console.error("Error: ", error);
	}

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
			<BookList keySearch={keySearch} idGenre={idGenreNumber} />
		</>
	);
}

export default HomePage;
