import urllib.request
import json
import os
import ssl

def download_json(url, filename):
    print(f"Downloading {url} to {filename}...")
    try:
        # Bypass SSL verification for raw download
        context = ssl._create_unverified_context()
        with urllib.request.urlopen(url, context=context) as response:
            data = response.read().decode('utf-8')
            parsed = json.loads(data)
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(parsed, f, indent=2, ensure_ascii=False)
            print(f"Successfully downloaded {filename} ({len(parsed)} items).")
    except Exception as e:
        print(f"Error downloading {url}: {e}")

if __name__ == "__main__":
    base_url = "https://raw.githubusercontent.com/rezarahiminia/worldcup2026/main/"
    download_json(base_url + "football.teams.json", "teams.json")
    download_json(base_url + "football.matches.json", "matches.json")
    download_json(base_url + "football.stadiums.json", "stadiums.json")
