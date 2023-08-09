/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteTherapist } from '../api/therapistData';
import { getSingleCategory } from '../api/categoryData';

export default function TherapistCard({ therapistObj, onUpdate }) {
  const [category, setCategory] = useState({});
  const deleteThisTherapist = () => {
    if (window.confirm(`Delete ${therapistObj.first_name} ${therapistObj.last_name}?`)) {
      deleteTherapist(therapistObj.id).then(() => onUpdate());
    }
  };

  useEffect(() => {
    getSingleCategory(therapistObj.category_id).then(setCategory);
  }, [therapistObj.category_id]);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <img src={therapistObj.profile_image_url} alt="user" width="100px" height="100px" />
        <h2>
          {therapistObj.first_name} {therapistObj.last_name}
        </h2>
        <h3>{category.label}</h3>
        <h5>{therapistObj.city}, {therapistObj.state}</h5>
        <p>{therapistObj.description}</p>
        <Link href={`/therapists/${therapistObj.id}`} passHref>
          <Button variant="primary" className="m-2">Details</Button>
        </Link>
        <Link href={`/therapists/edit/${therapistObj.id}`} passHref>
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
    profile_image_url: PropTypes.string,
    favorite: PropTypes.bool,
    city: PropTypes.string,
    state: PropTypes.string,
    is_therapist: PropTypes.bool,
    category_id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
