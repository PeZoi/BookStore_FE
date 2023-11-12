import React, { FormEvent, useEffect, useState } from "react";
import BookModel from "../../../model/BookModel";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { toast } from "react-toastify";
import GenreModel from "../../../model/GenreModel";
import { getAllGenres } from "../../../api/GenreApi";
import { SelectMultiple } from "../../../layouts/utils/SelectMultiple";
import { LoadingButton } from "@mui/lab";
import { getBookByIdTest } from "../../../api/BookApi";

interface BookFormProps {
	id: number;
	option: string;
	setKeyCountReload?: any;
	handleCloseModal: any;
}

export const BookForm: React.FC<BookFormProps> = (props) => {
	const [book, setBook] = useState<BookModel>({
		idBook: 0,
		nameBook: "",
		author: "",
		description: "",
		listPrice: NaN,
		sellPrice: NaN,
		quantity: NaN,
		avgRating: NaN,
		soldQuantity: NaN,
		discountPercent: NaN,
		thumbnail: "",
		relatedImg: [],
		idGenres: [],
	});
	const [genresList, setGenresList] = useState<GenreModel[]>([]);
	const [genresListSelected, setGenresListSelected] = useState<number[]>([]);
	const [previewThumbnail, setPreviewThumbnail] = useState("");
	const [previewRelatedImages, setPreviewRelatedImages] = useState<string[]>(
		[]
	);
	// Giá trị khi đã chọn ở trong select multiple
	const [SelectedListName, setSelectedListName] = useState<any[]>([]);
	// Khi submit thì btn loading ...
	const [statusBtn, setStatusBtn] = useState(false);
	// Biến reload (cho selectMultiple)
	const [reloadCount, setReloadCount] = useState(0);

	// Lấy dữ liệu khi update
	useEffect(() => {
		if (props.option === "update") {
			getBookByIdTest(props.id).then((response) => {
				setBook(response as BookModel);
				setPreviewThumbnail(response?.thumbnail as string);
				setPreviewRelatedImages(response?.relatedImg as string[]);
				response?.genresList?.forEach((data) => {
					setSelectedListName((prev) => [...prev, data.nameGenre]);
					setBook((prevBook) => {
						return {
							...prevBook,
							idGenres: [...(prevBook.idGenres || []), data.idGenre],
						};
					});
				});
			});
		}
	}, [props.option, props.id]);

	// Khúc này lấy ra tất cả thể loại để cho vào select
	useEffect(() => {
		getAllGenres().then((response) => {
			setGenresList(response.genreList);
		});
	}, [props.option]);

	// Khúc này để lưu danh sách thể loại của sách
	useEffect(() => {
		setBook({ ...book, idGenres: genresListSelected });
	}, [genresListSelected]);

	async function hanleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const token = localStorage.getItem("token");

		// console.log(book);

		setStatusBtn(true);

		const endpoint =
			props.option === "add"
				? "http://localhost:8080/book/add-book"
				: "http://localhost:8080/book/update-book";
		const method = props.option === "add" ? "POST" : "PUT";
		toast.promise(
			fetch(endpoint, {
				method: method,
				headers: {
					Authorization: `Bearer ${token}`,
					"content-type": "application/json",
				},
				body: JSON.stringify(book),
			})
				.then((response) => {
					if (response.ok) {
						setBook({
							idBook: 0,
							nameBook: "",
							author: "",
							description: "",
							listPrice: NaN,
							sellPrice: NaN,
							quantity: NaN,
							avgRating: NaN,
							soldQuantity: NaN,
							discountPercent: NaN,
							thumbnail: "",
							relatedImg: [],
							idGenres: [],
						});
						setPreviewThumbnail("");
						setPreviewRelatedImages([]);
						setReloadCount(Math.random());
						setStatusBtn(false);
						props.setKeyCountReload(Math.random());
						props.handleCloseModal();
						props.option === "add"
							? toast.success("Thêm sách thành công")
							: toast.success("Cập nhật sách thành công");
					} else {
						toast.error("Gặp lỗi trong quá trình xử lý sách");
						setStatusBtn(false);
					}
				})
				.catch((error) => {
					console.log(error);
					setStatusBtn(false);
					toast.error("Gặp lỗi trong quá trình xử lý sách");
				}),
			{
				pending: "Đang trong quá trình xử lý ...",
			}
		);
	}

	function handleThumnailImageUpload(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		const inputElement = event.target as HTMLInputElement;

		if (inputElement.files && inputElement.files.length > 0) {
			const selectedFile = inputElement.files[0];

			const reader = new FileReader();

			// Xử lý sự kiện khi tệp đã được đọc thành công
			reader.onload = (e) => {
				// e.target.result chính là chuỗi base64
				const thumnailBase64 = e.target?.result as string;

				setBook({ ...book, thumbnail: thumnailBase64 });

				setPreviewThumbnail(URL.createObjectURL(selectedFile));
			};

			// Đọc tệp dưới dạng chuỗi base64
			reader.readAsDataURL(selectedFile);
		}
	}

	function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
		const inputElement = event.target as HTMLInputElement;

		if (inputElement.files && inputElement.files.length > 0) {
			const newPreviewImages = [...previewRelatedImages];

			if (newPreviewImages.length + inputElement.files.length > 5) {
				toast.warning("Chỉ được tải lên tối đa 5 ảnh");
				return;
			}

			// Duyệt qua từng file đã chọn
			for (let i = 0; i < inputElement.files.length; i++) {
				const selectedFile = inputElement.files[i];

				const reader = new FileReader();

				// Xử lý sự kiện khi tệp đã được đọc thành công
				reader.onload = (e) => {
					// e.target.result chính là chuỗi base64
					const thumbnailBase64 = e.target?.result as string;

					setBook((prevBook) => ({
						...prevBook,
						relatedImg: [...(prevBook.relatedImg || []), thumbnailBase64],
					}));

					newPreviewImages.push(URL.createObjectURL(selectedFile));

					// Cập nhật trạng thái với mảng mới
					setPreviewRelatedImages(newPreviewImages);
				};

				// Đọc tệp dưới dạng chuỗi base64
				reader.readAsDataURL(selectedFile);
			}
		}
	}

	return (
		<div>
			<Typography className='text-center' variant='h4' component='h2'>
				{props.option === "add" ? "TẠO SÁCH" : "SỬA SÁCH"}
			</Typography>
			<hr />
			<div className='container px-5'>
				<form
					onSubmit={hanleSubmit}
					className='form'
					encType='multipart/form-data'
				>
					<input type='hidden' id='idBook' value={book?.idBook} hidden />
					<div className='row'>
						<div className='col-6'>
							<Box
								sx={{
									"& .MuiTextField-root": { mb: 3 },
								}}
							>
								<TextField
									required
									id='filled-required'
									label='Tên sách'
									style={{ width: "100%" }}
									value={book.nameBook}
									onChange={(e) =>
										setBook({ ...book, nameBook: e.target.value })
									}
									size='small'
								/>

								<TextField
									required
									id='filled-required'
									label='Tên tác giả'
									style={{ width: "100%" }}
									value={book.author}
									onChange={(e) =>
										setBook({ ...book, author: e.target.value })
									}
									size='small'
								/>

								<TextField
									required
									id='filled-required'
									label='Giá niêm yết'
									style={{ width: "100%" }}
									type='number'
									value={
										Number.isNaN(book.listPrice) ? "" : book.listPrice
									}
									onChange={(e) =>
										setBook({
											...book,
											listPrice: parseInt(e.target.value),
										})
									}
									size='small'
								/>
							</Box>
						</div>
						<div className='col-6'>
							<Box
								sx={{
									"& .MuiTextField-root": { mb: 3 },
								}}
							>
								<TextField
									required
									id='filled-required'
									label='Số lượng'
									style={{ width: "100%" }}
									type='number'
									value={
										Number.isNaN(book.quantity) ? "" : book.quantity
									}
									onChange={(e) =>
										setBook({
											...book,
											quantity: parseInt(e.target.value),
										})
									}
									size='small'
								/>
								<SelectMultiple
									selectedList={genresListSelected}
									setSelectedList={setGenresListSelected}
									selectedListName={SelectedListName}
									setSelectedListName={setSelectedListName}
									values={genresList}
									setValue={setBook}
									key={reloadCount}
									required={true}
								/>

								<TextField
									id='filled-required'
									label='Giảm giá (%)'
									style={{ width: "100%" }}
									type='number'
									value={
										Number.isNaN(book.discountPercent)
											? ""
											: book.discountPercent
									}
									onChange={(e) =>
										setBook({
											...book,
											discountPercent: parseInt(e.target.value),
										})
									}
									size='small'
								/>
							</Box>
						</div>
						<div className='col-12'>
							<Box>
								<TextField
									id='outlined-multiline-flexible'
									label='Mô tả sách'
									style={{ width: "100%" }}
									multiline
									maxRows={5}
									value={book.description}
									onChange={(e) =>
										setBook({ ...book, description: e.target.value })
									}
									required
								/>
							</Box>
						</div>
						<div className='d-flex align-items-center mt-3'>
							<Button
								size='small'
								component='label'
								variant='outlined'
								startIcon={<CloudUpload />}
							>
								Tải ảnh thumbnail
								<input
									style={{ opacity: "0", width: "10px" }}
									required={props.option === "update" ? false : true}
									type='file'
									accept='image/*'
									onChange={handleThumnailImageUpload}
									alt=''
								/>
							</Button>
							<img src={previewThumbnail} alt='' width={100} />
						</div>
						<div className='d-flex align-items-center mt-3'>
							<Button
								size='small'
								component='label'
								variant='outlined'
								startIcon={<CloudUpload />}
							>
								Tải ảnh liên quan
								<input
									style={{ opacity: "0", width: "10px" }}
									// required
									type='file'
									accept='image/*'
									onChange={handleImageUpload}
									multiple
									alt=''
								/>
							</Button>
							{previewRelatedImages.map((imgURL) => (
								<img src={imgURL} alt='' width={100} />
							))}
							{previewRelatedImages.length > 0 && (
								<Button
									onClick={() => {
										setPreviewRelatedImages([]);
										setBook({ ...book, relatedImg: [] });
									}}
								>
									Xoá tất cả
								</Button>
							)}
						</div>
					</div>
					{props.option !== "view" && (
						<LoadingButton
							className='w-100 my-3'
							type='submit'
							loading={statusBtn}
							variant='outlined'
							sx={{ width: "25%", padding: "10px" }}
						>
							{props.option === "add" ? "Tạo sách" : "Lưu sách"}
						</LoadingButton>
					)}
				</form>
			</div>
		</div>
	);
};
