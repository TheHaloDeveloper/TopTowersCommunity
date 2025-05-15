data = data["data"];

function getColor(rank) {
    if (rank == 1) {
        return "212, 188, 48";
    } else if (rank == 2) {
        return "136, 136, 136";
    } else if (rank == 3) {
        return "179, 125, 81";
    } else {
        return "255, 255, 255";
    }
}

for (let tower of data) {
    let name;
    try {
        name = tower[1].split("(")[1].replace(")", "");
    } catch {
        name = tower[1];
    }
    
    document.getElementById("main-list").innerHTML += `
        <div class="list-item" style="color: rgb(${getColor(parseInt(tower[0]))});">
            <span class="rank">#${tower[0]}</span>&emsp;
            <span>${name}</span>
        </div>
    `;
}