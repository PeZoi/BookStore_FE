import RoleModel from "../model/RoleModel";
import { requestAdmin } from "./Request";

export async function getAllRoles(): Promise<RoleModel[]> {
   const endpoint = "http://localhost:8080/roles";
   // Gọi phương thức request()
   const response = await requestAdmin(endpoint);

   const rolesList: RoleModel[] = response._embedded.roles.map((role: any) => ({
      ...role,
   }));

   return rolesList;
}

export async function getRoleByIdUser(idUser: any): Promise<RoleModel> {
   const endpoint = `http://localhost:8080/users/${idUser}/listRoles`;
   // Gọi phương thức request()
   const response = await requestAdmin(endpoint);

   const rolesList: RoleModel[] = response._embedded.roles.map((role: any) => ({
      ...role,
   }));

   return rolesList[0];
}