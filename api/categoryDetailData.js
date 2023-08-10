import { getSingleCategory } from './categoryData';
import { getTherapistsByCategory } from './therapistData';

const viewCategoryDetails = (categoryid) => new Promise((resolve, reject) => {
  Promise.all([getSingleCategory(categoryid), getTherapistsByCategory(categoryid)])
    .then(([categoryObject, therapistObject]) => {
      resolve({ ...categoryObject, therapists: therapistObject });
    }).catch((error) => reject(error));
});

export default viewCategoryDetails;
