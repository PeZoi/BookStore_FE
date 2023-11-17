import { Card, CardContent, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import React, { useEffect, useState } from "react";
import { getAllUserRole } from "../../api/UserApi";
import { getAllOrders } from "../../api/OrderApi";

interface ParameterDigitalProps {
	totalPrice: number;
	numberOfAccount: number;
	numberOfOrder: number;
}

export const ParameterDigital: React.FC<ParameterDigitalProps> = ({
	totalPrice,
	numberOfAccount,
	numberOfOrder,
}: ParameterDigitalProps) => {
	return (
		<div className='conatiner p-4'>
			<div className='shadow-4 rounded p-5'>
				<div className='row'>
					<div className='col-lg-4 col-md-6 col-sm-12'>
						<Card sx={{ minWidth: 275, borderRadius: 4 }}>
							<CardContent>
								<Typography
									sx={{ fontSize: 14 }}
									color='text.secondary'
									gutterBottom
								>
									TỔNG TIỀN KIẾM ĐƯỢC
								</Typography>
								<div className='d-flex align-item-center justify-content-between'>
									<Typography
										sx={{
											fontSize: 32,
											fontWeight: "bolder",
											marginTop: "10px",
										}}
										gutterBottom
									>
										{totalPrice.toLocaleString("vi")} đ
									</Typography>

									<div className='d-flex align-item-center justify-content-center flex-column '>
										<span
											className='rounded-circle p-3'
											style={{
												color: "black",
												fontWeight: "bold",
											}}
										>
											<AttachMoneyIcon />
										</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div className='col-lg-4 col-md-6 col-sm-12'>
						<Card sx={{ minWidth: 275, borderRadius: 4 }}>
							<CardContent>
								<Typography
									sx={{ fontSize: 14 }}
									color='text.secondary'
									gutterBottom
								>
									TỔNG SỐ TÀI KHOẢN
								</Typography>
								<div className='d-flex align-item-center justify-content-between'>
									<Typography
										sx={{
											fontSize: 32,
											fontWeight: "bolder",
											marginTop: "10px",
										}}
										gutterBottom
									>
										{numberOfAccount.toLocaleString("vi")}
									</Typography>

									<div className='d-flex align-item-center justify-content-center flex-column '>
										<span
											className='rounded-circle p-3'
											style={{
												color: "black",
												fontWeight: "bold",
											}}
										>
											<PersonIcon />
										</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div className='col-lg-4 col-md-6 col-sm-12'>
						<Card sx={{ minWidth: 275, borderRadius: 4 }}>
							<CardContent>
								<Typography
									sx={{ fontSize: 14 }}
									color='text.secondary'
									gutterBottom
								>
									TỔNG HOÁ ĐƠN
								</Typography>
								<div className='d-flex align-item-center justify-content-between'>
									<Typography
										sx={{
											fontSize: 32,
											fontWeight: "bolder",
											marginTop: "10px",
										}}
										gutterBottom
									>
										{numberOfOrder.toLocaleString("vi")}
									</Typography>

									<div className='d-flex align-item-center justify-content-center flex-column '>
										<span
											className='rounded-circle p-3'
											style={{
												color: "black",
												fontWeight: "bold",
											}}
										>
											<LocalMallIcon />
										</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};
