import axios from 'axios'

class dataAPI {
    static  getAllProducts() {
		return axios.get('http://localhost:4000/products?_sort=id&_order=asc').then(response=>response.data);
	}

	static addProduct(product) {
		return axios.post('http://localhost:4000/products',product).then(response=>response.data);
    }
    
    static updateProduct(product){
        return axios.patch('http://localhost:4000/products/'+product.id,product)
        .then(response=>response.data);
    }

    static deleteProduct(id){
        return axios.delete(`http://localhost:4000/products/${id}`).then(response=>response.data);
    }

    static addView(id,count){
      return axios.patch('http://localhost:4000/products/'+id,{views:count+1})
        .then(response=>response.data);
    }

    static getAllUsers(){
        return axios.get('http://localhost:4000/users').then(response=>response.data);
    }

    static addUser(user) {
		return axios.post('http://localhost:4000/users',user).then(response=>response.data);
    }

}

export default dataAPI;