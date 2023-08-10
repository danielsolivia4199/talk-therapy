/* eslint-disable camelcase */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getAppointments } from '../api/appointmentData';
import AppointmentCard from '../components/AppointmentCard';
import { useAuth } from '../utils/context/authContext';

export default function ShowAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [category, setCategory] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const getAllAppointments = () => {
    getAppointments(user.uid).then((data) => {
      setAppointments(data);
      setCategory(data);
    });
  };

  useEffect(() => {
    getAllAppointments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4" style={{ marginTop: '100px' }}>
      <Head>
        <title>Appointments</title>
      </Head>
      <img src="https://img.freepik.com/free-vector/hand-with-pen-marking-dates-calendar-flat-vector-illustration-person-scheduling-planning-time-meetings-time-management-arrangement-concept-banner-website-design-landing-web-page_74855-26024.jpg?w=2000" alt="hero" style={{ width: '100%' }} />
      <h1 style={{ margin: '50px' }}>Appointments</h1>
      <div>
        <div>
          <Button
            style={{
              marginTop: '20px', marginBottom: '20px', marginLeft: '20px', width: '200px', backgroundColor: '#6699CC',
            }}
            className="create-appointment-button"
            onClick={() => {
              router.push('/appointments/new');
            }}
          >
            Book Appointment
          </Button>
        </div>
      </div>
      <div id="appointment-section" className="text-center my-4 d-flex">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} id={appointment.id} service={appointment.service} therapist_id={appointment.therapist_id} day={appointment.day} time={appointment.time} time_ordered={appointment.time_ordered} category_id={category} appointmentObj={appointment} onUpdate={getAllAppointments} />
        ))}
      </div>

    </div>
  );
}
