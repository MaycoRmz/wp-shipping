/* =========================================================
   STATE
========================================================= */
let lastDeletedRow = null;
let lastDeletedParent = null;

/* =========================================================
   ADD ROW
========================================================= */
function addRow(tableId, numbered = false) {
  const table = document.getElementById(tableId);
  if (!table) return;

  const tbody = table.querySelector("tbody");
  const row = document.createElement("tr");

  if (numbered) {
    row.innerHTML = `
      <td>${tbody.children.length + 1}</td>
      <td><textarea data-field></textarea></td>
      <td><input data-field></td>
      <td><input data-field></td>
      <td><input data-field></td>
      <td><textarea data-field></textarea></td>
      <td class="no-print"><button onclick="deleteRow(this)">✖</button></td>
    `;
  } else {
    row.innerHTML = `
      <td><input data-field></td>
      <td><input data-field></td>
      <td><input data-field></td>
      <td><input data-field></td>
      <td><input data-field></td>
      <td><input data-field></td>
      <td><textarea data-field></textarea></td>
      <td class="no-print"><button onclick="deleteRow(this)">✖</button></td>
    `;
  }

  tbody.appendChild(row);
  saveData();
}

/* =========================================================
   DELETE + UNDO
========================================================= */
function deleteRow(btn) {
  const row = btn.closest("tr");
  if (!row) return;

  lastDeletedParent = row.parentElement;
  lastDeletedRow = row.cloneNode(true);

  row.remove();
  saveData();
}

function undoDelete() {
  if (!lastDeletedRow || !lastDeletedParent) return;

  lastDeletedParent.appendChild(lastDeletedRow);
  lastDeletedRow = null;
  lastDeletedParent = null;
  saveData();
}

/* =========================================================
   AUTO‑SAVE
========================================================= */
function saveData() {
  const data = [];
  document.querySelectorAll("[data-field]").forEach(el => {
    data.push(el.value);
  });
  localStorage.setItem("shiftReportData", JSON.stringify(data));
}

function loadData() {
  const data = JSON.parse(localStorage.getItem("shiftReportData") || "[]");
  document.querySelectorAll("[data-field]").forEach((el, i) => {
    el.value = data[i] || "";
  });
}

document.addEventListener("input", saveData);
window.addEventListener("load", loadData);

/* =========================================================
   LOCK REPORT
========================================================= */
function lockReport() {
  if (!confirm("Lock this report? No further edits allowed.")) return;

  document
    .querySelectorAll("input, textarea, select")
    .forEach(el => el.disabled = true);

  localStorage.setItem("reportLocked", "true");
}

if (localStorage.getItem("reportLocked") === "true") {
  document
    .querySelectorAll("input, textarea, select")
    .forEach(el => el.disabled = true);
}

/* =========================================================
   EXPORT CSV
========================================================= */
function exportCSV() {
  let csv = [];

  document.querySelectorAll("table").forEach(table => {
    table.querySelectorAll("tr").forEach(row => {
      const cells = [...row.children]
        .slice(0, -1) // remove delete column
        .map(c => `"${c.innerText.replace(/"/g, '""')}"`);
      csv.push(cells.join(","));
    });
    csv.push("");
  });

  const blob = new Blob([csv.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "Shift_Report.csv";
  a.click();

  URL.revokeObjectURL(url);
}
