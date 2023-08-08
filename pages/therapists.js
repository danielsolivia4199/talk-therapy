/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getTherapist } from '../api/therapistData';
import { useAuth } from '../utils/context/authContext';
import TherapistCard from '../components/TherapistCard';

export default function TherapistPage() {
  const { user } = useAuth();
  const [therapists, setTherapists] = useState([]);

  const getAllTherapists = () => {
    getTherapist(user.uid)
      .then((data) => {
        // eslint-disable-next-line no-console
        console.log('Fetched Therapists:', data); // Log fetched data
        setTherapists(data); // Update state
      })
      .catch((error) => {
        console.error('Error fetching therapists:', error); // Log error if any
      });
  };

  useEffect(() => {
    getAllTherapists();
  }, []);

  return (
    <div>
      <Link href="/therapists/new" passHref>
        <Button>Add A Therapist</Button>
      </Link>
      {therapists.map((therapist) => (
        <TherapistCard key={therapist.id} therapistObj={therapist} onUpdate={getAllTherapists} />
      ))}
    </div>
  );
}
