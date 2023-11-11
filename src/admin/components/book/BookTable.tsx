import { DeleteOutlineOutlined, VisibilityOutlined } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { DataTable } from "../../../layouts/utils/DataTable";
import BookModel from "../../../model/BookModel";
import { getAllBook } from "../../../api/BookApi";
import { getAllImageByBook } from "../../../api/ImageApi";

interface BookTableProps {
	setOption: any;
	handleOpenModal: any;
	setKeyCountReload?: any;
	keyCountReload?: any;
}

export const BookTable: React.FC<BookTableProps> = (props) => {
	// Tạo biến để lấy tất cả data
	const [data, setData] = useState<BookModel[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const bookResponse = await getAllBook();

				const promises = bookResponse.bookList.map(async (book) => {
					const imagesList = await getAllImageByBook(book.idBook);

					const thumbnail = imagesList.find((image) => image.thumbnail);

					return {
						...book,
						id: book.idBook,
						thumbnail: thumbnail?.dataImage,
					};
				});
				// Promise.all(promises) nghĩa là đợi cho những Promise trên kia hoàn thành hết thì mới tới
				// câu lệnh này
				const books = await Promise.all(promises);
				setData(books);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [props.keyCountReload]);
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 80 },
		{
			field: "thumbnail",
			headerName: "ẢNH",
			width: 100,
			renderCell: (params) => {
				return <img src={params.value} alt='' width={70} />;
			},
		},
		{ field: "nameBook", headerName: "TÊN SÁCH", width: 350 },
		{ field: "quantity", headerName: "SỐ LƯỢNG", width: 100 },
		{
			field: "sellPrice",
			headerName: "GIÁ BÁN",
			width: 120,
			renderCell: (params) => {
				return (
					<span>
						{Number.parseInt(params.value).toLocaleString("vi-vn")} đ
					</span>
				);
			},
		},
		{ field: "author", headerName: "TÁC GIẢ", width: 150 },

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
