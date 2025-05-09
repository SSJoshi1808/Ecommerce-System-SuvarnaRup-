import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const FilterSider = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  const categories = [
    'Necklace',
    'Earrings',
    'Bracelet',
    'Ring'
  ];

  const collections = [
    'Gold',
    'Silver',
    'Diamond',
    'Platinum'
  ];

  const ratings = [
    { label: '4 stars & up', value: 4 },
    { label: '3 stars & up', value: 3 },
    { label: '2 stars & up', value: 2 },
    { label: '1 star & up', value: 1 }
  ];

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    const newRange = [0, value];
    setPriceRange(newRange);
    onFilterChange({ price: newRange });
  };

  const handleCollectionChange = (collection, checked) => {
    const newCollections = checked
      ? [...selectedCollections, collection]
      : selectedCollections.filter((c) => c !== collection);
    setSelectedCollections(newCollections);
    onFilterChange({ collections: newCollections.length > 0 ? newCollections : [] });
  };

  const handleRatingChange = (value) => {
    const newRating = selectedRating === value ? null : value;
    setSelectedRating(newRating);
    onFilterChange({ rating: newRating });
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium mb-4">Filters</h3>

      {/* Category */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Category</h4>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={category}
              className="mr-2"
              checked={selectedCategories.includes(category)}
              onChange={(e) => {
                const newCategories = e.target.checked
                  ? [...selectedCategories, category]
                  : selectedCategories.filter((c) => c !== category);
                setSelectedCategories(newCategories);
                onFilterChange({ category: newCategories.join(',') });
              }}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>

      {/* Collections */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Collections</h4>
        {collections.map((collection) => (
          <div key={collection} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={collection}
              className="mr-2"
              checked={selectedCollections.includes(collection)}
              onChange={(e) => handleCollectionChange(collection, e.target.checked)}
            />
            <label htmlFor={collection}>{collection}</label>
          </div>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Price Range</h4>
        <input
          type="range"
          min="0"
          max="2000"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between mt-2">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Rating</h4>
        {ratings.map((rating) => (
          <div key={rating.value} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`rating-${rating.value}`}
              className="mr-2"
              checked={selectedRating === rating.value}
              onChange={() => handleRatingChange(rating.value)}
            />
            <label htmlFor={`rating-${rating.value}`}>{rating.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSider;
