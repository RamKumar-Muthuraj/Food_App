import DomoApi from "@/API/domoAPI";
import { CollectionName } from "@/shared";
import { Vendor } from "@/types/Vendor.types";

export const VendorService = {
  getAll: () => DomoApi.ListDocuments(CollectionName.FOODAPP_VENDORS),

  getById: (id: string) =>
    DomoApi.GetDocument(CollectionName.FOODAPP_VENDORS, id),

  create: (data: Vendor) =>
    DomoApi.CreateDocument(CollectionName.FOODAPP_VENDORS, data),

  update: (id: string, data: Vendor) =>
    DomoApi.UpdateDocument(CollectionName.FOODAPP_VENDORS, id, data),

  delete: (id: string) =>
    DomoApi.DeleteDocument(CollectionName.FOODAPP_VENDORS, id),
};
