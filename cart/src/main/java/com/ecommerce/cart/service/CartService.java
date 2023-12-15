package com.ecommerce.cart.service;

import java.util.ArrayList;
import java.util.List;

import com.ecommerce.cart.dto.CartItemDto;
import com.ecommerce.cart.dto.CartItemWithProductDetailsDto;
import com.ecommerce.cart.dto.ProductDetailsDto;
import com.ecommerce.cart.entity.CartItem;
import com.ecommerce.cart.entity.Product;
import com.ecommerce.cart.entity.ProductDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.cart.repository.CartRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;

@Service
@Transactional
public class CartService {
    
    @Autowired
	CartRepository cartRepository;

	@Autowired
	RestTemplate restTemplate;


	public CartItem saveCartItem(CartItemDto cartItemDto) {
		CartItem optionalCartItem = cartRepository.findByProfileId(cartItemDto.getProfileId());

		if (optionalCartItem!=null) {
			CartItem fetchedCartItem = optionalCartItem;
			List<ProductDetails> productDetailsList = fetchedCartItem.getProductDetailsList();
//			System.out.println(productDetailsList);
			boolean found = false;

			for (ProductDetails pd : productDetailsList) {
				System.out.println("Here 1");
				String x=pd.getProductId();
				String y=cartItemDto.getProductDetails().getProductId();
//				System.out.println(x==y);
				if (x.equals(y)) {
					System.out.println("Here 2");
					pd.setQuantity(pd.getQuantity() + cartItemDto.getProductDetails().getQuantity());
					found = true;
					break;
				}
			}

			if (!found) {
				productDetailsList.add(cartItemDto.getProductDetails());
			}

			fetchedCartItem.setProductDetailsList(productDetailsList);
			return cartRepository.save(fetchedCartItem);
		} else {
			List<ProductDetails> productDetailsList = new ArrayList<>();
			productDetailsList.add(cartItemDto.getProductDetails());
			CartItem cartItem = new CartItem(cartItemDto.getProfileId(), productDetailsList);
			return cartRepository.save(cartItem);
		}
	}

	//	public CartItem saveCartItem(CartItemDto cartItemDto) {
//
////		CartItem cartItem= new CartItem(new CartItemId(cartItemDto.getProfileId(),cartItemDto.getProductId()),cartItemDto.getQuantity());
////		CartItem savedCartItem= cartRepository.save(cartItem);
////		CartItemDto savedCartItemDto= new CartItemDto(savedCartItem.getCartId().getProfileId(),
////														savedCartItem.getCartItemId().getProductId(),
////														savedCartItem.getQuantity());
//		if(cartRepository.findByProfileId(cartItemDto.getProfileId())!=null){
//			System.out.println(cartRepository.findByProfileId(cartItemDto.getProfileId()));
//			CartItem fetchedCartItems=cartRepository.findById((cartRepository.findByProfileId(cartItemDto.getProfileId()).getCartId())).orElse(null);
//			List<ProductDetails> productDetailsList=fetchedCartItems.getProductDetailsList();
//			for(int i=0;i<productDetailsList.size();i++){
//				if(productDetailsList.get(i).getProductId()==cartItemDto.getProductDetails().getProductId()){
//					ProductDetails pd=productDetailsList.get(i);
//					pd.setQuantity(pd.getQuantity()+cartItemDto.getProductDetails().getQuantity());
//					productDetailsList.add(i,pd);
//				}
//				else{
//					productDetailsList.add(cartItemDto.getProductDetails());
//				}
//			}
//			fetchedCartItems.setProductDetailsList(productDetailsList);
//			return cartRepository.save(fetchedCartItems);
//		}
//		else {
//			List<ProductDetails> productDetailsList=new ArrayList<>();
//			productDetailsList.add(cartItemDto.getProductDetails());
//			CartItem cartItem=new CartItem(cartItemDto.getProfileId(),productDetailsList);
//			return cartRepository.save(cartItem);
//		}
//	}
	public CartItem updateCartItem(CartItem cartItem) {

//		CartItem cartItem= new CartItem(new CartItemId(cartItemDto.getProfileId(),cartItemDto.getProductId()),cartItemDto.getQuantity());
//		CartItem updateCartItemDto= cartRepository.save(cartItem);
//		CartItemDto updatedCartItemDto= new CartItemDto(updateCartItemDto.getCartItemId().getProfileId(),
//				updateCartItemDto.getCartItemId().getProductId(),
//				updateCartItemDto.getQuantity());
//		return  updatedCartItemDto;
//		########################################################
		return  cartRepository.save(cartItem);
	}
	public CartItemWithProductDetailsDto getCartItemsByProfileId(String profileId){
//		List<CartItem> fetchedCartItems=cartRepository.findByCartIdProfileId(profileId);
//		List<CartItemDto> fetchedCartItemsDto=fetchedCartItems.stream().map(x-> {
//			return new CartItemDto(x.getCartItemId().getProfileId(), x.getCartItemId().getProductId(), x.getQuantity());
//		}).collect(Collectors.toList());
		try {
			CartItem fetchedCartItem = cartRepository.findByProfileId(profileId);
			List<ProductDetailsDto> productList = new ArrayList<ProductDetailsDto>();
			for (ProductDetails c : fetchedCartItem.getProductDetailsList()) {
				Product p = restTemplate.getForObject("http://localhost:8083/api/products/productById/" + c.getProductId(), Product.class);
				ProductDetailsDto pdto = new ProductDetailsDto(p, c.getQuantity());
				productList.add(pdto);
			}
			CartItemWithProductDetailsDto cartitemDto = new CartItemWithProductDetailsDto(fetchedCartItem.getCartId(), fetchedCartItem.getProfileId(), productList);
			return cartitemDto;
		}
		catch (NullPointerException e){
			return new CartItemWithProductDetailsDto();
		}
	}
	public void deleteCartItemByCartItemId(String cartId){
		cartRepository.deleteById(cartId);
	}
	public void deleteCartItemsByProfileId(String profileId) {
		cartRepository.deleteByProfileId(profileId);
	}

	public int getCartItemCount(String profileId){
		CartItem fetchedCartItem=cartRepository.findByProfileId(profileId);
		return fetchedCartItem.getProductDetailsList().size();
	}
	
}
