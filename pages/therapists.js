/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
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
      <Head>
        <title>Categories</title>
      </Head>
      <img src="https://media.istockphoto.com/id/1304726157/vector/psychotherapy-counseling-and-mental-health.jpg?s=612x612&w=0&k=20&c=qHeXkRmiYWDeG5Oyq_zXsVQ3hsRdsOfLGaiqqrHNBDM=" alt="hero" style={{ width: '100%' }} />
      <div className="text-center my-4" style={{ marginTop: '100px' }}>
        {user.is_therapist === true ? (
          <Link href="/therapists/new" passHref>
            <Button>Add A Therapist Card</Button>
          </Link>
        ) : null}
      </div>
      <div id="therapist-section">
        {therapists.map((therapist) => (
          <TherapistCard key={therapist.id} therapistObj={therapist} onUpdate={getAllTherapists} />
        ))}
      </div>

    </div>
  );
}
