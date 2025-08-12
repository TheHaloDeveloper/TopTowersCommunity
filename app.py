from flask import Flask, render_template
import os
import requests
from dotenv import load_dotenv
import time
load_dotenv()

app = Flask(__name__)

_cache = {}
_last_fetch = 0
CACHE_DURATION = 600

@app.route('/favicon.ico')
def favicon():
    return app.send_static_file("ttc.png")

def getList(name):
    try:
        url = f"https://sheets.googleapis.com/v4/spreadsheets/1bxhj0Xtixkpo_BtzsnIg-qwLTA7qdb7Y6fursQjRZKM?key={os.getenv('GOOGLE_SHEETS_API_KEY')}&includeGridData=true&ranges={name}%20List!B:N"
        response = requests.get(url)
        
        if response.status_code != 200:
            return []
            
        data = response.json()
        
        if "sheets" not in data or not data["sheets"]:
            return []

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
    except:
        return []

def get_data():
    global _cache, _last_fetch
    
    current_time = time.time()
    
    if _cache and (current_time - _last_fetch) < CACHE_DURATION:
        return _cache
    
    _cache = {
        "main": getList("Main"),
        "legacy": getList("Legacy")
    }
    _last_fetch = current_time
    
    return _cache

@app.route("/")
def home():
    data = get_data()
    return render_template("index.html", data=data)

if __name__ == "__main__":
    app.run(debug=True)