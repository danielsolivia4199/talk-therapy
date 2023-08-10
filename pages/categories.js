import React, { useState, useEffect } from 'react';
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
      {catData.map((category) => (
        <CategoryCard key={category.id} catObj={category} onUpdate={getAllCategories} />
      ))}
    </div>
  );
}

export default CategoriesPage;
