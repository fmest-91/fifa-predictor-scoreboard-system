import json
import os

def generate():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    matches_path = os.path.join(script_dir, "group_stage_matches.json")
    with open(matches_path, "r", encoding="utf-8") as f:
        matches = json.load(f)

    # Format matches as a clean JavaScript array
    js_matches = []
    for m in matches:
        js_matches.append({
            "id": m["match_id"],
            "group": m["group"],
            "matchday": m["matchday"],
            "date": m["date"],
            "home": m["home_team"],
            "away": m["away_team"],
            "homeFlag": m["home_flag"],
            "awayFlag": m["away_flag"]
        })

    matches_js_str = json.dumps(js_matches, indent=2, ensure_ascii=False)

    # Define Apps Script template with placeholders
    apps_script_template = """/**
 * FIFA World Cup 2026 Predictor & Scoreboard Backend
 * 
 * Instructions:
 * 1. Open a Google Sheet.
 * 2. Click Extensions > Apps Script.
 * 3. Delete any code in the editor and paste this entire script.
 * 4. Save and run the `initialSetup` function.
 * 5. Deploy as a Web App: Click Deploy > New deployment. Select type 'Web app'.
 *    Set 'Execute as' to 'Me', and 'Who has access' to 'Anyone'.
 *    Copy the Web App URL and paste it into your frontend scoreboard settings.
 */

// Embed the 72 group stage matches resolved from FIFA schedule
const MATCHES_DATABASE = MATCHES_DATABASE_PLACEHOLDER;

// Cutoff Date for Predictions: June 10, 2026 at 23:59:59 (Spreadsheet Timezone)
const CUTOFF_DATE_STR = "2026-06-10T23:59:59";

/**
 * Creates custom menu in Google Sheets
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("🏆 FIFA Predictor")
    .addItem("1. Run Initial Setup", "initialSetup")
    .addItem("2. Generate/Update Google Form", "generatePredictorForm")
    .addItem("3. Recalculate Scores Now", "recalculateScores")
    .addToUi();
}

/**
 * Main setup function to initialize the spreadsheet tabs
 */
function initialSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Setup Matches sheet
  let matchesSheet = ss.getSheetByName("Matches");
  if (!matchesSheet) {
    matchesSheet = ss.insertSheet("Matches");
  }
  matchesSheet.clear();
  matchesSheet.getRange(1, 1, 1, 9).setValues([[
    "Match ID", "Group", "Matchday", "Date (Local)", "Home Team", "Away Team", "Finished", "Home Score", "Away Score"
  ]]);
  
  // Format Headers
  matchesSheet.getRange("A1:I1").setFontWeight("bold").setBackground("#1e293b").setFontColor("#ffffff").setHorizontalAlignment("center");
  
  // Insert matches data
  const rows = [];
  MATCHES_DATABASE.forEach(m => {
    rows.push([m.id, m.group, m.matchday, m.date, m.home, m.away, false, "", ""]);
  });
  matchesSheet.getRange(2, 1, rows.length, 9).setValues(rows);
  matchesSheet.getRange(2, 7, rows.length, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireCheckbox().build()
  );
  matchesSheet.autoResizeColumns(1, 9);
  
  // 2. Setup Predictions sheet placeholder (Will be linked to Google Form)
  let predSheet = ss.getSheetByName("Predictions");
  if (!predSheet) {
    predSheet = ss.insertSheet("Predictions");
    predSheet.getRange(1, 1, 1, 3).setValues([["Timestamp", "Name / Nickname", "Matches Predictions placeholder..."]]);
  }
  
  // 3. Setup Scoreboard sheet
  let scoreSheet = ss.getSheetByName("Scoreboard");
  if (!scoreSheet) {
    scoreSheet = ss.insertSheet("Scoreboard");
  }
  scoreSheet.clear();
  scoreSheet.getRange(1, 1, 1, 4).setValues([["Rank", "Name / Nickname", "Correct Predictions (Points)", "Accuracy %"]]);
  scoreSheet.getRange("A1:D1").setFontWeight("bold").setBackground("#1e293b").setFontColor("#ffffff").setHorizontalAlignment("center");
  
  SpreadsheetApp.getUi().alert("Setup complete! Tab 'Matches' initialized with 72 group stage fixtures. Next, go to the menu: 'FIFA Predictor' > 'Generate/Update Google Form'.");
}

/**
 * Creates or updates the Google Form linked to this spreadsheet
 */
function generatePredictorForm() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  
  // Check if Form already exists
  const formUrl = ss.getFormUrl();
  let form;
  if (formUrl) {
    try {
      form = FormApp.openByUrl(formUrl);
      const response = ui.alert(
        "Form Already Exists", 
        "A Google Form is already linked to this sheet. Do you want to unlink it and create a new one? (Warning: This will clear old form configurations)", 
        ui.ButtonSet.YES_NO
      );
      if (response === ui.Button.NO) {
        return;
      }
      // Unlink existing form
      ss.unlinkForm(formUrl);
    } catch(e) {
      // Ignore open error
    }
  }
  
  // Create New Form
  form = FormApp.create("2026 FIFA World Cup Predictor (Group Stage)");
  form.setDescription("Predict the outcome of each group stage match! Select either a team to win or 'Draw'. Every correct prediction earns 1 point. All predictions must be submitted by June 10, 2026 at 23:59:59.");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  
  // Add User Info Questions
  const nameItem = form.addTextItem();
  nameItem.setTitle("Name / Nickname");
  nameItem.setRequired(true);
  nameItem.setHelpText("Enter the name you want to display on the live scoreboard.");
  
  // Group matches by Group (A to L)
  const groups = {};
  MATCHES_DATABASE.forEach(m => {
    if (!groups[m.group]) {
      groups[m.group] = [];
    }
    groups[m.group].push(m);
  });
  
  const sortedGroups = Object.keys(groups).sort();
  
  // Generate 12 Sections (Group A to L)
  sortedGroups.forEach((groupName, idx) => {
    if (idx > 0) {
      form.addPageBreakItem().setTitle("Group " + groupName + " Matches");
    } else {
      // First page break just after name
      form.addPageBreakItem().setTitle("Group A Matches");
    }
    
    // Add matches in this group
    groups[groupName].forEach(m => {
      const q = form.addMultipleChoiceItem();
      q.setTitle("Match " + m.id + " [Group " + m.group + "]: " + m.home + " vs " + m.away);
      q.setChoices([
        q.createChoice(m.home),
        q.createChoice(m.away),
        q.createChoice("Draw")
      ]);
      q.setRequired(true);
      q.setHelpText("Kick-off: " + m.date + " (Local)");
    });
  });
  
  // Wait for Google Drive sync, then rename sheet tab created by Form
  Utilities.sleep(1000);
  const sheets = ss.getSheets();
  for (let s of sheets) {
    if (s.getName().startsWith("Form Responses")) {
      // Avoid sheet name collision: delete old placeholder Predictions sheet
      const oldPredSheet = ss.getSheetByName("Predictions");
      if (oldPredSheet) {
        ss.deleteSheet(oldPredSheet);
      }
      s.setName("Predictions");
      // Format predictions header
      s.getRange(1, 1, 1, s.getLastColumn()).setFontWeight("bold").setBackground("#0f172a").setFontColor("#ffffff");
    }
  }
  
  ui.alert("Google Form Created Successfully! You can open it via the Spreadsheet Form menu. Link to Form: " + form.getEditUrl());
}

/**
 * Calculates correct predictions for all participants
 */
function recalculateScores() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Get Matches
  const matchesSheet = ss.getSheetByName("Matches");
  if (!matchesSheet) return;
  const matchesData = matchesSheet.getDataRange().getValues();
  
  // Build match results map
  const matchResults = {};
  for (let i = 1; i < matchesData.length; i++) {
    const id = matchesData[i][0].toString();
    const home = matchesData[i][4];
    const away = matchesData[i][5];
    const finished = matchesData[i][6];
    const homeScore = matchesData[i][7];
    const awayScore = matchesData[i][8];
    
    if (finished === true || finished === "TRUE") {
      let outcome = "Draw";
      if (Number(homeScore) > Number(awayScore)) {
        outcome = home;
      } else if (Number(awayScore) > Number(homeScore)) {
        outcome = away;
      }
      matchResults[id] = outcome;
    }
  }
  
  // Get Predictions
  const predSheet = ss.getSheetByName("Predictions");
  if (!predSheet) return;
  const predData = predSheet.getDataRange().getValues();
  if (predData.length <= 1) return; // No predictions yet
  
  const headers = predData[0];
  
  // Find Name column and map Match questions to Match IDs
  let nameColIdx = 1; // Default column B
  const matchColMap = {}; // colIdx -> matchId
  
  for (let c = 0; c < headers.length; c++) {
    const header = headers[c];
    if (header.toLowerCase().includes("name / nickname")) {
      nameColIdx = c;
    } else {
      const matchMatch = header.match(/Match (\\d+)/i);
      if (matchMatch) {
        matchColMap[c] = matchMatch[1];
      }
    }
  }
  
  // Parse and group predictions by Player (to get latest valid before deadline)
  const players = {}; // name -> { score: 0, totalValid: 0, predictions: {}, timestamp: Date }
  const cutoffDate = new Date(CUTOFF_DATE_STR);
  
  for (let r = 1; r < predData.length; r++) {
    const timestamp = new Date(predData[r][0]);
    const name = predData[r][nameColIdx].toString().trim();
    if (!name) continue;
    
    // Lock-in Check: Predictions must be submitted before cutoff date
    if (timestamp > cutoffDate) {
      continue; // Skip late submissions
    }
    
    // Initialize or check if this response is newer than previous recorded
    if (!players[name] || timestamp > players[name].timestamp) {
      const preds = {};
      Object.keys(matchColMap).forEach(colIdx => {
        const mId = matchColMap[colIdx];
        preds[mId] = predData[r][colIdx].toString().trim();
      });
      
      players[name] = {
        name: name,
        timestamp: timestamp,
        predictions: preds
      };
    }
  }
  
  // Calculate Scores
  const scoreboardData = [];
  const totalCompletedMatches = Object.keys(matchResults).length;
  
  Object.keys(players).forEach(name => {
    const player = players[name];
    let correctCount = 0;
    
    Object.keys(player.predictions).forEach(mId => {
      const predicted = player.predictions[mId];
      const actual = matchResults[mId];
      if (actual && predicted === actual) {
        correctCount++;
      }
    });
    
    const accuracy = totalCompletedMatches > 0 ? (correctCount / totalCompletedMatches) * 100 : 0.0;
    
    scoreboardData.push({
      name: name,
      points: correctCount,
      accuracy: accuracy.toFixed(1),
      predictions: player.predictions
    });
  });
  
  // Sort scoreboard data by points descending, then name alphabetically
  scoreboardData.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return a.name.localeCompare(b.name);
  });
  
  // Write to Scoreboard sheet
  const scoreSheet = ss.getSheetByName("Scoreboard");
  if (scoreSheet) {
    scoreSheet.clearContents();
    scoreSheet.getRange(1, 1, 1, 4).setValues([["Rank", "Name / Nickname", "Correct Predictions (Points)", "Accuracy %"]]);
    
    if (scoreboardData.length > 0) {
      const writeRows = [];
      let rank = 1;
      for (let i = 0; i < scoreboardData.length; i++) {
        if (i > 0 && scoreboardData[i].points < scoreboardData[i-1].points) {
          rank = i + 1;
        }
        writeRows.push([rank, scoreboardData[i].name, scoreboardData[i].points, scoreboardData[i].accuracy + "%"]);
      }
      scoreSheet.getRange(2, 1, writeRows.length, 4).setValues(writeRows);
    }
    scoreSheet.autoResizeColumns(1, 4);
  }
  
  return {
    scoreboard: scoreboardData,
    matchResults: matchResults
  };
}

/**
 * GET Web App API Endpoint
 * Exposes live data to the Scoreboard Frontend
 */
function doGet(e) {
  try {
    // 1. Force recalculate scores to ensure real-time accuracy
    const data = recalculateScores() || { scoreboard: [], matchResults: {} };
    
    // 2. Fetch all matches data
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const matchesSheet = ss.getSheetByName("Matches");
    const matchesData = matchesSheet.getDataRange().getValues();
    
    const matchesList = [];
    // Read the sheet match states
    for (let i = 1; i < matchesData.length; i++) {
      const mId = matchesData[i][0].toString();
      // Find corresponding flags and codes from embedded DB
      const dbMatch = MATCHES_DATABASE.find(db => db.id.toString() === mId) || {};
      
      matchesList.push({
        id: Number(mId),
        group: matchesData[i][1],
        matchday: Number(matchesData[i][2]),
        date: matchesData[i][3],
        home: matchesData[i][4],
        away: matchesData[i][5],
        finished: matchesData[i][6] === true || matchesData[i][6] === "TRUE",
        homeScore: matchesData[i][7] !== "" ? Number(matchesData[i][7]) : null,
        awayScore: matchesData[i][8] !== "" ? Number(matchesData[i][8]) : null,
        homeFlag: dbMatch.homeFlag || "",
        awayFlag: dbMatch.awayFlag || "",
        homeCode: dbMatch.homeCode || "",
        awayCode: dbMatch.awayCode || ""
      });
    }
    
    // 3. Compile Prediction Statistics for each match
    const predictionStats = {};
    matchesList.forEach(m => {
      predictionStats[m.id] = { homeWins: 0, awayWins: 0, draws: 0, total: 0 };
    });
    
    data.scoreboard.forEach(player => {
      Object.keys(player.predictions).forEach(mId => {
        const pred = player.predictions[mId];
        const match = matchesList.find(m => m.id.toString() === mId);
        if (match && predictionStats[mId]) {
          predictionStats[mId].total++;
          if (pred === match.home) {
            predictionStats[mId].homeWins++;
          } else if (pred === match.away) {
            predictionStats[mId].awayWins++;
          } else if (pred === "Draw") {
            predictionStats[mId].draws++;
          }
        }
      });
    });
    
    // Clean predictions for client output (hide email or timestamp metadata, output name & predictions map only)
    const clientLeaderboard = data.scoreboard.map(p => ({
      name: p.name,
      points: p.points,
      accuracy: p.accuracy,
      predictions: p.predictions
    }));
    
    const responsePayload = {
      status: "success",
      cutoffDate: CUTOFF_DATE_STR,
      totalPlayers: clientLeaderboard.length,
      leaderboard: clientLeaderboard,
      matches: matchesList,
      stats: predictionStats
    };
    
    return ContentService.createTextOutput(JSON.stringify(responsePayload))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    const errorPayload = {
      status: "error",
      message: error.toString()
    };
    return ContentService.createTextOutput(JSON.stringify(errorPayload))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
"""

    # Inject the JSON matches list into the template
    full_code = apps_script_template.replace("MATCHES_DATABASE_PLACEHOLDER", matches_js_str)

    output_dir = os.path.join(os.path.dirname(script_dir), "google-apps-script")
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, "Code.gs")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(full_code)

    print("Generated google-apps-script/Code.gs successfully.")

if __name__ == "__main__":
    generate()
