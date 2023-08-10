import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getTherapistsByCategory } from '../../api/therapistData';
import TherapistCard from '../../components/TherapistCard';
import viewCategoryDetails from '../../api/categoryDetailData';

export default function ViewCategory() {
  const [categoryDetails, setCategoryDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getCategoryDetails = () => {
    viewCategoryDetails(id).then(setCategoryDetails);
  };
  useEffect(() => {
    getCategoryDetails();
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-wrap">
        {categoryDetails.therapists?.map((therapist) => (
          <TherapistCard key={therapist.id} therapistObj={therapist} onUpdate={getTherapistsByCategory} />
        ))}
      </div>
    </div>
  );
}
