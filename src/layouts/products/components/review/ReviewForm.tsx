import { Button, TextField, Typography } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { endpointBE } from "../../../utils/Constant";
import { toast } from "react-toastify";
import { getIdUserByToken } from "../../../utils/JwtService";
import CartItemModel from "../../../../model/CartItemModel";

interface ReviewFormProps {
	idOrder: number;
	idBook: number;
	handleCloseModal: any;
	handleCloseModalOrderDetail: any;
	cartItem: CartItemModel;
	setCartItem: any;
}

export const ReviewForm: React.FC<ReviewFormProps> = (props) => {
	const [ratingValue, setRatingValue] = useState(0);
	const [errorRating, setErrorRating] = useState("");
	const [content, setContent] = useState("");

	const handleRating = (rate: number) => {
		setErrorRating("");
		setRatingValue(rate);
	};
	function handleSubmitReview(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		event.stopPropagation();
		if (ratingValue === 0) {
			setErrorRating("Bạn cần phải đánh giá sao cho chúng tôi!");
			return;
		}

		const token = localStorage.getItem("token");
		fetch(endpointBE + "/review/", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				idUser: getIdUserByToken(),
				idOrder: props.idOrder,
				idBook: props.idBook,
				ratingValue,
				content,
			}),
		})
			.then((response) => {
				toast.success("Đánh giá sản phẩm thành công");
				props.handleCloseModal();
				props.handleCloseModalOrderDetail();
				props.setCartItem({ ...props.cartItem, review: true });
			})
			.catch((error) => {
				toast.error("Gặp lỗi trong quá trình đánh giá");
				props.handleCloseModal();
			});
	}

	return (
		<div className='container'>
			<form onSubmit={handleSubmitReview}>
				<Typography className='text-center' variant='h4' component='h2'>
					ĐÁNH GIÁ SẢN PHẨM
				</Typography>
				<div className='d-flex align-items-center'>
					<strong className='me-3'>VOTE: </strong>
					<Rating
						size={25}
						transition={true}
						allowFraction={true}
						initialValue={ratingValue}
						onClick={(e) => handleRating(e)}
					/>
				</div>
				<p className='text-danger'>{errorRating}</p>
				<TextField
					className='w-100 my-3'
					id='standard-basic'
					label='Đánh giá sản phẩm'
					variant='outlined'
					required
					multiline
					minRows={3}
					maxRows={4}
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<div className='d-flex flex-row-reverse'>
					<Button type='submit' variant='contained'>
						Gửi đánh giá
					</Button>
				</div>
			</form>
		</div>
	);
};
