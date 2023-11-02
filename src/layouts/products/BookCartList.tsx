import React, { useState } from "react";
import BookCartProps from "./components/BookCartProps";
import { Button, TextField } from "@mui/material";
import CartItemModel from "../../model/CartItemModel";
import { Key } from "@mui/icons-material";

interface BookCartListProps {
	cartList: CartItemModel[];
	setCartList: any;
	setTotalCart: any;
}

const BookCartList: React.FC<BookCartListProps> = (props) => {
	// Xử lý xoá sách
	function handleRemoveBook(idBook: number) {
		const newCartList = props.cartList.filter(
			(cartItem) => cartItem.book.idBook !== idBook
		);
		localStorage.setItem("cart", JSON.stringify(newCartList));
		props.setTotalCart(newCartList.length);
	}

	return (
		<div style={{ overflow: "hidden" }}>
			{props.cartList.length !== 0 ? (
				""
			) : (
				<h1 className='text-center'>Giỏ hàng rỗng</h1>
			)}
			<div
				className='row my-4 pb-5 px-5'
				style={
					props.cartList.length === 0
						? { display: "none" }
						: { display: "flex" }
				}
			>
				{/* Bên trái */}
				<h2 className='mt-2 px-3 py-3 mb-0'>
					GIỎ HÀNG <span>(2 sản phẩm)</span>
				</h2>
				<div className='col-8 me-3'>
					<div className='container-book bg-light'>
						<div className='row px-4 py-3'>
							<div className='col'>Sản phẩm</div>
							<div className='col-3 text-center'>Số lượng</div>
							<div className='col-2 text-center'>Số tiền</div>
							<div className='col-2 text-center'>Thao tác</div>
						</div>
					</div>
					<div className='container-book bg-light mt-3 px-3'>
						<div className='row px-4 py-3'>
							{props.cartList.map((cartItem) => {
								return (
									<BookCartProps
										cartItem={cartItem}
										handleRemoveBook={handleRemoveBook}
										setTotalCart={props.setTotalCart}
										key={cartItem.book.idBook}
									/>
								);
							})}
						</div>
					</div>
				</div>

				{/* Bên phải */}
				<div
					className='container-book bg-light col px-5 pb-4'
					style={{ maxHeight: "500px" }}
				>
					<h4 className='text-center mt-3'>Hoá đơn</h4>
					<hr className='my-3' />
					<div>
						<div className='row'>
							<span className='col-7'>Tổng sản phẩm:</span>
							<strong className='col'>
								{"400,000".toLocaleString()} đ
							</strong>
						</div>
						<div className='row'>
							<span className='col-7'>Chi phí vận chuyển:</span>
							<strong className='col'>
								{"30,000".toLocaleString()} đ
							</strong>
						</div>
						<div className='row'>
							<span className='col-7'>Khuyến mãi:</span>
							<strong className='col'>
								{"-10,000".toLocaleString()} đ{" "}
								<span className='text-danger'>(5%)</span>
							</strong>
						</div>
					</div>
					<hr className='my-3' />
					<div className='row'>
						<span className='col-7'>Thành tiền (đã gồm VAT):</span>
						<strong className='col'>
							{"420,000".toLocaleString()} đ
						</strong>
					</div>
					<hr className='my-3' />
					<div className='d-flex align-items-end'>
						<TextField
							id='standard-basic'
							label='Mã khuyến mãi (nếu có): '
							variant='standard'
							value={""}
							sx={{ width: "70%" }}
						/>
						<Button
							variant='outlined'
							sx={{ marginLeft: "18px", width: "30%" }}
						>
							Áp dụng
						</Button>
					</div>
					<Button
						variant='contained'
						sx={{ width: "100%", marginTop: "30px" }}
					>
						Thanh toán
					</Button>
				</div>
			</div>
		</div>
	);
};

export default BookCartList;
