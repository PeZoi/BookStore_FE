class UserModel {
   idUser: number;
   dateOfBirth: Date;
   deliveryAddress: string;
   purchaseAddress: string;
   email: string;
   firstName: string;
   lastName: string;
   gender: string;
   password: string;
   phoneNumber: string;
   username: string;

   constructor(idUser: number,
      dateOfBirth: Date,
      deliveryAddress: string,
      purchaseAddress: string,
      email: string,
      firstName: string,
      lastName: string,
      gender: string,
      password: string,
      phoneNumber: string,
      username: string,) {
      this.idUser = idUser;
      this.dateOfBirth = dateOfBirth;
      this.deliveryAddress = deliveryAddress;
      this.purchaseAddress = purchaseAddress;
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
      this.gender = gender;
      this.password = password;
      this.phoneNumber = phoneNumber;
      this.username = username;
   }
}

export default UserModel;