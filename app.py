from flask import Flask, render_template, send_from_directory
import os
import requests
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static/images'), 'ttc.png', mimetype='image/png')

def getList(name):
    url = f"https://sheets.googleapis.com/v4/spreadsheets/1bxhj0Xtixkpo_BtzsnIg-qwLTA7qdb7Y6fursQjRZKM?key={os.getenv('GOOGLE_SHEETS_API_KEY')}&includeGridData=true&ranges={name}%20List!B:N"
    response = requests.get(url)
    data = response.json()

    rows = data["sheets"][0]["data"][0]["rowData"][2:]
    result = []

    for row in rows:
        cells = row.get("values", [])
        if len(cells) == 0 or not cells[0].get("formattedValue", "").strip():
            continue
        row_data = []
        for cell in cells:
            value = cell.get("formattedValue", "")
            link = cell.get("hyperlink")
            comment = cell.get("note")
            row_data.append({"value": value, "link": link, "comment": comment})
        result.append(row_data)

    return result

data = {
    "main": getList("Main"),
    "legacy": getList("Legacy")
}

@app.route("/")
def home():
    return render_template("index.html", data=data)

if __name__ == "__main__":
    app.run(debug=True)