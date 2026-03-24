import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";

export type Column<T> = {
  header: string;
  accessor?: keyof T;
  cell?: (row: T) => React.ReactNode;
  className?: string;
};

type AdminTableProps<T> = {
  title?: string;
  description?: string;
  columns: Column<T>[];
  data: T[];
};

export function AdminTable<T>({
  title,
  description,
  columns,
  data,
}: AdminTableProps<T>) {
  return (
    <Card className="border-primary/10">
      {(title || description) && (
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.header}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((row, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                {columns.map((col) => (
                  <TableCell key={col.header} className={col.className}>
                    {col.cell
                      ? col.cell(row)
                      : (row[col.accessor as keyof T] as React.ReactNode)}
                  </TableCell>
                ))}
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
