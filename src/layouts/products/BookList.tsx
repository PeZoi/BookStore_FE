import React, { useEffect, useState } from "react";
import BookProps from "./components/BookProps";
import BookModel from "../../model/BookModel";
import { getAllBook } from "../../api/BookApi";
import "../products/Book.css";
import Pagination from "../utils/Pagination";

const BookList: React.FC = () => {
	const size = 1; // Tổng số sản phẩm được hiện lên 1 trang
	const [bookList, setBookList] = useState<BookModel[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [erroring, setErroring] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [totalBook, setTotalBook] = useState(0);

	// Xử lý phân trang
	const handlePagination = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		// currentPage - 1 vì trong endpoint trang đầu tiên sẽ là 0
		getAllBook(size, currentPage - 1) // 8 là size (tổng sản phẩm được hiện)
			.then((response) => {
				setBookList(response.bookList);
				setTotalPages(response.totalPage);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				setErroring(error.message);
			});
	}, [currentPage]);

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
			<hr />
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				handlePagination={handlePagination}
			/>
		</div>
	);
};

export default BookList;
