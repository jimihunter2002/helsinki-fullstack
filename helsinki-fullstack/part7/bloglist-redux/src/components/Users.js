import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-row: auto auto;
  max-width: 250px;
`;

const UserNameLeft = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  margin-bottom: 5px;
`;

const UserInfoRight = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  margin-bottom: 5px;
`;

const User = ({ user }) => {
  return (
    <>
      <UserNameLeft>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </UserNameLeft>
      <UserInfoRight>{user.blogs.length}</UserInfoRight>
    </>
  );
};

const Users = () => {
  const users = useSelector(state => state.users);
  return (
    <div>
      <h2>Users</h2>
      <GridContainer>
        <UserInfoRight>
          <h4>blogs created</h4>
        </UserInfoRight>
      </GridContainer>
      <GridContainer>
        {users.map(user => (
          <User key={user.id} user={user} />
        ))}
      </GridContainer>
    </div>
  );
};

export default Users;
