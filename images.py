import requests
import urllib.request
import os
from dotenv import load_dotenv
load_dotenv()

url = f"https://sheets.googleapis.com/v4/spreadsheets/1I5vVIZO3gZXdBEjVJMY8TlQP5yo4_QQ5MDU7MxmtS-o/values/Images!A:B?key={os.getenv('GOOGLE_SHEETS_API_KEY')}"
response = requests.get(url)
data = response.json()

rows = data.get("values", [])[1:]
res = {row[0]: row[1] for row in rows if len(row) >= 2}

for k, v in res.items():
    with urllib.request.urlopen(v) as url:
        output = open(f"static/images/{k}.png", "wb")
        output.write(url.read())
        output.close()