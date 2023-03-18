import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    // actually search for movies, passing in prop here
    console.log(searchTerm);
  };

  return (
    <Form onSubmit={handleSearch} id='form' className=' d-flex gap-3 w-50'>
      <Form.Control
        className='search-box py-2'
        placeholder='search films'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        onClick={handleSearch}
        style={{
          background: '#00CE79',
          border: 'none',
          color: 'black',
        }}
        className='search-btn'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
