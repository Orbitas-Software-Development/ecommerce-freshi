import { jsPDF } from "jspdf";
import { getUserInfo } from "../../utils/localStorage/functions";
import { font } from "../../utils/reports/FontBase64";
import { freshiLogo } from "../../utils/logosBase64/logos";
import { getCurrencySimbol } from "../../utils/Currency/currencyFunctions";
export const generatePDF = (productsSelected, companyInfo, signature) => {
  var base64Img = freshiLogo;
  var porcentageConverter = (porcentage) => {
    if (porcentage < 10) {
      return parseFloat("0.0" + porcentage.toString());
    }
    return parseFloat("0." + porcentage.toString());
  };
  let array = productsSelected.map((value, index) => {
    return [
      index + 1,
      `${index + 1}`,
      value["description"],
      value["quantity"],
      value["unitsPerBox"],
      getCurrencySimbol(value["currency"].id) + value["price"],
      value["iva"] + " %",
      getCurrencySimbol(value["currency"].id) +
        (
          value["quantity"] * value["unitsPerBox"] * value["price"] +
          value["quantity"] *
            value["unitsPerBox"] *
            value["price"] *
            porcentageConverter(value["iva"])
        ).toFixed(2),
    ];
  });
  jsPDF.autoTableSetDefaults({
    headStyles: { fillColor: 0 },
  });
  const doc = new jsPDF("l");
  doc.addFileToVFS("MyFont.ttf", font);
  doc.addFont("MyFont.ttf", "MyFont", "normal");
  doc.setFont("MyFont");

  var totalPagesExp = "{total_pages_count_string}";
  var columns = [
    "#",
    "Código",
    "Descripción",
    "Cajas totales",
    "Unidades totales",
    "Precio/Unidad",
    "IVA",
    "TOTAL",
  ];

  const totalPrice = () => {
    try {
      let totalPrice = 0;
      productsSelected.map((product) => {
        totalPrice =
          totalPrice +
          product.quantity * product.unitsPerBox * product.price +
          product.quantity *
            product.unitsPerBox *
            product.price *
            porcentageConverter(product.iva);
      });
      return (
        getCurrencySimbol(productsSelected[0].currency.id) +
        totalPrice.toFixed(2)
      );
    } catch (e) {
      console.log(e);
    }
  };
  //doc.setFontSize(18);
  // doc.text("Orden de compra", 80, 22);
  array.push(["", "", "", "", "", "", "TOTAL:", totalPrice()]);
  doc.setFontSize(12);
  doc.text("Orden de Compra: ", 14, 36);
  doc.setFontSize(12);
  doc.text(
    "Fecha: " +
      new Date().toLocaleDateString() +
      " " +
      new Date().toLocaleTimeString(),
    14,
    42
  );
  doc.setFontSize(12);
  doc.text("Proveedor: " + companyInfo?.provider, 14, 47);
  doc.setFontSize(12);
  doc.text("Cédula Jurídica: " + companyInfo?.identifier, 14, 52);
  doc.setFontSize(12);
  doc.text("Teléfono: " + companyInfo?.phone, 14, 57);
  doc.setFontSize(12);
  doc.text("Correo Electrónico: " + companyInfo?.email, 14, 62);
  doc.setFontSize(12);
  doc.text("Dirección: " + companyInfo?.direction, 14, 67);
  doc.setFontSize(12);
  doc.text("Cliente Comprador: " + getUserInfo().branch?.client.name, 14, 72);
  doc.setFontSize(12);
  doc.text(
    getUserInfo().branch.client.personId === 1
      ? "Cédula: "
      : "Cédula Jurídica: " + getUserInfo().branch?.client.identifier,
    14,
    77
  );
  doc.setFontSize(12);
  doc.text("Punto de Venta: " + getUserInfo().branch?.name, 14, 82);
  doc.setFontSize(12);
  doc.text("Correo: " + getUserInfo().email, 14, 87);
  doc.setFontSize(12);
  doc.text("Dirección: " + getUserInfo().branch?.direction, 14, 92);
  doc.setFontSize(12);
  doc.text("Teléfono: " + getUserInfo().branch?.phoneNumber, 14, 97);
  doc.text("Solicitudo por: " + getUserInfo().fullName, 120, 40);
  doc.text("Firma: ", 120, 45);

  doc.autoTable(columns, array, {
    startY: 105,
    showHead: "firstPage",
    styles: {
      overflow: "linebreak",
      halign: "center",
      fontSize: 12,
      font: "MyFont",
    },

    // Override the default above for the text column
    columnStyles: {
      0: {
        columnWidth: "auto",
      },
      1: {
        columnWidth: 30,
      },
      2: {
        columnWidth: "auto",
      },
      3: {
        columnWidth: 30,
      },
      4: {
        columnWidth: 30,
      },
      5: {
        columnWidth: 30,
      },
      6: {
        columnWidth: 30,
      },
      7: {
        columnWidth: 30,
      },
    },
    didParseCell: function (data) {
      if (data.column.dataKey === 2) {
        // data.cell.styles.overflow = "ellipsize";
      }
      if (data.row.index === array.length - 1) {
        data.cell.styles.fillColor = [224, 224, 224];
        data.cell.styles.textColor = [0, 0, 0];
      }
    },
    willDrawPage: function (data) {
      // Header
      doc.setFontSize(20);
      doc.setTextColor(40);
      if (base64Img) {
        doc.addImage(base64Img, "JPEG", data.settings.margin.left, 15, 20, 10);
        if (signature) {
          doc.addImage(signature, "JPEG", 125, 52, 65, 50);
        }
      }
      doc.text("Órden de Compra", data.settings.margin.left + 105, 32);
    },
    didDrawPage: function (data) {
      // Footer
      var str = "Página " + doc.internal.getNumberOfPages();
      // Total page number plugin only available in jspdf v1.0+
      if (typeof doc.putTotalPages === "function") {
        str = str + " de " + totalPagesExp;
      }

      doc.setFontSize(10);

      // jsPDF 1.4+ uses getHeight, <1.4 uses .height
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
      doc.text(str, data.settings.margin.left, pageHeight - 10);
    },
  });
  doc.text(
    " " + companyInfo?.parameterizableText,
    14,
    doc.lastAutoTable.finalY + 10
  );
  //NÚMERO DE PAGINAS
  if (typeof doc.putTotalPages === "function") {
    doc.putTotalPages(totalPagesExp);
  }

  let pdf = {
    format: doc.output("datauri").split(",", 1),
    base64: doc.output("datauri").split(",", 2)[1],
  };
  console.log(pdf);
  return pdf;

  // doc.save(`Orden_${new Date().toLocaleDateString()}.pdf`);
};
