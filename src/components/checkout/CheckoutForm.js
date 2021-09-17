import { useContext } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import CartContext from "../../context/CartContext";
const theme = require("../../schema.json");

const CheckOutContainer = styled.div`
    border: ${theme.border.default};
    width: 40%;
    margin: 8px auto;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
`;

const FormElem = styled.li`
    //border: 1px solid red;
    display: flex;
    padding: 4px;
`;

const FormLabel = styled.label`
    flex: 1;
`;

const FormInput = styled.input`
    flex: 1;
`;

const SubmitButton = styled.input`
    margin: auto;
    flex: 0.3;
`;



const CheckoutForm = () => {

    const history = useHistory();

    const {clearCart} = useContext(CartContext);

    function handleSubmit(e){
        e.preventDefault();
    
        //console.log("Submit intercepted");
        //console.log(e);
    
        console.log(`
            Sending billing info to:\n
            ${e.target.fname.value} ${e.target.lname.value}\n
            ${e.target.shipaddress.value}\n
            ${e.target.billaddress.value}\n
            Using ccn:${e.target.creditcard.value}\n
        `);
        
        //TODO: Clear the cart
        clearCart();

        history.push("/products");
    }

    return(
        <CheckOutContainer>
            <form onSubmit={handleSubmit}>
                <ul>
                    <FormElem>
                        <FormLabel >First Name:</FormLabel>
                        <FormInput name="fname" type="text"/>
                    </FormElem>
                    <FormElem>
                        <FormLabel >Last Name:</FormLabel>
                        <FormInput name="lname" type="text"/>
                    </FormElem>
                    <FormElem>
                        <FormLabel >Shiping Address:</FormLabel>
                        <FormInput name="shipaddress" type="text"/>
                    </FormElem>
                    <FormElem>
                        <FormLabel >Billing Address:</FormLabel>
                        <FormInput name="billaddress" type="text"/>
                    </FormElem>
                    <FormElem>
                        <FormLabel >Credit Card Info:</FormLabel>
                        <FormInput name="creditcard" type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="19" placeholder="xxxx xxxx xxxx xxxx"/>
                    </FormElem>
                    <FormElem>
                        <SubmitButton type="submit" value="Place Order"/>
                    </FormElem>
                </ul>
            </form>
        </CheckOutContainer>
    )
}

export default CheckoutForm;