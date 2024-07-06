import React, { useEffect, useState, useRef, useContext } from 'react';
import '../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import calculateAvgRating from '../utils/avgRating';
import avatar from "../assets/images/avatar.jpg";
import Booking from '../components/Booking/Booking';
import Newsletter from '../shared/Newsletter';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext';

const TourDetails = () => {
    const { id } = useParams();
    const [tourRating, setTourRating] = useState(null);
    const reviewMsgRef = useRef();
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]); // State to store reviews

    const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Fetch reviews when the component mounts
        getReviews();
    }, []);

    const getReviews = async () => {
        try {
            const res = await fetch(`${BASE_URL}/review/${id}`);
            const data = await res.json();
            if (data.success) {
                setReviews(data.reviews);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    const submitHandler = async e => {
        e.preventDefault();
        const reviewText = reviewMsgRef.current.value;

        try {

            if (!user || user === undefined || user === null) {
                alert("You need to be logged in to submit a review")
            }

            const reviewObj = {
                username: user.username,
                reviewText,
                rating: tourRating
            }
            const res = await fetch(`${BASE_URL}/review/${id}`, {
                method: 'post',
                headers: { 'content-type': "Application/json" },
                credentials: 'include',
                body: JSON.stringify(reviewObj)
            });

            const result = await res.json()
            alert(result.message);
            // Refetch reviews after submission
            getReviews();
        } catch (err) {
            alert(err.message);
        }
    };

    if (!tour) {
        // Render loading state or return null if tour data is not available yet
        return null;
    }

    const { photo, title, desc, price, address, reviews: tourReviews, city, distance, maxGroupSize } = tour;

    const { totalRating, avgRating } = calculateAvgRating(tourReviews);

    return (
        <>
            <section>
                <Container>
                    {loading && <h4 className="text-center pt-5">Loading.....</h4>}
                    {error && <h4 className="text-center pt-5">{error}</h4>}
                    {!loading && !error && (
                        <Row>
                            <Col lg='8'>
                                <div className='tour__content'>
                                    <img src={photo} alt=" " />
                                    <div className="tour__info">
                                        <h2>{title}</h2>
                                        <div className='d-flex align-items-center gap-5'>
                                            <span className='tour__rating d-flex align-items-center gap-1'>
                                                <i className="ri-star-fill" style={{ 'color': 'var(--secondary-color)' }}></i> {avgRating === 0 ? null : avgRating}
                                                {totalRating === 0 ? (
                                                    "Not rated"
                                                ) : (
                                                        <span>({tourReviews?.length ?? 0})</span>
                                                    )}
                                            </span>
                                            <span>
                                                <i className='ri-map-pin-user-fill'></i>{address}
                                            </span>
                                        </div>
                                        <div className='tour__extra-details'>
                                            <span> <i className='ri-map-pin-2-line'></i>{city}</span>
                                            <span> <i className='ri-money-dollar-circle-line'></i>${price} /per person</span>
                                            <span> <i className='ri-map-pin-time-line'></i>{distance} k/m</span>
                                            <span> <i className='ri-group-line'></i>{maxGroupSize} people</span>
                                        </div>
                                        <h5>Description</h5>
                                        <p>{desc}</p>
                                    </div>
                                    {/*=============== tour reviews section===========*/}
                                    <div className='tour__reviews mt-4'>
                                        <h4>Reviews ({tourReviews?.length} reviews)</h4>
                                        <Form onSubmit={submitHandler}>
                                            <div className='d-flex align-items-center gap-3 mb-4 rating__group'>
                                                <span onClick={() => setTourRating(1)}>1 <i className='ri-star-s-fill'></i></span>
                                                <span onClick={() => setTourRating(2)}>2 <i className='ri-star-s-fill'></i></span>
                                                <span onClick={() => setTourRating(3)}>3 <i className='ri-star-s-fill'></i></span>
                                                <span onClick={() => setTourRating(4)}>4 <i className='ri-star-s-fill'></i></span>
                                                <span onClick={() => setTourRating(5)}>5 <i className='ri-star-s-fill'></i></span>
                                            </div>
                                            <div className='review__input'>
                                                <input type='text' ref={reviewMsgRef} placeholder='Share your thoughts' required />
                                                <button className="btn primary__btn text-white" type="submit">
                                                    Submit
                                                </button>
                                            </div>
                                        </Form>
                                        <ListGroup className='user__reviews'>
                                            {reviews.map(review => (
                                                <div className="review__item" key={review._id}>
                                                    <img src={avatar} alt="" />
                                                    <div className='w-100'>
                                                        <div className='d-flex align-items-center justify-content-between'>
                                                            <div>
                                                                <h5>{review.username}</h5>
                                                                <p>{new Date(review.createdAt).toLocaleDateString("en-US", options)}</p>
                                                            </div>
                                                            <span className='d-flex align-items-center'>{review.rating} <i className='ri-star-s-fill'></i></span>
                                                        </div>
                                                        <h6>{review.reviewText}</h6>
                                                    </div>
                                                </div>
                                            ))}
                                        </ListGroup>
                                    </div>
                                    {/*=============== tour reviews section end ===========*/}
                                </div>
                            </Col>
                            <Col lg='4'>
                                <Booking tour={tour} avgRating={avgRating} />
                            </Col>
                        </Row>
                    )}
                </Container>
            </section>
            <Newsletter />
        </>
    );
};

export default TourDetails;
