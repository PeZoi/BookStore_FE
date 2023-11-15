import { endpointBE } from "../layouts/utils/Constant";
import OrderModel from "../model/OrderModel";
import { requestAdmin } from "./Request";

export async function getAllOrders(): Promise<OrderModel[]> {
   const endpoint: string = endpointBE + "/orders";
   const response = await requestAdmin(endpoint);

   const datas = response._embedded.orders.map((data: any) => {
      const order: OrderModel = {
         idOrder: data.idOrder,
         deliveryAddress: data.deliveryAddress,
         totalPrice: data.totalPrice,
         totalPriceProduct: data.totalPriceProduct,
         feeDelivery: data.feeDelivery,
         feePayment: data.feePayment,
         dateCreated: data.dateCreated,
         status: data.status,
         user: data._embedded.user,
      }
      return order;
   })

   return datas;
}