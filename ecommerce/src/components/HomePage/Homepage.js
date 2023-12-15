import React,{useEffect, useState, useRef} from 'react';
import './Homepage.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ProductListing from './../ProductListing/ProductListing';

function Homepage()
{
    const imageList=["https://images-eu.ssl-images-amazon.com/images/G/31/img23/Fashion/GW/MFD/July/Deals-Unrec-PC-3000._CB601247036_.jpg",
"https://global-uploads.webflow.com/605826c62e8de87de744596e/618e5e4a383af7f5357ac553_1%20Blog%20Covers%20eCommerce%20image%20carousels-%20The%20good%2C%20the%20bad%2C%20and%20the%20ugly.jpg","https://images-eu.ssl-images-amazon.com/images/G/31/img23/Fashion/GW/MFD/July/Deals-Unrec-PC-3000._CB601247036_.jpg",
"https://images-eu.ssl-images-amazon.com/images/G/31/img23/PCA/Groomingfest/DesktopHero_UNREC-2X._CB601245817_.jpg",
"https://images-eu.ssl-images-amazon.com/images/G/31/vendorcentral/supporthub/trainingCourses/learningPaths/5300-Kitchen---Water-bottles--Lunch-box--hero-v2-3000-x-1200-_Under_1._CB601243436_.jpg",
"https://images-eu.ssl-images-amazon.com/images/G/31/img23/Beauty/GW/MFD/MFD-July-hero-PCskin._CB600958145_.jpg",
"https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Shreyansh/BAU/Unrexc/D70978891_INWLD_BAU_Unrec_Uber_PC_Hero_3000x1200._CB594707876_.jpg",
"https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/July_23/MFD/Unrec/Jewelry/3000._CB601232246_.jpg"]

    // const productList=[""]
    
    const [imageNo,setImageNo]=useState(0);
    const timerRef=useRef(null);
    let slideBtnLeft = document.getElementById("slide-btn-left")
    let slideBtnRight = document.getElementById("slide-btn-right")
    let imgItem = document.querySelectorAll(".image-item")
    
    // console.log(imgItem.length-1)

    let startSlider = 0
    let endSlider = imgItem.length-1


    
    const leftArrowHandler = ()=>{
        setImageNo((prev)=>{
            if(prev>0){
                return prev-1
            }
            return imageList.length-1;
        });
        // console.log("left arrow clicked")
    }

    const rightArrowHandler = ()=>{
        clearTimeout(timerRef.current);
        setImageNo((prev)=>{
            if(prev<imageList.length-1){
                return prev+1
            }
            return 0;
        });
        // console.log("right arrow clicked")
    }
    // const ImageSlider =({slides}) => {
    //     const timerRef = useRef(null);
    //     const [currentIndex, setCurrentIndex] = useState(0);
    //     const goToPrevious = () => {
    //         const isFirstSlide = currentIndex === 0;
    //         const  newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    //         setCurrentIndex(newIndex);
    //     };
    //     const goToNext = () => {
    //         const isLastSlide = currentIndex === slides.length - 1;
    //         const newIndex = isLastSlide ? 0 : currentIndex + 1;
    //         setCurrentIndex(newIndex);
    //     };
    //     const goToSlide = (slideIndex) => {
    //         setCurrentIndex(slideIndex);
            
    //     };
        
        


    // }
   useEffect(() => {
            clearTimeout(timerRef.current)
            // if(timerRef.current) {
                
            // }
            // console.log("use effect");
            if(imageNo<imageList.length){
                timerRef.current = setTimeout(() =>{
                   // goToNext();
                   rightArrowHandler();
                }, 2000);
            }

        },[imageNo]);

    return(
        <section>
    <div class="image-container">
        <div class="image-list" >
            <div class="image-item" >
                <img src={imageList[imageNo]} width={1349} height={300}/>
            </div>
        </div>
    <div class="image-btn-container">
        <button onClick={leftArrowHandler} class="slider-btn" id="slide-btn-left"><i class="fa-solid fa-chevron-left"><ArrowBackIosIcon /></i></button>
        <button onClick={rightArrowHandler} class="slider-btn" id="slide-btn-right"><i class="fa-solid fa-chevron-right"><ArrowForwardIosIcon /></i></button>
    </div>
</div>
<ProductListing/>
</section>

    )

}
export default Homepage;
