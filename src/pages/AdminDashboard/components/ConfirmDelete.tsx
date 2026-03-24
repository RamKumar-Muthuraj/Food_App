import { Button, Card } from "@/shared";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDelete({
  open,
  title = "Delete Item",
  description = "Are you sure you want to delete this item?",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            <Card className="p-6 w-[400px] space-y-4">
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="text-muted-foreground">{description}</p>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>

                <Button
                  variant="destructive"
                  onClick={onConfirm}
                >
                  Delete
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}