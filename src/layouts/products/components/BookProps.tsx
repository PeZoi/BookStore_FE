/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import BookModel from "../../../model/BookModel";
import ImageModel from "../../../model/ImageModel";
import { getAllImageByBook } from "../../../api/ImageApi";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import TextEllipsis from "./text-ellipsis/TextEllipsis";
import CartItemModel from "../../../model/CartItemModel";
import Toast from "../../utils/Toast";

interface BookProps {
	book: BookModel;
	setTotalCart: any;
}

const BookProps: React.FC<BookProps> = ({ book, setTotalCart }) => {
	const [imageList, setImageList] = useState<ImageModel[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [erroring, setErroring] = useState(null);

	// Khai báo biến thông báo
	const [statusToast, setstatusToast] = useState(false); // tắt/mở toast

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

	// Loading ảnh thumbnail
	let dataImage;
	if (imageList[0] && imageList[0].dataImage) {
		// Từ đầu hình ảnh sẽ mặc định thumbnail là ảnh đầu tiên
		dataImage = imageList[0].dataImage;
		// Duyệt qua tất cả các ảnh của sách đó nếu mà có ảnh nào có thumnail là true thì gán lại nó là thumnail
		for (let img of imageList) {
			if (img.isThumbnail === true) {
				dataImage = img.dataImage;
				break;
			}
		}
	}

	// Xử lý thêm sản phẩm vào giỏ hàng
	const handleAddProduct = (newBook: BookModel) => {
		const cartData: string | null = localStorage.getItem("cart");
		const cart: CartItemModel[] = cartData ? JSON.parse(cartData) : [];
		// cái isExistBook này sẽ tham chiếu đến cái cart ở trên, nên khi update thì cart nó cũng update theo
		let isExistBook = cart.find(
			(cartItem) => cartItem.book.idBook === newBook.idBook
		);
		// Thêm 1 sản phẩm vào giỏ hàng
		if (isExistBook) {
			// nếu có rồi thì sẽ tăng số lượng
			isExistBook.quantity += 1;
		} else {
			cart.push({
				quantity: 1,
				book: newBook,
			});
		}
		// Lưu vào localStorage
		localStorage.setItem("cart", JSON.stringify(cart));
		// Thông báo toast
		setstatusToast(true);
		setTotalCart(cart.length);
	};

	return (
		<div className='col-md-6 col-lg-3 mt-3'>
			<div className='card position-relative'>
				<h4
					className='my-0 d-inline-block position-absolute end-0'
					style={{ top: "15px" }}
				>
					<span className='badge bg-primary'>{book.discountPercent}%</span>
				</h4>
				<Link to={`/book/${book.idBook}`}>
					<img
						src={dataImage}
						className='card-img-top mt-3'
						alt={book.nameBook}
						style={{ height: "300px" }}
					/>
				</Link>
				<div className='card-body'>
					<Link
						to={`/book/${book.idBook}`}
						style={{ textDecoration: "none" }}
					>
						<h5 className='card-title'>
							<Tooltip title={book.nameBook} arrow>
								<span>
									<TextEllipsis text={book.nameBook + ""} limit={20} />
								</span>
							</Tooltip>
						</h5>
					</Link>
					<div className='price mb-3'>
						<span className='discounted-price text-danger'>
							<strong style={{ fontSize: "22px" }}>
								{book.sellPrice?.toLocaleString()}đ
							</strong>
						</span>
						<span className='original-price ms-3 small fw-bolder'>
							<del>{book.listPrice?.toLocaleString()}đ</del>
						</span>
						<span
							className='ms-4'
							style={{ fontSize: "13px", color: "#aaa" }}
						>
							Đã bán {book.soldQuantity}
						</span>
					</div>
					<div className='row mt-2' role='group'>
						<div className='col-6'>
							<a href='#' className='btn btn-secondary btn-block'>
								<i className='fas fa-heart'></i>
							</a>
						</div>
						<div className='col-6'>
							<button
								className='btn btn-primary btn-block'
								onClick={() => handleAddProduct(book)}
							>
								<i className='fas fa-shopping-cart'></i>
							</button>
							<Toast
								status={true}
								statusToast={statusToast}
								setstatusToast={setstatusToast}
								message={"Thêm thành công sản phẩm vào giỏ hàng"}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookProps;
