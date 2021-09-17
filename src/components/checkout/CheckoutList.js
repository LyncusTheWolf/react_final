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

    let subTotal = "~Coming Soon~";

    // TODO: Functionality migrated out, fix this later
    // cartInventory.products.forEach(product => {
    //     //console.log(product);
    //     subTotal += product.quantity;
    // });

    function subTotalCalc(amt){
        subTotal += amt;
    }

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
            <p>Subtotal: {subTotal}</p>
        </CartContainer>
    )
}

export default CheckoutList;