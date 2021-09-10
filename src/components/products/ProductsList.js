import { useContext } from "react";
import styled from "styled-components"
import ProductContext from "../../context/ProductContext";
import Spinner from "../Spinner";
import ProductCard from "./ProductCard";
const theme = require("../../schema.json");

const ProductContainer = styled.div`
    border: ${theme.border.default};
    margin: 0;
    //padding: 16px;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
`;

const ProductList = () => {

    const {isLoading, productList} = useContext(ProductContext);

    console.log(productList);

    //console.log(mockProducts);
    if(isLoading){
        return (
            <>
                <Spinner/>
            </>
        )
    }

    if(productList.length === 0){
        console.log("No items found");
        return(
            <>
                <p>No items found</p>
            </>
        )
    }

    console.log("Rendering Product Page");
    return (
        <ProductContainer>
            {productList.map((product) =>
                    <ProductCard 
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        image={product.image}
                        description={product.description}
                    />
            )}
        </ProductContainer>
    )
}

export default ProductList;