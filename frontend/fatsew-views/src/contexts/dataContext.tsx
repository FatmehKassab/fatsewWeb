import { createContext, useState, ReactNode } from "react";

type DataContextType = {
  data: [];
  currentData: null;
  loading: boolean;
  error: string | null;
  getAll: () => Promise<void>;
};

const initialContextValue: DataContextType = {
  data: [],
  currentData: null,
  loading: false,
  error: null,
  getAll: async () => {},
};

export const DataContext = createContext<DataContextType>(initialContextValue);

type DataProviderProps = {
  children: ReactNode;
};

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<[]>([]);
  const [currentData, setCurrentData] = useState<null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAll = async (api: { fetchAll: () => Promise<any> }) => {
    try {
      setLoading(true);
      const { data } = await api.fetchAll();
      setData(data);
      setError(null);
    } catch (err) {
      setError((err as any)?.response?.data?.message || (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        currentData,
        loading,
        error,
        getAll,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
