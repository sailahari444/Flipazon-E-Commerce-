import axios from 'axios';

class ProductService {

    getProductList(){
        return axios.get('http://localhost:8083/api/products/productList')
    }

    saveProduct(product){
        return axios.post('http://localhost:8083/api/products/saveProduct', product)
    }

    getProductById(productId){
        return axios.get('http://localhost:8083/api/products/productById' + '/' + productId);
    }

    updateProduct(product){
        return axios.put('http://localhost:8083/api/products/updateProduct', product);
    }

    deleteProduct(productId){
        return axios.delete('http://localhost:8083/api/products/delete' + '/' + productId);
    }

}

export default new ProductService();