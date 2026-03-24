import { Button } from "@/shared";
import { Store, Star, MapPin } from "lucide-react";
import React, { useState } from "react";
import { ConfirmDelete } from "../components/ConfirmDelete";
import { AdminFormModal, Field } from "../components/AdminFormModal";
import { AdminTable, Column } from "../components/AdminTable";
import { AdminStats } from "../components/AdminStatsCard.";
import { useCrud } from "../hooks/useCrud";
import { VendorService } from "@/service/vendor.service";
import { Vendor } from "@/types/Vendor.types";

export default function AdminVendors() {
  const { data, create, update, remove } = useCrud<Vendor>(VendorService);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const vendorStatsConfig = (data: any[]) => [
    {
      label: "Total Vendors",
      value: data.length,
      icon: <Store className="w-5 h-5 text-primary" />,
    },
    {
      label: "Top Choice",
      value: data.filter((v) => v.isTopChoice === "true").length,
      icon: <Star className="w-5 h-5 text-yellow-500" />,
    },
    {
      label: "Locations",
      value: new Set(data.map((v) => v.location)).size,
      icon: <MapPin className="w-5 h-5 text-blue-500" />,
    },
  ];

  const vendorColumns = (
    setEditing: any,
    setDeleteId: any,
  ): Column<Vendor>[] => [
    {
      header: "Image",
      cell: (row: any) => (
        <img
          src={row.image}
          alt={row.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
      ),
    },
    { header: "Name", accessor: "name" },
    { header: "Type", accessor: "type" },
    { header: "Rating", accessor: "rating" },
    { header: "Location", accessor: "location" },
    { header: "Delivery", accessor: "deliveryTime" },

    {
      header: "Top Choice",
      cell: (row: any) => (row.isTopChoice === "true" ? "⭐ Yes" : "—"),
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
            size="sm"
          >
            Edit
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteId(row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const vendorFormConfig: Field[] = [
    { name: "name", label: "Vendor Name" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "image", label: "Image URL" },
    { name: "rating", label: "Rating" },
    { name: "phone", label: "Phone" },
    { name: "address", label: "Address", type: "textarea" },
    { name: "type", label: "Cuisine Type" },
    { name: "deliveryTime", label: "Delivery Time" },
    { name: "location", label: "Location" },
    {
      name: "isTopChoice",
      label: "Top Choice",
      type: "checkbox",
    },
  ];

  return (
    <div className="space-y-6">
      <AdminStats stats={vendorStatsConfig(data)} />

      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Vendor</h1>
        <Button onClick={() => setOpen(true)}>+ Add Vendor</Button>
      </div>
      <AdminTable<Vendor>
        data={data}
        columns={vendorColumns(setEditing, setDeleteId)}
      />

      <AdminFormModal
        open={open}
        title="Vendor"
        fields={vendorFormConfig}
        initialValues={editing}
        onClose={() => {
          setEditing(null);
          setOpen(false);
        }}
        onSubmit={(values) => {
          if (editing?.id) {
            update(editing.id, values);
          } else {
            create({ ...values, id: crypto.randomUUID() });
          }

          setOpen(false);
          setEditing(null);
        }}
      />

      <ConfirmDelete
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          remove(deleteId!);
          setDeleteId(null);
        }}
      />
    </div>
  );
}
