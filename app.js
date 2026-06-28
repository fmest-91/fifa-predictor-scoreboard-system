// FIFA World Cup 2026 Scoreboard Controller
// Connects Google Sheets JSON API or falls back to demo mode

const MATCHES_LOCAL_DB = [
  {
    "id": 1,
    "group": "A",
    "matchday": 1,
    "date": "06/11/2026 13:00",
    "home": "Mexico",
    "away": "South Africa",
    "homeFlag": "https://flagcdn.com/w80/mx.png",
    "awayFlag": "https://flagcdn.com/w80/za.png",
    "homeCode": "MEX",
    "awayCode": "RSA",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 2,
    "group": "A",
    "matchday": 1,
    "date": "06/11/2026 20:00",
    "home": "South Korea",
    "away": "Czech Republic",
    "homeFlag": "https://flagcdn.com/w80/kr.png",
    "awayFlag": "https://flagcdn.com/w80/cz.png",
    "homeCode": "KOR",
    "awayCode": "CZE",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 3,
    "group": "B",
    "matchday": 1,
    "date": "06/12/2026 15:00",
    "home": "Canada",
    "away": "Bosnia and Herzegovina",
    "homeFlag": "https://flagcdn.com/w80/ca.png",
    "awayFlag": "https://flagcdn.com/w80/ba.png",
    "homeCode": "CAN",
    "awayCode": "BIH",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 4,
    "group": "D",
    "matchday": 1,
    "date": "06/12/2026 18:00",
    "home": "United States",
    "away": "Paraguay",
    "homeFlag": "https://flagcdn.com/w80/us.png",
    "awayFlag": "https://flagcdn.com/w80/py.png",
    "homeCode": "USA",
    "awayCode": "PAR",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 5,
    "group": "C",
    "matchday": 1,
    "date": "06/13/2026 21:00",
    "home": "Haiti",
    "away": "Scotland",
    "homeFlag": "https://flagcdn.com/w80/ht.png",
    "awayFlag": "https://flagcdn.com/w80/gb-sct.png",
    "homeCode": "HAI",
    "awayCode": "SCO",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 6,
    "group": "D",
    "matchday": 1,
    "date": "06/13/2026 21:00",
    "home": "Australia",
    "away": "Turkey",
    "homeFlag": "https://flagcdn.com/w80/au.png",
    "awayFlag": "https://flagcdn.com/w80/tr.png",
    "homeCode": "AUS",
    "awayCode": "TUR",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 7,
    "group": "C",
    "matchday": 1,
    "date": "06/13/2026 18:00",
    "home": "Brazil",
    "away": "Morocco",
    "homeFlag": "https://flagcdn.com/w80/br.png",
    "awayFlag": "https://flagcdn.com/w80/ma.png",
    "homeCode": "BRA",
    "awayCode": "MAR",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 8,
    "group": "B",
    "matchday": 1,
    "date": "06/13/2026 12:00",
    "home": "Qatar",
    "away": "Switzerland",
    "homeFlag": "https://flagcdn.com/w80/qa.png",
    "awayFlag": "https://flagcdn.com/w80/ch.png",
    "homeCode": "QAT",
    "awayCode": "SUI",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 9,
    "group": "E",
    "matchday": 1,
    "date": "06/14/2026 19:00",
    "home": "Ivory Coast",
    "away": "Ecuador",
    "homeFlag": "https://flagcdn.com/w80/ci.png",
    "awayFlag": "https://flagcdn.com/w80/ec.png",
    "homeCode": "CIV",
    "awayCode": "ECU",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 10,
    "group": "E",
    "matchday": 1,
    "date": "06/14/2026 12:00",
    "home": "Germany",
    "away": "Curaçao",
    "homeFlag": "https://flagcdn.com/w80/de.png",
    "awayFlag": "https://flagcdn.com/w80/cw.png",
    "homeCode": "GER",
    "awayCode": "CUW",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 11,
    "group": "F",
    "matchday": 1,
    "date": "06/14/2026 15:00",
    "home": "Netherlands",
    "away": "Japan",
    "homeFlag": "https://flagcdn.com/w80/nl.png",
    "awayFlag": "https://flagcdn.com/w80/jp.png",
    "homeCode": "NED",
    "awayCode": "JPN",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 12,
    "group": "F",
    "matchday": 1,
    "date": "06/14/2026 20:00",
    "home": "Sweden",
    "away": "Tunisia",
    "homeFlag": "https://flagcdn.com/w80/se.png",
    "awayFlag": "https://flagcdn.com/w80/tn.png",
    "homeCode": "SWE",
    "awayCode": "TUN",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 13,
    "group": "G",
    "matchday": 1,
    "date": "06/15/2026 18:00",
    "home": "Iran",
    "away": "New Zealand",
    "homeFlag": "https://flagcdn.com/w80/ir.png",
    "awayFlag": "https://flagcdn.com/w80/nz.png",
    "homeCode": "IRN",
    "awayCode": "NZL",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 14,
    "group": "H",
    "matchday": 1,
    "date": "06/15/2026 12:00",
    "home": "Spain",
    "away": "Cape Verde",
    "homeFlag": "https://flagcdn.com/w80/es.png",
    "awayFlag": "https://flagcdn.com/w80/cv.png",
    "homeCode": "ESP",
    "awayCode": "CPV",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 15,
    "group": "G",
    "matchday": 1,
    "date": "06/15/2026 12:00",
    "home": "Belgium",
    "away": "Egypt",
    "homeFlag": "https://flagcdn.com/w80/be.png",
    "awayFlag": "https://flagcdn.com/w80/eg.png",
    "homeCode": "BEL",
    "awayCode": "EGY",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 16,
    "group": "H",
    "matchday": 1,
    "date": "06/15/2026 18:00",
    "home": "Saudi Arabia",
    "away": "Uruguay",
    "homeFlag": "https://flagcdn.com/w80/sa.png",
    "awayFlag": "https://flagcdn.com/w80/uy.png",
    "homeCode": "KSA",
    "awayCode": "URU",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 17,
    "group": "I",
    "matchday": 1,
    "date": "06/16/2026 15:00",
    "home": "France",
    "away": "Senegal",
    "homeFlag": "https://flagcdn.com/w80/fr.png",
    "awayFlag": "https://flagcdn.com/w80/sn.png",
    "homeCode": "FRA",
    "awayCode": "SEN",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 18,
    "group": "I",
    "matchday": 1,
    "date": "06/16/2026 18:00",
    "home": "Iraq",
    "away": "Norway",
    "homeFlag": "https://flagcdn.com/w80/iq.png",
    "awayFlag": "https://flagcdn.com/w80/no.png",
    "homeCode": "IRQ",
    "awayCode": "NOR",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 19,
    "group": "J",
    "matchday": 1,
    "date": "06/16/2026 20:00",
    "home": "Argentina",
    "away": "Algeria",
    "homeFlag": "https://flagcdn.com/w80/ar.png",
    "awayFlag": "https://flagcdn.com/w80/dz.png",
    "homeCode": "ARG",
    "awayCode": "ALG",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 20,
    "group": "J",
    "matchday": 1,
    "date": "06/16/2026 21:00",
    "home": "Austria",
    "away": "Jordan",
    "homeFlag": "https://flagcdn.com/w80/at.png",
    "awayFlag": "https://flagcdn.com/w80/jo.png",
    "homeCode": "AUT",
    "awayCode": "JOR",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 21,
    "group": "K",
    "matchday": 1,
    "date": "06/17/2026 12:00",
    "home": "Portugal",
    "away": "Democratic Republic of the Congo",
    "homeFlag": "https://flagcdn.com/w80/pt.png",
    "awayFlag": "https://flagcdn.com/w80/cd.png",
    "homeCode": "POR",
    "awayCode": "COD",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 22,
    "group": "L",
    "matchday": 1,
    "date": "06/17/2026 15:00",
    "home": "England",
    "away": "Croatia",
    "homeFlag": "https://flagcdn.com/w80/gb-eng.png",
    "awayFlag": "https://flagcdn.com/w80/hr.png",
    "homeCode": "ENG",
    "awayCode": "CRO",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 23,
    "group": "K",
    "matchday": 1,
    "date": "06/17/2026 20:00",
    "home": "Uzbekistan",
    "away": "Colombia",
    "homeFlag": "https://flagcdn.com/w80/uz.png",
    "awayFlag": "https://flagcdn.com/w80/co.png",
    "homeCode": "UZB",
    "awayCode": "COL",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 24,
    "group": "L",
    "matchday": 1,
    "date": "06/17/2026 19:00",
    "home": "Ghana",
    "away": "Panama",
    "homeFlag": "https://flagcdn.com/w80/gh.png",
    "awayFlag": "https://flagcdn.com/w80/pa.png",
    "homeCode": "GHA",
    "awayCode": "PAN",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 25,
    "group": "A",
    "matchday": 2,
    "date": "06/18/2026 19:00",
    "home": "Mexico",
    "away": "South Korea",
    "homeFlag": "https://flagcdn.com/w80/mx.png",
    "awayFlag": "https://flagcdn.com/w80/kr.png",
    "homeCode": "MEX",
    "awayCode": "KOR",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 26,
    "group": "B",
    "matchday": 2,
    "date": "06/18/2026 12:00",
    "home": "Switzerland",
    "away": "Bosnia and Herzegovina",
    "homeFlag": "https://flagcdn.com/w80/ch.png",
    "awayFlag": "https://flagcdn.com/w80/ba.png",
    "homeCode": "SUI",
    "awayCode": "BIH",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 27,
    "group": "B",
    "matchday": 2,
    "date": "06/18/2026 15:00",
    "home": "Canada",
    "away": "Qatar",
    "homeFlag": "https://flagcdn.com/w80/ca.png",
    "awayFlag": "https://flagcdn.com/w80/qa.png",
    "homeCode": "CAN",
    "awayCode": "QAT",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 28,
    "group": "A",
    "matchday": 2,
    "date": "06/18/2026 12:00",
    "home": "Czech Republic",
    "away": "South Africa",
    "homeFlag": "https://flagcdn.com/w80/cz.png",
    "awayFlag": "https://flagcdn.com/w80/za.png",
    "homeCode": "CZE",
    "awayCode": "RSA",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 29,
    "group": "C",
    "matchday": 2,
    "date": "06/19/2026 21:00",
    "home": "Brazil",
    "away": "Haiti",
    "homeFlag": "https://flagcdn.com/w80/br.png",
    "awayFlag": "https://flagcdn.com/w80/ht.png",
    "homeCode": "BRA",
    "awayCode": "HAI",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 30,
    "group": "C",
    "matchday": 2,
    "date": "06/19/2026 18:00",
    "home": "Scotland",
    "away": "Morocco",
    "homeFlag": "https://flagcdn.com/w80/gb-sct.png",
    "awayFlag": "https://flagcdn.com/w80/ma.png",
    "homeCode": "SCO",
    "awayCode": "MAR",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 31,
    "group": "D",
    "matchday": 2,
    "date": "06/19/2026 12:00",
    "home": "United States",
    "away": "Australia",
    "homeFlag": "https://flagcdn.com/w80/us.png",
    "awayFlag": "https://flagcdn.com/w80/au.png",
    "homeCode": "USA",
    "awayCode": "AUS",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 32,
    "group": "D",
    "matchday": 2,
    "date": "06/19/2026 20:00",
    "home": "Turkey",
    "away": "Paraguay",
    "homeFlag": "https://flagcdn.com/w80/tr.png",
    "awayFlag": "https://flagcdn.com/w80/py.png",
    "homeCode": "TUR",
    "awayCode": "PAR",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 33,
    "group": "E",
    "matchday": 2,
    "date": "06/20/2026 16:00",
    "home": "Germany",
    "away": "Ivory Coast",
    "homeFlag": "https://flagcdn.com/w80/de.png",
    "awayFlag": "https://flagcdn.com/w80/ci.png",
    "homeCode": "GER",
    "awayCode": "CIV",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 34,
    "group": "E",
    "matchday": 2,
    "date": "06/20/2026 19:00",
    "home": "Ecuador",
    "away": "Curaçao",
    "homeFlag": "https://flagcdn.com/w80/ec.png",
    "awayFlag": "https://flagcdn.com/w80/cw.png",
    "homeCode": "ECU",
    "awayCode": "CUW",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 35,
    "group": "F",
    "matchday": 2,
    "date": "06/20/2026 12:00",
    "home": "Netherlands",
    "away": "Sweden",
    "homeFlag": "https://flagcdn.com/w80/nl.png",
    "awayFlag": "https://flagcdn.com/w80/se.png",
    "homeCode": "NED",
    "awayCode": "SWE",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 36,
    "group": "F",
    "matchday": 2,
    "date": "06/20/2026 22:00",
    "home": "Tunisia",
    "away": "Japan",
    "homeFlag": "https://flagcdn.com/w80/tn.png",
    "awayFlag": "https://flagcdn.com/w80/jp.png",
    "homeCode": "TUN",
    "awayCode": "JPN",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 37,
    "group": "G",
    "matchday": 2,
    "date": "06/21/2026 12:00",
    "home": "Belgium",
    "away": "Iran",
    "homeFlag": "https://flagcdn.com/w80/be.png",
    "awayFlag": "https://flagcdn.com/w80/ir.png",
    "homeCode": "BEL",
    "awayCode": "IRN",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 38,
    "group": "G",
    "matchday": 2,
    "date": "06/21/2026 18:00",
    "home": "New Zealand",
    "away": "Egypt",
    "homeFlag": "https://flagcdn.com/w80/nz.png",
    "awayFlag": "https://flagcdn.com/w80/eg.png",
    "homeCode": "NZL",
    "awayCode": "EGY",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 39,
    "group": "H",
    "matchday": 2,
    "date": "06/21/2026 12:00",
    "home": "Spain",
    "away": "Saudi Arabia",
    "homeFlag": "https://flagcdn.com/w80/es.png",
    "awayFlag": "https://flagcdn.com/w80/sa.png",
    "homeCode": "ESP",
    "awayCode": "KSA",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 40,
    "group": "H",
    "matchday": 2,
    "date": "06/21/2026 18:00",
    "home": "Uruguay",
    "away": "Cape Verde",
    "homeFlag": "https://flagcdn.com/w80/uy.png",
    "awayFlag": "https://flagcdn.com/w80/cv.png",
    "homeCode": "URU",
    "awayCode": "CPV",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 41,
    "group": "I",
    "matchday": 2,
    "date": "06/22/2026 17:00",
    "home": "France",
    "away": "Iraq",
    "homeFlag": "https://flagcdn.com/w80/fr.png",
    "awayFlag": "https://flagcdn.com/w80/iq.png",
    "homeCode": "FRA",
    "awayCode": "IRQ",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 42,
    "group": "I",
    "matchday": 2,
    "date": "06/22/2026 20:00",
    "home": "Norway",
    "away": "Senegal",
    "homeFlag": "https://flagcdn.com/w80/no.png",
    "awayFlag": "https://flagcdn.com/w80/sn.png",
    "homeCode": "NOR",
    "awayCode": "SEN",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 43,
    "group": "J",
    "matchday": 2,
    "date": "06/22/2026 12:00",
    "home": "Argentina",
    "away": "Austria",
    "homeFlag": "https://flagcdn.com/w80/ar.png",
    "awayFlag": "https://flagcdn.com/w80/at.png",
    "homeCode": "ARG",
    "awayCode": "AUT",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 44,
    "group": "J",
    "matchday": 2,
    "date": "06/22/2026 20:00",
    "home": "Jordan",
    "away": "Algeria",
    "homeFlag": "https://flagcdn.com/w80/jo.png",
    "awayFlag": "https://flagcdn.com/w80/dz.png",
    "homeCode": "JOR",
    "awayCode": "ALG",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 45,
    "group": "K",
    "matchday": 2,
    "date": "06/23/2026 12:00",
    "home": "Portugal",
    "away": "Uzbekistan",
    "homeFlag": "https://flagcdn.com/w80/pt.png",
    "awayFlag": "https://flagcdn.com/w80/uz.png",
    "homeCode": "POR",
    "awayCode": "UZB",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 46,
    "group": "L",
    "matchday": 2,
    "date": "06/23/2026 19:00",
    "home": "Panama",
    "away": "Croatia",
    "homeFlag": "https://flagcdn.com/w80/pa.png",
    "awayFlag": "https://flagcdn.com/w80/hr.png",
    "homeCode": "PAN",
    "awayCode": "CRO",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 47,
    "group": "K",
    "matchday": 2,
    "date": "06/23/2026 20:00",
    "home": "Colombia",
    "away": "Democratic Republic of the Congo",
    "homeFlag": "https://flagcdn.com/w80/co.png",
    "awayFlag": "https://flagcdn.com/w80/cd.png",
    "homeCode": "COL",
    "awayCode": "COD",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 48,
    "group": "L",
    "matchday": 2,
    "date": "06/23/2026 16:00",
    "home": "England",
    "away": "Ghana",
    "homeFlag": "https://flagcdn.com/w80/gb-eng.png",
    "awayFlag": "https://flagcdn.com/w80/gh.png",
    "homeCode": "ENG",
    "awayCode": "GHA",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 49,
    "group": "C",
    "matchday": 3,
    "date": "06/24/2026 18:00",
    "home": "Scotland",
    "away": "Brazil",
    "homeFlag": "https://flagcdn.com/w80/gb-sct.png",
    "awayFlag": "https://flagcdn.com/w80/br.png",
    "homeCode": "SCO",
    "awayCode": "BRA",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 50,
    "group": "C",
    "matchday": 3,
    "date": "06/24/2026 18:00",
    "home": "Morocco",
    "away": "Haiti",
    "homeFlag": "https://flagcdn.com/w80/ma.png",
    "awayFlag": "https://flagcdn.com/w80/ht.png",
    "homeCode": "MAR",
    "awayCode": "HAI",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 51,
    "group": "A",
    "matchday": 3,
    "date": "06/24/2026 19:00",
    "home": "South Africa",
    "away": "South Korea",
    "homeFlag": "https://flagcdn.com/w80/za.png",
    "awayFlag": "https://flagcdn.com/w80/kr.png",
    "homeCode": "RSA",
    "awayCode": "KOR",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 52,
    "group": "A",
    "matchday": 3,
    "date": "06/24/2026 19:00",
    "home": "Czech Republic",
    "away": "Mexico",
    "homeFlag": "https://flagcdn.com/w80/cz.png",
    "awayFlag": "https://flagcdn.com/w80/mx.png",
    "homeCode": "CZE",
    "awayCode": "MEX",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 53,
    "group": "B",
    "matchday": 3,
    "date": "06/24/2026 12:00",
    "home": "Bosnia and Herzegovina",
    "away": "Qatar",
    "homeFlag": "https://flagcdn.com/w80/ba.png",
    "awayFlag": "https://flagcdn.com/w80/qa.png",
    "homeCode": "BIH",
    "awayCode": "QAT",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 54,
    "group": "B",
    "matchday": 3,
    "date": "06/24/2026 12:00",
    "home": "Switzerland",
    "away": "Canada",
    "homeFlag": "https://flagcdn.com/w80/ch.png",
    "awayFlag": "https://flagcdn.com/w80/ca.png",
    "homeCode": "SUI",
    "awayCode": "CAN",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 55,
    "group": "E",
    "matchday": 3,
    "date": "06/25/2026 16:00",
    "home": "Curaçao",
    "away": "Ivory Coast",
    "homeFlag": "https://flagcdn.com/w80/cw.png",
    "awayFlag": "https://flagcdn.com/w80/ci.png",
    "homeCode": "CUW",
    "awayCode": "CIV",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 56,
    "group": "E",
    "matchday": 3,
    "date": "06/25/2026 16:00",
    "home": "Ecuador",
    "away": "Germany",
    "homeFlag": "https://flagcdn.com/w80/ec.png",
    "awayFlag": "https://flagcdn.com/w80/de.png",
    "homeCode": "ECU",
    "awayCode": "GER",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 57,
    "group": "D",
    "matchday": 3,
    "date": "06/25/2026 19:00",
    "home": "Paraguay",
    "away": "Australia",
    "homeFlag": "https://flagcdn.com/w80/py.png",
    "awayFlag": "https://flagcdn.com/w80/au.png",
    "homeCode": "PAR",
    "awayCode": "AUS",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 58,
    "group": "D",
    "matchday": 3,
    "date": "06/25/2026 19:00",
    "home": "Turkey",
    "away": "United States",
    "homeFlag": "https://flagcdn.com/w80/tr.png",
    "awayFlag": "https://flagcdn.com/w80/us.png",
    "homeCode": "TUR",
    "awayCode": "USA",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 59,
    "group": "F",
    "matchday": 3,
    "date": "06/25/2026 18:00",
    "home": "Japan",
    "away": "Sweden",
    "homeFlag": "https://flagcdn.com/w80/jp.png",
    "awayFlag": "https://flagcdn.com/w80/se.png",
    "homeCode": "JPN",
    "awayCode": "SWE",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 60,
    "group": "F",
    "matchday": 3,
    "date": "06/25/2026 18:00",
    "home": "Tunisia",
    "away": "Netherlands",
    "homeFlag": "https://flagcdn.com/w80/tn.png",
    "awayFlag": "https://flagcdn.com/w80/nl.png",
    "homeCode": "TUN",
    "awayCode": "NED",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 61,
    "group": "I",
    "matchday": 3,
    "date": "06/26/2026 15:00",
    "home": "Senegal",
    "away": "Iraq",
    "homeFlag": "https://flagcdn.com/w80/sn.png",
    "awayFlag": "https://flagcdn.com/w80/iq.png",
    "homeCode": "SEN",
    "awayCode": "IRQ",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 62,
    "group": "I",
    "matchday": 3,
    "date": "06/26/2026 15:00",
    "home": "Norway",
    "away": "France",
    "homeFlag": "https://flagcdn.com/w80/no.png",
    "awayFlag": "https://flagcdn.com/w80/fr.png",
    "homeCode": "NOR",
    "awayCode": "FRA",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 63,
    "group": "G",
    "matchday": 3,
    "date": "06/26/2026 20:00",
    "home": "Egypt",
    "away": "Iran",
    "homeFlag": "https://flagcdn.com/w80/eg.png",
    "awayFlag": "https://flagcdn.com/w80/ir.png",
    "homeCode": "EGY",
    "awayCode": "IRN",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 64,
    "group": "G",
    "matchday": 3,
    "date": "06/26/2026 20:00",
    "home": "New Zealand",
    "away": "Belgium",
    "homeFlag": "https://flagcdn.com/w80/nz.png",
    "awayFlag": "https://flagcdn.com/w80/be.png",
    "homeCode": "NZL",
    "awayCode": "BEL",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 65,
    "group": "H",
    "matchday": 3,
    "date": "06/26/2026 19:00",
    "home": "Cape Verde",
    "away": "Saudi Arabia",
    "homeFlag": "https://flagcdn.com/w80/cv.png",
    "awayFlag": "https://flagcdn.com/w80/sa.png",
    "homeCode": "CPV",
    "awayCode": "KSA",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 66,
    "group": "H",
    "matchday": 3,
    "date": "06/26/2026 18:00",
    "home": "Uruguay",
    "away": "Spain",
    "homeFlag": "https://flagcdn.com/w80/uy.png",
    "awayFlag": "https://flagcdn.com/w80/es.png",
    "homeCode": "URU",
    "awayCode": "ESP",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 67,
    "group": "L",
    "matchday": 3,
    "date": "06/27/2026 17:00",
    "home": "Panama",
    "away": "England",
    "homeFlag": "https://flagcdn.com/w80/pa.png",
    "awayFlag": "https://flagcdn.com/w80/gb-eng.png",
    "homeCode": "PAN",
    "awayCode": "ENG",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 68,
    "group": "L",
    "matchday": 3,
    "date": "06/27/2026 17:00",
    "home": "Croatia",
    "away": "Ghana",
    "homeFlag": "https://flagcdn.com/w80/hr.png",
    "awayFlag": "https://flagcdn.com/w80/gh.png",
    "homeCode": "CRO",
    "awayCode": "GHA",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 69,
    "group": "J",
    "matchday": 3,
    "date": "06/27/2026 21:00",
    "home": "Algeria",
    "away": "Austria",
    "homeFlag": "https://flagcdn.com/w80/dz.png",
    "awayFlag": "https://flagcdn.com/w80/at.png",
    "homeCode": "ALG",
    "awayCode": "AUT",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 70,
    "group": "J",
    "matchday": 3,
    "date": "06/27/2026 21:00",
    "home": "Jordan",
    "away": "Argentina",
    "homeFlag": "https://flagcdn.com/w80/jo.png",
    "awayFlag": "https://flagcdn.com/w80/ar.png",
    "homeCode": "JOR",
    "awayCode": "ARG",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 71,
    "group": "K",
    "matchday": 3,
    "date": "06/27/2026 19:30",
    "home": "Colombia",
    "away": "Portugal",
    "homeFlag": "https://flagcdn.com/w80/co.png",
    "awayFlag": "https://flagcdn.com/w80/pt.png",
    "homeCode": "COL",
    "awayCode": "POR",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  },
  {
    "id": 72,
    "group": "K",
    "matchday": 3,
    "date": "06/27/2026 19:30",
    "home": "Democratic Republic of the Congo",
    "away": "Uzbekistan",
    "homeFlag": "https://flagcdn.com/w80/cd.png",
    "awayFlag": "https://flagcdn.com/w80/uz.png",
    "homeCode": "COD",
    "awayCode": "UZB",
    "finished": false,
    "homeScore": null,
    "awayScore": null
  }
];

