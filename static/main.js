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

function getTowerName(x) {
    let name;
    try {
        name = x.split("(")[1].replace(")", "");
    } catch {
        name = x;
    }
    return name.trim();
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
        
        let extra = "";
        let rank = tower[0].value;
        if (rank <= 3) {
            extra = 'class="podium"';
        }

        document.getElementById("list").innerHTML += `
            <div class="list-item" data-difficulty="${diff}" style="color: rgb(${getColor(parseInt(rank), diff)}); background-color: ${colors[diff]}" onclick="openTower(parseInt(this.children[0].innerHTML.slice(1)) - 1)">
                <span class="rank">#${rank}</span>&emsp;
                <span ${extra}>${name}</span>
            </div>
        `;
    }
}
populateList();

function getVideoId(url) {
    url = url.split("&")[0];
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
    $("#towername").text(getTowerName(info[1].value));
    $("#difficulty").text(`${info[2].value} ${elem.dataset.difficulty}`);
    $("#difficulty").css("color", elem.style.backgroundColor);
    $("#creators").text(info[5].value);
    $("#verifier").text(info[4].value);
    $("#location").text(info[6].value);

    let url = `https://www.youtube.com/embed/${getVideoId(info[4].link)}`;
    $("#verification").attr("src", url);
}
openTower(0);