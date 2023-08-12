import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { getCategories } from '../api/categoryData';
import CategoryCard from '../components/CategoryCard';
import { useAuth } from '../utils/context/authContext';

// categories page
function CategoriesPage() {
  const { user } = useAuth();
  const [catData, setCatData] = useState([]);

  const getAllCategories = () => {
    getCategories(user.uid).then((data) => {
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
    <div>
      <Head>
        <title>Categories</title>
      </Head>
      <img src="https://res.cloudinary.com/nowandme/image/upload/f_auto/blog/jetet09edszqs1x3bqv7" alt="hero" style={{ width: '100%' }} />
      <div className="text-center my-4" style={{ marginTop: '100px' }}>
        <h1>Categories</h1>
      </div>
      <div id="category-section">
        {catData.map((category) => (
          <CategoryCard key={category.id} catObj={category} onUpdate={getAllCategories} />
        ))}
      </div>

    </div>
  );
}

export default CategoriesPage;
