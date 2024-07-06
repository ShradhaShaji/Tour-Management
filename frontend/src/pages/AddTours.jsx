import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const AddTour = () => {
  const [tourData, setTourData] = useState({
    title: '',
    city: '',
    address: '',
    distance: 0,
    photo: '',
    desc: '',
    price: 0,
    maxGroupSize: 0,
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/tours', tourData);
      console.log(response.data);
      // Optionally: Redirect to another page or show a success message
    } catch (error) {
      console.error('Error adding tour:', error);
      // Optionally: Show an error message
    }
  };

  return (
    <Container>
      <h2>Add Tour</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input type="text" name="title" id="title" value={tourData.title} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="city">City</Label>
          <Input type="text" name="city" id="city" value={tourData.city} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input type="text" name="address" id="address" value={tourData.address} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="distance">Distance</Label>
          <Input type="number" name="distance" id="distance" value={tourData.distance} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="photo">Photo URL</Label>
          <Input type="text" name="photo" id="photo" value={tourData.photo} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="desc">Description</Label>
          <Input type="textarea" name="desc" id="desc" value={tourData.desc} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="price">Price</Label>
          <Input type="number" name="price" id="price" value={tourData.price} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="maxGroupSize">Max Group Size</Label>
          <Input type="number" name="maxGroupSize" id="maxGroupSize" value={tourData.maxGroupSize} onChange={handleChange} required />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" name="featured" checked={tourData.featured} onChange={(e) => setTourData({ ...tourData, featured: e.target.checked })} />{' '}
            Featured
          </Label>
        </FormGroup>
        <Button type="submit" color="primary">Add Tour</Button>
      </Form>
    </Container>
  );
};

export default AddTour;



