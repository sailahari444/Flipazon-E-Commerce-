import React, { useEffect, useState } from "react";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import FormControl from "@mui/material/FormControl";
import { service } from "../../services/Service";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import { LinearProgress } from "../LinearProgress/LinearProgress";
import CustomizedRating from "./CustomizedRating";
import AddRating from "../AddRating/Addrating";

import "./ProductRating.css";
import Button from "@mui/material/Button";
import apiCalls from "../../Calls/apiCalls";

function ProductRating({ productId }) {
  // console.log("Pid:"+productId)
  const [ratingList, setrating] = useState([]);
  const [filterRatingList, setFilterRatingList] = useState([]);
  const [ratingArray, setRatingArray] = useState([]);
  const [totalRating, setTotalRating] = useState(0);
  const [reviewHeading, setReviewHeading] = useState("Customer Reviews");
  const [sort, setSort] = useState(true);
  const [isFilter, setIsFilter] = useState(false);

  // function setRatingObject(ratingList) {
  //   let array = [0, 0, 0, 0, 0];
  //   ratingList.map((rating) => (array[rating.rating - 1] += 1));
  //   setRatingArray(array);
  // }

  function filterArrayByStars(ratingNumber) {
    setReviewHeading(`${ratingNumber + 1} Star Review's`);
    let list = ratingList.filter(
      (rating) => rating.rating === ratingNumber + 1
    );
    setIsFilter(true);
    setFilterRatingList(list);
  }

  function reset() {
    setFilterRatingList(ratingList);
    setReviewHeading("All Review's");
    setIsFilter(false);
  }

  function sortArrayByStarAndDate(list) {
    return list.sort(function (a, b) {
      if (a.rating > b.rating) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  function sortArrayByRecent(list) {
    return list.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }
  useEffect(() => {
    let list = sort
      ? sortArrayByRecent(filterRatingList)
      : sortArrayByStarAndDate(filterRatingList);
    console.log(list);
    setFilterRatingList(list);
  }, [sort]);

  // const handleChange = (event) => {
  //   setSort(event.target.value);
  // };
  function setdata(data) {
    setrating(sortArrayByStarAndDate(data.review));
    setFilterRatingList(sortArrayByStarAndDate(data.review));
    setTotalRating(data.totalRating);
    setRatingArray(data.starData);
  }

  useEffect(() => {
    async function getProductRatingData() {
      //TODO: Change 1 with productId from props
      apiCalls
        .getProductRating(productId)
        .then((res) => {
          setdata(res.data);
        })
        .catch((err) => {
          // props.handleBearerToken(null);
        });
    }
    getProductRatingData();
  }, []);

  return (
    <div className="product-rating">
      <div className="column column-1 padding-list-children-10">
        <h2>Customer Ratings</h2>
        <div className="row margin-right-list-children-10 ">
          <div className="row ">
            <h1 className="rating-text">{totalRating}</h1>
            <StarRoundedIcon
              className="rating-text rating-star-filled"
              fontSize="large"
            />
          </div>
          <div className="column click" onClick={reset}>
            <div>Based on</div> <div>{`${ratingList.length} reviews`}</div>
          </div>
        </div>

        <div className="column reverse">
          {ratingArray.map((count, index) => (
            <div className="click" onClick={(e) => filterArrayByStars(index)}>
              <LinearProgress
                key={index}
                index={index}
                count={count}
                total={ratingList.length}
              />
            </div>
          ))}
        </div>
        {/* <h4>Share your thoughts</h4>
        <p>
          If you’ve used this product, share your thoughts with other customers
        </p>
        <AddRating buttonVariant="outlined" productId={productId}/> */}
      </div>

      <div className="column column-2 ">
        <div className="row justify-content-space-between ">
          <h2 style={{ paddingLeft: "20px" }}>{reviewHeading}</h2>
          {isFilter ? (
            <div></div>
          ) : (
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <MenuItem value={true}>Top Reviews</MenuItem>
                <MenuItem value={false}>Most Recent</MenuItem>
              </Select>
            </FormControl>
          )}
        </div>
        {filterRatingList.map((rating, index) => (
          <div key={index} className="column margin-20 padding-20">
            <div className="row margin-right-list-children-10 justify-content-space-between">
              <div className="row margin-right-list-children-10">
                <ProfileAvatar name={rating.userName} />
                <div className="column">
                  <h4>{rating.userName}</h4>
                  <CustomizedRating propValue={rating.rating} readOnly={true} />
                </div>
              </div>
              <div>
                {new Date(rating.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            <p className="review-text">{rating.review}</p>
            <Divider variant="middle" className="padding-10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductRating;
