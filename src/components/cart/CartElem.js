import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CartContext from "../../context/CartContext";
import IndexContainer from "../../styles/ItemContainer.style";
import ProductImage from "../../styles/ProductImage.style";
import { getProductById } from "../../utils/utils";
const theme = require("../../schema.json");

const ProductDetails = styled.div`
    color: #777;
    flex: 1;
    padding: 10px;
    border-left: ${theme.divider.splitter};
    border-right: ${theme.divider.splitter};
`;

const PriceDetails = styled.div`
    width: 10%;
    padding: 8px;
`;

const RemoveButton = styled.button`
    border: 2px solid #dd0000;
    background-color: red;
    color: white;
    border-radius: 100%;
    display: block;
    margin-left: auto;
    margin-right: 0;
`;

const CartElem = ({id, index, quantity}) =>{

    const {removeItemAtIndex} = useContext(CartContext);

    const[productElem, setProductElem] = useState({
        "title": "Filler",
    });

    useEffect(() =>{
        getProductById(id)
            .then((elem) =>{
                setProductElem(elem)
            })
            .catch((err) =>{
                console.log(err);
            })
    }, []);

    function handleCartPop(index){
        console.log(`Popping item with index: ${index} from the cart`);
    }

    return(
        <IndexContainer>
            <div className="flex flex-1">
                <div>
                    <ProductImage src={productElem.image} alt={`Product Image of ${productElem.title}`}/>
                </div>
                <ProductDetails>
                    <p>{productElem.title}</p>
                </ProductDetails>
                <PriceDetails>
                    <p>{quantity}</p>
                    <p>{productElem.price}</p>
                    <RemoveButton onClick={() => {
                        removeItemAtIndex(index);
                    }}>x</RemoveButton>
                </PriceDetails>
            </div>
        </IndexContainer>
    )
}

export default CartElem;