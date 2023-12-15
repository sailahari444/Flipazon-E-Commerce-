import React from 'react'
import './Error400.css'
import ErrorImage from '../../../assets/images/400error.jpg'
import {Link} from 'react-router-dom'

function Error400() {
  return (
	<div>
		{/* <img src={ErrorImage} height="300px"></img>
 		<div>
 			<input type="button" value="Login Again" />
 		</div> */}
		 <div className="container1">
      <div className="popup">
        <img src={ErrorImage}></img>
        <h2>Bad Request</h2>
        <h3>Please Login Again</h3>
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

export default Error400

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