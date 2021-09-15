import PageContainer from "../../styles/PageContainer.style";
import CartList from "../cart/CartList";
import CheckoutForm from "./CheckoutForm";
import CheckoutList from "./CheckoutList";

const CheckoutPage = () => {
    return (
        <PageContainer>
            <CheckoutList/>
            <CheckoutForm/>
        </PageContainer>
    )
}

export default CheckoutPage;