import { VisibilityOutlined } from "@mui/icons-material";
import { Button, Chip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { DataTable } from "../../utils/DataTable";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", width: 100 },
	{ field: "date_created", headerName: "NGÀY TẠO", width: 150 },
	{ field: "total_price", headerName: "TỔNG TIỀN", width: 150 },
	{
		field: "status",
		headerName: "TRẠNG THÁI",
		width: 180,
		renderCell: (params) => {
			return (
				<Chip
					label={params.value}
					color={
						params.value === "Thành công"
							? "success"
							: params.value === "Đang xử lý"
							? "info"
							: "warning"
					}
					variant='outlined'
				/>
			);
		},
	},
	{
		field: "action",
		headerName: "HÀNH ĐỘNG",
		width: 150,
		type: "actions",
		renderCell: (id) => {
			return (
				<Button variant='text' onClick={() => console.log(id)}>
					<VisibilityOutlined />
				</Button>
			);
		},
	},
];

const rows = [
	{
		id: 1,
		total_price: 18999,
		date_created: "01/01/1990",
		status: "Đang xử lý",
	},
	{
		id: 2,
		total_price: 12000,
		date_created: "01/01/1990",
		status: "Đang giao",
	},
	{
		id: 3,
		total_price: 20000,
		date_created: "01/01/1990",
		status: "Thành công",
	},
	{
		id: 4,
		total_price: 18900,
		date_created: "01/01/1990",
		status: "Đang xử lý",
	},
	{
		id: 5,
		total_price: 12000,
		date_created: "01/01/1990",
		status: "Đang giao",
	},
	{
		id: 6,
		total_price: 20000,
		date_created: "01/01/1990",
		status: "Thành công",
	},
	{
		id: 7,
		total_price: 18900,
		date_created: "01/01/1990",
		status: "Đang xử lý",
	},
	{
		id: 8,
		total_price: 12000,
		date_created: "01/01/1990",
		status: "Đang giao",
	},
	{
		id: 9,
		total_price: 20000,
		date_created: "01/01/1990",
		status: "Thành công",
	},
	{
		id: 10,
		total_price: 20000,
		date_created: "01/01/1990",
		status: "Thành công",
	},
];

const OrderTable: React.FC = () => {
	return <DataTable columns={columns} rows={rows} />;
};

export default OrderTable;
