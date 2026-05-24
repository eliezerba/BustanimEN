# Deployment Guide

## Project Summary
Bustanim is an English-language research dashboard for spatial exploration of:
- Historical Orchard records
- Orchard Fruit Trees
- Non-Orchard Trees
- Agricultural Installations
- Terraces
- Modern Israeli administrative districts

## Interface Policy
The user-facing interface is English-only.
Hebrew may still appear in raw source-data fields, but labels shown in the dashboard are English.

## Run Locally
```bash
node server.js
```
Open: http://localhost:3000

## Data and Layers
Data is fetched from ArcGIS FeatureServer endpoints.
Layer IDs and source services are preserved.
Display grouping is applied in the UI without modifying source data.

## Documentation Map
- README.md: technical and product overview
- QUICK_START.md: quick local run instructions
- USAGE_GUIDE.md: user workflow guide

## Verification Checklist
- Site loads successfully
- Core layers render
- No console errors
- English labels shown in visible UI

## Notes
This guide documents the current English-only project direction.