// ─── Hardcoded Defaults (apply to ALL viewers) ───────────────────────────────
const DEFAULT_API_URL  = "https://script.google.com/macros/s/AKfycbzq9H6Bd0j53qefIhiR-fylYA4tkF5rSE-62GaN-FI3h9PbIXrUTp66oTrHfkMreUHq/exec";
const DEFAULT_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeICq3uG1WGZoNn72KQ3pIgBNDtEhXuGURGrEFxAbIM87Aadg/viewform";
// ─────────────────────────────────────────────────────────────────────────────

// Global State
let state = {
  isDemoMode: false,
  apiUrl: DEFAULT_API_URL,
  formUrl: DEFAULT_FORM_URL,
  leaderboard: [],
  matches: [],
  stats: {},
  cutoffDate: new Date("2026-06-10T23:59:59")
};

// DOM Elements
const elements = {
  statusText: document.getElementById("status-text"),
  statusBadge: document.getElementById("status-badge"),
  btnSubmitPredictions: document.getElementById("btn-submit-predictions"),
  
  // Stats
  statPlayers: document.getElementById("stat-players"),
  statCompleted: document.getElementById("stat-completed"),
  statAvgScore: document.getElementById("stat-avg-score"),
  statLeader: document.getElementById("stat-leader"),
  
  // Countdown
  cdDays: document.getElementById("cd-days"),
  cdHours: document.getElementById("cd-hours"),
  cdMins: document.getElementById("cd-mins"),
  cdSecs: document.getElementById("cd-secs"),
  
  // Tabs
  tabBtns: document.querySelectorAll(".tab-btn"),
  tabPanels: document.querySelectorAll(".tab-panel"),
  
  // Leaderboard
  leaderboardTbody: document.getElementById("leaderboard-tbody"),
  
  // Matches
  matchesContainer: document.getElementById("matches-cards-container"),
  filterGroup: document.getElementById("filter-group-select"),
  filterStatus: document.getElementById("filter-status-select"),
  matchesCountText: document.getElementById("matches-count-text"),
  
  // Player Modal
  playerModal: document.getElementById("player-modal"),
  btnCloseModal: document.getElementById("btn-close-modal"),
  modalAvatar: document.getElementById("modal-avatar"),
  modalPlayerName: document.getElementById("modal-player-name"),
  modalPlayerRank: document.getElementById("modal-player-rank"),
  modalPlayerPoints: document.getElementById("modal-player-points"),
  modalPlayerAccuracy: document.getElementById("modal-player-accuracy"),
  modalPredictionsContainer: document.getElementById("modal-predictions-container"),
  
  // Settings Modal (elements kept for JS compatibility; modal is hidden)
  settingsModal: document.getElementById("settings-modal"),
  btnCloseSettings: document.getElementById("btn-close-settings"),
  settingsApiUrl: document.getElementById("settings-api-url"),
  settingsFormUrl: document.getElementById("settings-form-url"),
  btnSaveSettings: document.getElementById("btn-save-settings"),
  btnResetDemo: document.getElementById("btn-reset-demo"),
  
  // Insights
  popularPredictionsList: document.getElementById("popular-predictions-list"),
  consensusMatchesList: document.getElementById("consensus-matches-list")
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  loadSettings();
  initTabNavigation();
  initMatchesFilters();
  initModals();
  startCountdown();
  
  // Fetch Data (Live or Mock)
  fetchData();
});

