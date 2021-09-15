import PageContainer from "../../styles/PageContainer.style";
import { Link } from "react-router-dom";
import CartList from "./CartList";

const CartPage = () => {
    return (
        <PageContainer>
            <CartList/>
            <Link to="/checkout">Proceed to Checkout</Link>
        </PageContainer>
    )
}

export default CartPage;