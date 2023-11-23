import React from "react";
import BookCartList from "../products/BookCartList";

interface CartPageProps {}

const CartPage: React.FC<CartPageProps> = (props) => {
	return <BookCartList />;
};

export default CartPage;
