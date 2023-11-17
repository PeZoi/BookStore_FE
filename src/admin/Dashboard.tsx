import { ParameterDigital } from "./components/ParameterDigital";
import { Chart } from "./components/Chart";
import RequireAdmin from "./RequireAdmin";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getAllUserRole } from "../api/UserApi";
import { getAllOrders } from "../api/OrderApi";
import OrderModel from "../model/OrderModel";

const Dashboard = () => {
	const [totalPrice, setTotalPrice] = useState(0);
	const [numberOfAccount, setNumberOfAccount] = useState(0);
	const [numberOfOrder, setNumberOfOrder] = useState(0);
	const [orders, setOrders] = useState<OrderModel[]>([]);

	const dataNumberOfOrderOrderByMonth = useRef(new Array(12).fill(0));
	const dataTotalPriceOrderByMonth = useRef(new Array(12).fill(0));

	const updateData = useMemo(
		() => (orders: OrderModel[]) => {
			const newDataNumberOfOrder = new Array(12).fill(0);
			const newDataTotalPrice = new Array(12).fill(0);

			orders.forEach((order) => {
				const orderDate = new Date(order.dateCreated);
				const month = orderDate.getMonth();

				newDataNumberOfOrder[month] += 1;
				newDataTotalPrice[month] += order.totalPrice;
			});

			dataNumberOfOrderOrderByMonth.current = newDataNumberOfOrder;
			dataTotalPriceOrderByMonth.current = newDataTotalPrice;
		},
		[]
	);

	useEffect(() => {
		updateData(orders);
	}, [orders]);

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
				setNumberOfOrder(response.length);
				const totalPriceResponse = response.reduce(
					(prevValue, currentValue) => {
						return prevValue + currentValue.totalPrice;
					},
					0
				);
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
			<Chart
				dataNumberOfOrderOrderByMonth={
					dataNumberOfOrderOrderByMonth.current
				}
				dataTotalPriceOrderByMonth={dataTotalPriceOrderByMonth.current}
			/>
		</div>
	);
};

const DashboardPage = RequireAdmin(Dashboard);
export default DashboardPage;
