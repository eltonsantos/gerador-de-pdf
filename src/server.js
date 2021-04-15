const express = require("express");
const ejs = require("ejs");
const path = require("path");
const puppeteer = require("puppeteer");
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

app.get("/pdf", async (req, res) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/', {
    waitUntil: 'networkidle0'
  });

  const pdf = await page.pdf({
    printBackground: true,
    format: 'Letter',
    margin: {
      top: "20px",
      bottom: "40px",
      left: "20px",
      right: "20px"
    }
  });

  await browser.close();

  res.contentType("application/pdf");

  return res.send(pdf);

});

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "print.ejs");
  ejs.renderFile(filePath, { passengers }, (err, html) => {
    if (err) {
      return res.send("Erro na leitura do arquivo");
    }

    // Enviar para o navegador
    return res.send(html);
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
