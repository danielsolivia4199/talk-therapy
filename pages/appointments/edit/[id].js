import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleAppointment } from '../../../api/appointmentData';
import AppointmentForm from '../../../components/Forms/AppointmentForm';

export default function EditTherapist() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleAppointment(id).then(setEditItem);
  }, [id]);

  return (<AppointmentForm obj={editItem} />);
}
