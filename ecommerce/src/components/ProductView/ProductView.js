import img from '../../assets/images/user.png'
import img2 from '../../assets/images/heart.png'
// import 'bootstrap/dist/css/bootstrap.css';
import './ProductView.css'
import React, {useState,useEffect,useContext} from "react"; 
import Carousel from "react-elastic-carousel";
// import Item from "./Item";
import prev from '../../assets/images/left.png'
import next from '../../assets/images/next.png'
import { useLocation } from "react-router-dom";
import apiCalls from '../../Calls/apiCalls';
import { ProfileIdContext } from "../../App";
import  {useNavigate} from "react-router-dom";
import { Divider } from '@mui/material/Divider';
import ProductRating from '../ProductRating/ProductRating'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Modal, Button } from 'rsuite';
import {toast} from 'react-hot-toast';
import { service } from '../../services/Service'
import ProductService from '../../services/ProductService'

function ProductView() {
  const navigate=useNavigate();
  const location=useLocation();
  const[productId,setProductId]=useState(location.state.productId)
  const[productDetails,setProductDetails]=useState([])
  const profileId=JSON.parse(localStorage.getItem('profileId'));
  const [openModal, setOpenModal] = useState(false);
  const [wishlistDetails, setWishlistDetails] = useState({});
  // const [images,setImages]= useState();
  const [index, setIndex] = useState(0);
  useEffect(()=>{
    apiCalls.getProductDetail(productId).then((res)=>{
      setProductDetails(res.data)
      setImages(res.data.productImageUrl)
    }).catch((err) => {
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
  },[])

  const handleClose = () => {
    setOpenModal(false);
  }

  const handleOpen = () => {
    setOpenModal(true);
  }

  const renderWishlistNames = () => {
    const content = [];
    for (let key in wishlistDetails) {
      content.push(<div><Button key={key} onClick={addToWLHandler.bind(null,key)}>
        {wishlistDetails[key]}
      </Button></div>);
    }
    return content;
  }

  const addToWLHandler = (wishlistId) => {
    const jsonData = {
      wishlistId: wishlistId,
      productId: productId
    }
    console.log(jsonData)
    apiCalls.addProductToWishListService(JSON.stringify(jsonData))
      .then(response=>{
        toast.success('Product successfully added to wishlist');
        handleClose();
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

  useEffect(() => {
    async function getData() {      
      apiCalls
        .getWishlistIdsAndNamesByProfileId(profileId)
        .then((res) => {
          setWishlistDetails(res.data);                    
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

  

  
  const [images,setImages]= useState(["https://source.unsplash.com/user/c_v_r/500x500",
  "https://source.unsplash.com/user/c_v_r/400x500","https://source.unsplash.com/user/c_v_r/300x400"
]);


const addToCart = (product) => {
  // console.log(product);
  const data = {
    profileId: profileId,
    productDetails: {
      productId: productId,
      quantity: 1,
    },
  };
  apiCalls.sendProducts(data);
  // console.log(data);
  // navigate("/cart", { replace: true });
};

const buyNow=(product)=>{
  console.log("In buyNow")
  navigate("/buyNow",{
    state:{
      product:productDetails
    }
  })
}

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const prevImage=()=>{
    if(index==0){
      setIndex(2)
    }
    else{
      setIndex(index-1)
    }
    
  }

  const nextImage=()=>{
    if(index==2){
      setIndex(0)
    }
    else{
      setIndex(index+1)
    }
    
  }

  return (
    <div className='comp'>
      <div className='productView'>        
         <div className='productImage'>
          <img className='prodImg' src={images[index]} alt="" srcSet="" />
          <div className='carousalControl'>
          <img src={prev} width='50px' height='50px' onClick={prevImage}></img>
          <img src={next} width='50px' height='50px' onClick={nextImage}></img>
          </div>
          {/* <img className='prodImg' src="https://source.unsplash.com/user/c_v_r/500x500" alt="" srcset="" /> */}
          {/* <img className='prodImg' src="https://source.unsplash.com/user/c_v_r/500x500" alt="" srcset="" /> */}
         </div>
         <div className='productDetails'>
          <div className='productTitle'>
          <h1>{productDetails.productName} </h1>
          </div>
         <div className='productDescription'>
          <p>{productDetails.productDescription}</p>
         </div>
         <div className='price'>
          <h3>{productDetails.productPrice} Rs</h3>
         </div>
         
         <div className='prodButtons'>
         <div className='btn btn btn-warning' font-weight='bold1' onClick={handleOpen}><FavoriteBorderIcon /></div>
      <Modal
          open={openModal}
          onClose={handleClose}
          backdrop="true"
        >
          <Modal.Header>
            Select WishList
          </Modal.Header>
          <Modal.Body>
            {renderWishlistNames()}
          </Modal.Body>
          <Modal.Footer>
            
          </Modal.Footer>
        </Modal>
          <div className='btn btn btn-warning' font-weight='bold1' id='prodButton' onClick={addToCart}>Add to cart</div>
          {/* <div className='btn btn btn-warning' font-weight='bold1' id='prodButton' onClick={buyNow}>Buy Now</div> */}
         </div>
         </div>
         
    </div>
    <div className='rating'>
    <ProductRating productId={productId}/>
   </div>
    </div>
    
    
  )
}

export default ProductView