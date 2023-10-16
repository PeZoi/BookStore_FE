/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../../api/BookApi";
import BookModel from "../../model/BookModel";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Rating from "./components/Rating";
import SelectQuantity from "./components/SelectQuantity";
import Button from "@mui/material/Button";
import { ShoppingCartOutlined } from "@mui/icons-material";
import Comment from "./components/Comment";
import TextEllipsis from "./components/TextEllipsis";
import { getGenreByIdBook } from "../../api/GenreApi";
import GenreModel from "../../model/GenreModel";
import { getAllImageByBook } from "../../api/ImageApi";
import ImageModel from "../../model/ImageModel";

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
	}, [idBook]);

	// Lấy ra thể loại của sách
	const [genres, setGenres] = useState<GenreModel[] | null>(null);
	useEffect(() => {
		getGenreByIdBook(idBookNumber).then((response) => {
			setGenres(response.genreList);
		});
	}, [idBook]);

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
	}, [idBook]);

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
							<Rating />
							<p className='text-danger ms-2 mb-0'>(4.5)</p>
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
							<h3 className='my-0 d-inline-block'>
								<span className='badge bg-danger'>15%</span>
							</h3>
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
						</div>
						<div className='d-flex align-items-center mt-3'>
							<strong className='me-5'>Số lượng: </strong>
							<SelectQuantity />
						</div>
						<div className='mt-5'>
							<Button
								variant='outlined'
								size='large'
								startIcon={<ShoppingCartOutlined />}
								className='me-3'
								style={{ width: "30%" }}
							>
								Thêm vào giỏ hàng
							</Button>
							<Button
								variant='contained'
								size='large'
								className='ms-3'
								style={{ width: "30%" }}
							>
								Mua ngay
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className='container p-4 bg-white my-3 rounded'>
				<h5 className='my-3'>Mô tả sản phẩm</h5>
				<hr />
				<TextEllipsis text={book.description + ""} limit={1000} />
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
