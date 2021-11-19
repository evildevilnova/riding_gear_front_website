import React from 'react'
import { Card, Col } from 'react-bootstrap';

const Cards = (props) => {
    return (
            <Col className="col-4 mr-0">
                <Card style={{ width: '26.659rem' }}>
                    <Card.Img variant="top" src={props.image} height='390px'/>
                    <Card.Body>
                        {/* <Card.Title>Card Title</Card.Title> */}
                    </Card.Body>
                </Card>
            </Col>
    )
}

export default Cards
