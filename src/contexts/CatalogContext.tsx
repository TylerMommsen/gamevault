"use client";

import { createContext, useContext, useState } from "react";

type CatalogContextProvider = {
  children: React.ReactNode;
};

const CatalogContext = createContext<any>(null);

export function CatalogProvider({ children }: CatalogContextProvider) {
  const [filters, setFilters] = useState({
    general: "",
    platform: "",
    searchQuery: "",
  });

  return (
    <CatalogContext.Provider value={{ filters, setFilters }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  return useContext(CatalogContext);
}
