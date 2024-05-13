clientColumns.push({
  name: "Moroso",
  cell: (row) => (
    <input
      type="checkbox"
      checked={row.latePayment}
      onChange={(e) => alert(row.latePayment)}
    />
  ),
});
