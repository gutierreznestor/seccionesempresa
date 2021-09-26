import React from 'react';
import DataTable from '../DataTable/DataTable.component';

const List = ({ list, title }) => {
  return (
    <div>
      <h2>{title}</h2>
      <DataTable data={list} />
    </div>
  )
}

export default List
