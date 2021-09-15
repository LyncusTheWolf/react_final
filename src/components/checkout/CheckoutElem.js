import { useEffect, useState } from "react";
import styled from "styled-components";
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

const CheckoutElem = ({id, quantity}) =>{

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
                </PriceDetails>
            </div>
        </IndexContainer>
    )
}

export default CheckoutElem;