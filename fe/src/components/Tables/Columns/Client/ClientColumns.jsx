export default [
  {
    name: "Id",
    selector: (row) => row.id,
  },
  {
    name: "Nombre",
    selector: (row) => row.name,
  },
  {
    name: "Cédula Jurídica",
    selector: (row) => row.identifier,
  },
  {
    name: "Creado",
    selector: (row) => row.createdDate,
  },
  {
    name: "Moroso",
    cell: (row) => (
      <input
        type="checkbox"
        checked={row.latePayload}
        onChange={(e) => setLatePayment(row.id)}
      />
    ),
  },
];
