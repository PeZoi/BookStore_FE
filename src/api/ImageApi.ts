import ImageModel from "../model/ImageModel";
import { request } from "./Request";

export async function getAllImageByBook(idBook: string): Promise<ImageModel[]> {
   const result: ImageModel[] = [];

   // Xác định endpoint
   const endpoint: string = `http://localhost:8080/books/${idBook}/listImages`;

   // Gọi phương thức request()
   const response = await request(endpoint);

   // Lấy ra json sách
   const responseData = response._embedded.images;

   for (const key in responseData) {
      result.push({
         idImage: responseData[key].idImage,
         nameImage: responseData[key].nameImage,
         isThumbnail: responseData[key].isThumbnail,
         urlImage: responseData[key].urlImage,
         dataImage: responseData[key].dataImage,
      })
   }


   return result;
}