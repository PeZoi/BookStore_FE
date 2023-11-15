import React, { FormEvent, useState } from "react";
import BookModel from "../../../model/BookModel";
import { isTokenExpired } from "../../../layouts/utils/JwtService";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import GenreModel from "../../../model/GenreModel";
import OrderModel from "../../../model/OrderModel";
import { endpointBE } from "../../../layouts/utils/Constant";

interface OrderFormProps {
	option: string;
	setKeyCountReload?: any;
}

export const OrderForm: React.FC<OrderFormProps> = (props) => {
	const [order, setOrder] = useState<OrderModel>({
		idOrder: 0,
		deliveryAddress: "",
		totalPrice: 0,
		totalPriceProduct: 0,
		feeDelivery: 0,
		feePayment: 0,
		dateCreated: new Date(),
		status: "",
	});

	function hanleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const token = localStorage.getItem("token");

		if (!token) {
			alert("Bạn chưa đăng nhập!");
			return;
		}
		if (!isTokenExpired(token)) {
			alert("Token đã hết hạn. Vui lòng đăng nhập lại!");
			return;
		}

		fetch(endpointBE + "/", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(order),
		})
			.then((response) => {
				if (response.ok) {
					props.setKeyCountReload(Math.random());
				} else {
					alert("Gặp lỗi trong quá trình cập nhật hoá đơn");
				}
			})
			.catch((error) => console.log(error));
	}
	return (
		<div>
			<Typography className='text-center' variant='h4' component='h2'>
				{props.option === "update" ? "CẬP NHẬT ĐƠN HÀNG" : "XEM CHI TIẾT"}
			</Typography>
			<hr />
			<div className='container px-5'>
				<form onSubmit={hanleSubmit} className='form'>
					<input type='hidden' value={order.idOrder} hidden />
					<Box
						sx={{
							"& .MuiTextField-root": { mb: 3 },
						}}
					>
						<TextField
							required
							id='filled-required'
							label='Ngày tạo'
							style={{ width: "100%" }}
							value={order.dateCreated.toISOString().substring(0, 10)}
							type='date'
							onChange={(e) =>
								setOrder({
									...order,
									dateCreated: new Date(e.target.value),
								})
							}
							size='small'
						/>

						<TextField
							required
							id='filled-required'
							label='Địa chỉ giao hàng'
							style={{ width: "100%" }}
							value={order.deliveryAddress}
							onChange={(e) =>
								setOrder({
									...order,
									deliveryAddress: e.target.value,
								})
							}
							size='small'
						/>
					</Box>
					{props.option !== "view" && (
						<button className='btn btn-primary w-100 my-3' type='submit'>
							Lưu đơn hàng
						</button>
					)}
				</form>
			</div>
		</div>
	);
};
