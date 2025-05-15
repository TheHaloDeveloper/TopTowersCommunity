from flask import Flask, render_template
import os
import requests
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

API_KEY = os.getenv("GOOGLE_SHEETS_API_KEY")
SHEET_ID = "1bxhj0Xtixkpo_BtzsnIg-qwLTA7qdb7Y6fursQjRZKM"
RANGE = "Main List!A:N"

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run()