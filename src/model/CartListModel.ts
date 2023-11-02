import CartItemModel from "./CartItemModel";

class CartListModel {
   cartItem: CartItemModel;

   constructor(cartItem: CartItemModel) {
      this.cartItem = cartItem;
   }
}

export default CartListModel;