// Load Config from localStorage (falls back to hardcoded defaults for all viewers)
function loadSettings() {
  const savedApiUrl  = localStorage.getItem("fifa_predictor_api_url")  || DEFAULT_API_URL;
  const savedFormUrl = localStorage.getItem("fifa_predictor_form_url") || DEFAULT_FORM_URL;
  
  // API URL — always live unless explicitly cleared
  if (savedApiUrl) {
    state.apiUrl = savedApiUrl;
    state.isDemoMode = false;
    if (elements.settingsApiUrl) elements.settingsApiUrl.value = savedApiUrl;
  } else {
    state.isDemoMode = true;
  }
  
  // Form URL — always visible for all viewers
  if (savedFormUrl) {
    state.formUrl = savedFormUrl;
    if (elements.settingsFormUrl) elements.settingsFormUrl.value = savedFormUrl;
    elements.btnSubmitPredictions.href = savedFormUrl;
    elements.btnSubmitPredictions.style.display = "inline-flex";
  } else {
    elements.btnSubmitPredictions.href = "#";
  }
  
  updateApiStatusUI();
}

// Update API Status Badge
function updateApiStatusUI() {
  if (state.isDemoMode) {
    elements.statusText.textContent = "Demo Mode";
    elements.statusBadge.className = "badge badge-demo";
  } else {
    elements.statusText.textContent = "Connected Standings";
    elements.statusBadge.className = "badge badge-live";
  }
}

