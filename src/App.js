import './App.css';
import CartState from "./context/cart-context/CartState";
import UserState from "./context/user-context/UserState";
import ProductState from './context/product/ProductState';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './components/signin/SignIn';
import SignUp from './components/sign-up/SignUp';
import ForgotPassword from './components/forgot-password/ForgotPassword';
import ResetPassword from './components/reset-password/ResetPassword';
import HeaderRoutes from './components/HeaderRoutes/HeaderRoutes';
import PageNotFound from './components/PageNotFound/PageNotFound';

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />


      <BrowserRouter>
        <UserState>
          <CartState>
            <ProductState>
              <Switch>
                <Route path="/sign-in" component={SignIn} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/reset-password/:resetToken" component={ResetPassword} />
                <Route path='/404' component={PageNotFound} />
                <Route path="/" component={HeaderRoutes} />
              </Switch>
            </ProductState>
          </CartState>
        </UserState>
      </BrowserRouter>


    </div >
  );
}

export default App;
