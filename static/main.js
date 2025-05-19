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

let white_diffs = ["Terrifying", "Catastrophic"];
function getColor(rank, diff) {
    if (rank == 1) {
        return "212, 188, 48";
    } else if (rank == 2) {
        return "136, 136, 136";
    } else if (rank == 3) {
        return "179, 125, 81";
    } else if (white_diffs.includes(diff)) {
        return "0, 0, 0"
    } else {
        return "255, 255, 255";
    }
}

function getDifficultyName(diff) {
    return difficulties[Math.floor(diff)]
}

let list = "main";
document.querySelectorAll('#navbar-pages div').forEach(el => {
    el.addEventListener('click', () => {
        document.querySelectorAll('#navbar-pages div').forEach(d => d.classList.remove('active'));
        el.classList.add('active');
        let clicked = el.innerHTML.split(" ")[0].toLowerCase();
        if (clicked != list) {
            list = clicked;
            populateList();
        }
    });
});

let diff = "Unreal";
function populateList() {
    document.getElementById("list").innerHTML = "";
    if (list == "main") diff = "Unreal";

    for (let tower of data[list]) {
        let name;
        try {
            name = tower[1].split("(")[1].replace(")", "");
        } catch {
            name = tower[1];
        }
        
        if (tower[3]) {
            diff = getDifficultyName(parseFloat(tower[3]))
        }
        
        let extra = "";
        let rank = tower[0];
        if (rank <= 3) {
            extra = 'class="podium"';
        }

        document.getElementById("list").innerHTML += `
            <div class="list-item" style="color: rgb(${getColor(parseInt(rank), diff)}); background-color: ${colors[diff]}" onclick="openTower(parseInt(this.children[0].innerHTML.slice(1)) - 1)">
                <span class="rank">#${rank}</span>&emsp;
                <span ${extra}>${name}</span>
            </div>
        `;
    }
}
populateList();

function openTower(x) {
    let info = data[list][x];

    document.querySelector("#towername").innerHTML = info[1].split("(")[1].split(")")[0].trim();
    document.querySelector("#creators").innerHTML = info[5].trim();
    document.querySelector("#verifier").innerHTML = info[4].trim();
    document.querySelector("#location").innerHTML = info[6].trim();
}
openTower(0);