import React from 'react'
import './Error503.css'
import ErrorImage from '../../../assets/images/503error.jpg'
import {Link} from 'react-router-dom'

function Error503() {
  return (
	<div>
		{/* <img src={ErrorImage} height="300px"></img>
 		<div>
 			<input type="button" value="Login Again" />
 		</div> */}
		 <div className="container1">
      <div className="popup">
        <img src={ErrorImage}></img>
        {/* <h2>Service</h2> */}
        <h3>Please try again after sometime</h3>
        {/* <p> Your booking has been confirmed. You will recieve your booking
              details via your e-mail id.</p> */}
        <Link to={"/"}>
        <button type="button">Login Again</button>
        </Link>
      </div>
    </div>
	</div>
  )
}

export default Error503

// function Error500() {
//   return (
//     <div>
// 		<img src={ErrorImage} height="300px"></img>
// 		<div>
// 			<input type="button" value="Login Again" />
// 		</div>
// 	</div>
//   )
// }
// export default Error500