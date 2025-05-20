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
    "Insane": ["#0000FF", "none"],
    "Extreme": ["#0389FF", "none"],
    "Terrifying": ["#00FFFF", "none"],
    "Catastrophic": ["#FFFFFF", "none"],
    "Horrific": ["#010B0B", "3px solid #9695FF"],
    "Unreal": ["#080003", "3px solid #5100CB"],
    "nil": ["#65666D", "none"]
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

function getTowerName(x) {
    let name;
    try {
        name = x.split("(")[1].replace(")", "");
    } catch {
        name = x;
    }
    return name.trim();
}

function getOutline(diff) {
    let c = colors[diff][0];
    return `text-shadow: -1px -1px 0 ${c}, 0 -1px 0 ${c}, 1px -1px 0 ${c}, 1px 0 0 ${c}, 1px 1px 0 ${c}, 0 1px 0 ${c}, -1px 1px 0 ${c}, -1px 0 0 ${c};`;
}

let diff = "Unreal";
function populateList() {
    document.getElementById("list").innerHTML = "";
    if (list == "main") diff = "Unreal";

    for (let tower of data[list]) {
        let name = getTowerName(tower[1].value);
        if (tower[3].value) {
            diff = getDifficultyName(parseFloat(tower[3].value))
        }
        
        let classes = [];
        let rank = tower[0].value;
        if (rank <= 3) {
            classes.push("podium");
        }
        
        let extra = "";
        if (classes.length > 0) {
            extra = `class="${classes.join(" ")}"`;
        }

        document.getElementById("list").innerHTML += `
            <div class="list-item" data-difficulty="${diff}" style="color: rgb(${getColor(parseInt(rank), diff)}); background-color: ${colors[diff][0]}; border: ${colors[diff][1]}; ${getOutline(diff)}" onclick="openTower(parseInt(this.children[0].children[0].innerHTML.slice(1)) - 1)">
                <div class="list-content">
                    <span class="rank">#${rank}</span>&emsp;
                    <span ${extra}>${name}</span>
                </div>
                <img class="list-image" src="/static/images/${name}.png"/>
            </div>
        `;
    }
}
populateList();

function getVideoId(url) {
    if (!url) return null;
    url = url.split("&")[0].split("?si")[0];
    if (url.includes("=")) {
        return url.split("=")[1];
    } else {
        let parts = url.split("/");
        return parts[parts.length - 1];
    }
}

function openTower(x) {
    let factor = list == "legacy" ? 100 : 0;
    let i = x - factor;
    let info = data[list][i];

    let elem = $("#list").children()[i];
    let bg = elem.style.backgroundColor;
    if (bg == "rgb(8, 0, 3)") {
        bg = colors["Unreal"][1].split("solid ")[1];
    } else if (bg == "rgb(1, 11, 11)") {
        bg = colors["Horrific"][1].split("solid ")[1];
    }

    $("#towername").text(getTowerName(info[1].value));
    $("#towername").attr("href", info[1].link);
    $("#difficulty").text(`${info[2].value} ${elem.dataset.difficulty}`);
    $("#difficulty").css("color", bg);
    $("#creators").text(info[5].value);
    $("#verifier").text(info[4].value);
    $("#location").text(info[6].value);
    $("#location").attr("href", info[6].link);

    let id = getVideoId(info[4].link);
    let url;
    if (id) {
        url = `https://www.youtube.com/embed/${id}`;
    } else {
        url = "";
    }
    $("#verification").attr("src", url);
}
openTower(0);