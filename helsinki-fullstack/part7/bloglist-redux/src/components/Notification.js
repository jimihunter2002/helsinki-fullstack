import React from 'react';
import { useSelector } from 'react-redux';

const notifyStyle = {
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
  color: '',
};

const Notification = () => {
  const notification = useSelector(state => state.notificationDisplay);
  if (notification === null) {
    return '';
  }

  //const successStyle = { ...notifyStyle, color: 'green' };
  switch (notification.status) {
    case 'success':
      const successStyle = { ...notifyStyle, color: 'green' };
      return <div style={successStyle}>{notification.message}</div>;
    case 'error':
      const errorStyle = { ...notifyStyle, color: 'red' };
      return <div style={errorStyle}>{notification.message}</div>;
    default:
      return;
  }

  // return notification ? (
  //   <div style={notification.style}>{notification.message}</div>
  // ) : (
  //   ''
  // );
};

export default Notification;
