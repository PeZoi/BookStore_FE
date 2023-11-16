import { CloudUpload, EditOutlined } from "@mui/icons-material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import React, { FormEvent, useState } from "react";
import HiddenInputUpload from "../utils/HiddenInputUpload";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import {
	checkPassword,
	checkPhoneNumber,
	checkRepeatPassword,
} from "../utils/Validation";
import Tooltip from "@mui/material/Tooltip";
import OrderTable from "./components/OrderTable";
import { FadeModal } from "../utils/FadeModal";
import { OrderForm } from "../../admin/components/order/OrderForm";

const ProfilePage: React.FC = () => {
	// Các biến thông tin cá nhân
	const [dateOfBirth, setDateOfBirth] = useState("1990-01-01");
	const [deliveryAddress, setDeliveryAddress] = useState("");
	const [purchaseAddress, setPurchaseAddress] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [gender, setGender] = useState("M");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [avatar, setAvatar] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");

	// reload lại component order table
	const [keyCountReload, setKeyCountReload] = useState(0);

	// Xử lý order table
	const [id, setId] = useState(0);
	const [openModal, setOpenModal] = React.useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

	// Các biến trạng thái
	const [modifiedStatus, setModifiedStatus] = useState(false);

	// Các biến thông báo lỗi
	const [errorPhoneNumber, setErrorPhoneNumber] = useState("");
	const [errorNewPassword, setErrorNewPassword] = useState("");
	const [errorRepeatPassword, setErrorRepeatPassword] = useState("");

	// Xử lý change só điện thoại
	const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhoneNumber(e.target.value);
		setErrorPhoneNumber("");
	};

	// Xử lý upload hình ảnh (preview)
	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setAvatar(imageUrl);
		}
	};

	// Xử lý change password
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewPassword(e.target.value);
		setErrorNewPassword("");
	};

	const handleRepeatPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setRepeatPassword(e.target.value);
		setErrorRepeatPassword("");
	};

	// Xử lý TABS
	const [value, setValue] = React.useState("1");
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	// Xử lý khi form submit (thay đổi thông tin)
	function handleSubmit(event: FormEvent<HTMLFormElement>): void {
		throw new Error("Function not implemented.");
	}

	// Xử lý khi form sumbit (thay đổi mật khẩu)
	function handleSubmitChangePassword(
		event: FormEvent<HTMLFormElement>
	): void {
		throw new Error("Function not implemented.");
	}

	return (
		<div className='container my-5'>
			<Grid container>
				<Grid item xs={3}>
					<div className='bg-light rounded me-2 py-3'>
						<div className='d-flex align-items-center justify-content-center flex-column'>
							<Avatar
								style={{ fontSize: "50px" }}
								alt='Remy Sharp'
								src={
									avatar ||
									"https://bootdey.com/img/Content/avatar/avatar7.png"
								}
								sx={{ width: 100, height: 100 }}
							/>
							<Button
								className='mt-3'
								size='small'
								component='label'
								variant='outlined'
								startIcon={<CloudUpload />}
							>
								Upload avatar
								<HiddenInputUpload
									handleImageUpload={handleImageUpload}
								/>
							</Button>
						</div>
						<div className='text-center mt-3'>
							<strong>Phạm Ngọc Viễn Đông</strong>
							<p>Email: pezoiks1@gmail.com</p>
						</div>
					</div>
				</Grid>
				<Grid item xs={9}>
					<div
						className='bg-light rounded px-2 ms-2'
						style={{ minHeight: "300px" }}
					>
						<Box sx={{ width: "100%", typography: "body1" }}>
							<TabContext value={value}>
								<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
									<TabList
										onChange={handleChange}
										aria-label='lab API tabs example'
									>
										<Tab label='Thông tin cá nhân' value='1' />
										<Tab label='Đơn hàng' value='2' />
										<Tab label='Đổi mật khẩu' value='3' />
									</TabList>
								</Box>
								<TabPanel value='1'>
									<form
										onSubmit={handleSubmit}
										className='form position-relative'
										style={{ padding: "0 20px" }}
									>
										{!modifiedStatus && (
											<div
												className='text-end my-3 position-absolute'
												style={{
													bottom: "0",
													right: "0",
												}}
											>
												<Tooltip
													title='Chỉnh sửa thông tin'
													placement='bottom-end'
												>
													<Button
														variant='contained'
														type='button'
														className='rounded-pill'
														onClick={() =>
															setModifiedStatus(!modifiedStatus)
														}
													>
														<EditOutlined
															sx={{ width: "24px" }}
														/>
													</Button>
												</Tooltip>
											</div>
										)}
										<div className='row'>
											<div className='col-sm-12 col-md-6 col-lg-4'>
												<TextField
													required
													fullWidth
													label='ID'
													value={1}
													disabled={true}
													className='input-field'
													InputProps={{
														readOnly: true,
													}}
												/>
												<TextField
													required
													fullWidth
													label='Họ đệm'
													value={firstName}
													onChange={(e) =>
														setFirstName(e.target.value)
													}
													disabled={modifiedStatus ? false : true}
													className='input-field'
												/>
												<TextField
													fullWidth
													error={
														errorPhoneNumber.length > 0
															? true
															: false
													}
													helperText={errorPhoneNumber}
													required={true}
													label='Số điện thoại'
													placeholder='Nhập số điện thoại'
													value={phoneNumber}
													onChange={handlePhoneNumberChange}
													onBlur={(e) => {
														checkPhoneNumber(
															setErrorPhoneNumber,
															e.target.value
														);
													}}
													disabled={modifiedStatus ? false : true}
													className='input-field'
												/>
												<FormControl>
													<FormLabel id='demo-row-radio-buttons-group-label'>
														Giới tính
													</FormLabel>
													<RadioGroup
														row
														aria-labelledby='demo-row-radio-buttons-group-label'
														name='row-radio-buttons-group'
														value={gender}
														onChange={(e) =>
															setGender(e.target.value)
														}
													>
														<FormControlLabel
															disabled={
																modifiedStatus ? false : true
															}
															value='M'
															control={<Radio />}
															label='Nam'
														/>
														<FormControlLabel
															disabled={
																modifiedStatus ? false : true
															}
															value='F'
															control={<Radio />}
															label='Nữ'
														/>
													</RadioGroup>
												</FormControl>
											</div>
											<div className='col-sm-12 col-md-6 col-lg-4'>
												<TextField
													required
													fullWidth
													label='Tên tài khoản'
													value={"pezoiks1"}
													disabled={true}
													className='input-field'
												/>
												<TextField
													required
													fullWidth
													label='Tên'
													value={lastName}
													onChange={(e) =>
														setLastName(e.target.value)
													}
													disabled={modifiedStatus ? false : true}
													className='input-field'
												/>
												<TextField
													required
													fullWidth
													label='Địa chỉ mua hàng'
													value={purchaseAddress}
													onChange={(e) =>
														setPurchaseAddress(e.target.value)
													}
													disabled={modifiedStatus ? false : true}
													className='input-field'
												/>
											</div>
											<div className='col-sm-12 col-md-6 col-lg-4'>
												<TextField
													required
													fullWidth
													label='Email'
													value={"pezoiks1@gmail.com"}
													className='input-field'
													disabled={true}
													InputProps={{
														readOnly: true,
													}}
												/>
												<TextField
													required
													fullWidth
													type='date'
													label='Ngày sinh'
													value={dateOfBirth}
													onChange={(e) =>
														setDateOfBirth(e.target.value)
													}
													disabled={modifiedStatus ? false : true}
													className='input-field'
												/>
												<TextField
													required
													fullWidth
													label='Địa chỉ giao hàng'
													value={deliveryAddress}
													onChange={(e) =>
														setDeliveryAddress(e.target.value)
													}
													disabled={modifiedStatus ? false : true}
													className='input-field'
												/>
											</div>
										</div>
										{modifiedStatus && (
											<div className='text-center my-3'>
												<Button
													fullWidth
													variant='outlined'
													type='submit'
													sx={{ width: "50%", padding: "10px" }}
												>
													Lưu và thay đổi
												</Button>
											</div>
										)}
									</form>
								</TabPanel>
								<TabPanel value='2'>
									<div>
										<OrderTable
											handleOpenModal={handleOpenModal}
											keyCountReload={keyCountReload}
											setKeyCountReload={setKeyCountReload}
											setId={setId}
										/>
									</div>
									<FadeModal
										open={openModal}
										handleOpen={handleOpenModal}
										handleClose={handleCloseModal}
									>
										<OrderForm
											id={id}
											setKeyCountReload={setKeyCountReload}
											handleCloseModal={handleCloseModal}
											option='view-customer'
										/>
									</FadeModal>
								</TabPanel>
								<TabPanel value='3'>
									<form
										onSubmit={handleSubmitChangePassword}
										className='form position-relative'
										style={{ padding: "0 120px" }}
									>
										<TextField
											error={
												errorNewPassword.length > 0 ? true : false
											}
											helperText={errorNewPassword}
											required={true}
											fullWidth
											type='password'
											label='Mật khẩu mới'
											placeholder='Nhập mật khẩu mới'
											value={newPassword}
											onChange={handlePasswordChange}
											onBlur={(e) => {
												checkPassword(
													setErrorNewPassword,
													e.target.value
												);
											}}
											className='input-field'
										/>

										<TextField
											error={
												errorRepeatPassword.length > 0
													? true
													: false
											}
											helperText={errorRepeatPassword}
											required={true}
											fullWidth
											type='password'
											label='Xác nhận mật khẩu mới'
											placeholder='Nhập lại mật khẩu mới'
											value={repeatPassword}
											onChange={handleRepeatPasswordChange}
											onBlur={(e) => {
												checkRepeatPassword(
													setErrorRepeatPassword,
													e.target.value,
													newPassword
												);
											}}
											className='input-field'
										/>
										<div className='text-center my-3'>
											<Button
												fullWidth
												variant='outlined'
												type='submit'
												sx={{ width: "50%", padding: "10px" }}
											>
												Lưu và thay đổi
											</Button>
										</div>
									</form>
								</TabPanel>
							</TabContext>
						</Box>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default ProfilePage;
