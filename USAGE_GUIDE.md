# 🌳 תוספת יישום בוסתנים - Bustanim Application - Setup & Usage Guide

## תיאור חדש / New Description

זה יישום חדש וממלא-מקום **לחלוטין עצמאי** משל Shikmim. כל שינוי, כל עדכון - הוא רק בתיקיית Bustanim.

This is a **completely independent** application separate from Shikmim. All changes and updates are only in the Bustanim folder.

---

## הבדלים ממיוחדים מציון Shikmim / Key Differences from Shikmim

| Feature | Shikmim | Bustanim |
|---------|---------|----------|
| **מקור הנתונים** | Google Sheets (CSV צפיות) | ArcGIS REST API (6 שכבות |
| **Data Source** | Google Sheets | ArcGIS REST API |
| **מספר שכבות** | 3 (עצים, שדרות, פוליגונים) | 6 שכבות נפרדות |
| **Number of Layers** | 3 | 6 separate layers |
| **חלוקה היררכית** | 1 סוג אובייקט לשכבה | מרובה סוגים לשכבה |
| **Hierarchy** | 1 object type per layer | Multiple types per layer |
| **השוואה** | בין פוליגונים + קבוצות | בין אובייקטים + שכבות + סוגים |
| **Comparison** | Between polygons only | Between objects/layers/types |
| **פוליגונים** | מ-Google Sheets | מ-ArcGIS iplan.gov.il |
| **Polygons** | From Sheet | From iplan.gov.il |
| **עדכון נתונים** | ישיר מ-Sheets | ממנה שירות ArcGIS |
| **Data Update** | From Sheets | From ArcGIS Service |

---

## 📦 Installation and Setup

### דרישות מוקדמות / Requirements
- Node.js 12+
- Web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for API access)

### התקנה מהירה / Quick Start

#### Option 1: Direct Browser (Online)
```
פתחו את קובץ index.html ישירות בדפדפן
Simply open index.html in a web browser
```

⚠️ Note: Due to CORS restrictions, some API endpoints may require local server.

#### Option 2: Local Server (Recommended)

**Windows / PowerShell:**
```powershell
cd "c:\Users\user\Ilanot Project Dropbox\Eliezer Baumgarten\אקדמיה\digital humanities\פלטפורמות הצגה\Bustanim\Bustanim"
node server.js
```

Then open: http://localhost:3000

**Mac/Linux:**
```bash
cd /path/to/Bustanim
node server.js
```

Then open: http://localhost:3000

---

## 🎯 Feature Overview

### 1. שכבות נתונים / Data Layers

ישנן **6 שכבות** שונות, כל אחת מהן ניתן לפעול בחיבור עצמאי:

| # | Layer Name | שם העברית | Type of Objects | סוג אובייקטים |
|---|-----------|-----------|-----------------|---------|
| 0 | Orchard Boundaries | תיחום בוסתן | Polygon | מצולע |
| 1 | Fruit Trees | עצי פרי | Point | נקודה |
| 2 | Carob Trees | עצי סרק | Point | נקודה |
| 3 | Vegetation | צמחיה | Polygon/Line | פוליגון/קו |
| 4 | Agricultural Tools | כלים חקלאיים | Point | נקודה |
| 5 | Terraces | טרסות | Line/Polygon | קו/פוליגון |

### 2. Layer Control (Float Panel)

**אדום ✗ לא נראה** / **ירוק ✓ נראה**

#### 2.1 Choose Base Map (למעלה)
- **OSM Modern** - OpenStreetMap טרי
- **Satellite** - תצילום לוויין (Esri)
- **Palestine Open Maps** - מפות היסטוריות (שנות 1880-1950)
- **Combinations** - שילובים שלa OSM + היסטוריות

#### 2.2 Toggle Layers & Object Types
```
☑ Layer Name (shows object count)
  ☑ Object Type 1
  ☑ Object Type 2
```

- הנקר את השכבה כדי להסתיר/להציג את כל האובייקטים בה
- Check/uncheck to show/hide all objects in that layer
- סמן את ה-"checkbox" של סוג מסוים כדי לסנן לפי סוג
- Check individual object types to filter

