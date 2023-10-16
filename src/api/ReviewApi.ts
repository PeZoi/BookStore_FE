import ReviewModel from "../model/ReviewModel";
import { request } from "./Request";

async function getReview(endpoint: string): Promise<ReviewModel[]> {
   // Gọi phương thức request()
   const response = await request(endpoint);

   return response._embedded.reviews.map((reviewData: any) => ({
      ...reviewData,
   }));
}

export async function getAllReview(idBook: number): Promise<ReviewModel[]> {
   // Xác định endpoint
   const endpoint: string = `http://localhost:8080/books/${idBook}/listReviews`;

   return getReview(endpoint);
}