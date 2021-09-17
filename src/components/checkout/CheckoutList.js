import { useContext } from "react";
import styled from "styled-components";
import CartContext from "../../context/CartContext";
import CheckoutElem from "./CheckoutElem";

const theme = require("../../schema.json");

const CartContainer = styled.div`
    border: ${theme.border.default};
    margin: 16px auto 0 0;
    //padding: 16px;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
`;

const CheckoutList = () => {
    const {cartInventory} = useContext(CartContext);

    //console.log(cartInventory);

    /*
    *
    * TODO:
    * Pre-populate a json object array with the cart details here
    * Map over that json object
    * 
    */

    if(!cartInventory){
        return(
            <>
                <p>Cart is currently empty</p>
            </>
        )
    }

    return(
        <CartContainer>
            {cartInventory.products.map((item, index) =>
                <CheckoutElem
                    key={index}
                    id={item.productId}
                    quantity={item.quantity}                  
                />
            )}
        </CartContainer>
    )
}

export default CheckoutList;