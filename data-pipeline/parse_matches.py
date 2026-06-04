import json

with open("matches.json", "r", encoding="utf-8") as f:
    matches = json.load(f)

print(f"Total matches in dataset: {len(matches)}")
group_matches = [m for m in matches if m.get("type") == "group"]
print(f"Group stage matches: {len(group_matches)}")

# Map team id to name
with open("teams.json", "r", encoding="utf-8") as f:
    teams = json.load(f)
team_map = {t["id"]: t["name_en"] for t in teams}

# Check group stage matches by group
groups_count = {}
for m in group_matches:
    g = m.get("group")
    groups_count[g] = groups_count.get(g, 0) + 1

print("\nMatches count per group:")
for g, count in sorted(groups_count.items()):
    print(f"Group {g}: {count} matches")

# Display first few group stage matches
print("\nSample group stage matches:")
for m in group_matches[:5]:
    t1 = team_map.get(m["home_team_id"], f"Team {m['home_team_id']}")
    t2 = team_map.get(m["away_team_id"], f"Team {m['away_team_id']}")
    print(f"Match {m['id']} (Group {m['group']}): {t1} vs {t2} on {m['local_date']} (Stadium {m['stadium_id']})")
