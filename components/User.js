import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function ShowUser() {
  const { user } = useAuth();
  return (
    <div className="profilepage">
      <Image src={user.profile_image_url} alt="user" width="100px" height="100px" />
      <h1>{user.first_name} {user.last_name}</h1>
      <h3 className="bio">{user.bio}</h3>
      <h2>Email: {user.email}</h2>
      <h2>Account Created On: {user.created_on}</h2>
      <Button type="button" size="lg" className="signout-btn" onClick={signOut}>Sign Out</Button>
    </div>
  );
}

ShowUser.propTypes = {
  userObj: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    lastLogIn: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
