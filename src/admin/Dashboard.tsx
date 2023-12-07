import { ParameterDigital } from "./components/ParameterDigital";
import { Chart } from "./components/chart/Chart";
import RequireAdmin from "./RequireAdmin";
import { useEffect, useMemo, useRef, useState } from "react";
import { getAllUserRole } from "../api/UserApi";
import { getAllOrders } from "../api/OrderApi";
import OrderModel from "../model/OrderModel";

const Dashboard = () => {
	const [totalPrice, setTotalPrice] = useState(0);
	const [numberOfAccount, setNumberOfAccount] = useState(0);
	const [numberOfOrder, setNumberOfOrder] = useState(0);
	const [orders, setOrders] = useState<OrderModel[]>([]);

	// Lấy tổng số account
	useEffect(() => {
		getAllUserRole()
			.then((response) => {
				setNumberOfAccount(response.flat().length);
			})
			.catch((error) => console.log(error));
	}, []);

	// Lấy tổng số hoá đơn và tổng tiền kiếm được
	useEffect(() => {
		getAllOrders()
			.then((response) => {
				setOrders(response);
				const numberOfOrder = response.reduce((prevValue, order) => {
					if (order.status === "Thành công") {
						return prevValue + 1;
					}
					return prevValue;
				}, 0);
				setNumberOfOrder(numberOfOrder);
				const totalPriceResponse = response.reduce((prevValue, order) => {
					if (order.status === "Thành công") {
						return prevValue + order.totalPrice;
					}
					return prevValue;
				}, 0);
				setTotalPrice(totalPriceResponse);
			})
			.catch((error) => console.log(error));
	}, []);
	return (
		<div>
			<ParameterDigital
				totalPrice={totalPrice}
				numberOfAccount={numberOfAccount}
				numberOfOrder={numberOfOrder}
			/>
			<Chart orders={orders} />
		</div>
	);
};

const DashboardPage = RequireAdmin(Dashboard);
export default DashboardPage;
