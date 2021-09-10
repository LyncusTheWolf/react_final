import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../../context/CartContext";

const theme = require("../../schema.json");

const Nav = styled.nav`
  background-color: ${theme.colors.body};
  height: ${theme.navbar.height};
  position: sticky;
  top: 0;
  border-bottom: ${theme.divider.main};
`;

const LinkList = styled.ul`
  margin-top: 0;
  display: flex;
`;

const LinkItem = styled.li`
  list-style-type: none;
  flex: auto;
`;

const NavBar = () => {
  const {cartInventory} = useContext(CartContext);

  return (
    <Nav>
      <LinkList>
        <LinkItem>
          <Link to="/products">Products</Link>
        </LinkItem>
        {/* <li>
          <Link to="/products/detail">Product Details</Link>
        </li> */}
        <LinkItem>
          <Link to="/cart">Cart: {cartInventory ? cartInventory.products.length : 0}</Link>
        </LinkItem>
        <LinkItem>
          <Link to="/checkout">Checkout</Link>
        </LinkItem>
      </LinkList>
    </Nav>
  )
}

export default NavBar;