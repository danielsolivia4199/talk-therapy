import { getSingleCategory, getCategoryTherapists } from './categoryData';

const viewCategoryDetails = (categoryid) => new Promise((resolve, reject) => {
  Promise.all([getSingleCategory(categoryid), getCategoryTherapists(categoryid)])
    .then(([categoryObject, therapistObject]) => {
      resolve({ ...categoryObject, therapists: therapistObject });
    }).catch((error) => reject(error));
});

export default viewCategoryDetails;
