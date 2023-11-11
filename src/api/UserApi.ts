import BookModel from "../model/BookModel";
import UserModel from "../model/UserModel";
import { request, requestAdmin } from "./Request";

async function getUser(endpoint: string): Promise<UserModel> {
   // Gọi phương thức request()
   const response = await request(endpoint);

   return response;
}

export async function getAllUserRole(): Promise<UserModel[]> {
   const endpoint: string = `http://localhost:8080/roles`;
   const response = await requestAdmin(endpoint);

   const datas = response._embedded.roles.map((roleData: any) => {
      // Duyệt qua mảng listUsers trong mỗi vai trò (role)
      const users = roleData._embedded.listUsers.map((userData: any) => {
         // Xử lý các trường dữ liệu trong userData tại đây
         const user: UserModel = {
            idUser: userData.idUser,
            avatar: userData.avatar,
            dateOfBirth: userData.dateOfBirth,
            deliveryAddress: userData.deliveryAddress,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            gender: userData.gender,
            phoneNumber: userData.phoneNumber,
            username: userData.username,
            role: roleData.nameRole,
         };
         return user;
      });
      return users;
   });

   return datas;

}

export async function getUserByIdReview(idReview: number): Promise<UserModel> {
   // Xác định endpoint
   const endpoint: string = `http://localhost:8080/reviews/${idReview}/user`;

   return getUser(endpoint);
}