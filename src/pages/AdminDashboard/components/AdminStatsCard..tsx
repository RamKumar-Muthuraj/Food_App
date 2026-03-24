import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

type StatItem = {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: React.ReactNode;
};

export function AdminStats({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="p-6">
            <div className="flex justify-between mb-3">
              {stat.icon}
              {stat.trend}
            </div>

            <p className="text-muted-foreground text-sm">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}