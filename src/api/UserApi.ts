import UserModel from "../model/UserModel";
import { request } from "./Request";

async function getUser(endpoint: string): Promise<UserModel> {
   // Gọi phương thức request()
   const response = await request(endpoint);

   return response;
}

export async function getUserByIdReview(idReview: number): Promise<UserModel> {
   // Xác định endpoint
   const endpoint: string = `http://localhost:8080/reviews/${idReview}/user`;

   return getUser(endpoint);
}