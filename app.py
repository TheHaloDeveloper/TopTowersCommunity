from flask import Flask, render_template
import os
import requests
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

API_KEY = os.getenv("GOOGLE_SHEETS_API_KEY")
SHEET_ID = "1bxhj0Xtixkpo_BtzsnIg-qwLTA7qdb7Y6fursQjRZKM"
RANGE = "Main List!B:N"

url = f"https://sheets.googleapis.com/v4/spreadsheets/{SHEET_ID}/values/{RANGE}?key={API_KEY}"
response = requests.get(url)
values = response.json().get("values", [])

data = {"data": [row for row in values if any(row)][2:]}

@app.route("/")
def home():
    return render_template("index.html", data=data)

if __name__ == "__main__":
    app.run(debug=True)