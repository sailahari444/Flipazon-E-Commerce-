import React from 'react';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#FACC15',
    },
});

export default function CustomizedRating({ propValue, size, readOnly, setrating }) {
    return (
        <StyledRating
            name="read-only"
            value={propValue}
            onChange={(event, newValue) => {
                setrating(newValue)
            }}
            precision={0.1}
            size={size}
            icon={<StarRoundedIcon />}
            emptyIcon={<StarRoundedIcon className="rating-star-empty" />}
            readOnly={readOnly}
        />
    );
}