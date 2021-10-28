import React from "react";
import { QueryClientProvider } from "react-query";
import { CartProvider } from "../index";

const MedusaContext = React.createContext(null);

export const MedusaProvider = ({ medusaClient, queryClient, ...props }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MedusaContext.Provider {...props} value={{ client: medusaClient }}>
        <CartProvider {...props} />
      </MedusaContext.Provider>
    </QueryClientProvider>
  );
};

export const useMedusa = () => {
  const context = React.useContext(MedusaContext);
  if (!context) {
    throw new Error("useMedusa needs to be a child of MedusaProvider");
  }
  return context;
};
