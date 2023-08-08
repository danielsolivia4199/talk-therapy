import { useState, useEffect } from 'react';
import { getCategories } from '../api/categoryData';
import { useAuth } from '../utils/context/authContext';
import CategoryCard from '../components/CategoryCard';

// categories page
function ShowCategories() {
  const { user } = useAuth();
  const [catData, setCatData] = useState([]);
  const getAllCategories = () => {
    getCategories(user.id).then((data) => {
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
  });

  return (
    <div className="text-center">
      <div>
        {catData.map((category) => (
          <CategoryCard key={category.id} therapistObj={category} onUpdate={getAllCategories} />
        ))}
      </div>
    </div>
  );
}

export default ShowCategories;