// Tab Navigation logic
function initTabNavigation() {
  elements.tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");
      
      // Remove active states
      elements.tabBtns.forEach(b => b.classList.remove("active"));
      elements.tabPanels.forEach(p => p.classList.remove("active"));
      
      // Set active
      btn.classList.add("active");
      document.getElementById(`tab-${tabId}`).classList.add("active");
    });
  });
}

// Matches filter listeners
function initMatchesFilters() {
  elements.filterGroup.addEventListener("change", renderMatchesList);
  elements.filterStatus.addEventListener("change", renderMatchesList);
}

// Setup Modal Toggle Listeners
function initModals() {
  // Settings button removed from UI — skip if not present
  
  // Close Settings (if modal somehow opened)
  if (elements.btnCloseSettings) {
    elements.btnCloseSettings.addEventListener("click", () => {
      elements.settingsModal.classList.remove("active");
    });
  }
  
  // Close Player Modal
  elements.btnCloseModal.addEventListener("click", () => {
    elements.playerModal.classList.remove("active");
  });
  
  // Click outside to close player modal
  window.addEventListener("click", (e) => {
    if (e.target === elements.playerModal) {
      elements.playerModal.classList.remove("active");
    }
  });
  
  // Save Settings (hidden — guarded)
  if (elements.btnSaveSettings) {
    elements.btnSaveSettings.addEventListener("click", () => {
      const url = elements.settingsApiUrl ? elements.settingsApiUrl.value.trim() : "";
      const formUrl = elements.settingsFormUrl ? elements.settingsFormUrl.value.trim() : "";
      
      if (url) {
        localStorage.setItem("fifa_predictor_api_url", url);
        state.apiUrl = url;
        state.isDemoMode = false;
      }
      
      if (formUrl) {
        localStorage.setItem("fifa_predictor_form_url", formUrl);
        state.formUrl = formUrl;
        elements.btnSubmitPredictions.href = formUrl;
        elements.btnSubmitPredictions.style.display = "inline-flex";
      } else {
        localStorage.removeItem("fifa_predictor_form_url");
        state.formUrl = "";
        elements.btnSubmitPredictions.href = "#";
      }
      
      loadSettings();
      elements.settingsModal.classList.remove("active");
      fetchData();
    });
  }
  
  // Reset to Demo Mode (hidden — guarded)
  if (elements.btnResetDemo) {
    elements.btnResetDemo.addEventListener("click", () => {
      localStorage.removeItem("fifa_predictor_api_url");
      localStorage.removeItem("fifa_predictor_form_url");
      state.apiUrl = DEFAULT_API_URL;
      state.formUrl = DEFAULT_FORM_URL;
      state.isDemoMode = false;
      
      loadSettings();
      elements.settingsModal.classList.remove("active");
      fetchData();
    });
  }
}

