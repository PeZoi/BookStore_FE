import React from "react";
import BookCartList from "../products/BookCartList";

const CartPage: React.FC = () => {
	return (
		<div style={{ overflow: "hidden" }}>
			<BookCartList />
		</div>
	);
};

export default CartPage;
