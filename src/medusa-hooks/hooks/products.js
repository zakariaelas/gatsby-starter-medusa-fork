import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useMedusa } from "..";

const PRODUCTS_QUERY_KEY = `products`;

export const useProducts = (query, reactQueryOptions) => {
  const { client } = useMedusa();
  const { data: response, ...reactQueryUtils } = useQuery(
    PRODUCTS_QUERY_KEY,
    async () => {
      const res = await client.products.list(query);
      return res.data;
    },
    reactQueryOptions
  );
  return { ...response, reactQueryUtils };
};

export const useProduct = (id, reactQueryOptions) => {
  const { client } = useMedusa();
  const { data: product, ...reactQueryUtils } = useQuery(
    [PRODUCTS_QUERY_KEY, { id }],
    async () => {
      const res = await client.products.retrieve(id);
      return res.data?.product;
    },
    reactQueryOptions
  );

  return { product, reactQueryUtils };
};

export const useItem = (initialItem) => {
  const [item, setItem] = React.useState({});
  const [quantity, setQuantity] = React.useState(1);

  useEffect(() => {
    if (initialItem) setItem(initialItem);
  }, [initialItem]);

  const getSelectItemProps = ({ onClick, item, ...props } = {}) => {
    return {
      ...props,
      onClick: (...args) => {
        setItem(item);
        onClick && onClick(...args);
      },
    };
  };

  const incrementQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1);
    }
  };

  const resetItem = () => {
    setItem({});
    setQuantity(1);
  };

  return {
    item,
    quantity,
    helpers: {
      getSelectItemProps,
      incrementQuantity,
      decrementQuantity,
      resetItem,
    },
  };
};
