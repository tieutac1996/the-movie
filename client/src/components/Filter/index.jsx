import React from 'react';
import PropTypes from 'prop-types';
import MOVIE from 'Config/movie.input';
import { Form } from 'react-bootstrap';
import './index.scss';
import { useState } from 'react';
import xoa_dau from 'Config/xoadau';
Filter.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
};

function Filter(props) {
  const { data, onChange } = props;
  if (!data) {
    return <div></div>;
  }
  function handleChange(e) {
    const value = e.target.value;
    if (value === 'name') {
      const a = data.data.sort((a, b) => {
        let nameA = xoa_dau(a.title).toLowerCase();
        let nameB = xoa_dau(b.title).toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      onChange({ data: a, pagination: data.pagination });
    }
    if (value === 'rename') {
      const a = data.data.sort((a, b) => {
        let nameA = xoa_dau(a.title).toLowerCase();
        let nameB = xoa_dau(b.title).toLowerCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });
      onChange({ data: a, pagination: data.pagination });
    }
    if (value === 'date') {
      const a = data.data.sort((a, b) => {
        let nameA = xoa_dau(a.createdAt).toLowerCase();
        let nameB = xoa_dau(b.createdAt).toLowerCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });
      onChange({ data: a, pagination: data.pagination });
    }
    if (value === 'redate') {
      const a = data.data.sort((a, b) => {
        let nameA = xoa_dau(a.createdAt).toLowerCase();
        let nameB = xoa_dau(b.createdAt).toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      onChange({ data: a, pagination: data.pagination });
    }
  }
  return (
    <div className='filter'>
      <div className='tab'>
        {MOVIE.tags.map((map, key) => (
          <button key={key}>{map.name}</button>
        ))}
      </div>
      <Form className='select'>
        <Form.Group>
          <Form.Control as='select' onChange={handleChange} defaultValue='date'>
            <option value='name'>Tên A &uarr; Z</option>
            <option value='rename'>Tên A &darr; Z</option>
            <option value='date'>Mới nhất</option>
            <option value='redate'>Cũ nhất</option>
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Filter;