#### 2.3 Quick Actions
- **הצג הכל** (Show All) - הפוך את כל השכבות ל-ON
- **זום לנתונים** (Zoom to Fit) - התאם את המפה לכל הנתונים
- **חפש אובייקט** - חיפוש אובייקט ספציפי
- **נקה בחירה** (Clear Selection) - הסר את הבחירה הנוכחית
- **ייצוא CSV** - ייצא את כל הנתונים לקובץ CSV

---

## 🗺️ Tabs Overview

### Overview / סקירה
- **KPIs**: Quick statistics
  - Total Objects (אובייקטים כוללים)
  - Number of Layers (מספר שכבות)
  - Number of Object Types (סוגי אובייקטים)
- **Charts**: Layer distribution, object type distribution

### Layers / שכבות
- Hierarchical list of all objects
- Organized by: Layer → Object Type → Individual Object
- Click any object to see details in popup

### Analytics / הדמיות
- Statistical visualizations
- Distribution charts
- Scatter plots and correlation analysis

### Compare / השוואה
**three ways to compare:**

#### Method 1: Object Type Comparison
- בחר 2 סוגים של אובייקטים
- השוואת תכונותיהם

#### Method 2: Layer Comparison
- בחר 2 שכבות
- השוואת נתוני הרבדים

#### Method 3: Individual Object Comparison
- בחר 2 אובייקטים ספציפיים
- השוואת מאפייניהם המלאים

---

## 🔍 How to Use - Step by Step

### Working with Layers

#### Hide/Show Specific Layer
1. **Float Panel** צד שמאל-עליון של המפה
2. בחלק "תיחום בוסתן / Boundaries", סמן/לא סימן את ה-checkbox
3. המפה תתעדכן מיידית

#### Filter by Object Type
1. לחץ על **Show All** כדי לתאל את כל השכבות
2. View a Layer (e.g., "Fruit Trees")
3. Uncheck (סמן) specific types within that layer
4. Map updates to show only selected types

#### Search for Object
1. Type in **"חפש אובייקט"** box
2. Results appear below
3. Click result to zoom to that object

---

### Viewing Object Details

