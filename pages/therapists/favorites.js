import React, { useEffect, useState } from 'react';
import TherapistCard from '../../components/TherapistCard'; // Adjust the import path as needed
import { favoriteTherapists } from '../../api/therapistData';
import { useAuth } from '../../utils/context/authContext';

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favoriteTherapistsData, setFavoriteTherapistsData] = useState([]);

  const getAllFavoriteTherapists = () => {
    favoriteTherapists(user.uid)
      .then((data) => {
        console.log('Fetched Therapists:',
          data);
        setFavoriteTherapistsData(data);
      })
      .catch((error) => {
        console.error('Error fetching therapists:', error);
      });
  };

  useEffect(() => {
    getAllFavoriteTherapists();
  }, []);

  return (
    <div>
      <h1>Your Favorite Therapists</h1>
      {favoriteTherapistsData.map((therapist) => (
        <TherapistCard key={therapist.id} therapistObj={therapist} onUpdate={getAllFavoriteTherapists} />
      ))}
    </div>
  );
}
