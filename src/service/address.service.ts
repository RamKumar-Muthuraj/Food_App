import DomoApi from "@/API/domoAPI";
import { CollectionName } from "@/shared";

export const AddressService = {
  create: (data: any) =>
    DomoApi.CreateDocument(CollectionName.FOODAPP_ADDRESSES, data),

  update: (id: string, data: any) =>
    DomoApi.UpdateDocument(CollectionName.FOODAPP_ADDRESSES, id, data),

  delete: (id: string) =>
    DomoApi.DeleteDocument(CollectionName.FOODAPP_ADDRESSES, id),

  getAll: () => DomoApi.ListDocuments(CollectionName.FOODAPP_ADDRESSES),
};
