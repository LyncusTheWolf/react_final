import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useEffect} from "react";
import CartContext from "../../context/CartContext";
import logo from '../../images/CommerceTitle.png';
import ProductContext from "../../context/ProductContext";
const theme = require("../../schema.json");

const Nav = styled.nav`
  z-index: 999;
  background-color: ${theme.colors.body};
  height: ${theme.navbar.height};
  position: sticky;
  top: 0;
  border-bottom: ${theme.divider.main};
`;

const LinkList = styled.div`
  //border: 1px solid red;
  margin-top: 0;
  display: flex;
`;

const NavItem = styled.div`
  //border: 1px solid red;
  list-style-type: none;
  //flex: 1;
  //float: left;
  //height: 100%;
`;

const SiteLogo = styled.img`
  height: 48px;
  width: 256px;
  margin-left: 16px;
`;

const SearchBlock = styled.div`
  display: flex;
  padding: 4px;
`;

const SearchBar = styled.input`
  border-radius: 4px;
  border: ${theme.border.default};
  font-size: 24px;
  width: 60%;
  padding: 4px;
  margin-left: 8px;
`;

const NavBar = () => {
  const {cartInventory} = useContext(CartContext);
  const {handleProductSearch} = useContext(ProductContext);

  useEffect(() =>{
    //TODO: Implement something that updates the nav bar
    //Empty use effect that lets the nav bar update itself continously
  }, [cartInventory]);

  function processSearch(e){
    //console.log(e);

    if(e.key === "Enter"){      
      handleProductSearch(e.target.value);
    }
  }

  return (
    <Nav>
      <LinkList>
        <NavItem className="flex-2">
          <Link to="/products">
            <SiteLogo src={logo} alt="Site Logo"/>
          </Link>
        </NavItem>
        <NavItem className="flex-4">
          <SearchBlock>
            {/* <label className="fsize-24">Product Search</label> */}
            <SearchBar type="text" name="searchTerm" onKeyPress={processSearch} placeholder="Enter an item name or description"></SearchBar>
          </SearchBlock>
        </NavItem>

        {/* <li>
          <Link to="/products/detail">Product Details</Link>
        </li> */}
        <NavItem className="flex-1">
          <Link to="/cart">Cart: {cartInventory ? cartInventory.products.length : 0}</Link>
        </NavItem>
        {/* <LinkItem>
          <Link to="/checkout">Checkout</Link>
        </LinkItem> */}
      </LinkList>
    </Nav>
  )
}

export default NavBar;