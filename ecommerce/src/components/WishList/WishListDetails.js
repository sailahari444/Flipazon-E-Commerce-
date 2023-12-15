import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import { Form, Link } from 'react-router-dom';
import { service } from '../../services/Service'
import { ProfileIdContext } from '../../App';
import '../../../node_modules/rsuite/dist/rsuite.min.css';
import { Modal, Button } from 'rsuite';
import {toast} from 'react-hot-toast';
import "./WishListDetails.css";
import apiCalls from '../../Calls/apiCalls';
// import ExceptionHandler from '../../ExceptionHandler/ExceptionHandler';
import { useNavigate } from 'react-router-dom';

const WishListDetails = (props) => {
  const inputRef = useRef();
  // const ctx = useContext(ProfileIdContext);
  const [open, setOpen] = useState(false);
  const [newWlCreated, setNewWlCreated] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate=useNavigate();
  const profileId=JSON.parse(localStorage.getItem('profileId'));
  const handleSubmit = () => {
    const wishlistName = inputRef.current.value.trim();
    console.log(wishlistName)
    if(wishlistName.length===0){
      // console.log('if blck')np
      toast.error("Name Cannot be Blank!");
    }
    else{
      const jsonData = {
        profileId: profileId,
        wishlistName: wishlistName
      }
      apiCalls.createNewWishListService(JSON.stringify(jsonData))
             .then(response=>{
              toast.success("Wishlist Created Successfully!")
              setOpen(false);
              setNewWlCreated(prevState=>!prevState);
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

            //TODO
            //  .catch(err=>toast.error("Wishlist Already Exists! Choose a different name"));                   
    }    
  }
  const [wishlistDetails, setWishlistDetails] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    async function getData() {
      // console.log(profileId)
      apiCalls
        .getWishlistIdsAndNamesByProfileId(profileId)
        .then((res) => {
          setWishlistDetails(res.data);
          setIsLoaded(true);
          // console.log(res.data);
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
  }, [newWlCreated]);

  const renderContent = () => {
    const content = [];
    for (let key in wishlistDetails) {
      content.push(<div className='div3'><Link key={key} to={`/wishlist/${key}`}>
        {wishlistDetails[key]}
      </Link></div>);
    }
    return content;
  }

  return (
    <>
      <div className='wishlistdetaildiv1'>
      <h3>Your WishLists</h3>
        <div className='div2'>      
        {isLoaded && renderContent()}
        </div>  
        <Button color="green" appearance="primary" 
                onClick={handleOpen}>
                Create New Wishlist
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                backdrop="true"
            >
                <Modal.Header>
                    New Wishlist
                </Modal.Header>
                <Modal.Body>
                <form>
                <label>Wishlist Name : </label>{" "}
                  <input placeholder='Enter Wishlist Name' ref={inputRef}/>
                  
                </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleSubmit} 
                        appearance="primary">
                        Create
                    </Button>
                    <Button onClick={handleClose} 
                        appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
      </div>
    </>
  )
}

export default WishListDetails