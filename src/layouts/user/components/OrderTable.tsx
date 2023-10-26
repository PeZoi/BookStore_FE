import { VisibilityOutlined } from "@mui/icons-material";
import { Button, Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", width: 100 },
	{ field: "date_created", headerName: "NGÀY TẠO", width: 150 },
	{ field: "total_price", headerName: "TỔNG TIỀN", width: 150 },
	{
		field: "status",
		headerName: "TRẠNG THÁI",
		width: 180,
		renderCell: (params) => {
			return <Chip label='Thành công' color='success' variant='outlined' />;
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
		total_price: 18900,
		date_created: "01/01/1990",
		status: "Đang giao",
	},
	{
		id: 2,
		total_price: 18900,
		date_created: "01/01/1990",
		status: "Đang giao",
	},
	{
		id: 3,
		total_price: 18900,
		date_created: "01/01/1990",
		status: "Đang giao",
	},
];

const OrderTable: React.FC = () => {
	return (
		<div style={{ height: 400, width: "100%" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 5 },
					},
				}}
				pageSizeOptions={[5, 10]}
			/>
		</div>
	);
};

export default OrderTable;
