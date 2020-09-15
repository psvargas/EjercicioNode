const fs = require("fs");
const http = require("http");
const url = require("url");
const axios = require("axios");


const url_Proveedores =
  "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const url_Clientes =
  "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";

let tablaProveedor = (proveedores, callback) => {
  fs.readFile("./html.html", (err, data) => {
    let contenido = data.toString();
    let entrada =
      '<p class="display-3">Proveedores</p> <table id="tablaProveedores" class="table table-striped"> <thead> <tr> <th scope="col">#</th> <th scope="col">Compañia</th> <th scope="col">Contacto</th> </tr> </thead> <tbody id="bodyTableProveedores">';
    proveedores.forEach((element) => {
      entrada =
        entrada +
        '<tr> <td scope="col">' +
        element.idproveedor +
        '</td><td scope="col">' +
        element.nombrecompania +
        '</td><td scope="col">' +
        element.nombrecontacto +
        "</td> </tr>";
    });
    entrada = entrada + "</tbody> </table>";
    contenido = contenido.replace(
      "{{tabla}}",
      entrada
    );
    callback(contenido);
  });
};

let tablaCliente = (clientes, callback) => {
  fs.readFile("html.html", (err, data) => {
    let contenido = data.toString();
    let entradaC =
      '<p class="display-3">Clientes</p> <table id="tablaClientes" class="table table-striped"> <thead> <tr> <th scope="col">#</th> <th scope="col">compañia</th> <th scope="col">contacto</th> </tr> </thead> <tbody id="bodyTableClientes">';
    clientes.forEach((element) => {
      entradaC =
        entradaC +
        '<tr> <td scope="col">' +
        element.idCliente +
        '</td><td scope="col">' +
        element.NombreCompania +
        '</td><td scope="col">' +
        element.NombreContacto +
        "</td> </tr>";
    });
    entradaC = entradaC + "</tbody> </table>";
    contenido = contenido.replace(
      "{{tabla}}",
      entradaC
    );
    callback(contenido);
  });
};

http
  .createServer((req, res) => {
    const q = url.parse(req.url, true);
    if (q.pathname.includes("/api/proveedores")) {
      axios.get(url_Proveedores).then((response) => {
        tablaProveedor(response.data, (data) => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data.toString());
        });
      });
    } else if (q.pathname.includes("/api/clientes")) {
      axios.get(url_Clientes).then((response) => {
        tablaCliente(response.data, (data) => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data.toString());
        });
      });
    }
  })
  .listen(8081);
