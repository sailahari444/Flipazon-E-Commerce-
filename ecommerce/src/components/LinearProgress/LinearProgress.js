import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

export const LinearProgress = ({ index, count, total }) => {
  return (
    <div className="row margin-right-list-children-10">
      <div className="row margin-right-list-children-10" >
        <div>{`${index + 1}`}</div>
        <StarRoundedIcon className="rating-star-filled" />
      </div>
      <ProgressBar completed={(count * 100) / total} isLabelVisible={false} borderRadius={"20px"} height="12px" width="200px" bgColor={"#FACC15"} baseBgColor={"#F3F4F6"} />
      <div className="text-align-right">{`${Math.round((count * 100) / total)}%`}</div>
    </div>
  );
};
