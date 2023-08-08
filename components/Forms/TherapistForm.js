import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createTherapist, updateTherapist } from '../../api/therapistData';
import { getCategories } from '../../api/categoryData';

const initialTherapistState = {
  first_name: '',
  last_name: '',
  profile_image_url: '',
  description: '',
  website: '',
  contact: '',
  favorite: false,
  city: '',
  state: '',
  category_id: '',
};

const TherapistForm = ({ obj }) => {
  const [therapistCategories, setTherapistCategories] = useState([]);
  const [therapyFormInput, setTherapyFormInput] = useState(initialTherapistState);
  const router = useRouter();

  useEffect(() => {
    if (obj) {
      setTherapyFormInput(obj);
    }
  }, [obj]);

  useEffect(() => {
    getCategories().then(setTherapistCategories);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTherapyFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj) {
      const therapistUpdate = {
        id: therapyFormInput.id,
        first_name: therapyFormInput.first_name,
        last_name: therapyFormInput.last_name,
        profile_image_url: therapyFormInput.profile_image_url,
        description: therapyFormInput.description,
        website: therapyFormInput.website,
        contact: therapyFormInput.contact,
        favorite: Boolean(therapyFormInput.favorite),
        city: therapyFormInput.city,
        state: therapyFormInput.state,
        category_id: Number(therapyFormInput.id),
      };
      updateTherapist(therapistUpdate)
        .then(() => router.push(`/therpists/${obj}`));
    } else {
      const therapist = {
        first_name: therapyFormInput.first_name,
        last_name: therapyFormInput.last_name,
        profile_image_url: therapyFormInput.profile_image_url,
        description: therapyFormInput.description,
        website: therapyFormInput.website,
        contact: therapyFormInput.contact,
        favorite: Boolean(therapyFormInput.favorite),
        city: therapyFormInput.city,
        state: therapyFormInput.state,
        category_id: Number(therapyFormInput.id),
        created_on: therapyFormInput.created_on,
      };
      createTherapist(therapist)
        .then((newTherapist) => router.push(`/therapists/${newTherapist.id}`));
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '500px',
        margin: '0 auto',
      }}
    >
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          name="first_name"
          required
          value={therapyFormInput.first_name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          name="last_name"
          required
          value={therapyFormInput.last_name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Therapist Image</Form.Label>
        <Form.Control
          name="profile_image_url"
          placeholder="Insert Image URL"
          required
          value={therapyFormInput.profile_image_url}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBio">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          required
          placeholder="Enter a description of this therapist"
          value={therapyFormInput.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Website</Form.Label>
        <Form.Control
          name="website"
          placeholder="Insert website url"
          required
          value={therapyFormInput.website}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contact</Form.Label>
        <Form.Control
          name="contact"
          placeholder="Insert a method of contact(phone or email)"
          required
          value={therapyFormInput.contact}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          name="city"
          required
          value={therapyFormInput.city}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>State</Form.Label>
        <Form.Control
          name="state"
          required
          value={therapyFormInput.state}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Check
        className="mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={therapyFormInput.favorite}
        onChange={(e) => {
          setTherapyFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      <Form.Label>Category</Form.Label>
      <Form.Select
        aria-label="category_id"
        name="category_id"
        onChange={handleChange}
        value={therapyFormInput.category_id}
      >
        <option value="">Select A Category</option>
        {
          therapistCategories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.label}
            </option>
          ))
        }
      </Form.Select>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

TherapistForm.propTypes = {
  obj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    profile_image_url: PropTypes.string,
    description: PropTypes.string,
    website: PropTypes.string,
    contact: PropTypes.string,
    favorite: PropTypes.bool,
    city: PropTypes.string,
    state: PropTypes.string,
    category_id: PropTypes.string,
    id: PropTypes.number,
  }),
};

TherapistForm.defaultProps = {
  obj: initialTherapistState,
};
