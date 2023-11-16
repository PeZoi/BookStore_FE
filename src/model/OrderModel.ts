import BookModel from "./BookModel";
import CartItemModel from "./CartItemModel";
import UserModel from "./UserModel";

class OrderModel {
   id?: any;
   idOrder: number;
   deliveryAddress: string;
   totalPrice: number;
   totalPriceProduct: number;
   feeDelivery: number;
   feePayment: number;
   dateCreated: Date;
   status: string;
   user?: UserModel;
   fullName?: string;
   phoneNumber?: string;
   note?: string;
   cartItems?: CartItemModel[]; // để tạm


   constructor(idOrder: number,
      deliveryAddress: string,
      totalPrice: number,
      totalPriceProduct: number,
      feeDelivery: number,
      feePayment: number,
      dateCreated: Date,
      user: UserModel,
      status: string,) {
      this.idOrder = idOrder;
      this.deliveryAddress = deliveryAddress;
      this.totalPrice = totalPrice;
      this.dateCreated = dateCreated;
      this.status = status;
      this.feeDelivery = feeDelivery;
      this.feePayment = feePayment;
      this.dateCreated = dateCreated;
      this.totalPriceProduct = totalPriceProduct;
      this.user = user;
   }
}

export default OrderModel;