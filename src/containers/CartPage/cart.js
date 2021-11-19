import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getCartItems } from '../../actions/index';
import Layout from '../../components/Layout/index';
// import Carded from '../../components/UI/Carded';
import CartItem from './CartItem';
import './style.css';
import { MaterialButton } from '../../components/MaterialUI';
import PriceDetails from '../../components/PriceDetails';
import Card from '../../components/UI/Card';
import { Container,Col,Row } from 'react-bootstrap';

const CartPage = (props) => {

    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);
    // const cartItems = cart.cartItems;    
    const [cartItems, setCartItems] = useState(cart.cartItems);

    const dispatch = useDispatch();

    useEffect(() => {
        setCartItems(cart.cartItems)
    }, [cart.cartItems]);

    useEffect(() => {
        if (auth.authenticate) {
            dispatch(getCartItems());
        }
    }, [auth.authenticate]);

    const onQuantityIncreament = (_id, qty) => {
        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, 1));
        console.log({ _id, qty });
    };

    const onQuantityDecreament = (_id, qty) => {
        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, -1));
        console.log({ _id, qty });
    };

    if (props.onlyCartItems) {
        return (
            <>
                {
                    Object.keys(cartItems).map((key, index) =>
                        <CartItem
                            key={index}
                            cartItem={cartItems[key]}
                            onQuantityInc={onQuantityIncreament}
                            onQuantityDec={onQuantityDecreament}
                        />
                    )
                }
            </>
        )
    }
    return (
        <Layout>
            <Container>
                <Row>
                    <Col sm={8} className="cartsizes">
                    <Card
                    headerLeft={`My Cart`}
                    headerRight={<div>Deliver to</div>}
                    // style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
                    
                >
                    {
                        Object.keys(cartItems).map((key, index) =>

                            <CartItem
                                key={index}
                                cartItem={cartItems[key]}
                                onQuantityInc={onQuantityIncreament}
                                onQuantityDec={onQuantityDecreament}
                            />
                        )
                    }
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            background: '#ffff',
                            justifyContent: 'flex-end',
                            boxShadow: '0 0 10px 10px #eee',
                            padding: '10px 0',
                            boxSizing: 'border-box'
                        }}
                    >
                        <div
                            style={{ width: '250px' }}
                        >
                            <MaterialButton
                                title="PLACE ORDER"
                                onClick={() => props.history.push('/checkout')}
                            />
                        </div>

                    </div>

                </Card>
                    </Col>
                    <Col sm={4}>
                    <PriceDetails
                    totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
                        return qty + cart.cartItems[key].qty;
                    }, 0)}
                    totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                        const { price, qty } = cart.cartItems[key];
                        return totalPrice + price * qty;
                    }, 0)}
                />
                    </Col>
                </Row>
            </Container>
            {/* <div className="cartContainer"> */}
                
                
            {/* </div> */}
        </Layout>

    )
}

export default CartPage;
