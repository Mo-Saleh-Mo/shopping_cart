// feature 1
import React, {Component} from 'react'
import Products from './Components/Products';
import Filter from './Components/Filter';
import Cart from './Components/Cart';
import data from './data.json'

class App extends Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      cartItems: JSON.parse(localStorage.getItem("cartItems"))? JSON.parse(localStorage.getItem("cartItems")) : [],
      size: "",
      sort: "",
    }
  };

  createOrder = (order) => {
    alert("Need to save order for " + order.name)
  }
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter(x => x._id !== product._id)
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x => x._id !== product._id)))
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 })
    }
    this.setState({ cartItems })
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  };

  sortProducts = (e) => {
    const sort = e.target.value
    console.log(e.target.value)
    this.setState((state) => ({
      sort: sort,
      products: this.state.products.slice().sort((a, b) => (
        sort === "lowest" ?
          ((a.price < b.price) ? 1 : -1) :
          sort === "heighest" ?
            ((a.price > b.price) ? 1 : -1) :
            ((a._id < b._id) ? 1 : -1)
        
      ))
    }))
  };

  filterProducts = (e) => {
    if (e.target.value === "") {
      this.setState({ size: e.target.value , products: data.products })
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter((product) => product.availableSizes.indexOf(e.target.value) >= 0),
      });
    }
  };
  
  render() {
    return ( 
      <div className = "grid-container" >
        <header>
          <a href="/" > React Shopping Cart </a> 
        </header>

        <main >
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length} 
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products products={this.state.products} addToCart={this.addToCart}  />
            </div>
            <div className="sidebar">
              <Cart
                removeFromCart={ this.removeFromCart }
                cartItems={this.state.cartItems}
                createOrder = {this.createOrder}
              />
            </div>
          </div>
        </main>

        <footer>
          All Right Is Resere 
        </footer> 
      </div>
  );
  }
}
export default App;
// ended in 3 hours