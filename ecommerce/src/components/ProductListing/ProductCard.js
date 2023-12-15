import { React, useEffect, useState, useContext } from "react";
import "./ProductCard.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import apiCalls from "../../Calls/apiCalls";
import ProductView from "./../ProductView/ProductView";
import { Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import ExceptionHandler from '../../ExceptionHandler/ExceptionHandler';

function ProductCard() {
  const [products, setProductDetails] = useState([]);
  const navigate = useNavigate();
  const profileId = JSON.parse(localStorage.getItem("profileId"));
  const addToCart = (product) => {
    const data = {
      profileId: profileId,
      productDetails: {
        productId: product.productId,
        quantity: 1,
      },
    };
    apiCalls.sendProducts(data);
    toast.success(` ${product.productName} added to cart`, {
      position: "bottom-left",
    });
  };
  useEffect(() => {
    async function getData() {
      apiCalls
        .getAllProducts()
        .then((res) => {
          setProductDetails(res.data);
        })
        .catch((err) => {
          const error=err
          navigate('/exceptionHandler',{
            state:{
              code:error.response.status,
              // message:error.response.data,
              path:window.location.pathname
            }
          }
          )
          return
        });
    }
    getData();
  }, []);

  const viewProduct = (productId) => {
    // console.log("Clicked")
    navigate("/productView", {
      state: {
        productId: productId,
      },
    });
  };

  const listItems = products.map((item) => {
    return (
      <div className="cards" key={item.id}>
        <Card sx={{ maxWidth: 250, flexGrow: 1 }}>
          <CardMedia
            sx={{ height: 250 }}
            image={item.productImageUrl[0]}
            onClick={() => viewProduct(item.productId)}
          />
          <CardContent onClick={() => viewProduct(item.productId)}>
            <Typography gutterBottom variant="h5" component="div">
              <h4>{item.productName}</h4>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <p>{item.productPrice} Rs</p>
            </Typography>
          </CardContent>
          <CardActions>
            <div
              className="btn btn btn-warning"
              id="addCartBtn"
              onClick={() => addToCart(item)}
              font-weight="bold1"
            >
              Add to cart
            </div>
          </CardActions>
        </Card>
      </div>
    );
  });
  return <div className="cardItem">{listItems}</div>;
}

export default ProductCard;
