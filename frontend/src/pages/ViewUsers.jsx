import React, { useState, useEffect } from 'react';
import '../styles/view-users.css'; // Ensure you create this CSS file for styling
import { Container, ListGroup } from 'reactstrap';

const BASE_URL = 'http://localhost:4000/api/v1';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${BASE_URL}/users?role=user`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Fetch error: ", error.message);
    }
  };

  return (
    <section>
      <Container>
        <h1 className="text-center mb-4 user__list-title">All Users</h1>
        <ListGroup className='user__list'>
          {users.map(user => (
            <div className="user__item" key={user._id}>
              <div className='w-100'>
                <div className='d-flex align-items-center justify-content-between'>
                  <div>
                    <h5>Name: {user.username}</h5>
                    <p>Email: {user.email}</p>
                    <p>Joined on: {new Date(user.createdAt).toLocaleDateString("en-US")}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ListGroup>
      </Container>
    </section>
  );
};

export default ViewUsers;
