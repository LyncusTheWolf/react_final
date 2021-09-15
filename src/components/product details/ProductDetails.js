import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import CartContext from "../../context/CartContext";
import ProductContext from "../../context/ProductContext";
import ProductImage from "../../styles/ProductImage.style";
import { getProductById } from "../../utils/utils";
import Spinner from "../Spinner";

const theme = require("../../schema.json");

const ProductDetailsContainer = styled.div`
    //border: 1px solid red;
    margin: 2% 2%;
    padding: 8px;
    display: flex;
`;

const DescriptionContainer = styled.div`
    border-left: ${theme.divider.splitter};
    border-right: ${theme.divider.splitter};
    padding: 16px;
`;

const PriceContainer = styled.div`
    padding: 16px;
`;

const ProductDetails = () => {

    const[productItem, setProductItem] = useState(null);
    const[productQuantity, setProductQuantity] = useState(1);

    const {productList} = useContext(ProductContext);
    const {handleUpdateCart} = useContext(CartContext);

    const {index} = useParams();
    //console.log(index);

    //console.log(productList);

    useEffect(()=>{
        getProductById(index)
            .then((product) =>{
                console.log(product);
                setProductItem(product);
            })
            .catch((err) =>{
                console.log(err);
            })
            .finally(() =>{
                
            });
        
    }, []);

    function addItemToCart(id, quantity){
        console.log(`Added ${quantity} item with id: ${id} to cart`);

        //TODO:
        //Implement post method for adding item to card
    }

    if(!productItem){
        return(
            <>
                <Spinner/>
            </>
        )
    }   

    // const targetId = index;

    // const targetItem = productList.find((item) =>{
    //     return item.id == targetId;
    // });

    // console.log(targetItem);   

    return (
        <ProductDetailsContainer>
            <div>
                <ProductImage src={productItem.image} alt={`Product Image for ${productItem.name}`}/>
            </div>
            <DescriptionContainer className="flex-auto">
                <p>Description: {productItem.description}</p>
            </DescriptionContainer>
            <PriceContainer className="flex-auto">
                <p>Price: {productItem.price}</p>
                <p>Quantity:</p>
                <input type="number" value={productQuantity} min="1" max="99" onChange={(e) => setProductQuantity(e.target.value)}/>
                <button onClick={(e) => {
                    //addItemToCart(index, productQuantity)
                    handleUpdateCart(index, productQuantity);
                }}>Add to cart</button>
            </PriceContainer>
        </ProductDetailsContainer>
    )
}

export default ProductDetails;