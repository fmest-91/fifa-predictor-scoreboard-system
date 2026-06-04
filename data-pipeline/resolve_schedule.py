import json

with open("matches.json", "r", encoding="utf-8") as f:
    matches = json.load(f)

with open("teams.json", "r", encoding="utf-8") as f:
    teams = json.load(f)

team_map = {t["id"]: t for t in teams}

group_matches = []
for m in matches:
    if m.get("type") != "group":
        continue
    
    t1 = team_map.get(m["home_team_id"])
    t2 = team_map.get(m["away_team_id"])
    
    if not t1 or not t2:
        print(f"Warning: Could not resolve teams for match {m['id']}")
        continue
        
    resolved = {
        "match_id": int(m["id"]),
        "group": m["group"],
        "matchday": int(m["matchday"]),
        "date": m["local_date"],
        "home_team": t1["name_en"],
        "home_flag": t1["flag"],
        "home_code": t1["fifa_code"],
        "away_team": t2["name_en"],
        "away_flag": t2["flag"],
        "away_code": t2["fifa_code"],
        "stadium_id": int(m["stadium_id"]),
        "finished": m["finished"] == "TRUE",
        "home_score": int(m["home_score"]) if m["finished"] == "TRUE" else None,
        "away_score": int(m["away_score"]) if m["finished"] == "TRUE" else None,
    }
    group_matches.append(resolved)

# Sort by match ID or date
group_matches.sort(key=lambda x: x["match_id"])

with open("group_stage_matches.json", "w", encoding="utf-8") as f:
    json.dump(group_matches, f, indent=2, ensure_ascii=False)

print(f"Generated group_stage_matches.json with {len(group_matches)} matches.")
