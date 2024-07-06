import React from 'react';
import ServiceCard from './ServiceCard';
import {Col} from 'reactstrap';

import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/customization.png';

const servicesData=[
    {
    imgUrl: weatherImg,
    title: 'Calculate weather',
    desc:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id tenetur facilis tempora amet doloremque sunt aspernatur quisquam illo, inventore in fugit atque eius. Cupiditate modi voluptas at omnis porro laboriosam!',
    },
    {
    imgUrl: guideImg,
    title: 'Best Tour Guide',
    desc:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id tenetur facilis tempora amet doloremque sunt aspernatur quisquam illo, inventore in fugit atque eius. Cupiditate modi voluptas at omnis porro laboriosam!',
    },
    {
    imgUrl: customizationImg,
    title: 'Customization',
    desc:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id tenetur facilis tempora amet doloremque sunt aspernatur quisquam illo, inventore in fugit atque eius. Cupiditate modi voluptas at omnis porro laboriosam!',
    },
        
]

const ServiceList = () => {
  return ( <>
  
    {
        servicesData.map((item, index)=>(
        <Col lg='3' key={index}>
            <ServiceCard item={item} />
        </Col>))
    }
  
  </>
  );
};

export default ServiceList;
