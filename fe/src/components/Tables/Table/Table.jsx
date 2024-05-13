import React from "react";
import DataTable from "react-data-table-component";
export default function Table({ columns, data }) {
  return <DataTable columns={columns} data={data} />;
}
