import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductPage } from '../../../actions';
import getParams from '../../../utils/getParams';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Cards from '../../../components/UI/Cards';
import { Container, Row } from 'react-bootstrap';

const ProductPage = (props) => {

    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const { page } = product;

    useEffect(() => {

        const params = getParams(props.location.search);
        const payload = {
            params
        }
        dispatch(getProductPage(payload));
    }, []);
    return (
        <>
            <h3>{page.title}</h3>
            <Carousel
                renderThumbs={() => { }}
            >
                {
                    page.banners && page.banners.map((banner, index) =>
                        <a
                            key={index}
                            style={{ display: 'block' }}
                            href={banner.navigateTo}
                        >
                            <img src={banner.img} alt="banner"/>
                        </a>
                    )
                }
            </Carousel>
            <div>
                <Container fluid>
                    <Row>
                        {
                            page.products && page.products.map((product, index) =>

                                <Cards
                                    image={product.img}
                                    key={index}
                                />
                            )
                        }
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default ProductPage;
