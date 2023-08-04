/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from 'react';
import { getTherapists } from '../api/therapistData';
import { useAuth } from '../utils/context/authContext';
import TherapistCard from '../components/TherapistCard';

export default function TherapistPage() {
  const { user } = useAuth();
  const [therapists, setTherapists] = useState([]);

  const getAllTherapists = () => {
    getTherapists(user.uid).then(setTherapists);
  };

  useEffect(() => {
    getAllTherapists();
  }, []);

  return (
    <div>
      {therapists.map((author) => (
        <TherapistCard key={author.firebaseKey} authorObj={author} onUpdate={getAllTherapists} />
      ))}
    </div>
  );
}
