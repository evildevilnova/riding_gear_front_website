import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import './cardedstyle.css';

const Carded = (props) => {
    return (
        <Container fluid>
            <Row>
                <Col
                    {...props}
                    className={`card ${props.col}`}
                >
                    <div className="cardHeader">
                        {
                            props.headerLeft && <div>{props.headerLeft}</div>
                        }
                        {
                            props.headerRight && props.headerRight
                        }
                    </div>
                    {props.children}
                </Col>
                
            </Row>
        </Container>
    )
}

export default Carded

// <div
//                         className="card"
//                         {...props}
//                     >
//                         <div className="cardHeader">
//                             {
//                                 props.headerLeft && <div>{props.headerLeft}</div>
//                             }
//                             {
//                                 props.headerRight && props.headerRight
//                             }
//                         </div>
//                         {props.children}
//                     </div>