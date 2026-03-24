import DomoApi from "@/API/domoAPI";
import { CollectionName } from "@/shared";
import { Food } from "@/types/Food.types";

export const FoodService = {
  getAll: () => DomoApi.ListDocuments(CollectionName.FOODAPP_FOODS),

  getById: (id: string) =>
    DomoApi.GetDocument(CollectionName.FOODAPP_FOODS, id),

  create: (data: Food) =>
    DomoApi.CreateDocument(CollectionName.FOODAPP_FOODS, data),

  update: (id: string, data: Food) =>
    DomoApi.UpdateDocument(CollectionName.FOODAPP_FOODS, id, data),

  delete: (id: string) =>
    DomoApi.DeleteDocument(CollectionName.FOODAPP_FOODS, id),
};
