import React, { useEffect, useState } from "react";
import BookModel from "../../model/BookModel";
import { getNewBook } from "../../api/BookApi";
import BookProps from "./components/BookProps";

interface NewBookListProps {
	setTotalCart: any;
	totalCart: number;
}

const NewBookList: React.FC<NewBookListProps> = (props) => {
	const [bookList, setBookList] = useState<BookModel[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [erroring, setErroring] = useState(null);

	useEffect(() => {
		getNewBook()
			.then((response) => {
				setBookList(response.bookList);
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
			<h2 className='mt-4 px-3 py-3 mb-0'>SÁCH MỚI</h2>
			<hr className='mt-0' />
			<div className='row'>
				{bookList.map((book) => (
					<BookProps
						key={book.idBook}
						book={book}
						setTotalCart={props.setTotalCart}
					/>
				))}
			</div>
		</div>
	);
};

export default NewBookList;
