import { getSingleCategory } from './categoryData';
import { getTherapistsByCategory } from './therapistData';

const viewCategoryDetails = (categoryid) => new Promise((resolve, reject) => {
  Promise.all([getSingleCategory(categoryid), getTherapistsByCategory(categoryid)])
    .then((therapistObject) => {
      getSingleCategory(therapistObject.category_id)
        .then((categoryObject) => {
          resolve({ categoryObject, ...therapistObject });
        });
    }).catch((error) => reject(error));
});

export default viewCategoryDetails;
