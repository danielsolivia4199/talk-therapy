import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTherapist } from '../../../api/therapistData';
import TherapistForm from '../../../components/Forms/TherapistForm';

export default function EditTherapist() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleTherapist(id).then(setEditItem);
  }, [id]);

  return (<TherapistForm obj={editItem} />);
}
