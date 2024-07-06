import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, FormGroup, Button } from 'reactstrap';
import { BASE_URL } from '../utils/config';
import '../styles/payment.css';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { booking, totalAmount } = location.state;
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const handleChange = e => {
        setPaymentDetails(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handlePayment = async e => {
        e.preventDefault();

        try {
            const payment = {
                amount: totalAmount,
                cardNumber: paymentDetails.cardNumber,
                expiryDate: paymentDetails.expiryDate,
                cvv: paymentDetails.cvv
            };

            const res = await fetch(`${BASE_URL}/booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ booking, payment })
            });

            const result = await res.json();
            if (!res.ok) {
                return alert(result.message);
            }

            navigate("/thank-you");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="payment">
            <h2>Payment Details</h2>
            <Form onSubmit={handlePayment}>
                <FormGroup>
                    <input type="text" id="cardNumber" placeholder="Card Number" required onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <input type="text" id="expiryDate" placeholder="Expiry Date (MM/YY)" required onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <input type="text" id="cvv" placeholder="CVV" required onChange={handleChange} />
                </FormGroup>
                <Button type="submit" className="btn primary__btn w-100 mt-4">Pay ${totalAmount}</Button>
            </Form>
        </div>
    );
};

export default Payment;
