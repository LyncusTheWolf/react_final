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

  //#region Rerender wrappers
  //Hackish implementation to force a cascadeing re-render of the site
  const[, setCounter] = useState(0);
  function forceRerender(){
    setCounter(prev => prev + 1);
  }
  //#endregion

  const[isLoading, setLoading] = useState(true);
  const[searchTerm, setSearchTerm] = useState("");
  const[productList, setProductList] = useState(null);
  const[cartInventory, setCartInventory] = useState(null);

  useEffect(() => {
    setLoading(true);
    //console.log("Initial Page Load Functionality Established");

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

    //Simulates pulling up a cart by a specified user/id
    getCartById(cartDefaultID)
      .then((cart) =>{
        //console.log(cart);

        setCartInventory(cart);        
      })
      .catch((err) =>{
        console.log(err);
      });
  }, []);

  function handleProductSearch(searchTarget){
    console.log(`Executing search for term ${searchTarget}`);

    //history.push("/products");
    setSearchTerm(searchTarget);
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
        forceRerender();
      })
      .catch((err) =>{
        console.log(err);
      })
  }

  function removeItemAtIndex(index){
    //console.log(`Popping item at index ${index}`);
    
    cartInventory.products.splice(index, 1);
    // console.log();
    // console.log(cartInventory);

    setCartInventory(cartInventory);
    forceRerender();
  }

  function updateItemAtIndex(index, newAmount){
    cartInventory.products[index].quantity = newAmount;

    setCartInventory(cartInventory);
    forceRerender();
  }

  function clearCart(){
    setCartInventory(prev =>{ 
      prev.products = []

      return prev;
    });
    forceRerender();
  }

  return (
    <Router>    
      <AppWrapper>
        <CartContext.Provider value={{cartInventory, handleUpdateCart, clearCart, removeItemAtIndex, updateItemAtIndex}}>
          <ProductContext.Provider value={{isLoading, productList, handleProductSearch}}>
            <NavBar/>
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
