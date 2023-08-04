/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import deleteTherapist from '../api/therapistData';

export default function TherapistCard({ therapistObj, onUpdate }) {
  const deleteThisTherapist = () => {
    if (window.confirm(`Delete ${therapistObj.first_name} ${therapistObj.last_name}?`)) {
      deleteTherapist(therapistObj.uid).then(() => onUpdate());
    }
  }
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <img src={therapistObj.image_url} alt="user" width="100px" height="100px" />
        <Card.Title>{therapistObj.first_name}</Card.Title>
        <Card.Title>{therapistObj.last_name}</Card.Title>
        <h3>{therapistObj.city},{therapistObj.state}</h3>
        <p>{therapistObj.description}</p>
        <Link href={`/therapist/${therapistObj.first_name}-${therapistObj.last_name}`} passHref>
          <Button variant="primary" className="m-2">Details</Button>
        </Link>
        <Link href={`/therapist/edit/${therapistObj.id}`} passHref>
          <Button variant="info">Edit</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisTherapist} className="m-2">
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

TherapistCard.propTypes = {
  therapistObj: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    description: PropTypes.string,
    uid: PropTypes.string,
    image_url: PropTypes.string,
    favorite: PropTypes.bool,
    city: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
