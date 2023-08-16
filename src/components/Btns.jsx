import React from "react";

const Btns = ({ cartsCount, switchToCart, addToOrder, switchToOrder }) => {
  return (
    <div className="buttons">
      <button onClick={switchToCart}> {cartsCount} Cart</button>
      <button onClick={switchToOrder}> Orders </button>
      <button onClick={addToOrder}>Confirm Order</button>
    </div>
  );
};

export default Btns;
