import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../../../actions";
import Card from "../../../components/UI/Card";
import { BiRupee } from "react-icons/bi";
import { Link } from "react-router-dom";

import "./style.css";
import { generatePublicUrl } from "../../../urlConfig";
import { Container, Row, Col } from "react-bootstrap";

/**
 * @author
 * @function ClothingAndAccessories
 **/

const ClothingAndAccessories = (props) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getProductBySlug(match.params.slug));
  }, []);

  return (
    <div style={{ padding: "1rem 5rem" }}>
      {product.products.map((product) => (
        <Card
          style={{
            boxSizing: "border-box",
            padding: "10px",
            marginTop: "1rem",
            display: "flex",
          }}
        >
          <Container>
            <Row>
              <Col sm={6}>
                <Link
                  className="caImgContainer"
                  to={`/${product.slug}/${product._id}/p`}
                >
                  <img src={generatePublicUrl(product.productPictures[0].img)} />
                </Link>
              </Col>
              <Col sm={6}>
                <Row className="d-flex my-2">
                  <Col sm={2}>
                  <h6 className="m-0">Name</h6>
                  </Col>
                  <Col sm={7}>
                  <p>{product.name}</p>
                  </Col>
                </Row>
                <Row className="d-flex">
                  <Col sm={2}>
                  <h6 className="m-0">Description</h6>
                  </Col>
                  <Col sm={7}>
                  {product.description} 
                  </Col>
                </Row>
                <Row className="d-flex">
                  <Col sm={2}>
                  <h6 className="m-0 mb-1">Price</h6>
                  </Col>
                  <Col sm={7}>
                  <BiRupee />
                  {product.price} 
                  </Col>
                </Row>
                <Row className="d-flex">
                  <Col sm={2}>
                  <h6 className="my-2">Color</h6>
                  </Col>
                  <Col sm={7}>
                  <p className="my-2">Black</p> 
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Card>
      ))}
    </div>
  );
};

export default ClothingAndAccessories;