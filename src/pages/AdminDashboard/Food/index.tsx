import { AdminTable, Column } from "../components/AdminTable";
import { useState } from "react";
import { Button } from "@/shared";
import { FoodService } from "@/service/food.service";
import { useCrud } from "../hooks/useCrud";
import { ConfirmDelete } from "../components/ConfirmDelete";

import { ChefHat, TrendingUp, Leaf } from "lucide-react";
import { AdminStats } from "../components/AdminStatsCard.";
import { AdminFormModal, Field } from "../components/AdminFormModal";
import { Food } from "@/types/Food.types";
import { VendorService } from "@/service/vendor.service";
import { Vendor } from "@/types/Vendor.types";

export default function AdminFoods() {
  const { data, remove, create, update } = useCrud<Food>(FoodService);
  const { data: vendors } = useCrud<Vendor>(VendorService);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const stats = [
    {
      label: "Total Foods",
      value: data.length,
      icon: <ChefHat className="w-5 h-5 text-primary" />,
    },
    {
      label: "Veg Items",
      value: data.filter((f) => f.isVeg === "true").length,
      icon: <Leaf className="w-5 h-5 text-green-500" />,
    },
    {
      label: "Trending",
      value: data.filter((f) => f.isTrending === "true").length,
      icon: <TrendingUp className="w-5 h-5 text-blue-500" />,
    },
  ];

  const columns: Column<Food>[] = [
    { header: "ID", accessor: "id" },
    {
      header: "Vendor",
      cell: (row) => vendors.find((v) => v.docId === row.vendorId)?.name || "-",
    },
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    { header: "Price", accessor: "price" },
    {
      header: "Image",
      cell: (row: any) => (
        <img
          src={row.image}
          alt={row.name}
          className="w-12 h-12 rounded-md object-cover"
        />
      ),
    },

    { header: "Category", accessor: "category" },

    {
      header: "Chef",
      cell: (row: any) => (row.isChefRecommended === "true" ? "Yes" : "No"),
    },
    {
      header: "Veg",
      cell: (row: any) => (row.isVeg === "true" ? "Yes" : "No"),
    },
    {
      header: "Trending",
      cell: (row: any) => (row.isTrending === "true" ? "Yes" : "No"),
    },
    {
      header: "Slide",
      cell: (row: any) => (row.isShowAsSlide === "true" ? "Yes" : "No"),
    },

    {
      header: "Actions",
      cell: (row: any) => (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setEditing(row);
              setOpen(true);
            }}
          >
            Edit
          </Button>

          <Button variant="destructive" onClick={() => setDeleteId(row.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const foodFields: Field[] = [
    {
      name: "vendorId",
      label: "Vendor",
      type: "select",
      options: vendors.map((v) => ({
        label: v.name,
        value: v.docId,
      })),
    },

    { name: "name", label: "Food Name" },

    { name: "description", label: "Description", type: "textarea" },

    { name: "price", label: "Price", type: "number" },

    { name: "image", label: "Image URL" },

    {
      name: "category",
      label: "Category",
      type: "select",
      options: [
        { label: "South Indian", value: "South Indian" },
        { label: "North Indian", value: "North Indian" },
        { label: "Fast Food", value: "Fast Food" },
        { label: "Biryani", value: "Biryani" },
        { label: "Dessert", value: "Dessert" },
      ],
    },

    {
      name: "isChefRecommended",
      label: "Chef Recommended",
      type: "checkbox",
    },
    {
      name: "isVeg",
      label: "Veg",
      type: "checkbox",
    },
    {
      name: "isTrending",
      label: "Trending",
      type: "checkbox",
    },
    {
      name: "isShowAsSlide",
      label: "Show in Slide",
      type: "checkbox",
    },
  ];

  return (
    <div className="space-y-6">
      <AdminStats stats={stats} />

      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Foods</h1>
        <Button onClick={() => setOpen(true)}>+ Add Food</Button>
      </div>

      <AdminTable<Food> data={data} columns={columns} />

      <ConfirmDelete
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          remove(deleteId!);
          setDeleteId(null);
        }}
      />

      <AdminFormModal
        open={open}
        title="Food"
        fields={foodFields}
        initialValues={editing}
        onClose={() => {
          setEditing(null);
          setOpen(false);
        }}
        onSubmit={(values) => {
          if (editing?.docId) {
            update(editing.docId, values);
          } else {
            create({ ...values, id: crypto.randomUUID() });
          }
          setEditing(null);
          setOpen(false);
        }}
      />
    </div>
  );
}
