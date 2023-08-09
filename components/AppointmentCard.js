/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { deleteAppointment } from '../api/appointmentData';
import { getSingleCategory } from '../api/categoryData';
// import { getSingleTherapist } from '../api/therapistData';

function AppointmentCard({
  id,
  therapist_id,
  category_id,
  service,
  day,
  time,
  time_ordered,
  onUpdate,
}) {
  const { user } = useAuth();
  const [category, setCategory] = useState({});
  const deleteThisAppointment = () => {
    if (window.confirm('Delete appointment?')) {
      deleteAppointment(id).then(() => onUpdate());
    }
  };

  useEffect(() => {
    getSingleCategory(category_id).then(setCategory);
  }, [category_id]);

  return (
    <Card className="text-center" style={{ margin: '20px' }}>
      <Card.Header>Appointment for: {user.first_name} {user.last_name}</Card.Header>
      <Card.Body>
        <Card.Title>Service Type: {service}</Card.Title>
        <Card.Text>
          <p>Therapist: {therapist_id.first_name}</p>
          <p>Day: {day}</p>
          <p>Time: {time}</p>
          <p>Date placed: {time_ordered}</p>
          <p>Category: {category.label}</p>
        </Card.Text>
        <Link href={`/appointments/edit/${id}`} passHref>
          <Button variant="info">Edit</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisAppointment} className="m-2">
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

AppointmentCard.propTypes = {
  id: PropTypes.number.isRequired,
  therapist_id: PropTypes.object.isRequired,
  category_id: PropTypes.object.isRequired,
  service: PropTypes.string.isRequired,
  day: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  time_ordered: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AppointmentCard;
