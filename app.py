from flask import Flask, render_template
import os
import requests
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

def getList(name):
    url = f"https://sheets.googleapis.com/v4/spreadsheets/1bxhj0Xtixkpo_BtzsnIg-qwLTA7qdb7Y6fursQjRZKM/values/{name} List!B:N?key={os.getenv("GOOGLE_SHEETS_API_KEY")}"
    response = requests.get(url)
    values = response.json().get("values", [])
    return [row for row in values if any(cell.strip() for cell in row)][2:]

data = {
    "main": getList("Main"),
    "legacy": getList("Legacy")
}

@app.route("/")
def home():
    return render_template("index.html", data=data)

if __name__ == "__main__":
    app.run(debug=True)