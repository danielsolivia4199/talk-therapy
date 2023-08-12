import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

// category card component for the category page
export default function CategoryCard({ catObj }) {
  if (!catObj) {
    return null;
  }

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{catObj.label}</Card.Title>
        <Link href={`/category/${catObj.id}`} passHref>
          <Button variant="primary">See Therapists</Button>
        </Link>

      </Card.Body>
    </Card>
  );
}

CategoryCard.propTypes = {
  catObj: PropTypes.shape({
    label: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};
