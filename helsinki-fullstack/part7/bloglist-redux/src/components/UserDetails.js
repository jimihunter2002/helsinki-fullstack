import React from 'react';
import { useParams } from 'react-router-dom';
import utility from '../utilities/utility';

const UserDetails = ({ users }) => {
  const id = useParams().id;
  const user = users.find(n => n.id === id);

  return (
    <>
      <h2>{utility.capitalizeString(user.name)}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default UserDetails;
