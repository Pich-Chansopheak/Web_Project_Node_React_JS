import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    // if query exist redirect user to the search and pass query as a string
    // otherwise redirect user to the search screen
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
    <Form className="d-flex me-auto" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          className="search-box"
          type="text"
          name="q"
          id="q"
          onClick={(e) => setQuery(e.target.value)}
          placeholder="search..."
          aria-label="Search Products"
          aria-describedby="button-search"
        ></FormControl>
        <Button type="submit" variant="outline-primary" className="btn-search" id="button-search">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