// Start lock-in countdown timer
function startCountdown() {
  function updateTimer() {
    const now = new Date();
    const diff = state.cutoffDate - now;
    
    if (diff <= 0) {
      elements.cdDays.textContent = "00";
      elements.cdHours.textContent = "00";
      elements.cdMins.textContent = "00";
      elements.cdSecs.textContent = "00";
      document.getElementById("countdown-timer").parentElement.classList.add("locked");
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    
    elements.cdDays.textContent = String(days).padStart(2, "0");
    elements.cdHours.textContent = String(hours).padStart(2, "0");
    elements.cdMins.textContent = String(mins).padStart(2, "0");
    elements.cdSecs.textContent = String(secs).padStart(2, "0");
  }
  
  updateTimer();
  setInterval(updateTimer, 1000);
}

// Primary Fetch Method
function fetchData() {
  if (state.isDemoMode) {
    console.log("Loading Scoreboard Demo Mode Standings...");
    loadDemoData();
  } else {
    elements.leaderboardTbody.innerHTML = `<tr><td colspan="5" class="loading-state">Connecting to live standings... Please wait.</td></tr>`;
    
    fetch(state.apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          state.leaderboard = data.leaderboard;
          state.matches = data.matches;
          state.stats = data.stats;
          
          if (data.cutoffDate) {
            state.cutoffDate = new Date(data.cutoffDate);
          }
          
          renderAll();
        } else {
          console.warn("API error:", data.message);
          loadDemoData();
        }
      })
      .catch(err => {
        console.warn("API fetch failed (CORS or network):", err);
        loadDemoData();
      });
  }
}

