import { useQuery } from "react-query";
import { useMedusa } from "..";

const SHIPPING_OPTION_QUERY_KEY = `shipping_options`;

export const useShippingOptions = (query, reactQueryOptions) => {
  const { client } = useMedusa();
  const rq = useQuery(
    SHIPPING_OPTION_QUERY_KEY,
    async () => {
      const res = await client.shipping_options.list(query);
      return res.data;
    },
    reactQueryOptions
  );
  return rq;
};
