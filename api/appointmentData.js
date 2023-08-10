import { clientCredentials } from '../utils/client';

// Get appointments
const getAppointments = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/appointments`, {
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

// Get a single appointment
const getSingleAppointment = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/appointments/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// Create appointment
const createAppointment = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/appointments`, {
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

// Update appointment
const updateAppointment = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/appointments/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

// Delete appointment
const deleteAppointment = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/appointments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

// Get appointment by category
const getAppointmentsByCategory = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/appointments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const usersAppointments = Object.values(data).filter((item) => item.category_id.id === id);
      resolve(usersAppointments);
    })
    .catch(reject);
});

export {
  getAppointments,
  getSingleAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByCategory,
};