// Generate Mock Data for Demo Mode
function loadDemoData() {
  // Deep copy matches database
  state.matches = JSON.parse(JSON.stringify(MATCHES_LOCAL_DB));
  
  // Set first 5 matches as completed with results
  const results = {
    1: { home: 2, away: 1, finished: true }, // Mexico vs South Africa: Mexico win
    2: { home: 1, away: 1, finished: true }, // South Korea vs Czech Republic: Draw
    3: { home: 3, away: 0, finished: true }, // Canada vs Bosnia: Canada win
    4: { home: 2, away: 0, finished: true }, // USA vs Paraguay: USA win
    5: { home: 0, away: 2, finished: true }  // Haiti vs Scotland: Scotland win
  };
  
  state.matches.forEach(m => {
    if (results[m.id]) {
      m.finished = true;
      m.homeScore = results[m.id].home;
      m.awayScore = results[m.id].away;
    }
  });
  
  // Create Mock Players
  const mockPredictions = {
    "Sophia Alaba": {
      name: "Sophia Alaba",
      points: 5,
      accuracy: "100.0",
      predictions: {
        1: "Mexico", 2: "Draw", 3: "Canada", 4: "United States", 5: "Scotland",
        6: "Turkey", 7: "Germany", 8: "Ecuador", 9: "Netherlands", 10: "Sweden" // and so on...
      }
    },
    "Liam Dubois": {
      name: "Liam Dubois",
      points: 3,
      accuracy: "60.0",
      predictions: {
        1: "Mexico", 2: "South Korea", 3: "Canada", 4: "United States", 5: "Draw",
        6: "Australia", 7: "Germany", 8: "Ivory Coast", 9: "Netherlands", 10: "Japan"
      }
    },
    "Emma Carter": {
      name: "Emma Carter",
      points: 2,
      accuracy: "40.0",
      predictions: {
        1: "South Africa", 2: "Czech Republic", 3: "Canada", 4: "United States", 5: "Draw",
        6: "Turkey", 7: "Germany", 8: "Ecuador", 9: "Japan", 10: "Sweden"
      }
    },
    "Noah Smith": {
      name: "Noah Smith",
      points: 2,
      accuracy: "40.0",
      predictions: {
        1: "Draw", 2: "Draw", 3: "Bosnia and Herzegovina", 4: "United States", 5: "Scotland",
        6: "Turkey", 7: "Ecuador", 8: "Germany", 9: "Tunisia", 10: "Japan"
      }
    },
    "Olivia Martinez": {
      name: "Olivia Martinez",
      points: 1,
      accuracy: "20.0",
      predictions: {
        1: "South Africa", 2: "Czech Republic", 3: "Bosnia and Herzegovina", 4: "Paraguay", 5: "Scotland",
        6: "Australia", 7: "Curaçao", 8: "Germany", 9: "Netherlands", 10: "Tunisia"
      }
    }
  };
  
  // Seed random predictions for rest of matches
  const players = Object.values(mockPredictions);
  players.forEach(p => {
    state.matches.forEach(m => {
      if (m.id > 5) {
        const choice = Math.random();
        if (choice < 0.45) {
          p.predictions[m.id] = m.home;
        } else if (choice < 0.90) {
          p.predictions[m.id] = m.away;
        } else {
          p.predictions[m.id] = "Draw";
        }
      }
    });
  });
  
  state.leaderboard = players.sort((a, b) => b.points - a.points);
  
  // Generate stats
  state.stats = {};
  state.matches.forEach(m => {
    state.stats[m.id] = { homeWins: 0, awayWins: 0, draws: 0, total: 0 };
  });
  
  state.leaderboard.forEach(p => {
    Object.keys(p.predictions).forEach(mId => {
      const pred = p.predictions[mId];
      const match = state.matches.find(m => m.id.toString() === mId);
      if (match && state.stats[mId]) {
        state.stats[mId].total++;
        if (pred === match.home) {
          state.stats[mId].homeWins++;
        } else if (pred === match.away) {
          state.stats[mId].awayWins++;
        } else if (pred === "Draw") {
          state.stats[mId].draws++;
        }
      }
    });
  });
  
  renderAll();
}


