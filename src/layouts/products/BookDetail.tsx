/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../../api/BookApi";
import BookModel from "../../model/BookModel";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SelectQuantity from "./components/select-quantity/SelectQuantity";
import Button from "@mui/material/Button";
import { ShoppingCartOutlined } from "@mui/icons-material";
import Comment from "./components/comment/Comment";
import TextEllipsis from "./components/text-ellipsis/TextEllipsis";
import { getGenreByIdBook } from "../../api/GenreApi";
import GenreModel from "../../model/GenreModel";
import { getAllImageByBook } from "../../api/ImageApi";
import ImageModel from "../../model/ImageModel";
import RatingStar from "./components/rating/Rating";
import React from "react";

const BookDetail: React.FC = () => {
	// Lấy mã sách từ url
	const { idBook } = useParams();
	let idBookNumber: number = 0;

	// Ép kiểu về number
	try {
		idBookNumber = parseInt(idBook + "");
		if (Number.isNaN(idBookNumber)) {
			idBookNumber = 0;
		}
	} catch (error) {
		console.error("Error: " + error);
	}

	// Khai báo biến
	const [book, setBook] = useState<BookModel | null>(null);
	const [loading, setLoading] = useState(true);
	const [erroring, setErroring] = useState(null);
	// Lấy sách ra
	useEffect(() => {
		getBookById(idBookNumber)
			.then((response) => {
				setBook(response);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				setErroring(error.message);
			});
	}, []);

	// Lấy ra thể loại của sách
	const [genres, setGenres] = useState<GenreModel[] | null>(null);
	useEffect(() => {
		getGenreByIdBook(idBookNumber).then((response) => {
			setGenres(response.genreList);
		});
	}, []);

	// Lấy ra hình ảnh của sách
	const [images, setImages] = useState<ImageModel[] | null>(null);
	useEffect(() => {
		getAllImageByBook(idBookNumber)
			.then((response) => {
				setImages(response);
			})
			.catch((error) => {
				console.error(error);
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

	if (book === null) {
		return (
			<div>
				<h1>Sách không tồn tại </h1>
			</div>
		);
	}

	return (
		<>
			<div className='container p-2 bg-white my-3 rounded'>
				<div className='row mt-4 mb-4'>
					<div className='col-4'>
						<Carousel
							emulateTouch={true}
							swipeable={true}
							showIndicators={false}
						>
							{images?.map((image, index) => (
								<div key={index}>
									<img
										alt=''
										src={
											image.dataImage
												? image.dataImage
												: image.urlImage
										}
									/>
								</div>
							))}
						</Carousel>
					</div>
					<div className='col-8 px-5'>
						<h2>{book.nameBook}</h2>
						<div className='d-flex align-items-center'>
							<p className='me-5'>
								Thể loại:{" "}
								<strong>
									{genres?.map((genre) => genre.nameGenre + " ")}
								</strong>
							</p>
							<p className='ms-5'>
								Tác giả: <strong>{book.author}</strong>
							</p>
						</div>
						<div className='d-flex align-items-center'>
							<div className='d-flex align-items-center'>
								<RatingStar
									readonly={true}
									ratingPoint={book.avgRating}
								/>

								<p className='text-danger ms-2 mb-0'>(4.5)</p>
							</div>
							<div className='d-flex align-items-center'>
								<span className='mx-3 mb-1 text-secondary'>|</span>
							</div>
							<div className='d-flex align-items-end justify-content-center '>
								<span
									style={{
										color: "rgb(135,135,135)",
										fontSize: "16px",
									}}
								>
									Đã bán
								</span>
								<span className='fw-bold ms-2'>
									{book.soldQuantity}
								</span>
							</div>
						</div>
						<div className='price'>
							<span className='discounted-price text-danger me-3'>
								<strong style={{ fontSize: "32px" }}>
									{book.sellPrice?.toLocaleString()}đ
								</strong>
							</span>
							<span className='original-price small me-3'>
								<strong>
									<del>{book.listPrice?.toLocaleString()}đ</del>
								</strong>
							</span>
							<h4 className='my-0 d-inline-block'>
								<span className='badge bg-danger'>
									{book.discountPercent}%
								</span>
							</h4>
						</div>
						<div className='mt-3'>
							<p>
								Vận chuyển tới: <strong>Quận Bình Thạnh, TP.HCM</strong>{" "}
								<span
									className='ms-3 text-primary'
									style={{ cursor: "pointer" }}
								>
									Thay đổi
								</span>
							</p>
							<div className='d-flex align-items-center mt-3'>
								<img
									src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/d9e992985b18d96aab90969636ebfd0e.png'
									height='20'
									alt='free ship'
								/>
								<span className='ms-3'>Miễn phí vận chuyển</span>
							</div>
						</div>
						<div className='d-flex align-items-center mt-3'>
							<strong className='me-5'>Số lượng: </strong>
							<SelectQuantity max={book.quantity} />
							<span className='ms-4'>
								{book.quantity} sản phẩm có sẵn
							</span>
						</div>
						<div className='mt-4 d-flex align-items-center'>
							<Button
								variant='outlined'
								size='large'
								startIcon={<ShoppingCartOutlined />}
								className='me-3'
							>
								Thêm vào giỏ hàng
							</Button>
							<Button variant='contained' size='large' className='ms-3'>
								Mua ngay
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className='container p-4 bg-white my-3 rounded'>
				<h5 className='my-3'>Mô tả sản phẩm</h5>
				<hr />
				<TextEllipsis
					isShow={true}
					text={book.description + ""}
					limit={1000}
				/>
			</div>
			<div className='container p-4 bg-white my-3 rounded'>
				<h5 className='my-3'>Khách hàng đánh giá</h5>
				<hr />
				<Comment idBook={idBookNumber} />
			</div>
		</>
	);
};

export default BookDetail;
