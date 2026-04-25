function addRow(id, numbered=false) {
  const tbody = document.querySelector(`#${id} tbody`);
  const row = document.createElement("tr");

  if (numbered) {
    row.innerHTML = `
      <td>${tbody.children.length+1}</td>
      <td><textarea data-field></textarea></td>
      <td><input data-field></td>
      <td><input data-field></td>
      <td><input data-field></td>
      <td><textarea data-field></textarea></td>
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
    `;
  }
  tbody.appendChild(row);
  save();
}

/* AUTO SAVE */
function save() {
  const data = [...document.querySelectorAll('[data-field]')].map(f => f.value);
  localStorage.setItem('reportData', JSON.stringify(data));
}

function load() {
  const data = JSON.parse(localStorage.getItem('reportData') || "[]");
  document.querySelectorAll('[data-field]').forEach((f,i)=>f.value=data[i]||'');
}

document.addEventListener("input", save);
window.onload = load;

/* LOCK */
function lockReport() {
  if (!confirm("Lock report permanently?")) return;
  document.querySelectorAll("input,textarea,select,button").forEach(e=>e.disabled=true);
  localStorage.setItem("locked","true");
}

if (localStorage.getItem("locked")==="true") {
  document.querySelectorAll("input,textarea,select,button").forEach(e=>e.disabled=true);
}

/* EXPORT */
function exportCSV() {
  let csv=[];
  document.querySelectorAll("table tr").forEach(row=>{
    csv.push([...row.children].map(c=>`"${c.innerText}"`).join(","));
  });
  const blob=new Blob([csv.join("\n")],{type:"text/csv"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="ShiftReport.csv";
  a.click();
}
