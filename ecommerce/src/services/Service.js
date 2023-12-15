import { api, authenticateApi } from "./Config/axiosConfig";
import { defineCancelApiObject } from "./Config/axiosUtils";

export const service = {
  authenticate: async function (payload, cancel = false) {
    const res = await api.request({
      url: `/api/profile/login`,
      method: "POST",
      data: payload,
      signal: cancel
        ? cancelApiObject[this.create.name].handleRequestCancellation().signal
        : undefined,
    });
    return res;
  },
  getProductRating: async function (payload) {
    const res = await authenticateApi.request({
      url: `/api/productRating/getProductRatingByProductId/${payload}`,
      method: "GET",
    });
    return res;
  },
  getProductRatingByUserId: async function (payload) {
    const res = await authenticateApi.request({
      url: `/api/productRating/getProductRatingByUserId`,
      method: "GET",
      params: payload,
    });
    return res;
  },
  deleteProductRating: async function (payload) {
    const res = await authenticateApi.request({
      url: `/api/productRating/deleteRating`,
      method: "DELETE",
      data: payload,
      ContentType: "multipart/form-data",
    });
    return res;
  },
  updateProductRating: async function (payload) {
    const res = await authenticateApi.request({
      url: `/api/productRating/updateRating`,
      method: "PUT",
      data: payload,
    });
    return res;
  },
  saveProductRating: async function (payload) {
    const res = await authenticateApi.request({
      url: `/api/productRating/addRating`,
      method: "POST",
      data: payload,
    });
    return res;
  },

  getProductById: async function (payload) {
    const res = await authenticateApi.request({
      url: `/api/products/productById/${payload}`,
      method: "GET",
    });
    return res;
  },
  getProducts: async function (payload) {
    const res = await api.request({
      url: `/api/products/productList`,
      method: "GET",
    });
    return res;
  },
  getProfileById: async function (payload) {
    const res = await authenticateApi.request({
      url: `/api/profile/getById/${payload}`,
      method: "GET",
    });
    return res;
  },
  getOrderService: async function (payload) {
    const res = await authenticateApi.request({
      url: `/api/order/getOrderByProfileId/${payload}`,
      method: "GET",
      ContentType: "multipart/form-data",
    });
    return res;
  },
  getAllProducts: async function () {
    const res = await authenticateApi.request({
      url: `/api/products/productList`,
      method: "GET",
      ContentType: "multipart/form-data",
    });
    return res;
  },
  getProductById: async function (payload) {
    const res = await authenticateApi.request({
      url: `/api/products/productsById/${payload}`,
      method: "GET",
      data: payload,
      ContentType: "multipart/form-data",
    });
    return res;
  },
  getAllAddressByProfileId: async function (payload) {
    const res = await authenticateApi.request({
      url: `/api/address/getAllAddressByProfileId/${payload}`,
      method: "GET",
      data: payload,
      ContentType: "multipart/form-data",
    });
    return res;
  },
  addAddressByProfileId: async function (payload) {
    const res = await authenticateApi.request({
      url: `/api/address/addAddress`,
      method: "POST",
      data: payload,
    });

    return res;
  },
  updateCartItem: async function (payload) {
    const res = await authenticateApi.request({
      url: `/api/cart/updateCartItem`,
      method: "PUT",
      data: payload,
    });
    return res;
  },
  addProductToCart: async function (payload) {
    const res = await authenticateApi.request({
      url: `/api/cart/addProductToCart`,
      method: "POST",
      data: payload,
    });

    return res;
  },
  getCartItemsByProfileId: async function (payload) {
    const res = await authenticateApi.request({
      url: `/api/cart/getCartItemsByProfileId/{payload}`,
      method: "GET",
      data: payload,
      ContentType: "multipart/form-data",
    });
    return res;
  },
  deleteCartItemsByProfileId: async function (payload) {
    const res = await authenticateApi.request({
      url: `/api/cart/deleteCartItemsByProfileId/{payload}`,
      method: "DELETE",
      data: payload,
      ContentType: "multipart/form-data",
    });
    return res;
  },
  deleteWishListService: async function (payload) {
    const res = await authenticateApi.request({
        url: `/api/wishlist/deleteProductFromWishlist`,
        method: "DELETE",
        data: payload,
        ContentType: 'application/json'
    })
  },
  getWishlistByWishlistId: async function (payload) {
    const res = await authenticateApi.request({
      url: `/api/wishlist/getWishlistByWishlistId/${payload}`,
      method: "GET",
      data: payload,
      ContentType: "application/json",
    });
    return res;
  },
  addProductToWishListService: async function (payload) {
    const res = await authenticateApi.request({
        url: `/api/wishlist/addProductToWishlist`,
        method: "PUT",
        data: payload,
        ContentType: 'application/json'
    })
  },
  getWishlistIdsAndNamesByProfileId: async function (payload) {
    const res = await authenticateApi.request({
      url: `/api/wishlist/getWishlistIdsAndNamesByProfileId/${payload}`,
      method: "GET",
      data: payload,
      ContentType: "application/json",
    });
    return res;
  },
  createNewWishListService: async function (payload) {
    const res = await authenticateApi.request({
        url: `/api/wishlist/createNewWishlist`,
        method: "POST",
        data: payload,
        ContentType: 'application/json'
    })
  },
  deleteWLService: async function (payload) {
    const res = await authenticateApi.request({
        url: `/api/wishlist/deleteWishlistByWishlistId/${payload}`,
        method: "DELETE",
        data: payload,
        ContentType: 'application/json'
    })
  },
  register: async function (payload) {
    const res = await api.request({
      url: `/api/profile/insert`,
      method: "POST",
      data: payload,
    });
    return res;
  },
  //ChangePassword
  changePassword: async function (payload) {
    const res = await authenticateApi.request({
      url: `/api/profile/changePassword`,
      method: "PUT",
      data: payload,
    });
    return res;
  },
  getProfileList: async function () {
    const res = await authenticateApi.request({
      url: `/api/profile/list`,
      method: "GET",
    });
    //console.log(res);
    return res;
  },
  updateProfile: async function (payload) {
    const res = await authenticateApi.request({
      url: `/api/profile/updateById`,
      method: "PUT",
      data: payload,
    });
    //console.log(res);
    return res;
  },
  deleteProfileById: async function (id) {
    const res = await authenticateApi.request({
      url: `/api/profile/deleteById/${id}`,
      method: "DELETE",
    });
    return res;
  },
  //Address
  getAllAddress: async function (profileId) {
    const res = await authenticateApi.request({
      url: `/api/address/getAllAddressByProfileId/${profileId}`,
      method: "GET",
    });

    return res;
  },
  addAddress: async function (payload) {
    const res = await authenticateApi.request({
      url: `/api/address/addAddress`,
      method: "POST",
      data: payload,
    });

    return res;
  },
  updateAddress: async function (payload) {
    const res = await authenticateApi.request({
      url: `/api/address/updateAddress`,
      method: "PUT",
      data: payload,
    });
    //console.log(res);
    return res;
  },
  deleteAddress: async function (profileId, addressId) {
    const res = await authenticateApi.request({
      url: `/api/address/deleteAddress/${profileId}/${addressId}`,
      method: "DELETE",
    });
    //console.log(res);
    return res;
  }
};

// defining the cancel API object for service
const cancelApiObject = defineCancelApiObject(service);
