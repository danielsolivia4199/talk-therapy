import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

// category card component for the category page
function CategoryCard({ catObj }) {
  if (!catObj) {
    return null;
  }

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{catObj.label}</Card.Title>
        <p className="card-text bold">{catObj.description}</p>
        <Link href={`/categories/${catObj.id}`} passHref>
          <Button variant="primary">Search This Category</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

CategoryCard.propTypes = {
  catObj: PropTypes.shape({
    label: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default CategoryCard;
