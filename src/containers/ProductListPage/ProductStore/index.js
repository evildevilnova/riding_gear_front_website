import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductBySlug } from '../../../actions';
import { generatePublicUrl } from '../../../urlConfig';
import './style.css';
// import StarLogo from '../../images/Star.svg';

const ProductStore = (props) => {
    const product = useSelector(state => state.product);
    const dispatch = useDispatch();

    const [priceRange, setPriceRange] = useState({
        under5k: 5000,
        under10k: 10000,
        under15k: 15000,
        under20k: 20000,
        under30k: 30000,
    })
    useEffect(() => {
        const { match } = props
        dispatch(getProductBySlug(match.params.slug));
    }, []);

    return (
        <div style={{ backgroundColor: '#F1F3F6'}}>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <>
                            <fieldset className="m-3" style={{ border: "1px solid #cccc", borderRadius: "0.40rem", backgroundColor: 'white' }}>
                                <div className="m-3 pb-2" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #cccc' }}>
                                    <div>{props.match.params.slug} under {priceRange[key]}</div>
                                    <button className="btn btn-primary btn-sm">view all</button>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    {
                                        product.productsByPrice[key].map(product =>

                                            <Link
                                                to={`/${product.slug}/${product._id}/p`}
                                                className="card"
                                                style={{ width: "13rem", border: "none", display: 'block', textDecoration: 'none' }}>
                                                <div className="card-body text-center">
                                                    <img src={generatePublicUrl(product.productPictures[0].img)} className="card-img-top" alt="..." style={{ width: '4rem' }} />
                                                    <h5 className="card-title mt-2 productTitle">{product.name}</h5>
                                                    <div className="d-flex">
                                                        <div className="rating">4.3
                                                            <i className="bi bi-star-fill"></i>
                                                            {/* <img src={StarLogo} /> */}
                                                        </div>
                                                        <span> (8377)</span>                                        
                                                    </div>

                                                    <h5 className="card-subtitle mb-2 bold"><span>&#8377;</span>{product.price}</h5>
                                                </div>
                                            </Link>
                                        )
                                    }
                                </div>
                            </fieldset>
                        </>
                    )
                })
            }
        </div>
    )
}

export default ProductStore;