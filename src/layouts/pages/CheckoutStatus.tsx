import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CheckoutSuccess } from "./components/CheckoutSuccess";
import { CheckoutFail } from "./components/CheckoutFail";
import { endpointBE } from "../utils/Constant";
import { getIdUserByToken } from "../utils/JwtService";

const CheckoutStatus: React.FC = () => {
	const location = useLocation();
	const [isSuccess, setIsSuccess] = useState(false);

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const vnpResponseCode = searchParams.get("vnp_ResponseCode");

		if (vnpResponseCode === "00") {
			setIsSuccess(true);
		} else {
			const token = localStorage.getItem("token");
			fetch(endpointBE + "/order/cancel-order", {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
					"content-type": "application/json",
				},
				body: JSON.stringify({
					idUser: getIdUserByToken(),
				}),
			}).catch((error) => {
				console.log(error);
			});
		}
	}, [location.search]);

	return <>{isSuccess ? <CheckoutSuccess /> : <CheckoutFail />}</>;
};

export default CheckoutStatus;
