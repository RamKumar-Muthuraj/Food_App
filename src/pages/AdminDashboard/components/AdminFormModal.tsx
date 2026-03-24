import {
  Card,
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Input,
} from "@/shared";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "select" | "checkbox" | "image";
  options?: { label: string; value: string }[];
};

type Props = {
  open: boolean;
  title: string;
  fields: Field[];
  initialValues?: any;
  onClose: () => void;
  onSubmit: (values: any) => void;
};

export function AdminFormModal({
  open,
  onClose,
  onSubmit,
  title,
  fields,
  initialValues = {},
}: Props) {
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    setForm(initialValues || {});
  }, [initialValues]);

  const handleChange = (name: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Card className="p-6 w-[600px] space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{title}</h2>
              <Button variant="ghost" onClick={onClose}>
                <X />
              </Button>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div
                  key={field.name}
                  className={`space-y-1 ${
                    field.type === "textarea" ? "md:col-span-2" : ""
                  }`}
                >
                  <label className="text-sm font-medium">{field.label}</label>

                  {/* TEXT */}
                  {(!field.type || field.type === "text") && (
                    <Input
                      value={form[field.name] || ""}
                      onChange={(e: any) =>
                        handleChange(field.name, e.target.value)
                      }
                    />
                  )}

                  {/* NUMBER */}
                  {field.type === "number" && (
                    <Input
                      type="number"
                      value={form[field.name] || ""}
                      onChange={(e: any) =>
                        handleChange(field.name, e.target.value)
                      }
                    />
                  )}

                  {/* TEXTAREA */}
                  {field.type === "textarea" && (
                    <textarea
                      className="w-full border rounded p-2"
                      value={form[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                    />
                  )}

                  {/* SELECT */}
                  {field.type === "select" && (
                    <Select
                      value={form[field.name] || ""}
                      onValueChange={(value) => handleChange(field.name, value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>

                      <SelectContent>
                        {field.options?.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {/* CHECKBOX */}
                  {field.type === "checkbox" && (
                    <Input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={form[field.name] === "true"}
                      onChange={(e: any) =>
                        handleChange(
                          field.name,
                          e.target.checked ? "true" : "false",
                        )
                      }
                    />
                  )}

                  {/* IMAGE PREVIEW */}
                  {field.name === "image" && form.image && (
                    <img
                      src={form.image}
                      alt="preview"
                      className="w-20 h-20 rounded object-cover mt-2"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={() => onSubmit(form)}>Save</Button>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
