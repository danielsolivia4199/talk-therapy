import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createTherapist, updateTherapist } from '../../api/therapistData';
import { getCategories } from '../../api/categoryData';
import { useAuth } from '../../utils/context/authContext';

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
  const { user } = useAuth();
  // const time = new Date().toLocaleString('en-US', {
  //   year: 'numeric',
  //   month: '2-digit',
  //   day: '2-digit',
  // });

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
    const currentDate = new Date().toISOString().split('T')[0];
    if (obj.id) {
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
        .then(() => router.push('/therapists'));
    } else {
      const therapist = {
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
        category_id: therapyFormInput.category_id,
        created_on: currentDate,
        uid: user.uid,
      };
      createTherapist(therapist)
        // eslint-disable-next-line no-unused-vars
        .then(() => router.push('/therapists'));
    }
  };

  return (
    <div>
      {user.is_therapist === false ? (
        <Form>
          {/* Favorite field for users */}
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
          {/* Submit button for users */}
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      ) : (
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
            <Form.Select
              aria-label="dropdown select"
              name="state"
              required
              value={therapyFormInput.state}
              onChange={handleChange}
            >
              <option>Choose A State</option>
              <option value="AL">Alabama (AL)</option>
              <option value="AK">Alaska (AK)</option>
              <option value="AZ">Arizona (AZ)</option>
              <option value="AR">Arkansas (AR)</option>
              <option value="CA">California (CA)</option>
              <option value="CO">Colorado (CO)</option>
              <option value="CT">Connecticut (CT)</option>
              <option value="DE">Delaware (DE)</option>
              <option value="FL">Florida (FL)</option>
              <option value="GA">Georgia (GA)</option>
              <option value="HI">Hawaii (HI)</option>
              <option value="ID">Idaho (ID)</option>
              <option value="IL">Illinois (IL)</option>
              <option value="IN">Indiana (IN)</option>
              <option value="IA">Iowa (IA)</option>
              <option value="KS">Kansas (KS)</option>
              <option value="KY">Kentucky (KY)</option>
              <option value="LA">Louisiana (LA)</option>
              <option value="ME">Maine (ME)</option>
              <option value="MD">Maryland (MD)</option>
              <option value="MA">Massachusetts (MA)</option>
              <option value="MI">Michigan (MI)</option>
              <option value="MN">Minnesota (MN)</option>
              <option value="MS">Mississippi (MS)</option>
              <option value="MO">Missouri (MO)</option>
              <option value="MT">Montana (MT)</option>
              <option value="NE">Nebraska (NE)</option>
              <option value="NV">Nevada (NV)</option>
              <option value="NH">New Hampshire (NH)</option>
              <option value="NJ">New Jersey (NJ)</option>
              <option value="NM">New Mexico (NM)</option>
              <option value="NY">New York (NY)</option>
              <option value="NC">North Carolina (NC)</option>
              <option value="ND">North Dakota (ND)</option>
              <option value="OH">Ohio (OH)</option>
              <option value="OK">Oklahoma (OK)</option>
              <option value="OR">Oregon (OR)</option>
              <option value="PA">Pennsylvania (PA)</option>
              <option value="RI">Rhode Island (RI)</option>
              <option value="SC">South Carolina (SC)</option>
              <option value="SD">South Dakota (SD)</option>
              <option value="TN">Tennessee (TN)</option>
              <option value="TX">Texas (TX)</option>
              <option value="UT">Utah (UT)</option>
              <option value="VT">Vermont (VT)</option>
              <option value="VA">Virginia (VA)</option>
              <option value="WA">Washington (WA)</option>
              <option value="WV">West Virginia (WV)</option>
              <option value="WI">Wisconsin (WI)</option>
              <option value="WY">Wyoming (WY)</option>
            </Form.Select>
          </Form.Group>
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
      )}
    </div>
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
    category_id: PropTypes.number,
    created_on: PropTypes.string,
    id: PropTypes.number,
  }),
};

TherapistForm.defaultProps = {
  obj: initialTherapistState,
};

export default TherapistForm;
