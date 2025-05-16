data = data["data"];

let difficulties = {
    8: "Insane",
    9: "Extreme",
    10: "Terrifying",
    11: "Catastrophic",
    12: "Horrific",
    13: "Unreal",
    14: "nil"
}

let colors = {
    "Insane": "#0000FF",
    "Extreme": "#0389FF",
    "Terrifying": "#00FFFF",
    "Catastrophic": "#FFFFFF",
    "Horrific": "#9695FF",
    "Unreal": "#5100CB",
    "nil": "#65666D"
}

function getColor(rank, diff) {
    if (rank == 1) {
        return "212, 188, 48";
    } else if (rank == 2) {
        return "136, 136, 136";
    } else if (rank == 3) {
        return "179, 125, 81";
    } else {
        return diff == "Catastrophic" ? "0, 0, 0" : "255, 255, 255";
    }
}

function getDifficultyName(diff) {
    return difficulties[Math.floor(diff)]
}

let diff;
for (let tower of data) {
    let name;
    try {
        name = tower[1].split("(")[1].replace(")", "");
    } catch {
        name = tower[1];
    }
    
    if (tower[3]) {
        diff = getDifficultyName(parseFloat(tower[3]))
    }
    
    document.getElementById("main-list").innerHTML += `
        <div class="list-item" style="color: rgb(${getColor(parseInt(tower[0]), diff)}); background-color: ${colors[diff]}">
            <span class="rank">#${tower[0]}</span>&emsp;
            <span>${name}</span>
        </div>
    `;
}

document.querySelectorAll('#navbar-pages div').forEach(el => {
    el.addEventListener('click', () => {
        document.querySelectorAll('#navbar-pages div').forEach(d => d.classList.remove('active'));
        el.classList.add('active');
    });
});