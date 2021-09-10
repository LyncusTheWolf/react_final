//import logo from './logo.svg';

//css
import './App.css';

//3rd Party Imports
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  Redirect
} from 'react-router-dom';

//Native Imports
import { useEffect, useState } from 'react';
import ProductPage from './components/products/ProductsPage';
import ProductDetailsPage from './components/product details/ProductDetailsPage';
import CartPage from './components/cart/CartPage';
import CheckoutPage from './components/checkout/CheckoutPage';
import NavBar from './components/navbar/NavBar';
import PageNotFound from './errors/PageNotFound';

//Context Imports
import CartContext from './context/CartContext';
import ProductContext from './context/ProductContext';
import { getCartById, getFullProductList, getMockProductList } from './utils/utils';
import CommerceFooter from './components/footer/Footer';
import AppWrapper from './styles/AppWrapper.style';

function App() {
  const[isLoading, setLoading] = useState(true);
  const[searchTerm, setSearchTerm] = useState("");
  const[productList, setProductList] = useState(null);
  const[cartInventory, setCartInventory] = useState(null);

  useEffect(() => {
    setLoading(true);
    console.log("Initial Page Load Functionality Established");

    //Do Search Related Magic Here

    getFullProductList()
      .then((searchResults) =>{
        setProductList(searchResults);
      })
      .catch((err) =>{
        console.log(err);
      })
      .finally(() =>{
        setLoading(false);
      });

    //console.log(searchList);
  }, [searchTerm]);

  useEffect(() => {
    getCartById(1)
      .then((cart) =>{
        console.log(cart);
        setCartInventory(cart);
      })
      .catch((err) =>{
        console.log(err);
      })
  }, []);

  function handleProductSearch(e){
    e.preventDefault();

    //setSearchTerm
  }

  return (
    <Router>     
      <AppWrapper>
        <CartContext.Provider value={{cartInventory}}>
          <NavBar/>
          <ProductContext.Provider value={{isLoading, productList}}>
            <Switch>
              <Route exact path="/">
                <Redirect to='/products'/>
              </Route>
              <Route exact path="/products">
                <ProductPage/>
              </Route>
              <Route path="/products/:index">
                <ProductDetailsPage/>
              </Route>
              <Route path="/cart">
                <CartPage/>
              </Route>
              <Route path="/checkout">
                <CheckoutPage/>
              </Route>

              <Route>
                <PageNotFound/>
              </Route>
            </Switch>
          </ProductContext.Provider>
        </CartContext.Provider>
        <CommerceFooter/>
      </AppWrapper>
    </Router>
  );
}

export default App;
