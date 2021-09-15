//import logo from './logo.svg';

//css
import './App.css';

//3rd Party Imports
import { 
  BrowserRouter as Router,
  Switch,
  Route,
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
import { getCartById, getFullProductList, pushCartItem } from './utils/utils';
import CommerceFooter from './components/footer/Footer';
import AppWrapper from './styles/AppWrapper.style';

const cartDefaultID = 1;

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
    getCartById(cartDefaultID)
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

    setSearchTerm(e.target.searchTerm.value);
  }

  function handleUpdateCart(id, quantity){
    //console.log(`Added ${quantity} item with id: ${id} to cart`);

    pushCartItem(cartDefaultID, id, quantity)
      .then((cartReturnID) =>{
        console.log(`updated cart with id ${cartReturnID}`);

        //Simulate the item being updated in the database
        setCartInventory(prev =>{ 
          prev.products.push({
            'productId':parseInt(id),
            'quantity':parseInt(quantity)
          });

          return prev;
        });
      })
      .catch((err) =>{
        console.log(err);
      })
  }

  function removeItemAtIndex(index){
    console.log(`Popping item at index ${index}`);

    console.log(cartInventory.products.splice(index, 1));
    console.log(cartInventory);

    setCartInventory(cartInventory);
  }

  function clearCart(){
    setCartInventory(prev =>{ 
      prev.products = []

      return prev;
    });
  }

  return (
    <Router>     
      <AppWrapper>
        <CartContext.Provider value={{cartInventory, handleUpdateCart, clearCart, removeItemAtIndex}}>
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
