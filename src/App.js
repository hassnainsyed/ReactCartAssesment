import React, { useEffect, useState } from "react";
import Header from "./components/header";
import InputForms from "./components/inputForms";
import ProductList from "./components/ProductList";
import Btns from "./components/Btns";

const defaultValues = {
  name: "",
  price: 0,
  desc: "",
};

const App = () => {
  const [productValues, setProductValues] = useState(defaultValues);

  // done
  const gettingProductsFromLocalStorage = () => {
    let data = localStorage.getItem("products");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  const [products, setProducts] = useState(gettingProductsFromLocalStorage);
  const [carts, setCarts] = useState([]);

  ////////My work/////////
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  //////////////////////////

  const [showProducts, setShowProducts] = useState(true);
  
 
  // done
  const inputHandlers = (e) => {
    setProductValues({
      ...productValues,
      [e.target.name]: e.target.value,
    });
  };

  // running
  const addProduct = () => {
    

    if (
      productValues.name === "" ||
      productValues.desc === "" ||
      productValues.price === 0
    ) {
      // alert all values are required
      alert("All values are required to add a product");
    } else {
      const newProduct = {
        name: productValues.name,
        desc: productValues.desc,
        price: productValues.price,
        id: new Date(),
      };

      setProducts([...products, newProduct]);
      setProductValues(defaultValues);
    }
  };

  // done
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);
  // done
  const removeProduct = (id) => {
    setProducts(products.filter((x) => x.id !== id));
  };
 
  // done
  const addToCart = (x) => {
    removeProduct(x.id);
    setCarts([...carts, x]);
  };
  

// I make this fuction to confirm the order
  const confirmOrder = () => {
    setOrders([...orders, ...carts]);
    setCarts([]);
  };
/// and this one to switch 
const switchToOrder = () => {
  setShowOrders(!showOrders);
};


  // ShowProduct -> true ---- Products
  // ShowProduct -> false ----- carts
  const switchToCart = () => {
    setShowProducts(!showProducts);
  };

  const totalAmount = carts.reduce((x, y) => x + +y.price, 0);

  return (
    <div className="container">
<Header title={"Product To Cart"} />
      <InputForms
        productValues={productValues}  inputHandlers={inputHandlers}  addProduct={addProduct}
       />
      <Btns
        switchToCart={switchToCart} cartsCount={carts.length}
        switchToOrder={switchToOrder} addToOrder={confirmOrder} 
      />
      {showProducts === true ? (
        <ProductList products={products} addToCart={addToCart} />
      ) : (
                <>
                   <ul>
                   <h5> Total Amount : {totalAmount} </h5>
                     {carts.map((x) => (
                       <>
                         <li
                           style={{
                             backgroundColor: "white",
                             padding: "10px",
                             borderRadius: "5px",
                             marginBottom: "5px",
                           }}
                        >
                           {x.name} - {x.price} PKR
                       </li>
                       </>
                    ))}
                   </ul>
                 </>
      )
      }
      {showOrders === true ? (
        <ul>
          {orders.map((x) => (
            <li
              key={x.id}
              style={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "5px",
              }}
            >
              {x.name} - {x.price} PKR
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
export default App;