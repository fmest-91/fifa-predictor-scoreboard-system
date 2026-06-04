# 🏆 FIFA World Cup 2026 Predictor & Live Scoreboard System

A complete, self-contained tournament prediction bracket system for the **2026 FIFA World Cup group stage**. It allows players to submit predictions via an organized Google Form and view live standings on a stunning, glassmorphism-themed scoreboard web dashboard.

---

## System Architecture

The project is designed in a headless decoupled structure:
1. **Google Sheets + Google Apps Script (Backend):** Serves as the database, automatically generates the 12-section Google Form, validates cutoff deadlines, calculates standings, and hosts a JSON API endpoint.
2. **HTML5/CSS3/JS Web App (Frontend):** Renders the standings table, matches schedule, pick distribution graphs, player prediction details, and consensus analytics.

---

## Step-by-Step Setup Guide

Follow these steps to deploy your tournament bracket:

### Part 1: Google Sheet & Google Form Setup

1. Create a new, blank spreadsheet in [Google Sheets](https://sheets.google.com).
2. Open the menu **Extensions > Apps Script**.
3. Clear any existing code in the editor and copy-paste the entire contents of the file [`google-apps-script/Code.gs`](google-apps-script/Code.gs).
4. Click the **Save** icon (disk symbol) and rename the project to `FIFA Predictor Backend`.
5. In the function dropdown, select **`initialSetup`** and click the **Run** button.
   - *Note: Google will prompt you to authorize permissions. Click "Review permissions", select your Google account, click "Advanced" (bottom link), click "Go to FIFA Predictor Backend (unsafe)", and approve the scope.*
6. Return to your Google Sheet. You will see three tabs created: `Matches` (pre-seeded with all 72 fixtures), `Predictions`, and `Scoreboard`.
7. Refresh your spreadsheet in the browser. A new custom menu **🏆 FIFA Predictor** will appear on the top menu bar.
8. Click **🏆 FIFA Predictor > 2. Generate/Update Google Form**.
   - The script will run in the background and dynamically generate a Google Form linked to the sheet.
   - Once completed, an alert will display the form link. Click it to open the Google Form!
   - Share the **Send Form (Public)** link with your participants.

### Part 2: Deploying the Web App JSON API

To allow the live scoreboard web app to fetch rankings and prediction counts, you need to publish the spreadsheet script as a public API:

1. In the Apps Script tab, click the blue **Deploy** button in the top right, and select **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the fields:
   - **Description:** `FIFA 2026 API`
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** `Anyone`
4. Click **Deploy**.
5. Once deployed, copy the provided **Web app URL** (ends in `/exec`).

### Part 3: Connecting the Live Scoreboard

1. Open [`index.html`](index.html) in your web browser (you can double-click the file to open it locally, no web server is required!).
2. By default, the scoreboard loads in **Demo Mode** with mock standings and match statistics so you can preview the visuals.
3. Click the **Setup Sheets** button in the top right corner of the header.
4. In the settings panel:
   - Paste your copied **Apps Script Web App URL**.
   - Paste the public **Google Form URL** (for users to submit brackets).
5. Click **Save and Connect**. The status badge will change to **Connected Standings** (green) and load your live tournament rankings!

---

## Predictor Tournament Rules & Administration

- **Predictions Cutoff:** The lock-in deadline is strictly set to **June 10, 2026, at 23:59:59**. Any predictions submitted in the Google Form after this time will be automatically filtered out and excluded by the score calculator.
- **Editing Predictions:** If a player submits predictions multiple times before the June 10 deadline, the calculator automatically keeps only their *latest* submission.
- **Administering Scores:**
  1. As matches finish, open the `Matches` sheet in your Google Sheet.
  2. For the completed match, check the **Finished** checkbox (Column G).
  3. Enter the final score in the **Home Score** (Column H) and **Away Score** (Column I) cells.
  4. The API will recalculate the leaderboard on-the-fly, or you can manually force-calculate by clicking **🏆 FIFA Predictor > 3. Recalculate Scores Now** in the menu.
