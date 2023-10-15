/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import BookProps from "./components/BookProps";
import BookModel from "../../model/BookModel";
import { getAllBook, searchBook } from "../../api/BookApi";
import "../products/Book.css";
import Pagination from "../utils/Pagination";

interface BookListProps {
	keySearch: string;
	idGenre: number;
}

const BookList: React.FC<BookListProps> = (props) => {
	let size: number = 12;
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
		// Nếu có key search
		if (props.keySearch === "" && props.idGenre === 0) {
			// currentPage - 1 vì trong endpoint trang đầu tiên sẽ là 0
			getAllBook(size, currentPage - 1) // size là (tổng sản phẩm được hiện)
				.then((response) => {
					setBookList(response.bookList);
					setTotalPages(response.totalPage);
					setLoading(false);
				})
				.catch((error) => {
					setLoading(false);
					setErroring(error.message);
				});
		} else {
			searchBook(props.keySearch, props.idGenre, size, currentPage - 1)
				.then((response) => {
					setBookList(response.bookList);
					setTotalPages(response.totalPage);
					setLoading(false);
				})
				.catch((error) => {
					setLoading(false);
					setErroring(error.message);
				});
		}
	}, [currentPage, props.keySearch, props.idGenre]);

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

	// Kiểm tra danh sách sách xem có phần tử nào không
	if (bookList.length === 0) {
		return (
			<div className='container-book container mb-5 px-5 bg-light'>
				<h2 className='mt-4 px-3 py-3 mb-0'>
					Không tìm thấy sách! "{props.keySearch}"
				</h2>
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
