import React, { useEffect, useState, useContext } from "react";
import { BiShoppingBag } from "react-icons/bi";
import StoreContext from "../../context/store-context";
import { getSlug, resetOptions } from "../../utils/helper-functions";
import * as styles from "../../styles/product.module.css";
import { useCart, useItem, useProduct } from "../../medusa-hooks";

const Product = ({ location }) => {
  const id = getSlug(location.pathname);
  const { product } = useProduct(id);
  const { addItem } = useCart();
  const { item, quantity, helpers } = useItem(product?.variants[0]);
  const {
    decrementQuantity,
    incrementQuantity,
    resetItem,
    getSelectItemProps,
  } = helpers;

  const handleAddToBag = () => {
    if (!item || Object.keys(item).length === 0) {
      return;
    }

    addItem({
      variant: item,
      quantity,
    });
    resetItem();
  };

  return product ? (
    <div className={styles.container}>
      <figure className={styles.image}>
        <div className={styles.placeholder}></div>
      </figure>
      <div className={styles.info}>
        <span />
        <div>
          <div className="title">
            <h1>{product.title}</h1>
          </div>
          <p className="price">19.50 EUR</p>
          <div className={styles.selection}>
            <p>Select Size</p>
            <div className="selectors">
              {product.variants
                .slice(0)
                .reverse()
                .map((variant) => {
                  return (
                    <button
                      key={variant.id}
                      className={`${styles.sizebtn} ${
                        variant.id === item.id ? styles.selected : null
                      }`}
                      {...getSelectItemProps({ item: variant })}
                    >
                      {variant.title}
                    </button>
                  );
                })}
            </div>
          </div>
          <div className={styles.selection}>
            <p>Select Quantity</p>
            <div className={styles.qty}>
              <button className={styles.qtybtn} onClick={decrementQuantity}>
                -
              </button>
              <span className={styles.ticker}>{quantity}</span>
              <button className={styles.qtybtn} onClick={incrementQuantity}>
                +
              </button>
            </div>
          </div>
          <button
            className={styles.addbtn}
            disabled={Object.keys(item).length === 0}
            onClick={handleAddToBag}
          >
            <span>Add to bag</span>
            <BiShoppingBag />
          </button>
          <div className={styles.tabs}>
            <div className="tab-titles">
              <button className={styles.tabtitle}>Product Description</button>
            </div>
            <div className="tab-content">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Product;
