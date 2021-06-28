import React from "react";
import * as styles from "../../styles/ShippingMethod.module.css";
import { formatPrice } from "../../utils/helperFunctions";

const ShippingMethod = ({ handleOption, option, chosen }) => {
  return (
    <div
      className={`${styles.shippingOption} ${
        option.id === chosen?.id ? styles.chosen : ""
      }`}
      onClick={() => handleOption(option)}
      role="button"
      tabIndex="0"
    >
      <p>{option.name}</p>
      <p>{formatPrice(option.amount, "EUR")}</p>
    </div>
  );
};

export default ShippingMethod;