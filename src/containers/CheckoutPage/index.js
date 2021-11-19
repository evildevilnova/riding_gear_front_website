import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, getAddress, getCartItems } from "../../actions";
import Layout from '../../components/Layout';
import { Anchor, MaterialButton, MaterialInput } from '../../components/MaterialUI';
import PriceDetails from '../../components/PriceDetails';
import AddressForm from './AddressForm';
import CartPage from '../CartPage/cart';
import './style.css';
import Card from '../../components/UI/Card';
import { useHistory } from 'react-router-dom';

const CheckoutStep = (props) => {
    
    return (
        <div className="checkoutStep">
            <div onClick={props.onClick} className={`checkoutHeader ${props.active && 'active'}`}>
                <div className="">
                    <span className="stepNumber">{props.stepNumber}.</span>
                    <span className="stepTitle">{props.title}</span>
                </div>
            </div>
            {props.body && props.body}
        </div>
    );
}

const Address = ({
    selectAddress,
    enableAddressEditForm,
    confirmDeliveryAddress,
    onAddressSubmit,
    adr
}) => {
    return (
        <div className="flexRow addressContainer">
            <div className="p-3">
                <input
                    name="address"
                    onClick={() => selectAddress(adr)}
                    type="radio"
                />
            </div>
            <div className="flexRow sb addressinfo">
                {
                    !adr.edit ?
                        (
                            <div style={{ width: "100%" }}>
                                <div className="addressDetail">
                                    <div>
                                        <span className='addressName'>{adr.name}</span>
                                        <span className="addressType">{adr.addressType}</span>
                                        <span className="addressMobileNumber">{adr.mobileNumber}</span>
                                    </div>
                                    {
                                        adr.selected && (
                                            <Anchor
                                                name="Edit"
                                                onClick={() => enableAddressEditForm(adr)}
                                                style={{
                                                    fontWeight: "500",
                                                    color: "#2874f0"
                                                }}
                                            />
                                        )}
                                    <div className="fullName">
                                        {adr.address}<br />{" "}
                                        {`${adr.state}-${adr.pinCode}`}
                                    </div>
                                    {
                                        adr.selected &&
                                        (
                                            <MaterialButton
                                                title="DELIVERY HERE"
                                                onClick={() => confirmDeliveryAddress(adr)}
                                                style={{
                                                    width: '250px',
                                                    margin: "10px 0"
                                                }}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                        ) : (
                            <AddressForm
                                withoutLayout={true}
                                onSubmitForm={onAddressSubmit}
                                initialData={adr}
                                onCancel={() => { }}
                            />
                        )
                }
            </div>
        </div>
    )
};

const CheckoutPage = (props) => {
    const cart = useSelector(state => state.cart);
    const [orderConfirmation, setOrderConfirmation] = useState(false);
    const user = useSelector(state => state.user);
    const auth = useSelector(state => state.auth);
    const [newAddress, setNewAddress] = useState(false);
    const [confirmAddress, setConfirmAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [address, setAddress] = useState([]);
    const [paymentOption, setPaymentOption] = useState(false);
    const [confirmOrder, setConfirmOrder] = useState(false);
    const [orderSummary, setOrderSummary] = useState(false);
    const dispatch = useDispatch();

    const history = useHistory();


    const onAddressSubmit = (addr) => {
        setSelectedAddress(addr);
        setConfirmAddress(true);
        setOrderSummary(true);
    }
    const userOrderConfirmation = () => {
        setOrderConfirmation(true);
        setOrderSummary(false);
        setPaymentOption(true)
    }

    const selectAddress = (addr) => {
        const updatedAddress = address.map(adr =>
            adr._id === addr._id ? { ...adr, selected: true } : { ...adr, selected: false });
        setAddress(updatedAddress);
    }

    const confirmDeliveryAddress = (addr) => {
        setSelectedAddress(addr);
        setConfirmAddress(true);
        setOrderSummary(true);
    }

    const enableAddressEditForm = (addr) => {
        const updatedAddress = address.map((adr) =>
            adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
        );
        setAddress(updatedAddress);
    };

    useEffect(() => {
        auth.authenticate && dispatch(getAddress());
        auth.authenticate && dispatch(getCartItems());
    }, [auth.authenticate]);

    useEffect(() => {
        const address = user.address.map(adr => ({ ...adr, selected: false, edit: false }));
        setAddress(address);
    }, [user.address]);


    const onConfirmOrder = () => {
        
        const totalAmount = Object.keys(cart.cartItems).reduce(
            (totalPrice, key) => {
                const { price, qty } = cart.cartItems[key];
                return totalPrice + price * qty;
            },
            0
        );
        const items = Object.keys(cart.cartItems).map((key) => ({
            productId: key,
            payablePrice: cart.cartItems[key].price,
            purchasedQty: cart.cartItems[key].qty,
        }));
        const payload = {
            addressId: selectedAddress._id,
            totalAmount,
            items,
            paymentStatus: "pending",
            paymentType: "cod",
        };
        console.log(payload);
        dispatch(addOrder(payload));
        setConfirmOrder(true);
        history.push('/');
    };
    return (
        <Layout>
            <div onDoubleClick={() => setNewAddress(false)} className="col-7 mx-5 my-4" style={{ alignItems: 'flex-start ' }}>
                <div className="checkoutContainer">
                    <CheckoutStep
                        stepNumber={'1'}
                        title={'LOGIN'}
                        active={!auth.authenticate}
                        body={
                            auth.authenticate ?
                                <div className="loggedInId p-2">
                                    <div>
                                        <span style={{ margin: '0 5px', fontSize: '1.2rem' }}>User: {auth.user.name}</span>
                                    </div>
                                    <span style={{ margin: '0 5px', fontSize: '1.2rem' }}>Phone: {auth.user.phone}</span>
                                </div>
                                :
                                <div>
                                    <MaterialInput
                                        label="Email"
                                    />
                                </div>
                        }
                    />
                    <CheckoutStep
                        stepNumber={'2'}
                        title={'DELIVERY ADDRESS'}
                        active={!confirmAddress && auth.authenticate}
                        body={
                            <>
                                {
                                    confirmAddress ? (
                                        <div className="stepCompleted px-3">{`${selectedAddress.name} ${selectedAddress.address}-${selectedAddress.pinCode}`}</div>
                                    ) :
                                        address.map((adr) =>
                                        (<Address
                                            selectAddress={selectAddress}
                                            enableAddressEditForm={enableAddressEditForm}
                                            confirmDeliveryAddress={confirmDeliveryAddress}
                                            onAddressSubmit={onAddressSubmit}
                                            adr={adr}
                                        />
                                        ))
                                }
                            </>
                        }

                    />

                    {/* AddressForm  */}
                    {confirmAddress ? null : newAddress ? (
                        <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => { }} />
                    ) : auth.authenticate ? (
                        <CheckoutStep
                            stepNumber={"+"}
                            title={"ADD NEW ADDRESS"}
                            active={false}
                            onClick={() => setNewAddress(true)}
                        />
                    ) : null}

                    <CheckoutStep
                        stepNumber="3"
                        title={'ORDER SUMMERY'}
                        active={orderSummary}
                        body={
                            orderSummary ?
                                (<CartPage onlyCartItems={true} />)
                                : orderConfirmation ?
                                    (<div className="stepCompleted px-3">{Object.keys(cart.cartItems).length} items</div>)
                                    : null
                        }
                    />

                    {orderSummary && (
                        <Card
                            style={{
                                margin: "10px 0",
                            }}
                        >
                            <div
                                className="flexRow sb"
                                style={{
                                    padding: "20px",
                                    alignItems: "center",
                                }}
                            >
                                <p style={{ fontSize: "12px" }}>
                                    Order confirmation email will be sent to{" "}
                                    <strong>{auth.user.email}</strong>
                                </p>
                                <MaterialButton
                                    title="CONTINUE"
                                    onClick={userOrderConfirmation}
                                    style={{
                                        width: "200px",
                                    }}
                                />
                            </div>
                        </Card>
                    )}

                    <CheckoutStep
                        stepNumber="4"
                        title={'PAYMENT OPTION'}
                        active={paymentOption}
                        body={
                            paymentOption && (
                                <div>
                                    <div
                                        className="flexRow"
                                        style={{
                                            alignItems: "center",
                                            padding: "20px",
                                        }}
                                    >
                                        <input type="radio" name="paymentOption" value="cod" />
                                        <div>Cash on delivery</div>
                                    </div>
                                    <MaterialButton
                                        title="CONFIRM ORDER"
                                        onClick={onConfirmOrder}
                                        style={{
                                            width: "200px",
                                            margin: "0 0 20px 20px",
                                        }}
                                    />
                                </div>
                            )
                        }
                    />
                </div>

                {/* Price Component */}

                <PriceDetails
                    totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
                        return qty + cart.cartItems[key].qty;
                    }, 0)}
                    totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                        const { price, qty } = cart.cartItems[key];
                        return totalPrice + price * qty;
                    }, 0)}
                />
            </div>
        </Layout>
    )
}

export default CheckoutPage;
