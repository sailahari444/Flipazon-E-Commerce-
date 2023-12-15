import axios from "axios";
import authHeader from "../Auth/AuthHeader";
const user = JSON.parse(localStorage.getItem("user"));

class ApiCalls {

  getProducts(profileId) {
    const res=axios.get(
      "http://localhost:8100/api/cart/getCartItemsByProfileId/"+profileId,
      { headers: authHeader() }
    );
    return res
  }
  
  sendProducts(data) {
    return axios.post("http://localhost:8100/api/cart/addProductToCart", data, {
      headers: authHeader()
    });
  }

  updateCart(data) {
    return axios.put("http://localhost:8100/api/cart/updateCartItem", data, {
      headers: authHeader()
    });
  }

  deleteCartItems(data){
    return axios.delete("http://localhost:8100/api/cart/deleteCartItemsByProfileId/"+data, {
      headers: authHeader()
    });
  }
    async  getAddress(data) {
      return await axios.get("http://localhost:8100/api/address/getAllAddressByProfileId/"+data, {
        headers: authHeader()
      });
    }

    async  addAddress(data) {
      return await axios.post("http://localhost:8100/api/address/addAddress",data,{
        headers: authHeader()
      });
    }

    async  placeOrder(data) {
      return await axios.post("http://localhost:8100/api/order/saveOrder",data,{
        headers: authHeader()
      });
    }
    async  getOrders(data) {
      return await axios.get("http://localhost:8100/api/order/getOrdersByProfileId/"+data, {
        headers: authHeader()
      });
    }
    async  getProductDetail(data) {
      return await axios.get("http://localhost:8100/api/products/productById/"+data, {
        headers: authHeader()
      });
    }
    async  getProductRating(data) {
      return await axios.get("http://localhost:8100/api/productRating/getProductRatingByProductId/"+data, {
        headers: authHeader()
      });
    }
    async  getProductRatingByUserId(data) {
      return await axios.get("http://localhost:8100/api/productRating/getProductRatingByProductId/"+data, {
        headers: authHeader()
      });
    }
    async  deleteProductRating(data) {
      return await axios.delete("http://localhost:8100/api/productRating/getProductRatingByProductId/"+data, {
        headers: authHeader()
      });
    }
    async  updateProductRating(data) {
      return await axios.put("http://localhost:8100/api/productRating/getProductRatingByProductId/"+data, {
        headers: authHeader()
      });
    }
    async  saveProductRating(data) {
      return await axios.post("http://localhost:8100/api/productRating/getProductRatingByProductId/"+data, {
        headers: authHeader()
      });
    }
    async getAllProducts() {
      return await axios.get("http://localhost:8100/api/products/productList", {
        headers: authHeader()
      });
    }
    async getWishlistByWishlistId(data) {
      return await axios.get("http://localhost:8100/api/wishlist/getWishlistByWishlistId/"+data, {
        headers: authHeader()
      });
    }
    async  createNewWishListService(data) {
      return await axios.post("http://localhost:8100/api/wishlist/createNewWishlist",data, {
        headers: authHeader()
      });
    }
    // async  deleteWishListService(data) {
    //   return await axios.delete("http://localhost:8100/api/wishlist/deleteProductFromWishlist",data, {
    //     headers: authHeader()
    //   });
    // }
    async deleteWishListService(data) {
      return await axios.delete("http://localhost:8100/api/wishlist/deleteProductFromWishlist", {
        data:data,
        headers: authHeader()
      });
    }
    async getProfileById(data) {
      return await axios.get("http://localhost:8100/api/profile/getById/"+data, {
        headers: authHeader()
      });
    }
    
    async  updateProfile(data) {
      return await axios.put("http://localhost:8100/api/profile/updateById",data, {
        headers: authHeader()
      });
    }
    
    async  deleteProfileById(data) {
      return await axios.delete("http://localhost:8100/api/profile/deleteById/"+data, {
        headers: authHeader()
      });
    }
    
    async  changePassword(data) {
      return await axios.put("http://localhost:8100/api/profile/changePassword",data, {
        headers: authHeader()
      });
    }
    async  saveProductRating(data) {
      return await axios.post("http://localhost:8100/api/productRating/addRating",data, {
        headers: authHeader()
      });
    }
    
    async getProductRatingByUserId(data) {
      return await axios.get("http://localhost:8100/api/profile/getById/"+data, {
        headers: authHeader()
      });
    }
    
    async getWishlistIdsAndNamesByProfileId(data) {
      return await axios.get("http://localhost:8100/api/wishlist/getWishlistIdsAndNamesByProfileId/"+data, {
        headers: authHeader()
      });
    }
    async  deleteWLService(data) {
      return await axios.delete("http://localhost:8100/api/wishlist/deleteWishlistByWishlistId/"+data, {
        headers: authHeader()
      });
    }
    async  addProductToWishListService(data) {
      return await axios.put("http://localhost:8100/api/wishlist/addProductToWishlist",data, {
        headers: authHeader()
      });
    }
    async getCartItemCount(data) {
      return await axios.get("http://localhost:8100/api/cart/getCartItemCount"+data, {
        headers: authHeader()
      });
    }
    
    async  deleteAddress(profileId, addressId) {
      return await axios.delete("http://localhost:8100/api/address/deleteAddress/"+profileId+"/"+addressId, {
        headers: authHeader()
      });
    }
    
    async  updateAddress(data) {
      return await axios.put("http://localhost:8100/api/address/updateAddress",data, {
        headers: authHeader()
      });
    }
}

export default new ApiCalls();
