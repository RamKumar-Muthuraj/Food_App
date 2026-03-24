import DomoApi from "@/API/domoAPI";
import { CollectionName } from "@/shared";

export const OrderService = {
  create: (data: any) =>
    DomoApi.CreateDocument(CollectionName.FOODAPP_ORDERS, data),
};