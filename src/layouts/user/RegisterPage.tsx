import React, { useState } from "react";

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
		// return checkExistUsername(e.target.value);
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
		if (!passwordRegex.test(password)) {
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
		// return checkRepeatPassword(e.target.value);
	};
	return (
		<div className='container my-5 px-5'>
			<h1 className='text-center'>Đăng ký tài khoản</h1>
			<form onSubmit={handleSubmit} className='form'>
				<div className='row px-5 mt-3'>
					<div className='col-lg-6 col-md-6 col-6'>
						<label htmlFor='username' className='form-label'>
							Tên đăng nhập:{" "}
						</label>
						<input
							type='text'
							id='username'
							className='form-control'
							value={username}
							onChange={handleUsernameChange}
							onBlur={(e) => {
								checkExistUsername(e.target.value);
							}}
						/>
						<div className='text-danger'>{errorUsername}</div>

						<label htmlFor='email' className='form-label'>
							Email:{" "}
						</label>
						<input
							type='email'
							id='email'
							className='form-control'
							value={email}
							onChange={handleEmailChange}
							onBlur={(e) => {
								checkExistEmail(e.target.value);
							}}
						/>
						<div className='text-danger'>{errorEmail}</div>

						<label htmlFor='password' className='form-label'>
							Mật khẩu:{" "}
						</label>
						<input
							type='password'
							id='password'
							className='form-control'
							value={password}
							onChange={handlePasswordChange}
							onBlur={(e) => {
								checkPassword(e.target.value);
							}}
						/>
						<div className='text-danger'>{errorPassword}</div>

						<label htmlFor='password' className='form-label'>
							Nhập lại mật khẩu:{" "}
						</label>
						<input
							type='password'
							id='repeatPassword'
							className='form-control'
							value={repeatPassword}
							onChange={handleRepeatPasswordChange}
							onBlur={(e) => {
								checkRepeatPassword(e.target.value);
							}}
						/>
						<div className='text-danger'>{errorRepeatPassword}</div>
					</div>
					<div className='col-lg-6 col-md-6 col-6'>
						<label htmlFor='firstName' className='form-label'>
							Họ đệm:{" "}
						</label>
						<input
							type='text'
							id='firstName'
							className='form-control'
							value={firstName}
							onChange={(e) => {
								setFirstName(e.target.value);
							}}
						/>

						<label htmlFor='lastName' className='form-label'>
							Tên:{" "}
						</label>
						<input
							type='text'
							id='lastName'
							className='form-control'
							value={lastName}
							onChange={(e) => {
								setLastName(e.target.value);
							}}
						/>

						<label htmlFor='phoneNumber' className='form-label'>
							Số điện thoại:{" "}
						</label>
						<input
							type='text'
							id='phoneNumber'
							className='form-control'
							value={phoneNumber}
							onChange={(e) => {
								setPhoneNumber(e.target.value);
							}}
						/>
					</div>
				</div>
				<div className='text-center my-5'>
					<button type='submit' className='btn btn-outline-primary'>
						Đăng ký
					</button>
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
