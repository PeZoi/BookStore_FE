/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import BookModel from "../../../model/BookModel";
import ImageModel from "../../../model/ImageModel";
import { getAllImageByBook } from "../../../api/ImageApi";

interface BookProps {
	book: BookModel;
}

const BookProps: React.FC<BookProps> = ({ book }) => {
	const [imageList, setImageList] = useState<ImageModel[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [erroring, setErroring] = useState(null);

	useEffect(() => {
		getAllImageByBook(book.idBook)
			.then((response) => {
				setImageList(response);
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

	let dataImage = "";
	if (imageList[0] && imageList[0].dataImage) {
		dataImage = imageList[0].dataImage;
	}

	return (
		<div className='col-md-3 mt-3'>
			<div className='card'>
				<img
					src={dataImage}
					className='card-img-top mt-3'
					alt={book.nameBook}
					style={{ height: "300px" }}
				/>
				<div className='card-body'>
					<h5 className='card-title'>{book.nameBook}</h5>
					<p className='card-text'>{book.description}</p>
					<div className='price'>
						<span className='original-price me-3 small'>
							<del>{book.listPrice}</del>
						</span>
						<span className='discounted-price text-danger'>
							<strong style={{ fontSize: "22px" }}>
								{book.sellPrice}
							</strong>
						</span>
					</div>
					<div className='row mt-2' role='group'>
						<div className='col-6'>
							<a href='#' className='btn btn-secondary btn-block'>
								<i className='fas fa-heart'></i>
							</a>
						</div>
						<div className='col-6'>
							<button className='btn btn-danger btn-block'>
								<i className='fas fa-shopping-cart'></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookProps;
