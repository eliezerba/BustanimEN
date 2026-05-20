# Bustanim Ancient Orchards Research Dashboard

## Overview
Interactive GIS-based research dashboard for exploring and analyzing ancient orchards (בוסתנים) in Israel. Data is loaded from ArcGIS REST API endpoints organized into 6 separate layers with hierarchical object type management.

## Features
- **Multi-Layer Data Display**: 6 GIS layers with independent visibility controls
  - Fruit Trees (עצי פרי)
  - Carob Trees (עצי סרק)
  - Orchard Boundaries (תיחום בוסתן)
  - Vegetation (צמחיה)
  - Agricultural Tools (כלים חקלאיים)
  - Terraces (טרסות)

- **Interactive Controls**
  - Layer on/off toggles
  - Object type filtering within each layer
  - Search and filter functionality
  - Click objects for detailed information

- **Visualization & Analytics**
  - Overview KPIs and statistics
  - Layer distribution charts
  - Comparative analysis tools
  - Object property viewing

- **Background Maps**
  - Modern OpenStreetMap
  - Satellite imagery (Esri)
  - Palestine Open Maps (multiple historic variants)
  - Map overlays and combinations

- **Data Export**
  - CSV export of visible objects
  - Coordinate transformation (EPSG:3857 ↔ WGS84)

- **Multi-Language Support**
  - Hebrew (עברית)
  - English

## Installation

### Local Development
```bash
# Install dependencies
npm install

# Run development server
node server.js

# Open browser
http://localhost:3000
```

### File Structure
```
Bustanim/
├── index.html              # Main HTML template
├── app.js                  # Core application logic
├── style.css              # Styling
├── server.js              # Local development server
└── README.md              # This file
```

## API Endpoints
All data is fetched from ArcGIS Feature Server:
```
Base: https://services5.arcgis.com/eJYUV73IZAY87Jwy/arcgis/rest/services/בוסתנים_2_תצוגה/FeatureServer

Layers:
- /0/query  → Orchard Boundaries
- /1/query  → Fruit Trees
- /2/query  → Carob Trees
- /3/query  → Vegetation
- /4/query  → Agricultural Tools
- /5/query  → Terraces
```

Query parameters: `where=1=1&outFields=*&returnGeometry=true&f=geojson`

## Usage

### Layer Control (Float Panel)
1. **Basemap Selection**: Choose from OSM modern, satellite, or historic maps
2. **Layer Visibility**: Check/uncheck layers to show/hide data
3. **Object Type Filtering**: Within each layer, toggle specific object types
4. **Search**: Find objects by ID or name
5. **Display Options**: 
   - "Show All" - Enable all layers
   - "Zoom to Fit" - Auto-fit map bounds
   - "Clear Selection" - Deselect current object

### Object Details
- Click any map object (point, line, or polygon) to view detailed properties
- Properties display in a modal popup
- Navigate through all object properties

### Comparison Analysis
- **Tab: Compare**
- Select two units to compare (by object type or layer)
- View side-by-side statistics and charts

### Tabs
- **Overview**: Quick KPIs and summary statistics
- **Layers**: Hierarchical object listing by layer and type
- **Analytics**: Distribution charts and statistical analysis
- **Compare**: Comparative analysis between objects or layers

## Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Known Limitations
- Large datasets (>10k objects per layer) may cause performance issues
- Mobile experience optimized for tablet size screens and up
- Popup images not currently supported (future version)

## Future Enhancements
- Polygon-level comparison functionality
- Integration with OpenPalestine villages data
- Advanced filtering and SQL-like queries
- Time-series analysis for temporal data
- Custom layer styling and symbology
- GeoJSON export with feature styling

## Troubleshooting

### Data not loading
1. Check internet connection
2. Verify ArcGIS service is accessible
3. Check browser console for network errors
4. Try refreshing the page

### Map not displaying
1. Ensure WebGL is enabled in browser
2. Check for JavaScript errors in console
3. Try different base layer

### Performance issues
1. Hide unnecessary layers to reduce rendered objects
2. Clear browser cache and reload
3. Use simplified zoom levels

## Contact & Support
For questions about this dashboard or the data, contact the research team.

## License
This research dashboard is part of academic research on ancient agriculture in Israel.

---
Last Updated: 2026
Version: 1.0
