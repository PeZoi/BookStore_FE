import React, { useEffect, useState } from "react";
import BookProps from "./components/BookProps";
import BookModel from "../../model/BookModel";
import { getAllBook } from "../../api/BookApi";
import "../products/Book.css";

const BookList: React.FC = () => {
	const [bookList, setBookList] = useState<BookModel[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [erroring, setErroring] = useState(null);

	useEffect(() => {
		getAllBook()
			.then((response) => {
				setBookList(response);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				setErroring(error.message);
			});
	}, []);

	if (loading) {
		return (
			<div>
				<h1>Đang tải dữ liệu</h1>
			</div>
		);
	}

	if (erroring) {
		return (
			<div>
				<h1>Gặp lỗi: {erroring}</h1>
			</div>
		);
	}

	return (
		<div className='container-book container mb-5 pb-5 px-5 bg-light'>
			<h2 className='mt-4 px-3 py-3 mb-0'>TẤT CẢ</h2>
			<hr className='mt-0' />
			<div className='row'>
				{bookList.map((book) => (
					<BookProps key={book.idBook} book={book} />
				))}
			</div>
		</div>
	);
};

export default BookList;