#!/usr/bin/env python3 

import json
import keyring
import requests
import urllib.parse

output_root = "../../content/data"
family_list_path = f"{output_root}/googlefonts.json"

api_key = keyring.get_password('alan--google-fonts-api--main', 'alan')
url = f"https://www.googleapis.com/webfonts/v1/webfonts?key={api_key}"

response = requests.get(url)
data = json.loads(response.content)
font_families = {}

for font in data["items"]:
  font_families[font["family"]] = {
    "files": font["files"]
  }

with open(family_list_path, "w") as _out:
  json.dump(font_families, _out, sort_keys=True, indent=4)

print("done")
