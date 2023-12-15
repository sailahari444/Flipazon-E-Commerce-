import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import Tooltip from '@mui/material/Tooltip';
import ExceptionHandler from '../../ExceptionHandler/ExceptionHandler';


import CustomizedRating from "../ProductRating/CustomizedRating";
import { Notification, notifySuccess, notifyError } from "../../utils/Notification";

import "./Addrating.css";
import apiCalls from "../../Calls/apiCalls";

import { useNavigate } from "react-router";

export default function AddRating({ buttonVariant, productId }) {

  const [review, setReview] = useState("");
  const [header, setHeader] = useState("Write A Review");
  const [userName, setUserName] = useState("");
  const [product, setProduct] = useState({});
  const [open, setOpen] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [rating, setrating] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const profileId=JSON.parse(localStorage.getItem('profileId'));
  const [loaded, setLoaded] = useState(false);
  const navigate=useNavigate();

  // console.log(profileId)

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    width: "48vw",
    borderRadius: "12px",
  };

  useEffect(() => {
    if (review.length !== 0 && rating !== 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [review, rating]);

  useEffect(() => {
    // console.log("ega")
    async function getProductDataById() {
      //TODO: Change 1 with productId from props
      apiCalls
        .getProductDetail(productId)
        .then((res) => {
          setProduct(res.data);
          setLoaded(true)
          // console.log(product.productImageUrl[0])
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
    getProductDataById()
  }, []);

  // useEffect(()=>{
  //   console.log(product)
  // },[product])

  function onClick() {
    if (isValid) {
      let ratingReview = {
        //TODO: Change 1 with productId from props
        productId: productId,
        userId: profileId,
        rating: rating,
        review: review,
      };
      apiCalls
        .saveProductRating(ratingReview)
        .then((res) => {
          // console.log(res);
          notifySuccess('Rating Added Succesfully');
          handleClose()
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
  }
  function checkIfRatingExist() {
    handleOpen()
    let ratingId = {
      //TODO: Change 1 with productId from props
      productId: productId,
      userId: profileId
    }
    apiCalls
      .getProductRatingByUserId(ratingId)
      .then((res) => {
        // console.log(res);
        setrating(res.data.rating)
        setReview(res.data.review)
        setHeader("Edit Your Previous Review")
        setIsEditable(true)
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
  let content = <></>;
  if(loaded){
    content=<div>
    <Button style={{ width: "100%" }} variant={buttonVariant} onClick={checkIfRatingExist}>Write A Review</Button>
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Card sx={style} className="column">
        <div className="row align-item-start">
          <div className="column column-1">
            <img className="product-rating-image" src={product.productImageUrl[1]} alt="Flipazon Logo" loading="lazy" />
          </div>
          <div className="column column-2 padding-list-children-10">
            <div className="row align-item-start">
              <div className="column">
                <h2>{header}</h2>
                <h3>{product.productName}</h3>
                <div className="row margin-right-list-children-10">
                  <CustomizedRating propValue={rating} size="large" readOnly={false} setrating={setrating} />
                  <div>{rating !== 0 ? rating : ""}</div>
                </div>
              </div>
              <div className="row margin-right-list-children-10">
                {/* <Tooltip title={isEditable ? "Delete Your Review" : ""}>
                  <IconButton aria-label="delete" disabled={!isEditable} color="primary">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip> */}
                <Button variant="contained" disabled={!isValid} onClick={onClick}>
                  Submit
                </Button>
              </div>
            </div>
            <TextField id="outlined-multiline-static" label="Review" multiline value={review} onChange={(e) => setReview(e.target.value)} rows={4} placeholder="Write a Review" />
          </div>
        </div>
      </Card>
    </Modal>
    <Notification />
  </div>
  }
  return (
    content
  );
}