// Master Render Call
function renderAll() {
  renderStatistics();
  renderLeaderboard();
  renderMatchesList();
  renderInsights();
}

// Render Statistics Row
function renderStatistics() {
  const completedCount = state.matches.filter(m => m.finished).length;
  elements.statPlayers.textContent = state.leaderboard.length;
  elements.statCompleted.textContent = `${completedCount} / 72`;
  
  if (state.leaderboard.length > 0) {
    const totalPoints = state.leaderboard.reduce((acc, curr) => acc + curr.points, 0);
    const avg = totalPoints / state.leaderboard.length;
    elements.statAvgScore.textContent = avg.toFixed(1);
    elements.statLeader.textContent = state.leaderboard[0].name.split(" ")[0];
  } else {
    elements.statAvgScore.textContent = "0";
    elements.statLeader.textContent = "None";
  }
}

// Render Standings Leaderboard Table
function renderLeaderboard() {
  elements.leaderboardTbody.innerHTML = "";
  
  // After rendering leaderboard rows, update first place banner if competition is complete
  const completedCount = state.matches.filter(m => m.finished).length;
  if (state.leaderboard.length > 0 && completedCount === 72) {
    const topPlayer = state.leaderboard[0];
    const banner = document.getElementById('first-place-banner');
    const nameEl = document.getElementById('champion-name');
    const scoreEl = document.getElementById('champion-score');
    
    nameEl.textContent = `Congratulations to our Winner: ${topPlayer.name}!`;
    scoreEl.textContent = `Winning with ${topPlayer.points} points.`;
    banner.style.display = 'block';
  } else {
    const banner = document.getElementById('first-place-banner');
    if (banner) {
      banner.style.display = 'none';
    }
  }

  if (state.leaderboard.length === 0) {
    elements.leaderboardTbody.innerHTML = `<tr><td colspan="5" class="loading-state">No predictions submitted yet.</td></tr>`;
    return;
  }
  
  state.leaderboard.forEach((player, index) => {
    const tr = document.createElement("tr");
    
    // Rank badge class
    let rankBadgeClass = "rank-badge rank-badge-other";
    const rankNum = index + 1;
    if (rankNum === 1) rankBadgeClass = "rank-badge rank-badge-1";
    else if (rankNum === 2) rankBadgeClass = "rank-badge rank-badge-2";
    else if (rankNum === 3) rankBadgeClass = "rank-badge rank-badge-3";
    
    const initial = player.name.charAt(0).toUpperCase();
    
    tr.innerHTML = `
      <td style="text-align: center;">
        <span class="${rankBadgeClass}">${rankNum}</span>
      </td>
      <td>
        <div class="player-name-cell">
          <div class="player-avatar">${initial}</div>
          <span>${player.name}</span>
        </div>
      </td>
      <td class="points-val">${player.points}</td>
      <td class="accuracy-pct">${player.accuracy}%</td>
      <td style="text-align: center;">
        <button class="btn btn-secondary btn-view-picks" data-player-idx="${index}">View Picks</button>
      </td>
    `;
    
    // Bind click
    tr.querySelector(".btn-view-picks").addEventListener("click", () => {
      openPlayerDetailsModal(player, rankNum);
    });
    
    elements.leaderboardTbody.appendChild(tr);
  });
}

// Render Matches Grid
function renderMatchesList() {
  elements.matchesContainer.innerHTML = "";
  
  const selectedGroup = elements.filterGroup.value;
  const selectedStatus = elements.filterStatus.value;
  
  let filtered = state.matches;
  
  if (selectedGroup !== "all") {
    filtered = filtered.filter(m => m.group === selectedGroup);
  }
  
  if (selectedStatus === "finished") {
    filtered = filtered.filter(m => m.finished);
  } else if (selectedStatus === "pending") {
    filtered = filtered.filter(m => !m.finished);
  }
  
  elements.matchesCountText.textContent = `Showing ${filtered.length} matches`;
  
  if (filtered.length === 0) {
    elements.matchesContainer.innerHTML = `<div class="card loading-state" style="grid-column: 1 / -1;">No matches fit the selected filters.</div>`;
    return;
  }
  
  filtered.forEach(m => {
    const card = document.createElement("div");
    card.className = "match-card card";
    
    const isFinished = m.finished;
    const statusText = isFinished ? "Completed" : "Upcoming";
    const statusClass = isFinished ? "match-status-pill pill-finished" : "match-status-pill pill-upcoming";
    
    const homeScoreVal = isFinished ? m.homeScore : "-";
    const awayScoreVal = isFinished ? m.awayScore : "-";
    const scoreClass = isFinished ? "team-score" : "team-score score-pending";
    
    // Predictions percent calculations
    const stats = state.stats[m.id] || { homeWins: 0, awayWins: 0, draws: 0, total: 0 };
    const tot = stats.total || 1; // avoid divide by zero
    const homePct = Math.round((stats.homeWins / tot) * 100);
    const awayPct = Math.round((stats.awayWins / tot) * 100);
    const drawPct = Math.round((stats.draws / tot) * 100);
    
    card.innerHTML = `
      <div class="match-header-info">
        <span class="match-group-badge">Group ${m.group}</span>
        <span>Match #${m.id}</span>
      </div>
      
      <div class="match-teams-container">
        <div class="team-row">
          <div class="team-name-flag">
            <img src="${m.homeFlag}" alt="${m.home} Flag" class="flag-img" onerror="this.src='https://placehold.co/40x30/1e293b/ffffff?text=${m.homeCode}'">
            <span class="team-name">${m.home}</span>
          </div>
          <span class="${scoreClass}">${homeScoreVal}</span>
        </div>
        
        <div class="team-row">
          <div class="team-name-flag">
            <img src="${m.awayFlag}" alt="${m.away} Flag" class="flag-img" onerror="this.src='https://placehold.co/40x30/1e293b/ffffff?text=${m.awayCode}'">
            <span class="team-name">${m.away}</span>
          </div>
          <span class="${scoreClass}">${awayScoreVal}</span>
        </div>
      </div>
      
      <hr class="match-divider">
      
      <div class="match-footer">
        <span class="${statusClass}">${statusText}</span>
        <button class="btn-stats-toggle" data-match-id="${m.id}">
          <svg class="icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          <span>Picks Stats</span>
        </button>
      </div>
      
      <!-- Hidden stats expansion panel -->
      <div class="match-stats-section" id="stats-panel-${m.id}">
        <div class="stat-bar-label">
            <span>${m.home} Win</span>
            <span>${homePct}% (${stats.homeWins})</span>
          </div>
          <div class="stat-progress-bg">
            <div class="stat-progress-fill fill-home" style="width: ${homePct}%"></div>
          </div>
          
          <div class="stat-bar-label">
            <span>Draw</span>
            <span>${drawPct}% (${stats.draws})</span>
          </div>
          <div class="stat-progress-bg">
            <div class="stat-progress-fill fill-draw" style="width: ${drawPct}%"></div>
          </div>
          
          <div class="stat-bar-label">
            <span>${m.away} Win</span>
            <span>${awayPct}% (${stats.awayWins})</span>
          </div>
          <div class="stat-progress-bg">
            <div class="stat-progress-fill fill-away" style="width: ${awayPct}%"></div>
          </div>
        </div>
      </div>
    `;
    
    // Toggle picks stats click listener
    card.querySelector(".btn-stats-toggle").addEventListener("click", () => {
      const panel = card.querySelector(`#stats-panel-${m.id}`);
      panel.classList.toggle("expanded");
    });
    
    elements.matchesContainer.appendChild(card);
  });
}

