const express = require("express");
const ejs = require("ejs");
const path = require("path");
const pdf = require("html-pdf");
const app = express();

const passengers = [
  {
    name: "John",
    flightNumber: 1000,
    time: "16h00",
  },
  {
    name: "Will",
    flightNumber: 2000,
    time: "22h00",
  },
  {
    name: "Hellen",
    flightNumber: 3000,
    time: "01h00",
  },
];

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "print.ejs");
  ejs.renderFile(filePath, { passengers }, (err, html) => {
    if (err) {
      return res.send("Erro na leitura do arquivo");
    }

    const options = {
      height: "11.25in",
      width: "8.5in",
      header: {
        height: "20mm",
      },
      footer: {
        height: "20mm",
      },
    };

    // Criar o PDF
    pdf.create(html, options).toFile("report.pdf", (err, data) => {
      if (err) {
        return res.send("Erro ao gerar o PDF");
      }

      // Enviar para o navegador
      return res.send("Arquivo gerado com sucesso");
    });
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
