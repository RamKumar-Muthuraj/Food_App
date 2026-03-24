import DomoApi from "@/API/domoAPI";
import { CollectionName } from "@/shared";

export const CartService = {
  create: (data: any) =>
    DomoApi.CreateDocument(CollectionName.FOODAPP_CART, data),

  update: (id: string, data: any) =>
    DomoApi.UpdateDocument(CollectionName.FOODAPP_CART, id, data),

  delete: (id: string) =>
    DomoApi.DeleteDocument(CollectionName.FOODAPP_CART, id),

  getAll: () => DomoApi.ListDocuments(CollectionName.FOODAPP_CART),
};
