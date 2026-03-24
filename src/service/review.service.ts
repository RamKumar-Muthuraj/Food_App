import DomoApi from "@/API/domoAPI";
import { CollectionName } from "@/shared";
import { Review } from "@/types/Food.types";


export const ReviewService = {
  getAll: () => DomoApi.ListDocuments(CollectionName.FOODAPP_REVIEWS),

  getById: (id: string) =>
    DomoApi.GetDocument(CollectionName.FOODAPP_REVIEWS, id),

  create: (data: Review) =>
    DomoApi.CreateDocument(CollectionName.FOODAPP_REVIEWS, data),

  update: (id: string, data: Review) =>
    DomoApi.UpdateDocument(CollectionName.FOODAPP_REVIEWS, id, data),

  delete: (id: string) =>
    DomoApi.DeleteDocument(CollectionName.FOODAPP_REVIEWS, id),
};
