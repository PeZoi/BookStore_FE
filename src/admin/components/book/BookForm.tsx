import React, { FormEvent, useState } from "react";
import BookModel from "../../../model/BookModel";
import { isTokenExpired } from "../../../layouts/utils/JwtService";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { toast } from "react-toastify";

interface BookFormProps {
	option: string;
	setKeyCountReload?: any;
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
	});
	const [thumbnail, setThumbnail] = useState<File | null>(null);
	const [previewThumbnail, setPreviewThumbnail] = useState("");

	function hanleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const token = localStorage.getItem("token");

		// console.log(book);

		fetch("http://localhost:8080/book/add-book", {
			method: "POST",
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
					});
					setThumbnail(null);
					setPreviewThumbnail("");
					toast.success("Thêm sách thành công!");
					props.setKeyCountReload(Math.random());
				} else {
					toast.error("Gặp lỗi trong quá trình xử lý sách");
				}
			})
			.catch((error) => console.log(error));
	}

	function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
		const inputElement = event.target as HTMLInputElement;

		if (inputElement.files && inputElement.files.length > 0) {
			const selectedFile = inputElement.files[0];

			const reader = new FileReader();

			// Xử lý sự kiện khi tệp đã được đọc thành công
			reader.onload = (e) => {
				// e.target.result chính là chuỗi base64
				const thumnailBase64 = e.target?.result as string;

				setBook({ ...book, thumbnail: thumnailBase64 });

				setThumbnail(selectedFile);
				setPreviewThumbnail(URL.createObjectURL(selectedFile));
			};

			// Đọc tệp dưới dạng chuỗi base64
			reader.readAsDataURL(selectedFile);
		}
	}

	return (
		<div>
			<Typography className='text-center' variant='h4' component='h2'>
				{props.option === "add"
					? "TẠO SÁCH"
					: props.option === "update"
					? "SỬA SÁCH"
					: "XEM CHI TIẾT"}
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
									// required
									type='file'
									accept='image/*'
									onChange={handleImageUpload}
									alt=''
								/>
							</Button>
							<span className='ms-3'>{thumbnail?.name}</span>
							<img src={previewThumbnail} alt='' width={100} />
						</div>
					</div>
					{props.option !== "view" && (
						<button className='btn btn-primary w-100 my-3' type='submit'>
							{props.option === "add" ? "Tạo sách" : "Lưu sách"}
						</button>
					)}
				</form>
			</div>
		</div>
	);
};
