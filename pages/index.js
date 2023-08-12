/* eslint-disable react/no-unescaped-entities */
// import { useState } from 'react';

import { useEffect, useState } from 'react';
import { getCategories } from '../api/categoryData';
import CategoryCard from '../components/CategoryCard';

function Home() {
  const [catData, setCatData] = useState([]);
  const getAllCategories = () => {
    getCategories().then((data) => {
      // eslint-disable-next-line no-console
      console.log('Fetched Categories:', data);
      setCatData(data);
    })
      .catch((error) => {
        console.error('Unable to fetch Categories:', error);
      });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          margin: '0 auto',
        }}
      >
        <img src="https://greenane.ie/wp-content/uploads/2021/08/Adolescent-Trauma.png" alt="therapy" />

      </div>
      <div>
        <h1 id="category-section" style={{ marginTop: '50px' }}>Our Mission</h1>
        <p className="text-center my-4 d-flex" style={{ marginLeft: '50px', marginRight: '50px' }}>Making professional therapy accessible, affordable, and convenient — so anyone who struggles with life's challenges can get help, anytime and anywhere.</p>
      </div>
      <div id="category-section" className="text-center my-4 d-flex">
        {catData.map((category) => (
          <CategoryCard key={category.id} catObj={category} onUpdate={getAllCategories} />
        ))}
      </div>
    </>
  );
}

export default Home;
