import { useNavigate,useLocation } from "react-router-dom";


import {React,useState} from 'react'
import Error500 from './../components/ExceptionPages/Error500/Error500';
import Error401 from './../components/ExceptionPages/Error401/Error401';
import Error400 from './../components/ExceptionPages/Error400/Error400';
import Error404 from './../components/ExceptionPages/Error404/Error404';
import Error503 from './../components/ExceptionPages/Error503/Error503';
function ExceptionHandler() {
  const location=useLocation();
  // const err=location.state.message;
  const code=location.state.code
  const path=location.state.path
  // console.log(err)
  // console.log(code)

  if(code==401){
                // if(err==="Unauthorized access to application"){
                  return (
                    <div><Error401/></div>
                  )
                // }
              }
              if(code==500){
                // if(err==="Unauthorized access to application"){
                  return (
                    <div><Error500/></div>
                  )
                // }
              }
              if(code==400){
                return(
                  <div><Error400/></div>
                )
              }
              if(code==404){
                return(
                  <div><Error404/></div>
                )
              }
              if(code==503){
                return(
                  <div><Error503/></div>
                )
              }
}

export default ExceptionHandler