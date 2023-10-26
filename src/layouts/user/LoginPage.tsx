import { Button, TextField } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
	// Biến cần thiết
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");

	// Biến thông báo lỗi
	function handleSubmit(event: FormEvent<HTMLFormElement>): void {
		throw new Error("Function not implemented.");
	}

	return (
		<div
			className='container my-5 py-4 rounded-5 shadow-5 bg-light'
			style={{ width: "450px" }}
		>
			<h1 className='text-center'>ĐĂNG NHẬP</h1>
			<form
				onSubmit={handleSubmit}
				className='form'
				style={{ padding: "0 20px" }}
			>
				<TextField
					fullWidth
					required={true}
					id='outlined-required'
					label='Tên đăng nhập'
					placeholder='Nhập tên đăng nhập'
					value={username}
					onChange={(e) => setUserName(e.target.value)}
					className='input-field'
				/>
				<TextField
					fullWidth
					required={true}
					type='password'
					id='outlined-required'
					label='Mật khẩu'
					placeholder='Nhập mật khẩu'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className='input-field'
				/>
				<div className='d-flex justify-content-end mt-2 px-3'>
					<span>
						Bạn chưa có tài khoản? <Link to={"/register"}>Đăng ký</Link>
					</span>
				</div>
				<div className='text-center my-3'>
					<Button
						fullWidth
						variant='outlined'
						type='submit'
						sx={{ padding: "10px" }}
					>
						Đăng nhập
					</Button>
				</div>
			</form>
		</div>
	);
};

export default LoginPage;
