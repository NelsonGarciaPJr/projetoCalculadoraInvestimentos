const isNonEmptyArray = (arrayElement) => {
  return Array.isArray(arrayElement) && arrayElement.length > 0;
};

export const createTable = (columnsArray, dataArray, tableId) => {
  if (
    !isNonEmptyArray(columnsArray) ||
    !isNonEmptyArray(dataArray) ||
    !tableId
  ) {
    throw new Error(
      "Para a correta execução, precisamos de um array com as colunas, outro com as informções das linhas e também o id do elemento tabela selecionado."
    );
  }

  const tableElement = document.getElementById(tableId);
  if (!tableElement || tableElement.nodeName !== "TABLE") {
    throw new Error("Id informado não corresponde a nenhum elemento table.");
  }

  createTableHeader(tableElement, columnsArray);
  createTableBody(tableElement, dataArray, columnsArray);
};

function createTableHeader(tableReference, columnsArray) {
  //
  function createTheadElement(tableReference) {
    const thead = document.createElement("thead"); // <thead></thead>
    tableReference.appendChild(thead); // <table><thead></thead></table>
    return thead;
  }
  //
  const tableHeaderReference =
    tableReference.querySelector("thead") ?? createTheadElement(tableReference);
  // <table><thead></thead></table>
  const headerRow = document.createElement("tr"); // <tr></tr>
  ["bg-blue-900", "text-slate-200", "sticky", "top-0"].forEach((cssClass) =>
    headerRow.classList.add(cssClass)
  );
  for (const tableColumnObj of columnsArray) {
    // /*html*/ => Informa que s String que vem após é um HTML e mostra a formatação realtiva a html (extensão: es6-string-html )
    const headerElement = /*html*/ `<th class='text-center'>${tableColumnObj.columnLabel}</th>`;
    headerRow.innerHTML += headerElement;
    // <tr><th class='text-center'>Nome da Coluna</th></tr>
    tableHeaderReference.appendChild(headerRow);
  }
}

function createTableBody(tableReference, tableItems, columnsArray) {
  //
  function createTbodyElement(tableReference) {
    const tbody = document.createElement("tbody"); // <thead></thead>
    tableReference.appendChild(tbody); // <table><tbody></tbody></table>
    return tbody;
  }
  //
  const tableBodyReference =
    tableReference.querySelector("tbody") ?? createTbodyElement(tableReference);

  //
  for (const [itemIndex, tableItem] of tableItems.entries()) {
    const tableRow = document.createElement("tr");

    if (itemIndex % 2 !== 0) {
      tableRow.classList.add("bg-blue-200");
    }

    for (const tableColumn of columnsArray) {
      const formatFn = tableColumn.format ?? ((info) => info);
      tableRow.innerHTML += /*html*/ `<td class='text-center'>${formatFn(
        tableItem[tableColumn.accessor]
      )}</td>`;
    }
    //
    tableBodyReference.appendChild(tableRow);
  }
}
