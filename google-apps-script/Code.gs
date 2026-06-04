/**
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
const MATCHES_DATABASE = [
  {
    "id": 1,
    "group": "A",
    "matchday": 1,
    "date": "06/11/2026 13:00",
    "home": "Mexico",
    "away": "South Africa",
    "homeFlag": "https://flagcdn.com/w80/mx.png",
    "awayFlag": "https://flagcdn.com/w80/za.png"
  },
  {
    "id": 2,
    "group": "A",
    "matchday": 1,
    "date": "06/11/2026 20:00",
    "home": "South Korea",
    "away": "Czech Republic",
    "homeFlag": "https://flagcdn.com/w80/kr.png",
    "awayFlag": "https://flagcdn.com/w80/cz.png"
  },
  {
    "id": 3,
    "group": "B",
    "matchday": 1,
    "date": "06/12/2026 15:00",
    "home": "Canada",
    "away": "Bosnia and Herzegovina",
    "homeFlag": "https://flagcdn.com/w80/ca.png",
    "awayFlag": "https://flagcdn.com/w80/ba.png"
  },
  {
    "id": 4,
    "group": "D",
    "matchday": 1,
    "date": "06/12/2026 18:00",
    "home": "United States",
    "away": "Paraguay",
    "homeFlag": "https://flagcdn.com/w80/us.png",
    "awayFlag": "https://flagcdn.com/w80/py.png"
  },
  {
    "id": 5,
    "group": "C",
    "matchday": 1,
    "date": "06/13/2026 21:00",
    "home": "Haiti",
    "away": "Scotland",
    "homeFlag": "https://flagcdn.com/w80/ht.png",
    "awayFlag": "https://flagcdn.com/w80/gb-sct.png"
  },
  {
    "id": 6,
    "group": "D",
    "matchday": 1,
    "date": "06/13/2026 21:00",
    "home": "Australia",
    "away": "Turkey",
    "homeFlag": "https://flagcdn.com/w80/au.png",
    "awayFlag": "https://flagcdn.com/w80/tr.png"
  },
  {
    "id": 7,
    "group": "C",
    "matchday": 1,
    "date": "06/13/2026 18:00",
    "home": "Brazil",
    "away": "Morocco",
    "homeFlag": "https://flagcdn.com/w80/br.png",
    "awayFlag": "https://flagcdn.com/w80/ma.png"
  },
  {
    "id": 8,
    "group": "B",
    "matchday": 1,
    "date": "06/13/2026 12:00",
    "home": "Qatar",
    "away": "Switzerland",
    "homeFlag": "https://flagcdn.com/w80/qa.png",
    "awayFlag": "https://flagcdn.com/w80/ch.png"
  },
  {
    "id": 9,
    "group": "E",
    "matchday": 1,
    "date": "06/14/2026 19:00",
    "home": "Ivory Coast",
    "away": "Ecuador",
    "homeFlag": "https://flagcdn.com/w80/ci.png",
    "awayFlag": "https://flagcdn.com/w80/ec.png"
  },
  {
    "id": 10,
    "group": "E",
    "matchday": 1,
    "date": "06/14/2026 12:00",
    "home": "Germany",
    "away": "Curaçao",
    "homeFlag": "https://flagcdn.com/w80/de.png",
    "awayFlag": "https://flagcdn.com/w80/cw.png"
  },
  {
    "id": 11,
    "group": "F",
    "matchday": 1,
    "date": "06/14/2026 15:00",
    "home": "Netherlands",
    "away": "Japan",
    "homeFlag": "https://flagcdn.com/w80/nl.png",
    "awayFlag": "https://flagcdn.com/w80/jp.png"
  },
  {
    "id": 12,
    "group": "F",
    "matchday": 1,
    "date": "06/14/2026 20:00",
    "home": "Sweden",
    "away": "Tunisia",
    "homeFlag": "https://flagcdn.com/w80/se.png",
    "awayFlag": "https://flagcdn.com/w80/tn.png"
  },
  {
    "id": 13,
    "group": "G",
    "matchday": 1,
    "date": "06/15/2026 18:00",
    "home": "Iran",
    "away": "New Zealand",
    "homeFlag": "https://flagcdn.com/w80/ir.png",
    "awayFlag": "https://flagcdn.com/w80/nz.png"
  },
  {
    "id": 14,
    "group": "H",
    "matchday": 1,
    "date": "06/15/2026 12:00",
    "home": "Spain",
    "away": "Cape Verde",
    "homeFlag": "https://flagcdn.com/w80/es.png",
    "awayFlag": "https://flagcdn.com/w80/cv.png"
  },
  {
    "id": 15,
    "group": "G",
    "matchday": 1,
    "date": "06/15/2026 12:00",
    "home": "Belgium",
    "away": "Egypt",
    "homeFlag": "https://flagcdn.com/w80/be.png",
    "awayFlag": "https://flagcdn.com/w80/eg.png"
  },
  {
    "id": 16,
    "group": "H",
    "matchday": 1,
    "date": "06/15/2026 18:00",
    "home": "Saudi Arabia",
    "away": "Uruguay",
    "homeFlag": "https://flagcdn.com/w80/sa.png",
    "awayFlag": "https://flagcdn.com/w80/uy.png"
  },
  {
    "id": 17,
    "group": "I",
    "matchday": 1,
    "date": "06/16/2026 15:00",
    "home": "France",
    "away": "Senegal",
    "homeFlag": "https://flagcdn.com/w80/fr.png",
    "awayFlag": "https://flagcdn.com/w80/sn.png"
  },
  {
    "id": 18,
    "group": "I",
    "matchday": 1,
    "date": "06/16/2026 18:00",
    "home": "Iraq",
    "away": "Norway",
    "homeFlag": "https://flagcdn.com/w80/iq.png",
    "awayFlag": "https://flagcdn.com/w80/no.png"
  },
  {
    "id": 19,
    "group": "J",
    "matchday": 1,
    "date": "06/16/2026 20:00",
    "home": "Argentina",
    "away": "Algeria",
    "homeFlag": "https://flagcdn.com/w80/ar.png",
    "awayFlag": "https://flagcdn.com/w80/dz.png"
  },
  {
    "id": 20,
    "group": "J",
    "matchday": 1,
    "date": "06/16/2026 21:00",
    "home": "Austria",
    "away": "Jordan",
    "homeFlag": "https://flagcdn.com/w80/at.png",
    "awayFlag": "https://flagcdn.com/w80/jo.png"
  },
  {
    "id": 21,
    "group": "K",
    "matchday": 1,
    "date": "06/17/2026 12:00",
    "home": "Portugal",
    "away": "Democratic Republic of the Congo",
    "homeFlag": "https://flagcdn.com/w80/pt.png",
    "awayFlag": "https://flagcdn.com/w80/cd.png"
  },
  {
    "id": 22,
    "group": "L",
    "matchday": 1,
    "date": "06/17/2026 15:00",
    "home": "England",
    "away": "Croatia",
    "homeFlag": "https://flagcdn.com/w80/gb-eng.png",
    "awayFlag": "https://flagcdn.com/w80/hr.png"
  },
  {
    "id": 23,
    "group": "K",
    "matchday": 1,
    "date": "06/17/2026 20:00",
    "home": "Uzbekistan",
    "away": "Colombia",
    "homeFlag": "https://flagcdn.com/w80/uz.png",
    "awayFlag": "https://flagcdn.com/w80/co.png"
  },
  {
    "id": 24,
    "group": "L",
    "matchday": 1,
    "date": "06/17/2026 19:00",
    "home": "Ghana",
    "away": "Panama",
    "homeFlag": "https://flagcdn.com/w80/gh.png",
    "awayFlag": "https://flagcdn.com/w80/pa.png"
  },
  {
    "id": 25,
    "group": "A",
    "matchday": 2,
    "date": "06/18/2026 19:00",
    "home": "Mexico",
    "away": "South Korea",
    "homeFlag": "https://flagcdn.com/w80/mx.png",
    "awayFlag": "https://flagcdn.com/w80/kr.png"
  },
  {
    "id": 26,
    "group": "B",
    "matchday": 2,
    "date": "06/18/2026 12:00",
    "home": "Switzerland",
    "away": "Bosnia and Herzegovina",
    "homeFlag": "https://flagcdn.com/w80/ch.png",
    "awayFlag": "https://flagcdn.com/w80/ba.png"
  },
  {
    "id": 27,
    "group": "B",
    "matchday": 2,
    "date": "06/18/2026 15:00",
    "home": "Canada",
    "away": "Qatar",
    "homeFlag": "https://flagcdn.com/w80/ca.png",
    "awayFlag": "https://flagcdn.com/w80/qa.png"
  },
  {
    "id": 28,
    "group": "A",
    "matchday": 2,
    "date": "06/18/2026 12:00",
    "home": "Czech Republic",
    "away": "South Africa",
    "homeFlag": "https://flagcdn.com/w80/cz.png",
    "awayFlag": "https://flagcdn.com/w80/za.png"
  },
  {
    "id": 29,
    "group": "C",
    "matchday": 2,
    "date": "06/19/2026 21:00",
    "home": "Brazil",
    "away": "Haiti",
    "homeFlag": "https://flagcdn.com/w80/br.png",
    "awayFlag": "https://flagcdn.com/w80/ht.png"
  },
  {
    "id": 30,
    "group": "C",
    "matchday": 2,
    "date": "06/19/2026 18:00",
    "home": "Scotland",
    "away": "Morocco",
    "homeFlag": "https://flagcdn.com/w80/gb-sct.png",
    "awayFlag": "https://flagcdn.com/w80/ma.png"
  },
  {
    "id": 31,
    "group": "D",
    "matchday": 2,
    "date": "06/19/2026 12:00",
    "home": "United States",
    "away": "Australia",
    "homeFlag": "https://flagcdn.com/w80/us.png",
    "awayFlag": "https://flagcdn.com/w80/au.png"
  },
  {
    "id": 32,
    "group": "D",
    "matchday": 2,
    "date": "06/19/2026 20:00",
    "home": "Turkey",
    "away": "Paraguay",
    "homeFlag": "https://flagcdn.com/w80/tr.png",
    "awayFlag": "https://flagcdn.com/w80/py.png"
  },
  {
    "id": 33,
    "group": "E",
    "matchday": 2,
    "date": "06/20/2026 16:00",
    "home": "Germany",
    "away": "Ivory Coast",
    "homeFlag": "https://flagcdn.com/w80/de.png",
    "awayFlag": "https://flagcdn.com/w80/ci.png"
  },
  {
    "id": 34,
    "group": "E",
    "matchday": 2,
    "date": "06/20/2026 19:00",
    "home": "Ecuador",
    "away": "Curaçao",
    "homeFlag": "https://flagcdn.com/w80/ec.png",
    "awayFlag": "https://flagcdn.com/w80/cw.png"
  },
  {
    "id": 35,
    "group": "F",
    "matchday": 2,
    "date": "06/20/2026 12:00",
    "home": "Netherlands",
    "away": "Sweden",
    "homeFlag": "https://flagcdn.com/w80/nl.png",
    "awayFlag": "https://flagcdn.com/w80/se.png"
  },
  {
    "id": 36,
    "group": "F",
    "matchday": 2,
    "date": "06/20/2026 22:00",
    "home": "Tunisia",
    "away": "Japan",
    "homeFlag": "https://flagcdn.com/w80/tn.png",
    "awayFlag": "https://flagcdn.com/w80/jp.png"
  },
  {
    "id": 37,
    "group": "G",
    "matchday": 2,
    "date": "06/21/2026 12:00",
    "home": "Belgium",
    "away": "Iran",
    "homeFlag": "https://flagcdn.com/w80/be.png",
    "awayFlag": "https://flagcdn.com/w80/ir.png"
  },
  {
    "id": 38,
    "group": "G",
    "matchday": 2,
    "date": "06/21/2026 18:00",
    "home": "New Zealand",
    "away": "Egypt",
    "homeFlag": "https://flagcdn.com/w80/nz.png",
    "awayFlag": "https://flagcdn.com/w80/eg.png"
  },
  {
    "id": 39,
    "group": "H",
    "matchday": 2,
    "date": "06/21/2026 12:00",
    "home": "Spain",
    "away": "Saudi Arabia",
    "homeFlag": "https://flagcdn.com/w80/es.png",
    "awayFlag": "https://flagcdn.com/w80/sa.png"
  },
  {
    "id": 40,
    "group": "H",
    "matchday": 2,
    "date": "06/21/2026 18:00",
    "home": "Uruguay",
    "away": "Cape Verde",
    "homeFlag": "https://flagcdn.com/w80/uy.png",
    "awayFlag": "https://flagcdn.com/w80/cv.png"
  },
  {
    "id": 41,
    "group": "I",
    "matchday": 2,
    "date": "06/22/2026 17:00",
    "home": "France",
    "away": "Iraq",
    "homeFlag": "https://flagcdn.com/w80/fr.png",
    "awayFlag": "https://flagcdn.com/w80/iq.png"
  },
  {
    "id": 42,
    "group": "I",
    "matchday": 2,
    "date": "06/22/2026 20:00",
    "home": "Norway",
    "away": "Senegal",
    "homeFlag": "https://flagcdn.com/w80/no.png",
    "awayFlag": "https://flagcdn.com/w80/sn.png"
  },
  {
    "id": 43,
    "group": "J",
    "matchday": 2,
    "date": "06/22/2026 12:00",
    "home": "Argentina",
    "away": "Austria",
    "homeFlag": "https://flagcdn.com/w80/ar.png",
    "awayFlag": "https://flagcdn.com/w80/at.png"
  },
  {
    "id": 44,
    "group": "J",
    "matchday": 2,
    "date": "06/22/2026 20:00",
    "home": "Jordan",
    "away": "Algeria",
    "homeFlag": "https://flagcdn.com/w80/jo.png",
    "awayFlag": "https://flagcdn.com/w80/dz.png"
  },
  {
    "id": 45,
    "group": "K",
    "matchday": 2,
    "date": "06/23/2026 12:00",
    "home": "Portugal",
    "away": "Uzbekistan",
    "homeFlag": "https://flagcdn.com/w80/pt.png",
    "awayFlag": "https://flagcdn.com/w80/uz.png"
  },
  {
    "id": 46,
    "group": "L",
    "matchday": 2,
    "date": "06/23/2026 19:00",
    "home": "Panama",
    "away": "Croatia",
    "homeFlag": "https://flagcdn.com/w80/pa.png",
    "awayFlag": "https://flagcdn.com/w80/hr.png"
  },
  {
    "id": 47,
    "group": "K",
    "matchday": 2,
    "date": "06/23/2026 20:00",
    "home": "Colombia",
    "away": "Democratic Republic of the Congo",
    "homeFlag": "https://flagcdn.com/w80/co.png",
    "awayFlag": "https://flagcdn.com/w80/cd.png"
  },
  {
    "id": 48,
    "group": "L",
    "matchday": 2,
    "date": "06/23/2026 16:00",
    "home": "England",
    "away": "Ghana",
    "homeFlag": "https://flagcdn.com/w80/gb-eng.png",
    "awayFlag": "https://flagcdn.com/w80/gh.png"
  },
  {
    "id": 49,
    "group": "C",
    "matchday": 3,
    "date": "06/24/2026 18:00",
    "home": "Scotland",
    "away": "Brazil",
    "homeFlag": "https://flagcdn.com/w80/gb-sct.png",
    "awayFlag": "https://flagcdn.com/w80/br.png"
  },
  {
    "id": 50,
    "group": "C",
    "matchday": 3,
    "date": "06/24/2026 18:00",
    "home": "Morocco",
    "away": "Haiti",
    "homeFlag": "https://flagcdn.com/w80/ma.png",
    "awayFlag": "https://flagcdn.com/w80/ht.png"
  },
  {
    "id": 51,
    "group": "A",
    "matchday": 3,
    "date": "06/24/2026 19:00",
    "home": "South Africa",
    "away": "South Korea",
    "homeFlag": "https://flagcdn.com/w80/za.png",
    "awayFlag": "https://flagcdn.com/w80/kr.png"
  },
  {
    "id": 52,
    "group": "A",
    "matchday": 3,
    "date": "06/24/2026 19:00",
    "home": "Czech Republic",
    "away": "Mexico",
    "homeFlag": "https://flagcdn.com/w80/cz.png",
    "awayFlag": "https://flagcdn.com/w80/mx.png"
  },
  {
    "id": 53,
    "group": "B",
    "matchday": 3,
    "date": "06/24/2026 12:00",
    "home": "Bosnia and Herzegovina",
    "away": "Qatar",
    "homeFlag": "https://flagcdn.com/w80/ba.png",
    "awayFlag": "https://flagcdn.com/w80/qa.png"
  },
  {
    "id": 54,
    "group": "B",
    "matchday": 3,
    "date": "06/24/2026 12:00",
    "home": "Switzerland",
    "away": "Canada",
    "homeFlag": "https://flagcdn.com/w80/ch.png",
    "awayFlag": "https://flagcdn.com/w80/ca.png"
  },
  {
    "id": 55,
    "group": "E",
    "matchday": 3,
    "date": "06/25/2026 16:00",
    "home": "Curaçao",
    "away": "Ivory Coast",
    "homeFlag": "https://flagcdn.com/w80/cw.png",
    "awayFlag": "https://flagcdn.com/w80/ci.png"
  },
  {
    "id": 56,
    "group": "E",
    "matchday": 3,
    "date": "06/25/2026 16:00",
    "home": "Ecuador",
    "away": "Germany",
    "homeFlag": "https://flagcdn.com/w80/ec.png",
    "awayFlag": "https://flagcdn.com/w80/de.png"
  },
  {
    "id": 57,
    "group": "D",
    "matchday": 3,
    "date": "06/25/2026 19:00",
    "home": "Paraguay",
    "away": "Australia",
    "homeFlag": "https://flagcdn.com/w80/py.png",
    "awayFlag": "https://flagcdn.com/w80/au.png"
  },
  {
    "id": 58,
    "group": "D",
    "matchday": 3,
    "date": "06/25/2026 19:00",
    "home": "Turkey",
    "away": "United States",
    "homeFlag": "https://flagcdn.com/w80/tr.png",
    "awayFlag": "https://flagcdn.com/w80/us.png"
  },
  {
    "id": 59,
    "group": "F",
    "matchday": 3,
    "date": "06/25/2026 18:00",
    "home": "Japan",
    "away": "Sweden",
    "homeFlag": "https://flagcdn.com/w80/jp.png",
    "awayFlag": "https://flagcdn.com/w80/se.png"
  },
  {
    "id": 60,
    "group": "F",
    "matchday": 3,
    "date": "06/25/2026 18:00",
    "home": "Tunisia",
    "away": "Netherlands",
    "homeFlag": "https://flagcdn.com/w80/tn.png",
    "awayFlag": "https://flagcdn.com/w80/nl.png"
  },
  {
    "id": 61,
    "group": "I",
    "matchday": 3,
    "date": "06/26/2026 15:00",
    "home": "Senegal",
    "away": "Iraq",
    "homeFlag": "https://flagcdn.com/w80/sn.png",
    "awayFlag": "https://flagcdn.com/w80/iq.png"
  },
  {
    "id": 62,
    "group": "I",
    "matchday": 3,
    "date": "06/26/2026 15:00",
    "home": "Norway",
    "away": "France",
    "homeFlag": "https://flagcdn.com/w80/no.png",
    "awayFlag": "https://flagcdn.com/w80/fr.png"
  },
  {
    "id": 63,
    "group": "G",
    "matchday": 3,
    "date": "06/26/2026 20:00",
    "home": "Egypt",
    "away": "Iran",
    "homeFlag": "https://flagcdn.com/w80/eg.png",
    "awayFlag": "https://flagcdn.com/w80/ir.png"
  },
  {
    "id": 64,
    "group": "G",
    "matchday": 3,
    "date": "06/26/2026 20:00",
    "home": "New Zealand",
    "away": "Belgium",
    "homeFlag": "https://flagcdn.com/w80/nz.png",
    "awayFlag": "https://flagcdn.com/w80/be.png"
  },
  {
    "id": 65,
    "group": "H",
    "matchday": 3,
    "date": "06/26/2026 19:00",
    "home": "Cape Verde",
    "away": "Saudi Arabia",
    "homeFlag": "https://flagcdn.com/w80/cv.png",
    "awayFlag": "https://flagcdn.com/w80/sa.png"
  },
  {
    "id": 66,
    "group": "H",
    "matchday": 3,
    "date": "06/26/2026 18:00",
    "home": "Uruguay",
    "away": "Spain",
    "homeFlag": "https://flagcdn.com/w80/uy.png",
    "awayFlag": "https://flagcdn.com/w80/es.png"
  },
  {
    "id": 67,
    "group": "L",
    "matchday": 3,
    "date": "06/27/2026 17:00",
    "home": "Panama",
    "away": "England",
    "homeFlag": "https://flagcdn.com/w80/pa.png",
    "awayFlag": "https://flagcdn.com/w80/gb-eng.png"
  },
  {
    "id": 68,
    "group": "L",
    "matchday": 3,
    "date": "06/27/2026 17:00",
    "home": "Croatia",
    "away": "Ghana",
    "homeFlag": "https://flagcdn.com/w80/hr.png",
    "awayFlag": "https://flagcdn.com/w80/gh.png"
  },
  {
    "id": 69,
    "group": "J",
    "matchday": 3,
    "date": "06/27/2026 21:00",
    "home": "Algeria",
    "away": "Austria",
    "homeFlag": "https://flagcdn.com/w80/dz.png",
    "awayFlag": "https://flagcdn.com/w80/at.png"
  },
  {
    "id": 70,
    "group": "J",
    "matchday": 3,
    "date": "06/27/2026 21:00",
    "home": "Jordan",
    "away": "Argentina",
    "homeFlag": "https://flagcdn.com/w80/jo.png",
    "awayFlag": "https://flagcdn.com/w80/ar.png"
  },
  {
    "id": 71,
    "group": "K",
    "matchday": 3,
    "date": "06/27/2026 19:30",
    "home": "Colombia",
    "away": "Portugal",
    "homeFlag": "https://flagcdn.com/w80/co.png",
    "awayFlag": "https://flagcdn.com/w80/pt.png"
  },
  {
    "id": 72,
    "group": "K",
    "matchday": 3,
    "date": "06/27/2026 19:30",
    "home": "Democratic Republic of the Congo",
    "away": "Uzbekistan",
    "homeFlag": "https://flagcdn.com/w80/cd.png",
    "awayFlag": "https://flagcdn.com/w80/uz.png"
  }
];

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
      const matchMatch = header.match(/Match (\d+)/i);
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
