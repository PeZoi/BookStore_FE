import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const Error403Page: React.FC = () => {
	return (
		<div
			className='container text-center text-black'
			style={{ height: "85vh" }}
		>
			<p className='fw-bolder ' style={{ fontSize: "200px" }}>
				403!
			</p>
			<p className='fs-2'>Bạn không có quyền vào trang này</p>
			<Link to={"/"}>
				<Button variant='contained'>Về trang chủ</Button>
			</Link>
		</div>
	);
};
