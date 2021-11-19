import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAddress } from '../../actions';
import { MaterialButton, MaterialInput } from '../../components/MaterialUI';

const AddressForm = (props) => {

    const { initialData } = props;
    const [name, setName] = useState(initialData ? initialData.name : "");
    const [mobileNumber, setMobileNumber] = useState(
      initialData ? initialData.mobileNumber : ""
    );
    const [pinCode, setPinCode] = useState(
      initialData ? initialData.pinCode : ""
    );
    const [locality, setLocality] = useState(
      initialData ? initialData.locality : ""
    );
    const [address, setAddress] = useState(
      initialData ? initialData.address : ""
    );
    const [cityDistricTown, setCityDistricTown] = useState(
      initialData ? initialData.cityDistricTown : ""
    );
    const [state, setstate] = useState(initialData ? initialData.state : "");
    const [landmark, setLandmark] = useState(
      initialData ? initialData.landmark : ""
    );
    const [alternatePhone, setAlternatePhone] = useState(
      initialData ? initialData.alternatePhone : ""
    );
    const [addressType, setAddressType] = useState(
      initialData ? initialData.addressType : ""
    );
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [submitFlag, setSubmitFlag] = useState(false);
    const [id, setId] = useState(initialData ? initialData._id : "");

    // const [name, setName] = useState('');
    // const [mobileNumber, setMobileNumber] = useState('');
    // const [pinCode, setPinCode] = useState('');
    // const [locality, setLocality] = useState('');
    // const [address, setAddress] = useState('');
    // const [cityDistricTown, setCityDistricTown] = useState('');
    // const [state, setstate] = useState('');
    // const [landmark, setLandmark] = useState('');
    // const [alternatePhone, setAlternatePhone] = useState('');
    // const [addressType, setAddressType] = useState('');
    // const [submitFlag, setSubmitFlag] = useState(false);
    // const dispatch = useDispatch();
    // const user = useSelector(state => state.user);

    const inputContainer = {
        width: '100%',
        marginRight: '10'
    };
    const onAddressSubmit = (e) => {
        const payload = {
            address: {
                name,
                mobileNumber,
                pinCode,
                locality,
                address,
                cityDistricTown,
                state,
                landmark,
                alternatePhone,
                addressType
            }
        }
        console.log(payload);
        if(id){
            payload.address._id = id;
        }
        dispatch(addAddress(payload));
        setSubmitFlag(true);
    };

    useEffect(() => {
        if(submitFlag){
            let _address = {};
            if(id){
                _address = {
                    _id: id,
                    name,
                    mobileNumber,
                    pinCode,
                    locality,
                    address,
                    cityDistricTown,
                    state,
                    landmark,
                    alternatePhone,
                    addressType,
                };
            }else{
            _address = user.address.slice(user.address.length - 1)[0];
            }
            props.onSubmitForm(_address);
                   
        }
    },[user.address]);

    const renderAddressForm = () => {
        return (
            <>
                <div className="flexRow">
                    <div className={inputContainer}>
                        <MaterialInput
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={inputContainer}>
                        <MaterialInput
                            label="10-digit mobile number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flexRow">
                    <div className={inputContainer}>
                        <MaterialInput
                            label="Pinecode"
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                        />
                    </div>
                    <div className={inputContainer}>
                        <MaterialInput
                            label="Locality"
                            value={locality}
                            onChange={(e) => setLocality(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flexRow">
                    <div className={inputContainer}>
                        <MaterialInput
                            label="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flexRow">
                    <div className={inputContainer}>
                        <MaterialInput
                            label="City/District/Town"
                            value={cityDistricTown}
                            onChange={(e) => setCityDistricTown(e.target.value)}
                        />
                    </div>
                    <div className={inputContainer}>
                        <MaterialInput
                            label="State"
                            value={state}
                            onChange={(e) => setstate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flexRow">
                    <div className={inputContainer}>
                        <MaterialInput
                            label="Landmark"
                            value={landmark}
                            onChange={(e) => setLandmark(e.target.value)}
                        />
                    </div>
                    <div className={inputContainer}>
                        <MaterialInput
                            label="Alternate phone number"
                            value={alternatePhone}
                            onChange={(e) => setAlternatePhone(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label className="mt-4">Address Type</label>
                    <div className="flexRow my-2">
                        <div>
                            <input type="radio" onClick={() => setAddressType('home')} name="addressType" value="home" />
                            <span style={{ marginLeft: "0 7px" }}>Home</span>
                        </div>
                        <div style={{ margin: "0 25px" }}>
                            <input type="radio" onClick={() => setAddressType('work')} name="addressType" value="work" />
                            <span style={{ margin: "0 8px" }}>Work</span>
                        </div>
                    </div>
                    <div className="flexRow">
                        <MaterialButton
                            title="Save and Deliver here"
                            onClick={onAddressSubmit}
                            style={{
                                width: '250px',
                                margin: '20px 0'
                            }}
                        />
                    </div>
                </div>
            </>
        )
    }
    if (props.withoutLayout) {
        return <div>{renderAddressForm()}</div>;
    }

    return (
        <div className="checkoutStep" style={{ background: '#f5faff', }}>
            <div className={`checkoutHeader pt-3`}>
                <div>
                    <span className="stepNumber">+</span>
                    <span className="stepTitle">{'ADD NEW ADDRESS'}</span>
                </div>
            </div>
            <div style={{
                padding: '0 50px',
                paddingBottom: '20px',
                boxSizing: 'border-box'
            }}>
                {renderAddressForm()}
            </div>
        </div>
    );
};

export default AddressForm;