#### Click on Map Object (Simplest Method)
1. סובב על המפה וגלול כדי למזום על תחום מסוים
2. **לחץ על אובייקט ספציפי** (עץ, פוליגון, קו וכו')
3. **Popup ייפתח** עם כל הפרטים

#### View All Properties
- In the popup, scroll to see all properties
- Each property shows: **Key | Value**
- Close with **X** button or click elsewhere

---

### Comparing Objects

#### Two Different Object Types
1. Go to **Compare** tab
2. **Side A**: Select object type (e.g., Fruit Trees)
3. **Side B**: Select object type (e.g., Carob Trees)
4. Click **"השווה"** button
5. View side-by-side comparison

#### Two Different Layers
1. **Tab Compare**
2. **Side A Type**: Select "Layer"
3. Choose Layer A
4. Repeat for Side B
5. Click Compare

#### Individual Objects
1. **Tab Compare**
2. **Side A Type**: Select "Object Type"
3. **Side A Select**: Choose specific object #1
4. Repeat for Side B
5. Click Compare

---

## 📊 Understanding the Data

### Object Properties (Example)

When you click an object, you'll see:

**Fruit Tree:**
```
OBJECTID:        123
Type:            פרי
Girth (היקף):    45cm
Height (גובה):    12m
Canopy:          8m diameter
Polygon:         A-1
```

**Carob Tree:**
```
OBJECTID:        456
Type:            סרק
Girth (היקף):    65cm
Height (גובה):    15m
```

**Terrace:**
```
OBJECTID:        789
Type:            טרסה
Length:          150m
Width:           20m
Orientation:     N-S
```

---

## 🎨 Map Symbols & Colors

| Layer | Color | Symbol | Shape |
|-------|-------|--------|-------|
| Fruit Trees | 🟢 Green | Circle | Point |
| Carob Trees | 🟤 Brown | Circle | Point |
| Boundaries | 🔵 Blue | Line/Fill | Polygon |
| Vegetation | 🟩 Lime | Area | Polygon |
| Ag Tools | 🟠 Orange | Circle | Point |
| Terraces | 🟣 Purple | Line | Line/Polygon |

---

## 🌍 Background Maps

### Modern Maps
- **OSM (OpenStreetMap)** - Current street map
- **Satellite (Esri)** - Aerial photography

### Historical Maps (POM - Palestine Open Maps)
Available historic variants:
- **1:20k (1940s)** - High detail interwar period
- **1:100k (1950s)** - Larger scale postwar
- **1:250k (1946)** - Regional scale
- **1:63k PEF (1880)** - Victorian survey mapping

### Why Use Historical Maps?
- Compare modern orchards to historical locations
- Understand changes in cultivation
- Verify ancient site identification

---

## 💾 Exporting Data

### Export to CSV
1. Float Panel → **"ייצוא CSV"** button
2. File downloads as `bustanim-data.csv`
3. Open in Excel, Google Sheets, or any spreadsheet app

### CSV Contains:
- Layer name
- Object type
- OBJECTID
- All properties as JSON

---

## 🐛 Troubleshooting

### Problem: Data Won't Load
**Solution:**
- Check internet connection
- Some APIs may be blocked/down
- Try refreshing page (Ctrl+R)
- Check browser console (F12) for errors

### Problem: Map Won't Display
**Solution:**
- Try different base map
- Clear browser cache
- Disable browser extensions
- Try different browser

### Problem: Popup Appears but Empty
**Solution:**
- Refresh page
- Try different object
- Check console for JavaScript errors

### Getting "CORS Error"?
**Solution:**
- Use the local Node.js server instead of opening file directly
- Run: `node server.js`

---

## 📚 API Information

### Data Source
All data comes from ArcGIS Feature Server:
```
https://services5.arcgis.com/eJYUV73IZAY87Jwy/arcgis/rest/services/בוסתנים_2_תצוגה/FeatureServer
```

### API Endpoints
Each layer has a query endpoint:
```
/{layerId}/query?where=1=1&outFields=*&returnGeometry=true&f=geojson
```

Layer IDs:
- 0 = Boundaries
- 1 = Fruit Trees
- 2 = Carob Trees
- 3 = Vegetation
- 4 = Ag Tools
- 5 = Terraces

---

## 🔐 Technical Details

### File Structure
```
Bustanim/
├── index.html          Main HTML template
├── app.js             Core JavaScript (API loading, map control)
├── style.css          Global styling
├── server.js          Node.js local server
├── package.json       npm package info
└── README.md          Full documentation
```

### Browser Compatibility
✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+

### Technologies Used
- **Leaflet.js** - Interactive mapping
- **Plotly.js** - Data visualization/charts
- **Fetch API** - ArcGIS data loading
- **HTML5/CSS3** - Responsive UI
- **Vanilla JavaScript** - No frameworks

---

## 🚀 Advanced Usage

### URL Parameters (Future)
Coming soon: Shareable links with preset filters

### Custom Queries
Coming soon: SQL-like filtering interface

### Time-Series Analysis
Coming soon: Temporal data comparisons

---

## 📞 Support & Resources

### If Something Doesn't Work:
1. Check console (F12 → Console tab)
2. Note the error message
3. Try refreshing
4. Check README.md
5. Report to research team

### Useful Keyboard Shortcuts:
- **F12** - Open Developer Console
- **Ctrl+Z** - Browser back
- **Ctrl+R** - Refresh page
- **Escape** - Close popup

---

## ✅ Checklist for First Use

- [ ] Extract Bustanim folder
- [ ] Run `node server.js` in Bustanim directory
- [ ] Open http://localhost:3000 inother browser
- [ ] See map load with basemap
- [ ] See layer toggles in Float Panel
- [ ] Click "Show All" to enable layers
- [ ] Zoom in on area with objects
- [ ] Click an object to see popup
- [ ] Switch between tabs
- [ ] Try exporting CSV
- [ ] Test comparison feature
- [ ] Try different basemaps

---

**Happy Researching! 🌍🌳**

*Bustanim Dashboard v1.0*
*Last Updated: April 2026*
