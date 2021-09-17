import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CartContext from "../../context/CartContext";
import IndexContainer from "../../styles/ItemContainer.style";
import ProductImage from "../../styles/ProductImage.style";
import { getProductById } from "../../utils/utils";
const theme = require("../../schema.json");

const ProductDetails = styled.div`
    color: ${theme.font.description.color};
    font-size: ${theme.font.description.size};
    flex: 1;
    padding: 10px;
    border-left: ${theme.divider.splitter};
    border-right: ${theme.divider.splitter};
`;

const PriceDetails = styled.div`
    color: ${theme.font.description.color};
    font-size: ${theme.font.description.size};
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

const QuantityInput = styled.input`
    width: 90%;
`;

const CartElem = ({id, index, quantity}) =>{

    const {removeItemAtIndex, updateItemAtIndex} = useContext(CartContext);

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
    }, [id]);

    // function handleCartPop(index){
    //     console.log(`Popping item with index: ${index} from the cart`);
    // }

    function updateCartContents(e){
        //console.log(e.target.value);
        updateItemAtIndex(index, e.target.value);
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
                    <QuantityInput type="number" value={quantity} onChange={updateCartContents}/>
                    <p>${productElem.price * quantity}</p>
                    <RemoveButton onClick={() => {
                        removeItemAtIndex(index);
                    }}>x</RemoveButton>
                </PriceDetails>
            </div>
        </IndexContainer>
    )
}

export default CartElem;