import AppointmentForm from '../../components/Forms/AppointmentForm';

const NewEvent = () => (
  <div className="text-center d-flex flex-column justify-content-center align-content-center">
    <h2 style={{ marginTop: '200px', maxWidth: '600px', margin: '0 auto' }}>Book Appointment</h2>
    <AppointmentForm />
  </div>
);

export default NewEvent;
