import React, { useEffect, useState } from "react";
import BookCartList from "../products/BookCartList";
import CartItemModel from "../../model/CartItemModel";

interface CartPageProps {
	// cartList: CartItemModel[];
	setTotalCart: any;
}

const CartPage: React.FC<CartPageProps> = (props) => {
	const [cartList, setCartList] = useState<CartItemModel[]>([]);
	const [totalPriceProduct, setTotalPriceProduct] = useState(0);

	useEffect(() => {
		const cartData: string | null = localStorage.getItem("cart");
		const cart: CartItemModel[] = cartData ? JSON.parse(cartData) : [];
		const total = cart.reduce((totalPrice, cartItem) => {
			return totalPrice + cartItem.quantity * cartItem.book.sellPrice;
		}, 0);
		setTotalPriceProduct(total);
		setCartList(cart);
	}, [cartList]);
	return (
		<BookCartList
			cartList={cartList}
			setCartList={setCartList}
			setTotalCart={props.setTotalCart}
			totalPriceProduct={totalPriceProduct}
		/>
	);
};

export default CartPage;
