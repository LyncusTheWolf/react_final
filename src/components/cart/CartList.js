import { useContext } from "react";
import styled from "styled-components";
import CartContext from "../../context/CartContext";
import CartElem from "./CartElem";

const theme = require("../../schema.json");

const CartContainer = styled.div`
    border: ${theme.border.default};
    margin: 0;
    //padding: 16px;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
`;

const CartList = () => {
    const {cartInventory} = useContext(CartContext);

    console.log(cartInventory);

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
            {cartInventory.products.map((item) =>
                <CartElem
                    key={item.id}
                    id={item.productId}
                    quantity={item.quantity}                  
                />
            )}
        </CartContainer>
    )
}

export default CartList;