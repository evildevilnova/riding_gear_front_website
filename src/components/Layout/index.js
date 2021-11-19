import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../Footer';
import Header from '../Header';
import ManuHeader from '../ManuHeader';

const Layout = (props) => {
    return (
        <div className="">
            <Header />
            <Container fluid className="p-0">
                <Row className="p-0 m-0">
                    <Col sm={2} className="">
                        <ManuHeader />
                    </Col>
                    <Col sm={10} className="p-0">
                        <Row className="p-0 m-0">
                        {props.children}                            
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />

        </div>
    )
};

export default Layout;
