export const setTimeOut = (func, time) =>
  setTimeout(() => {
    func();
  }, time);

export const eliminarDiacriticos = (texto) => {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
export const validateExistedValue = (array, string, property) => {
  let existed = false;
  array.map((value) => {
    if (
      eliminarDiacriticos(value[property]).toUpperCase().replace(/ /g, "") ===
      eliminarDiacriticos(string).toUpperCase().replace(/ /g, "")
    ) {
      existed = true;
    }
  });
  return existed;
};
