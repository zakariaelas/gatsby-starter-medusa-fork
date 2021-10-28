import Medusa from "@medusajs/medusa-js";
import { Location } from "@reach/router";
import React from "react";
import { QueryClient } from "react-query";
import Layout from "./src/components/layout/layout";
import { DisplayProvider } from "./src/context/display-context";
import { StoreProvider } from "./src/context/store-context";
import { MedusaProvider } from "./src/medusa-hooks";

const BACKEND_URL = process.env.GATSBY_STORE_URL || "http://localhost:9000";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 30000,
    },
  },
});
const medusaClient = new Medusa({ baseUrl: BACKEND_URL });

export const wrapRootElement = ({ element }) => {
  return (
    <MedusaProvider medusaClient={medusaClient} queryClient={queryClient}>
      <StoreProvider>
        <DisplayProvider>
          <Location>
            {(location) => <Layout location={location}>{element}</Layout>}
          </Location>
        </DisplayProvider>
      </StoreProvider>
    </MedusaProvider>
  );
};
