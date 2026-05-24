# Bustanim Research Dashboard

An English-language research dashboard for exploring Historical Orchard records, Orchard Fruit Trees, Non-Orchard Trees, Agricultural Installations, Terraces, and related spatial patterns in the Land of Israel.

## English-Only Interface
The dashboard interface is English-only.
Some raw source data values may originate in Hebrew, but visible labels are translated into English.

## Current Display Terminology
- Historical Orchard records
- Orchard Fruit Trees
- Non-Orchard Trees
- Agricultural Installations
  - Wine Press
  - Olive Press
  - Storage
  - Terraces
  - Other Cultural Landscape Features
- Modern Israeli administrative districts
- Optional source layers (for source-data review)

## Data Sources
The dashboard loads data from ArcGIS FeatureServer services.
Source layers remain intact and are grouped at display level.

## Layer Mapping (Display-Level)
- Orchard Fruit Trees: primary orchard tree records
- Non-Orchard Trees: vegetation records and display-reassigned prickly pear
- Agricultural Installations: agricultural installations plus terraces
- Optional source layers: additional source records not shown by default

## Local Run
```bash
npm install
node server.js
```
Open: http://localhost:3000

## Main Files
- index.html
- app_v2.js
- style.css
- server.js

## Notes
- The dashboard behavior is configured for English display.
- Raw dataset fields may still include Hebrew source values for compatibility.
