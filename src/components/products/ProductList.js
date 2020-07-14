import React from "react";
import Product from "./Product";
import { Container, Row, Col} from "react-bootstrap";

const chunk = (arr, chunkSize = 1, cache = []) => {
  const tmp = [...arr]
  if (chunkSize <= 0) return cache
  while (tmp.length) cache.push(tmp.splice(0, chunkSize))
  return cache
}

const ProductList = (props) => {
  const productsChunks = chunk(props.products, 3)
  
  const rows = productsChunks.sort( (a,b)=>(a.id>b.id)?1:-1 ).map((productChunk, index) => {
        const productsCols = productChunk.map((product, index) => {
          return (
            <Col xs="auto" sm="auto" md="auto" lg="auto" key={product.id} style={{"paddingBottom":"20px"}}>
              <Product 
              key={product.id} 
              id={product.id}
              quantity={product.quantity} 
              price={product.price} 
              name={product.name} 
              description={product.description}
              manufacturer={product.manufacturer}
              views={product.views}
                {...props}
              />	  
            </Col>
          );
        });
    return (
      <Row key={index} style={{"paddingBottom":"20px"}}>
       {productsCols}
      </Row>
            
  )});
	return (
  	<Container>
  	  {rows}
  	</Container>
  )
}

export default ProductList;
