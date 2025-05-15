data = data["data"];

for (let tower of data) {
    let name;
    try {
        name = tower[1].split("(")[1].replace(")", "");
    } catch {
        name = tower[1];
    }
    
    document.getElementById("main-list").innerHTML += `<div class="list-item">${name}</div>`;
}