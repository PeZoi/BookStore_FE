/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ActiveAccount: React.FC = () => {
	const [enabled, setEnabled] = useState(false);
	const [notifications, setNotifications] = useState("");
	const { email } = useParams();
	const { activationCode } = useParams();

	useEffect(() => {
		if (email && activationCode) {
			handleActiveAccount();
		}
	}, []);

	const handleActiveAccount = async () => {
		try {
			const url = `http://localhost:8080/user/active-account?email=${email}&activationCode=${activationCode}`;
			const response = await fetch(url, { method: "GET" });

			if (response.ok) {
				setEnabled(true);
			} else {
				setNotifications(response.text + "");
			}
		} catch (error) {
			console.log("Lỗi kích hoạt: " + error);
		}
	};

	return (
		<div>
			<h1 className='text-center'>KÍCH HOẠT TÀI KHOẢN</h1>
			{enabled ? (
				<p>
					Tài khoản kích hoạt thành công. Vui lòng{" "}
					<Link to={"/login"}>đăng nhập</Link>
				</p>
			) : (
				<p>Tài khoản kích hoạt thất bại. Lỗi: {notifications}</p>
			)}
		</div>
	);
};

export default ActiveAccount;
