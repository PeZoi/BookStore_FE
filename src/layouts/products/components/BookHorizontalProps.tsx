import React, { useEffect, useState } from "react";
import BookModel from "../../../model/BookModel";
import Tooltip from "@mui/material/Tooltip";
import TextEllipsis from "./text-ellipsis/TextEllipsis";
import CartItemModel from "../../../model/CartItemModel";
import ImageModel from "../../../model/ImageModel";
import { getAllImageByBook } from "../../../api/ImageApi";

interface BookHorizontalProps {
	cartItem: CartItemModel;
}

export const BookHorizontal: React.FC<BookHorizontalProps> = (props) => {
	const [imageList, setImageList] = useState<ImageModel[]>([]);
	// Lấy ảnh ra từ BE
	useEffect(() => {
		getAllImageByBook(props.cartItem.book.idBook)
			.then((response) => {
				setImageList(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [props.cartItem.book.idBook]);
	// Loading ảnh thumbnail
	let dataImage;
	if (imageList[0] && imageList[0].dataImage) {
		// Từ đầu hình ảnh sẽ mặc định thumbnail là ảnh đầu tiên
		dataImage = imageList[0].dataImage;
		// Duyệt qua tất cả các ảnh của sách đó nếu mà có ảnh nào có thumnail là true thì gán lại nó là thumnail
		for (let img of imageList) {
			if (img.thumbnail === true) {
				dataImage = img.dataImage;
				break;
			}
		}
	}
	return (
		<div className='row'>
			<div className='col'>
				<div className='d-flex'>
					<img
						src={dataImage}
						className='card-img-top'
						alt={props.cartItem.book.nameBook}
						style={{ width: "100px" }}
					/>
					<div className='d-flex flex-column pb-2'>
						<Tooltip title={props.cartItem.book.nameBook} arrow>
							<span className='d-inline'>
								<TextEllipsis
									text={props.cartItem.book.nameBook + " "}
									limit={100}
								/>
							</span>
						</Tooltip>
						<div className='mt-auto'>
							<span className='discounted-price text-danger'>
								<strong style={{ fontSize: "22px" }}>
									{props.cartItem.book.sellPrice.toLocaleString()}đ
								</strong>
							</span>
							<span
								className='original-price ms-3 small'
								style={{ color: "#000" }}
							>
								<del>
									{props.cartItem.book.listPrice.toLocaleString()}đ
								</del>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className='col-2 text-center'>
				<strong>{props.cartItem.quantity}</strong>
			</div>
			<div className='col-2 text-center'>
				<span className='text-danger'>
					<strong>
						{(
							props.cartItem.quantity * props.cartItem.book.sellPrice
						).toLocaleString()}
						đ
					</strong>
				</span>
			</div>
			<hr className='mt-3' />
		</div>
	);
};
