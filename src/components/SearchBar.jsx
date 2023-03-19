import React from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBar = ({ handleSearch, onChangeHandler }) => {
  

  return (
    <Form onSubmit={handleSearch} id='form' className=' d-flex gap-3 w-50'>
      <Form.Control
        className='search-box py-2'
        placeholder='search films'
        onChange={onChangeHandler}
        minLength='2'
      />
      <Button
        style={{
          background: '#00CE79',
          border: 'none',
          color: 'black',
        }}
        className='search-btn'
        type='submit'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
