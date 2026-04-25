function addSOP() {
  const name = document.getElementById("sopName").value;
  if (!name) return;

  const list = JSON.parse(localStorage.getItem("sops") || "[]");
  list.push(name);
  localStorage.setItem("sops", JSON.stringify(list));
  render();
}

function render() {
  const ul = document.getElementById("sopList");
  ul.innerHTML = "";
  (JSON.parse(localStorage.getItem("sops")) || []).forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    ul.appendChild(li);
  });
}

render();
