export const getBase64ImageFromUrl = async (imageUrl) => {
  var res = await fetch(imageUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res);
  var blob = await res.blob();

  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        resolve(reader.result);
      },
      false
    );

    reader.onerror = () => {
      return reject(this);
    };
    reader.readAsDataURL(blob);
  });
};
