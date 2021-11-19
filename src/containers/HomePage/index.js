import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import { Carousel } from 'react-responsive-carousel';
import { Card, Row, Col } from 'react-bootstrap';
import "./style.css"


const HomePage = (props) => {

    const homepage = useSelector(state => state.home);
    const { carousell, products } = homepage
    console.log('reser')
    console.log(products)
    function carouselitem() {
        const pri = products.map((data) =>

            <Col sm={4}>
                <Card style={{ width: '22rem', height:'30rem' }} className="shadow my-2 mx-0 p-2">
                    <a href={`/${data.slug}/${data._id}/p`} className="text-decoration-none text-dark">
                    <Card.Img variant="top" style={{ padding: "1rem 0.5rem", height:"70%" }} src={`https://ecommerceapp13.herokuapp.com/public/${data.productPictures[0].img}`} />
                    <Card.Body className="">
                        <Card.Text className=" p-0">
                            <div class="content">
                                <div className="d-flex justify-content-between">
                                    <h5>{data.name}</h5>
                                    <div class="stars">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="far fa-star"></i>
                                        {/* <span>( 250 reviews )</span> */}
                                    </div>
                                </div>
                                <div class="price">&#8377; {data.price} <span className="px-2">&#8377;6000</span></div>
                                {/* <a href="#" class="btn">add to cart</a> */}
                            </div>
                            {/* {data.name} */}
                        </Card.Text>
                    </Card.Body>
                    </a>
                </Card>
            </Col>
        )
        return pri
    }
    return (
        <>
            <Layout >
                <Carousel
                    renderThumbs={() => { }}
                    autoPlay
                    infiniteLoop
                    className="shadow p-0"
                >
                    <div>
                        <img src={carousell.img1} alt="img1" />
                    </div>
                    <div>
                        <img src={carousell.img2} alt="img2"/>
                    </div>
                    <div>
                        <img src={carousell.img3} alt="img3"/>
                    </div>
                </Carousel>
                <div className="d-flex my-3">
                    <div className=" p-2 px-4  popular shadow">
                        Popular
                    </div>
                    <div className="p-2 px-5 font_text">
                        Best Selling
                    </div>
                </div>
                <Row className="z-index-1 p-0">
                    {
                        carouselitem()
                    }
                </Row>
            </Layout>

        </>
    )
};

export default HomePage;
