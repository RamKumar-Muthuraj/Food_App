import { useEffect, useState } from "react";

export function useCrud<T>(service: any) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    const res = await service.getAll();

    const flattened = res.map((item: any) => ({
      docId: item.id,       
      ...item.content,    
    })) as T[];

    setData(flattened);
    setLoading(false);
  };

  const create = async (payload: T) => {
    await service.create(payload);
    fetchAll();
  };

  const update = async (id: string, payload: T) => {
    await service.update(id, payload);
    fetchAll();
  };

  const remove = async (id: string) => {
    await service.delete(id);
    await fetchAll();
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { data, loading, create, update, remove, fetchAll };
}