import { clientCredentials } from '../utils/client';

// Get therapists
const getTherapist = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/therapists`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// Get a single therapist
const getSingleTherapist = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/therapists/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// Create therapist
const createTherapist = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/therapists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// Update therapist
const updateTherapist = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/therapists/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

// Delete therapist
const deleteTherapist = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/therapists/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

// Get therapist by favorite
const favoriteTherapists = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/therapists?uid=${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const favorites = Object.values(data).filter((therapist) => therapist.favorite);
      resolve(favorites);
    })
    .catch(reject);
});

// FIXME: Get therapist by category
// const getTherapistsByCategory = (id) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/therapists`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const usersTherapists = Object.values(data).filter((item) => item.category_id.id === id);
//       resolve(usersTherapists);
//     })
//     .catch(reject);
// });

const getTherapistsByCategory = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/therapists?orderBy="category_id"&equalTo="${id}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getTherapist,
  getSingleTherapist,
  createTherapist,
  updateTherapist,
  deleteTherapist,
  favoriteTherapists,
  getTherapistsByCategory,
};
