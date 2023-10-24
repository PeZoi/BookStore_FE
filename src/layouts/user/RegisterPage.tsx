import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "./Form.css";
import { Link } from "react-router-dom";
import { Password, Phone } from "@mui/icons-material";

const RegisterPage: React.FC = () => {
	// Khai báo biến cần đăng ký
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	// Khai báo các biến lỗi
	const [errorUsername, setErrorUsername] = useState("");
	const [errorEmail, setErrorEmail] = useState("");
	const [errorPassword, setErrorPassword] = useState("");
	const [errorRepeatPassword, setErrorRepeatPassword] = useState("");
	const [errorPhoneNumber, setErrorPhoneNumber] = useState("");

	// Khai báo biến thông báo
	const [status, setStatus] = useState<boolean | null>(null);
	const [notification, setNotification] = useState("");

	// hàm submit form
	const handleSubmit = async (e: React.FormEvent) => {
		setErrorUsername("");
		setErrorEmail("");
		setErrorPassword("");
		setErrorRepeatPassword("");

		e.preventDefault();

		const isUsernameValid = !(await checkExistUsername(username));
		const isEmailValid = !(await checkExistEmail(email));
		const isPassword = !checkPassword(password);
		const isRepeatPassword = !checkRepeatPassword(repeatPassword);

		if (isUsernameValid && isEmailValid && isPassword && isRepeatPassword) {
			try {
				const endpoint = "http://localhost:8080/user/register";

				const response = await fetch(endpoint, {
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						username,
						password,
						email,
						firstName,
						lastName,
						phoneNumber,
					}),
				});

				if (response.ok) {
					setStatus(true);
					setNotification(
						"Đăng ký thành công! Kiểm tra email để xác minh tài khoản!"
					);
				} else {
					setStatus(false);
					setNotification("Đăng ký tài khoản thất bại!");
				}
			} catch (error) {
				console.log(error);
				setStatus(false);
				setNotification("Đăng ký tài khoản thất bại!!!!!!!");
			}
		}
	};

	// Hàm check username xem tồn tại chưa
	const checkExistUsername = async (username: string) => {
		if (username.trim() === "") {
			return false;
		}
		if (username.trim().length < 8) {
			setErrorUsername("Tên đăng nhập phải chứa ít nhất 8 ký tự.");
			return true;
		}
		const endpoint = `http://localhost:8080/users/search/existsByUsername?username=${username}`;
		// Call api
		try {
			const response = await fetch(endpoint);
			const data = await response.text();

			if (data === "true") {
				setErrorUsername("Username đã tồn tại!");
				return true;
			}
			return false;
		} catch (error) {
			console.log("Lỗi api khi gọi hàm kiểm tra username");
		}
	};
	const handleUsernameChange = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setUserName(e.target.value);
		setErrorUsername("");
	};

	// Hàm check email xem tồn tại chưa
	const checkExistEmail = async (email: string) => {
		const endpoint = `http://localhost:8080/users/search/existsByEmail?email=${email}`;
		// Call api
		try {
			const response = await fetch(endpoint);
			const data = await response.text();
			if (data === "true") {
				setErrorEmail("Email đã tồn tại!");
				return true;
			}
			return false;
		} catch (error) {
			console.log("Lỗi api khi gọi hàm kiểm tra email");
		}
	};
	const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setErrorEmail("");
		// return checkExistEmail(e.target.value);
	};

	// Hàm check mật khẩu có đúng định dạng không
	const checkPassword = (password: string) => {
		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
		if (password === "") {
			return false;
		} else if (!passwordRegex.test(password)) {
			setErrorPassword(
				"Mật khẩu phải có ít nhất 8 ký tự và bao gồm chữ và số."
			);
			return true;
		} else {
			setErrorPassword("");
			return false;
		}
	};
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		setErrorPassword("");
		// return checkPassword(e.target.value);
	};

	// Hàm check mật khẩu nhập lại
	const checkRepeatPassword = (repeatPassword: string) => {
		if (repeatPassword !== password) {
			setErrorRepeatPassword("Mật khẩu không khớp.");
			return true;
		} else {
			setErrorRepeatPassword("");
			return false;
		}
	};
	const handleRepeatPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setRepeatPassword(e.target.value);
		setErrorRepeatPassword("");
	};

	// Hàm check số điện thoại có đúng định dạng không
	const checkPhoneNumber = (phoneNumber: string) => {
		const phoneNumberRegex = /^(0[1-9]|84[1-9])[0-9]{8}$/;
		if (phoneNumber.trim() === "") {
			return false;
		} else if (!phoneNumberRegex.test(phoneNumber.trim())) {
			setErrorPhoneNumber("Số điện thoại không đúng.");
			return true;
		} else {
			setErrorPhoneNumber("");
			return false;
		}
	};
	const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhoneNumber(e.target.value);
		setErrorPhoneNumber("");
	};

	return (
		<div className='container my-5 py-4 rounded-5 shadow-5 bg-light w-50'>
			<h1 className='text-center'>ĐĂNG KÝ</h1>

			<form onSubmit={handleSubmit} className='form'>
				<div className='row px-2'>
					<div className='col-lg-6 col-md-12 col-12'>
						<TextField
							fullWidth
							error={errorUsername.length > 0 ? true : false}
							helperText={errorUsername}
							required={true}
							id='outlined-required'
							label='Tên đăng nhập'
							placeholder='Nhập tên đăng nhập'
							value={username}
							onChange={handleUsernameChange}
							onBlur={(e) => {
								checkExistUsername(e.target.value);
							}}
							className='input-field'
						/>

						<TextField
							error={errorPassword.length > 0 ? true : false}
							helperText={errorPassword}
							required={true}
							fullWidth
							type='password'
							id='outlined-required'
							label='Mật khẩu'
							placeholder='Nhập mật khẩu'
							value={password}
							onChange={handlePasswordChange}
							onBlur={(e) => {
								checkPassword(e.target.value);
							}}
							className='input-field'
						/>

						<TextField
							error={errorRepeatPassword.length > 0 ? true : false}
							helperText={errorRepeatPassword}
							required={true}
							fullWidth
							type='password'
							id='outlined-required'
							label='Xác nhận mật khẩu'
							placeholder='Nhập lại mật khẩu'
							value={repeatPassword}
							onChange={handleRepeatPasswordChange}
							onBlur={(e) => {
								checkRepeatPassword(e.target.value);
							}}
							className='input-field'
						/>
					</div>
					<div className='col-lg-6 col-md-12 col-12'>
						<TextField
							fullWidth
							helperText={""}
							required={true}
							id='outlined-required'
							label='Họ đệm'
							placeholder='Nhập họ đệm'
							value={firstName}
							onChange={(e) => {
								setFirstName(e.target.value);
							}}
							className='input-field'
						/>
						<TextField
							fullWidth
							helperText={""}
							required={true}
							id='outlined-required'
							label='Tên'
							placeholder='Nhập tên'
							value={lastName}
							onChange={(e) => {
								setLastName(e.target.value);
							}}
							className='input-field'
						/>
						<TextField
							fullWidth
							error={errorPhoneNumber.length > 0 ? true : false}
							helperText={errorPhoneNumber}
							required={true}
							id='outlined-required'
							label='Số điện thoại'
							placeholder='Nhập số điện thoại'
							value={phoneNumber}
							onChange={handlePhoneNumberChange}
							onBlur={(e) => {
								checkPhoneNumber(e.target.value);
							}}
							className='input-field'
						/>
					</div>
					<div>
						<TextField
							fullWidth
							helperText={errorEmail}
							required={true}
							id='outlined-required'
							label='Email'
							placeholder='Nhập email'
							value={email}
							onChange={handleEmailChange}
							onBlur={(e) => {
								checkExistEmail(e.target.value);
							}}
							className='input-field'
						/>
					</div>
				</div>
				<div className='d-flex justify-content-end mt-2 px-3'>
					<span>
						Bạn có tài khoản rồi? <Link to={"/login"}>Đăng nhập</Link>
					</span>
				</div>
				<div className='text-center my-3'>
					<Button
						variant='outlined'
						type='submit'
						sx={{ width: "25%", padding: "10px" }}
					>
						Đăng ký
					</Button>
					{status !== null && (
						<div className={"text-" + (status ? "success" : "danger")}>
							{notification}
						</div>
					)}
				</div>
			</form>
		</div>
	);
};

export default RegisterPage;
