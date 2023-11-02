import BookModel from "./BookModel";

class CartItemModel {
   quantity: number;
   book: BookModel;

   constructor(quantity: number, book: BookModel) {
      this.quantity = quantity;
      this.book = book;
   }
}

export default CartItemModel;