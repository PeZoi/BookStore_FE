/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./SelectQuantity.css";
import Icon from "@mui/material/Icon";

interface SelectQuantityProps {
	max: number | undefined;
}

const SelectQuantity: React.FC<SelectQuantityProps> = (props) => {
	const [quantity, setQuantity] = useState(1);

	const add = () => {
		if (quantity < (props.max ? props.max : 1)) {
			setQuantity(quantity + 1);
		}
	};

	const reduce = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuantity = parseInt(e.target.value);
		if (
			!isNaN(newQuantity) &&
			newQuantity >= 1 &&
			newQuantity <= (props.max ? props.max : 1)
		) {
			setQuantity(newQuantity);
		}
	};

	return (
		<div
			className='wrapper-select-quantity d-flex align-items-center rounded'
			style={{ width: "110px" }}
		>
			<button
				type='button'
				className='d-flex align-items-center justify-content-center'
				onClick={() => reduce()}
				style={{
					backgroundColor: "transparent",
					borderColor: "transparent",
				}}
			>
				<Icon>remove</Icon>
			</button>
			<input
				type='number'
				className='inp-number p-0 m-0'
				value={quantity}
				onChange={handleQuantity}
				min={1}
				max={props.max}
			/>
			<button
				type='button'
				className='d-flex align-items-center justify-content-center'
				onClick={() => add()}
				style={{
					backgroundColor: "transparent",
					borderColor: "transparent",
				}}
			>
				<Icon>add</Icon>
			</button>
		</div>
	);
};

export default SelectQuantity;
