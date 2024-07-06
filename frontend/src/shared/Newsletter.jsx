import React from 'react';
import './newsletter.css';

import {Container, Row,Col}  from 'reactstrap';
import maleTourist from '../assets/images/male-tourist.png';

const Newsletter = () => {
  return (
    <section className='newsletter'> 
        <Container>
        <Row>
            <Col lg='6'>
                <div className='newsletter__content'>
                    <h2> Subscribe now to get useful traveling information.</h2>
                    <div className='newsletter__inputs'>
                        <input type='email' placeholder="Enter your email"/>
                        <button className='btn newsletter__btn'>Subscribe</button>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto assumenda velit suscipit tempore repellat sit asperiores aperiam numquam, quam modi error ipsam. Quibusdam culpa enim saepe maxime reprehenderit, qui reiciendis?
                    </p>
                </div>
            </Col>
            <Col lg='6'>
                <div ClassName='newsletter__img'>
                    <img src={maleTourist} alt=""/>
                </div>
            </Col>
        </Row>
        </Container>
    </section>
  );
};

export default Newsletter;
