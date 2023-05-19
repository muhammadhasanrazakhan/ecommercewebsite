import React, { Fragment, useEffect, useState } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
//import ReactJsAlert from "reactjs-alert";

const Home = () => {

  // const [status, setStatus] = useState(false);
  // const [type, setType] = useState("");
  // const [title, setTitle] = useState("");

// const product = {
//     name:"Blue TShirt",
//     images:[{url:"https://i.ibb.co/DRST111n/1.webp"}],
//     price:"$3000",
//     _id:"hasan RAza"
// }
    
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);



  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch,alert]);
      // setStatus(true);
      // setType("error");
      // setTitle(error);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />
          
          {/* <ReactJsAlert
            status={status} // true or false
            type={type} // success, warning, error, info
            title={title}
            quotes={false}
            quote="This is a dummy design that shows an example of reactjs-alert"
            Close={() => setStatus(false)}
          /> */}
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;