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

    const {cartInventory, clearCart} = useContext(CartContext);

    function handleSubmit(e){
        e.preventDefault();
    
        console.log("Submit intercepted");
        //console.log(e);
    
        console.log(e.target.billaddress.value);
        
        //TODO: Clear the cart
        clearCart();

        history.push("/products");
    }

    return(
        <CheckOutContainer>
            <form onSubmit={handleSubmit}>
                <ul>
                    <FormElem>
                        <FormLabel for="fname">First Name:</FormLabel>
                        <FormInput name="fname" type="text"/>
                    </FormElem>
                    <FormElem>
                        <FormLabel for="lname">Last Name:</FormLabel>
                        <FormInput name="lname" type="text"/>
                    </FormElem>
                    <FormElem>
                        <FormLabel for="shipaddress">Shiping Address:</FormLabel>
                        <FormInput name="shipaddress" type="text"/>
                    </FormElem>
                    <FormElem>
                        <FormLabel for="billaddress">Billing Address:</FormLabel>
                        <FormInput name="billaddress" type="text"/>
                    </FormElem>
                    <FormElem>
                        <FormLabel for="creditcard">Credit Card Info:</FormLabel>
                        <FormInput name="creditcard" type="number"/>
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