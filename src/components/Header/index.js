import React, { useEffect, useState } from 'react';
import './style.css';
import { IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu
} from '../MaterialUI/index';
import { useDispatch, useSelector } from 'react-redux';
import { createSignup, login, signout } from '../../actions/auth.actions';
import Cart from "../UI/Cart";
import logo from '../../images/logo/rid.png'
// import { authConstants } from '../../actions/constants';

/**
* @author
* @function Header
**/

const Header = (props) => {

  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector(state => state.auth);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const createUser = () => {
    dispatch(createSignup({ name, phone, password }));
  };

  const userLogin = () => {
    dispatch(login({ phone, password }));
  };

  const logout = () => {
    dispatch(signout());
  };

  useEffect(() => {

    if (auth.authenticate) {
      setLoginModal(false);
    }

  }, [auth.authenticate]);

  const renderLoggedInManu = () => {
    return (
      <DropdownMenu
        menu={
          <a href="/" className="fullname text-white text-decoration-none">
            {auth.user.name}
          </a>
        }
        menus={[
          { label: 'My Profile', href: '', icon: null },
          { label: 'SuperCoin Zone', href: '', icon: null },
          // { label: 'Flipkart Plus Zone', href: '', icon: null },
          { label: 'Orders', href:'/account/orders', icon: null },
          { label: 'Wishlist', href: '', icon: null },
          { label: 'My Cart', href: '', icon: null },
          // { label: 'Coupons', href: '', icon: null },
          // { label: 'Rewards', href: '', icon: null },
          { label: 'Notifications', href: '', icon: null },
          // { label: 'Gift Cards', href: '', icon: null },
          { label: 'Logout', href: '', icon: null, onClick: logout },
        ]}

      />
    );
  }
  const renderNonLoggedInManu = () => {
    return (
      <DropdownMenu
        menu={
          <a 
          className="loginButton" 
          onClick={() => {
            setSignup(false); 
            setLoginModal(true);
            }}>
            Login
          </a>
        }
        menus={[
          { label: 'My Profile', href: '', icon: null },
          // { label: 'Flipkart Plus Zone', href: '', icon: null },
          { label: 'Orders', href:'/account/orders', icon: null, 
          onClick : () => {
            !auth.authenticate && setLoginModal(true)
          } },
          { label: 'Wishlist', href: '', icon: null },
          { label: 'Rewards', href: '', icon: null },
          { label: 'Gift Cards', href: '', icon: null },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <a
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }} 
              style={{ color: '#2874f0' }}
            >Sign Up</a>
          </div>
        }
      />
    );
  }
  return (
    <div className="header">
      <Modal
        visible={loginModal}
        onClose={() => setLoginModal(false)}
      >
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">

              <div className="loginInputContainer">
              {/* {signup && (
                <MaterialInput
                  type="text"
                  label="Enter First Name"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              )} */}
              {signup && (
                <MaterialInput
                  type="text"
                  label="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  // rightElement={<a href="#">Forgot?</a>}
                />
              )}
                <MaterialInput
                  type="text"
                  label="Enter phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              
                <MaterialInput
                  type="password"
                  label="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  rightElement={<a href="#">Forgot?</a>}
                />
              {
                signup ? 
                <MaterialButton
                  title="Signup"
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{ marginTop: "60px" }}
                  onClick={createUser}
                /> 
                : <MaterialButton
                  title="Login"
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{ marginTop: "60px" }}
                  onClick={userLogin}
                />
              }
                

                <p style={{ textAlign: 'center', marginTop: '20px' }}>OR</p>

                <MaterialButton
                  title="Request OTP"
                  bgColor="#ffffff"
                  textColor="#4074ef"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        {/* Logo start */}
        <div className="logo">
          <a href="/">
            <img src={logo} className="logoimage" alt="" />
          </a>
          </div>
          <a style={{ marginTop: '0.6rem' }} className="logotext text-decoration-none">
            Riding Gear
          </a>
        {/* Logo end  */}

        {/* Search component */}
        <div style={{
          padding: '0 10px'
        }}>
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={'search for products, brands and more'}
            />
            <div className="searchIconContainer">
              <IoIosSearch style={{
                color: '#2874f0'
              }} />
            </div>

          </div>
        </div>
        {/* Search component end */}

        {/* right side manu */}

        <div className="rightMenu">
          {
            auth.authenticate ?
              renderLoggedInManu() : renderNonLoggedInManu()
          }

          { }

          <DropdownMenu
            menu={
              <a className="more text-decoration-none">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: 'Notification Preference', href: '', icon: null },
              { label: 'Sell on flipkart', href: '', icon: null },
              { label: '24x7 Customer Care', href: '', icon: null },
              { label: 'Advertise', href: '', icon: null },
              { label: 'Download App', href: '', icon: null }
            ]}
          />
          <div>
            <a className="cart text-decoration-none" href="/cart" >
              <Cart count={Object.keys(cart.cartItems).length} />
              <span style={{ margin: '0 10px' }}>Cart</span>
            </a>
          </div>
        </div>
        {/* right side manu ends */}

      </div>
    </div>
  )

}

export default Header