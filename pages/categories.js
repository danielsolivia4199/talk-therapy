import { useState, useEffect } from 'react';
import { getCategories } from '../api/categoryData';
import TherapistCard from '../components/TherapistCard';
import { useAuth } from '../utils/context/authContext';

// categories page
function ShowCategories() {
  const { user } = useAuth();
  const [therapistCat, setTherapistCat] = useState([]);
  const getAllCategories = () => {
    getCategories(user.id).then(setTherapistCat);
  };

  useEffect(() => {
    getAllCategories();
  });

  return (
    <div className="text-center" style={{ marginTop: '100px' }}>
      <div className="text-center" id="show-by-category">
        {therapistCat.map((therapists) => (

          <section key={`therapist--${therapistCat.id}`}>
            <TherapistCard id={therapists.id} />
          </section>
        ))}
      </div>
    </div>
  );
}

export default ShowCategories;
