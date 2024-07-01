import React from "react";
import DataTable from "react-data-table-component";
export default function Table({ columns, data, exportButton = false }) {
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };
  const Export = ({ onExport }) => (
    <div className="w-full text-end pr-16 text-sm">
      <button
        className="hover:text-blue-600"
        onClick={(e) => onExport(e.target.value)}
      >
        <i class=""></i>
        Descargar <i class="fa-solid fa-file-arrow-down fa-xl"></i>
      </button>
    </div>
  );

  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(data)} />,
    []
  );
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination={true}
      paginationComponentOptions={paginationComponentOptions}
      striped={true}
      responsive={true}
      highlightOnHover={true}
      paginationPerPage={8}
      paginationRowsPerPageOptions={[8, 10, 15, 20, 25, 30]}
      actions={exportButton ? actionsMemo : false}
    />
  );
}
