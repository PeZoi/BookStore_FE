import React, { useEffect, useState } from "react";
import BookCartList from "../products/BookCartList";
import CartItemModel from "../../model/CartItemModel";

interface CartPageProps {
	// cartList: CartItemModel[]; // Trường hợp truyền dữ liệu trước từ app vào cart page là không được vì bắt buộc phải load trang chủ trước thì mới load được dữ liệu, còn nếu load dữ liệu trực tiếp ở trên cart page thì sẽ không load được dữ liệu
	setTotalCart: any;
}

const CartPage: React.FC<CartPageProps> = (props) => {
	const [cartList, setCartList] = useState<CartItemModel[]>([]);
	const [totalPriceProduct, setTotalPriceProduct] = useState(0);

	useEffect(() => {
		const cartData: string | null = localStorage.getItem("cart");
		let cart: CartItemModel[] = [];
		cart = cartData ? JSON.parse(cartData) : [];

		const total = cart.reduce((totalPrice, cartItem) => {
			return totalPrice + cartItem.quantity * cartItem.book.sellPrice;
		}, 0);
		setTotalPriceProduct(total);
		setCartList(cart);
		props.setTotalCart(cart.length);
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
