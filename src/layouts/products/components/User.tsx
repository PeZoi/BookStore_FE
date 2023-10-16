/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import ReviewModel from "../../../model/ReviewModel";
import { getUserByIdReview } from "../../../api/UserApi";
import UserModel from "../../../model/UserModel";

interface CommentProps {
	review: ReviewModel;
}

const User: React.FC<CommentProps> = (props) => {
	const [user, setUser] = useState<UserModel | null>(null);

	useEffect(() => {
		getUserByIdReview(props.review.idReview).then((response) => {
			setUser(response);
		});
	}, []);

	return (
		<>
			<div className='me-4 mt-1'>
				<Avatar>{user?.lastName[0]}</Avatar>
			</div>
			<div>
				<strong>{user?.username}</strong>
				<span className='ms-2' style={{ fontSize: "12px", color: "#aaa" }}>
					1 tháng trước
				</span>
				<p>{props.review.content}</p>
			</div>
		</>
	);
};

export default User;
