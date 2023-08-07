/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTherapist } from '../../api/therapistData';

export default function ViewTherapist() {
  const [therapistDetails, setTherapistDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleTherapist(id).then(setTherapistDetails);
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-black ms-5 details">
        <img src={therapistDetails.profile_image_url} alt="user" width="100px" height="100px" />
        <h5>{therapistDetails.favorite ? <span className="badge text-bg-warning">Favorite</span> : ''}</h5>
        <h1>{therapistDetails.first_name} {therapistDetails.last_name}</h1>
        <h2>{therapistDetails.category_id}</h2>
        <h2>{therapistDetails.city},{therapistDetails.state}</h2>
        <h3>Contact </h3>
        <h3>Email: <a href={`mailto:${therapistDetails.contact}`}>{therapistDetails.contact}</a></h3>
        <h3>Website: {therapistDetails.website}</h3>
        <h3>{therapistDetails.description}</h3>
      </div>
    </div>
  );
}