// Render Insights & consensus
function renderInsights() {
  elements.popularPredictionsList.innerHTML = "";
  elements.consensusMatchesList.innerHTML = "";
  
  if (state.leaderboard.length === 0) {
    elements.popularPredictionsList.innerHTML = `<p class="loading-state">Add players to view aggregate statistics...</p>`;
    elements.consensusMatchesList.innerHTML = `<p class="loading-state">Submit predictions to calculate consensus...</p>`;
    return;
  }
  
  // 1. Most popular group winner picks
  // Sum up total win predictions for each team
  const winPicks = {};
  state.leaderboard.forEach(player => {
    Object.keys(player.predictions).forEach(mId => {
      const pred = player.predictions[mId];
      if (pred !== "Draw") {
        winPicks[pred] = (winPicks[pred] || 0) + 1;
      }
    });
  });
  
  const sortedPicks = Object.keys(winPicks).map(team => {
    // Find flag from database
    const match = state.matches.find(m => m.home === team || m.away === team) || {};
    const flag = (match.home === team) ? match.homeFlag : match.awayFlag;
    return {
      team: team,
      flag: flag,
      count: winPicks[team],
      pct: Math.round((winPicks[team] / (state.leaderboard.length * 3)) * 100) // normalized approx
    };
  }).sort((a, b) => b.count - a.count).slice(0, 5);
  
  sortedPicks.forEach(p => {
    const item = document.createElement("div");
    item.className = "insight-item";
    item.innerHTML = `
      <div class="insight-team-details">
        <img src="${p.flag}" alt="" class="insight-team-flag" onerror="this.style.display='none'">
        <span class="insight-team-name">${p.team}</span>
      </div>
      <div class="insight-bar-wrapper">
        <div class="insight-bar">
          <div class="insight-bar-fill" style="width: ${p.pct}%"></div>
        </div>
        <span class="insight-percentage">${p.count} picks</span>
      </div>
    `;
    elements.popularPredictionsList.appendChild(item);
  });
  
  // 2. Prediction consensus matches
  // Consensus metric: Absolute difference in percentage (consensus) or closeness to equal splits (split)
  const consensusList = [];
  state.matches.forEach(m => {
    const stats = state.stats[m.id];
    if (!stats || stats.total === 0) return;
    
    const tot = stats.total;
    const homePct = stats.homeWins / tot;
    const awayPct = stats.awayWins / tot;
    const drawPct = stats.draws / tot;
    
    // Max percentage represents the consensus choice
    const maxVal = Math.max(homePct, awayPct, drawPct);
    let predChoice = "Draw";
    if (maxVal === homePct) predChoice = m.home;
    else if (maxVal === awayPct) predChoice = m.away;
    
    consensusList.push({
      match: m,
      choice: predChoice,
      pct: Math.round(maxVal * 100),
      total: tot
    });
  });
  
  // Sort by consensus percentage descending
  const topConsensus = consensusList.sort((a, b) => b.pct - a.pct).slice(0, 4);
  
  topConsensus.forEach(c => {
    const item = document.createElement("div");
    item.className = "insight-item";
    item.innerHTML = `
      <div class="insight-team-details">
        <span class="insight-team-name">Match #${c.match.id}: ${c.match.home} vs ${c.match.away}</span>
      </div>
      <div class="insight-bar-wrapper" style="min-width: 200px;">
        <span class="insight-team-name" style="font-size: 0.8rem; color: var(--text-muted);">${c.pct}% predicted: <strong>${c.choice}</strong></span>
      </div>
    `;
    elements.consensusMatchesList.appendChild(item);
  });
}

// Open Player detailed modal
function openPlayerDetailsModal(player, rankNum) {
  elements.modalPlayerName.textContent = player.name;
  elements.modalAvatar.textContent = player.name.charAt(0).toUpperCase();
  elements.modalPlayerRank.textContent = `Rank #${rankNum}`;
  elements.modalPlayerPoints.textContent = `${player.points} Points`;
  elements.modalPlayerAccuracy.textContent = `${player.accuracy}% Accuracy`;
  
  elements.modalPredictionsContainer.innerHTML = "";
  
  state.matches.forEach(m => {
    const pChoice = player.predictions[m.id];
    const isFinished = m.finished;
    
    let matchClass = "modal-match-item pending";
    let actualResultText = "Upcoming";
    
    if (isFinished) {
      let outcome = "Draw";
      if (m.homeScore > m.awayScore) outcome = m.home;
      else if (m.awayScore > m.homeScore) outcome = m.away;
      
      const isCorrect = pChoice === outcome;
      matchClass = isCorrect ? "modal-match-item correct" : "modal-match-item incorrect";
      actualResultText = `Result: ${m.home} ${m.homeScore} - ${m.awayScore} ${m.away}`;
    }
    
    const item = document.createElement("div");
    item.className = matchClass;
    item.innerHTML = `
      <div class="modal-match-teams">
        <strong>Match #${m.id} [Group ${m.group}]:</strong> ${m.home} vs ${m.away}
        <div class="modal-actual-val">${actualResultText}</div>
      </div>
      <div class="modal-match-picks">
        <span class="modal-pick-val">${pChoice || "No prediction"}</span>
        <span class="modal-actual-val">Predicted</span>
      </div>
    `;
    
    elements.modalPredictionsContainer.appendChild(item);
  });
  
  elements.playerModal.classList.add("active");
}
