export type UserModel = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  authProvider: "LOCAL" | "GOOGLE";
  providerId: string;
  createdAt: string;
  role: "USER" | "ADMIN";
};


export type UserAddress = {
  docId?: string; 
  id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: "true" | "false";
};


export type Address = {
  docId?: string;
  id?: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: string;
};