# ⚡ QUICK START - 2 Minutes to Running

## 1️⃣ Open Terminal/PowerShell

**Windows:**
- Press `Windows + R`
- Type: `powershell`
- Press Enter

**Mac/Linux:**
- Open Terminal

## 2️⃣ Navigate to Folder

```powershell
cd "c:\Users\user\Ilanot Project Dropbox\Eliezer Baumgarten\אקדמיה\digital humanities\פלטפורמות הצגה\Bustanim\Bustanim"
```

## 3️⃣ Start Server

```powershell
node server.js
```

You should see:
```
Bustanim Dashboard running at http://localhost:3000
Press Ctrl+C to stop
```

## 4️⃣ Open Browser

- Click this link: [http://localhost:3000](http://localhost:3000)
- Or manually type in address bar: `http://localhost:3000`

## ✅ Done!

Map should appear with layer controls on the left side.

---

## First Things to Try

1. **See the Map**
   - Zoom in/out with mouse wheel
   - Drag to pan
   - Dark area = data not yet loaded OR layer disabled

2. **Show/Hide Data**
   - Left side → "שכבות ומפה" section
   - Check/uncheck boxes to toggle layers
   - Click "הצג הכל" to enable all

3. **Click an Object**
   - Find a colored point or area on map
   - Click it → popup appears with details
   - Click X to close

4. **Change Background**
   - Top of float panel → dropdown
   - Select different map (OSM, Satellite, etc.)

5. **Compare Objects**
   - Tab "השוואה" (Compare)
   - Pick 2 objects
   - Click "השווה" button
   - See side-by-side comparison

---

## ⚠️ Problems?

### Server won't start?
```
Error: Address already in use
→ Port 3000 in use, try different port
```

### Blank map?
1. Refresh browser (F5)
2. Try different base map
3. Click "הצג הכל" button
4. Check console (F12) for errors

### API data won't load?
- Check internet connection
- Try refreshing
- Might be service temporarily unavailable

---

## 🛑 To Stop

In terminal: Press `Ctrl + C`

---

## 📖 More Info

- Overview: `README.md`
- Full Guide: `USAGE_GUIDE.md`  
- Deployment: `DEPLOYMENT_GUIDE.md`

---

**Enjoy exploring ancient orchards!** 🌳
