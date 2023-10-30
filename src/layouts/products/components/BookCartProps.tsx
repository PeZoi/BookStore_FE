import { Tooltip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import TextEllipsis from "./text-ellipsis/TextEllipsis";
import SelectQuantity from "./select-quantity/SelectQuantity";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

interface BookCartProps {}

const BookCartProps: React.FC<BookCartProps> = (props) => {
	return (
		<>
			<div className='col'>
				<Link to={"/"}>
					<div className='d-flex'>
						<img
							src={
								"https://cdn0.fahasa.com/media/catalog/product/d/a/dat-rung-phuong-nam_ban-dien-anh_bia.jpg"
							}
							className='card-img-top'
							alt={"Đất rừng phương nam"}
							style={{ width: "100px" }}
						/>
						<div className='d-flex flex-column pb-2'>
							<Tooltip title={"Đất rừng phương nam"} arrow>
								<span className='d-inline'>
									<TextEllipsis
										text={"Đất rừng phương nam "}
										limit={38}
									/>
								</span>
							</Tooltip>
							<div className='mt-auto'>
								<span className='discounted-price text-danger'>
									<strong style={{ fontSize: "22px" }}>
										{"18,000".toLocaleString()}đ
									</strong>
								</span>
								<span
									className='original-price ms-3 small'
									style={{ color: "#000" }}
								>
									<del>{"20,000".toLocaleString()}đ</del>
								</span>
							</div>
						</div>
					</div>
				</Link>
			</div>
			<div className='col-3 text-center my-auto d-flex align-items-center justify-content-center'>
				<SelectQuantity max={99} />
			</div>
			<div className='col-2 text-center my-auto'>
				<span className='text-danger'>
					<strong>{"200,000".toLocaleString()}đ</strong>
				</span>
			</div>
			<div className='col-2 text-center my-auto'>
				<Tooltip title={"Xoá sản phẩm"} arrow>
					<DeleteOutlineOutlinedIcon sx={{ cursor: "pointer" }} />
				</Tooltip>
			</div>
		</>
	);
};

export default BookCartProps;
