import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "Biểu đồ thống kê",
		},
	},
};

const labels = [
	"T1",
	"T2",
	"T3",
	"T4",
	"T5",
	"T6",
	"T7",
	"T8",
	"T9",
	"T10",
	"T11",
	"T12",
];

interface ChartProps {
	dataTotalPriceOrderByMonth?: number[];
	dataNumberOfOrderOrderByMonth?: number[];
}

export const Chart: React.FC<ChartProps> = (props) => {
	const data = {
		labels,
		datasets: [
			{
				label: "Tổng số đơn hàng (thành công)",
				data: props.dataNumberOfOrderOrderByMonth,
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
			{
				label: "Tổng số tiền (thành công)",
				data: props.dataTotalPriceOrderByMonth,
				borderColor: "rgb(12, 99, 132)",
				backgroundColor: "rgba(12, 99, 132, 0.5)",
			},
		],
	};

	return (
		<div className='conatiner p-4'>
			<div className='shadow-4 rounded p-5'>
				<Line options={options} data={data} />
			</div>
		</div>
	);
};
