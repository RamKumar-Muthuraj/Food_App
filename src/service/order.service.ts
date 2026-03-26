import DomoApi from "@/API/domoAPI";
import { CollectionName } from "@/shared";

export const OrderService = {
  create: (data: any) =>
    DomoApi.CreateDocument(CollectionName.FOODAPP_ORDERS, data),
  getAll: () => DomoApi.ListDocuments(CollectionName.FOODAPP_ORDERS),

  getById: (id: string) =>
    DomoApi.GetDocument(CollectionName.FOODAPP_ORDERS, id),

  update: (id: string, data: any[]) =>
    DomoApi.UpdateDocument(CollectionName.FOODAPP_ORDERS, id, data),

  delete: (id: string) =>
    DomoApi.DeleteDocument(CollectionName.FOODAPP_ORDERS, id),
};
