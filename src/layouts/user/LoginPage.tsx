import { Button, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { JwtPayload } from "../../admin/RequireAdmin";

const LoginPage: React.FC = () => {
	const navigation = useNavigate();
	// Biến cần thiết
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	// Biến thông báo lỗi
	function handleSubmit(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();

		const loginRequest = {
			username,
			password,
		};

		fetch("http://localhost:8080/user/authenticate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(loginRequest),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.then((data) => {
				const { jwtToken } = data;
				toast.success("Đăng nhâp thành công");
				localStorage.setItem("token", jwtToken);

				// Kiểm tra role để chuyển về link
				const decodedToken = jwtDecode(jwtToken) as JwtPayload;
				if (decodedToken.role === "ADMIN") {
					navigation("/admin/dashboard");
				} else {
					navigation("/");
				}
			})
			.catch((error) => {
				console.log("Lỗi đăng nhập: " + error);
				setError("Tài khoản hoặc mật khẩu không đúng");
				toast.error("Tài khoản hoặc mật khẩu không đúng");
			});
	}

	return (
		<div
			className='container my-5 py-4 rounded-5 shadow-5 bg-light'
			style={{ width: "450px" }}
		>
			<h1 className='text-center'>ĐĂNG NHẬP</h1>
			{error && <p className='text-danger text-center'>{error}</p>}
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
					onChange={(e: any) => setUserName(e.target.value)}
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
					onChange={(e: any) => setPassword(e.target.value)}
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
