import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import DatePicker from 'react-datepicker';
import { getCategories } from '../../api/categoryData';
// import { useAuth } from '../../utils/context/authContext';
import { createAppointment, updateAppointment } from '../../api/appointmentData';
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import 'react-datepicker/dist/react-datepicker.css';
import { getTherapist } from '../../api/therapistData';

const initialAppointmentState = {
  id: '',
  therapist_id: '',
  category_id: '',
  service: '',
  day: '',
  time: '',
};

const AppointmentForm = ({ obj }) => {
  const [therapistCategories, setTherapistCategories] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [appointmentFormInput, setAppointmentFormInput] = useState(initialAppointmentState);
  const [selectedDate, setSelectedDate] = useState(null);
  const router = useRouter();
  // const { user } = useAuth();
  // const time = new Date().toLocaleString('en-US', {
  //   year: 'numeric',
  //   month: '2-digit',
  //   day: '2-digit',
  // });

  useEffect(() => {
    if (obj) {
      setAppointmentFormInput(obj);
    }
  }, [obj]);

  useEffect(() => {
    getCategories().then(setTherapistCategories);
    getTherapist().then(setTherapists);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split('T')[0];
    if (obj.id) {
      const appointmentUpdate = {
        id: appointmentFormInput.id,
        therapist_id: appointmentFormInput.therapist_id,
        category_id: appointmentFormInput.category_id,
        service: appointmentFormInput.service,
        day: appointmentFormInput.day,
        time: appointmentFormInput.time,
      };
      updateAppointment(appointmentUpdate)
        .then(() => router.push('/appointments'));
    } else {
      const appointment = {
        id: appointmentFormInput.id,
        therapist_id: appointmentFormInput.therapist_id,
        category_id: appointmentFormInput.category_id,
        service: appointmentFormInput.service,
        day: appointmentFormInput.day,
        time: appointmentFormInput.time,
        time_ordered: currentDate,
      };
      createAppointment(appointment)
        // eslint-disable-next-line no-unused-vars
        .then(() => router.push('/appointments'));
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '500px',
        margin: '0 auto',
      }}
    >
      <Form.Group className="mb-3">
        <Form.Label>Service Type</Form.Label>
        <Form.Select
          aria-label="dropdown select"
          name="service"
          required
          value={appointmentFormInput.service}
          onChange={handleChange}
        >
          <option>Choose A Service Type</option>
          <option value="AL">In Person</option>
          <option value="AK">Virtual</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={{ marginRight: '15px' }}>Day</Form.Label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          name="day"
          required
          className="form-control"
          dateFormat="yyyy-MM-dd" // Format to display in the input field
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Time</Form.Label>
        <Form.Select
          aria-label="dropdown select"
          name="time"
          required
          value={appointmentFormInput.time}
          onChange={handleChange}
        >
          <option>Choose A Time</option>
          <option value="AL">10 AM</option>
          <option value="AK">11 AM</option>
          <option value="AK">12 PM</option>
          <option value="AK">2 PM</option>
          <option value="AK">3 PM</option>
          <option value="AK">4 PM</option>
          <option value="AK">5 PM</option>
        </Form.Select>
      </Form.Group>

      <Form.Label>Select Category</Form.Label>
      <Form.Select
        aria-label="category_id"
        name="category_id"
        onChange={handleChange}
        value={appointmentFormInput.category_id}
        style={{ marginBottom: '15px' }}
      >
        <option value="">Select A Category</option>
        {
          therapistCategories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.label}
            </option>
          ))
        }
      </Form.Select>

      <Form.Label>Select Therapist</Form.Label>
      <Form.Select
        aria-label="therapist_id"
        name="therapist_id"
        onChange={handleChange}
        value={appointmentFormInput.therapist_id}
        style={{ marginBottom: '15px' }}
      >
        <option value="">Select A Therapist</option>
        {
          therapists.map((therapist) => (
            <option
              key={therapist.id}
              value={therapist.id}
            >
              {therapist.first_name} {therapist.last_name}
            </option>
          ))
        }
      </Form.Select>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

AppointmentForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    therapist_id: PropTypes.object,
    category_id: PropTypes.number,
    service: PropTypes.string,
    day: PropTypes.number,
    time: PropTypes.number,
  }),
};

AppointmentForm.defaultProps = {
  obj: initialAppointmentState,
};

export default AppointmentForm;
