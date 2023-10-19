/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./SelectQuantity.css";
import Icon from "@mui/material/Icon";

const SelectQuantity: React.FC = () => {
	const [quantity, setQuantity] = useState(1);

	const add = () => {
		if (quantity < 99) {
			setQuantity(quantity + 1);
		}
	};

	const reduce = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	return (
		<div className='wrapper-select-quantity d-flex align-items-center rounded'>
			<Button size='small' onClick={() => reduce()}>
				<Icon>remove</Icon>
			</Button>
			<input
				type='number'
				className='inp-number p-0 m-0'
				value={quantity}
				onChange={(e) => setQuantity(parseInt(e.target.value))}
				min={1}
				max={99}
			/>
			<Button size='small' onClick={() => add()}>
				<Icon>add</Icon>
			</Button>
		</div>
	);
};

export default SelectQuantity;
