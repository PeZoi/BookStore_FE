import { DeleteOutlineOutlined, VisibilityOutlined } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Chip, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { DataTable } from "../../../layouts/utils/DataTable";
import UserModel from "../../../model/UserModel";
import { getAllUserRole } from "../../../api/UserApi";

interface UserTableProps {
	setOption: any;
	handleOpenModal: any;
	setKeyCountReload?: any;
	keyCountReload?: any;
}

export const UserTable: React.FC<UserTableProps> = (props) => {
	// Tạo biến để lấy tất cả data
	const [data, setData] = useState<UserModel[]>([]);
	useEffect(() => {
		getAllUserRole()
			.then((response) => {
				const users = response
					.flat()
					.map((user) => ({ ...user, id: user.idUser }));

				setData(users);
			})
			.catch((error) => console.log(error));
	}, [props.keyCountReload]);

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 50 },
		{ field: "username", headerName: "TÊN TÀI KHOẢN", width: 120 },
		{
			field: "role",
			headerName: "VAI TRÒ",
			width: 150,
			renderCell: (params) => {
				return (
					<Chip
						label={params.value}
						color={params.value === "CUSTOMER" ? "success" : "error"}
						variant='outlined'
					/>
				);
			},
		},
		{ field: "lastName", headerName: "TÊN", width: 100 },
		{
			field: "dateOfBirth",
			headerName: "NGÀY SINH",
			width: 100,
		},
		{ field: "email", headerName: "EMAIL", width: 200 },
		{ field: "phoneNumber", headerName: "SỐ ĐIỆN THOẠI", width: 120 },

		{
			field: "action",
			headerName: "HÀNH ĐỘNG",
			width: 200,
			type: "actions",
			renderCell: (item) => {
				return (
					<div>
						<Tooltip title={"Xem chi tiết"}>
							<IconButton
								color='secondary'
								onClick={() => {
									props.setOption("view");
									props.handleOpenModal();
								}}
							>
								<VisibilityOutlined />
							</IconButton>
						</Tooltip>
						<Tooltip title={"Chỉnh sửa"}>
							<IconButton
								color='primary'
								onClick={() => {
									props.setOption("update");
									props.handleOpenModal();
								}}
							>
								<EditOutlinedIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title={"Xoá"}>
							<IconButton
								color='error'
								onClick={() => console.log("Xoá: " + item.id)}
							>
								<DeleteOutlineOutlined />
							</IconButton>
						</Tooltip>
					</div>
				);
			},
		},
	];

	return <DataTable columns={columns} rows={data} />;
};
