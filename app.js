/* ============================================================
   Bustanim Research Dashboard  –  app.js  (v2)
   Loads 6 ArcGIS FeatureServer layers, renders Leaflet map,
   Plotly charts and comparison tools.
   ============================================================ */
"use strict";

/* ── Language ─────────────────────────────────────────────── */
let LANG = 'en';
const LOCALE = LANG==='he' ? 'he-IL' : 'en-US';
const TR = {
  he:{
    loading:'טוען נתונים...',
    ready:'מוכן',
    layers_map:'שכבות ומפה',
    english:'English',
    hebrew:'עברית',
    fruit_trees:'עצי פרי',
    carob_trees:'עצי סרק',
    boundaries:'בוסתנים (תיחום)',
    vegetation:'צמחיה',
    ag_tools:'כלים חקלאיים',
    terraces:'טרסות',
    nafot:'נפות',
    nafot_districts:'נפות (מחוזות)',
    district_analysis:'ניתוח לפי נפה',
    show_all:'הצג הכל',
    zoom_fit:'זום לנתונים',
    clear_sel:'נקה בחירה',
    export_csv:'ייצוא CSV',
    search:'חפש שם / סוג...',
    overview:'סקירה',
    bustans:'בוסתנים',
    districts:'נפות',
    objects:'אובייקטים',
    analytics:'הדמיות',
    advanced:'מתקדם',
    compare:'השוואה',
    side_a:'צד א\'',
    side_b:'צד ב\'',
    tree_type:'סוג עץ',
    layer:'שכבה',
    bustan:'בוסתן',
    compare_btn:'השווה',
    height:'גובה (ס"מ)',
    girth:'היקף גזע (ס"מ)',
    status:'מצב',
    description:'תיאור',
    name:'שם',
    created:'נוצר',
    count:'כמות',
    title:'דשבורד מחקרי — בוסתנים קדומים בארץ ישראל',
    coords:'WGS84 Coordinates',
    tab_species:'מינים',
    districts_intro:'ניתוח אובייקטים לפי נפות ישראל — לחצו על שורה למיקוד. הנפות מוצגות גם על המפה בצבע תכלת.',
    grp_all:'הכל',
    click_species_detail:'לחצו על שם מין לניתוח מפורט',
    all_groups:'כל הקבוצות',
    species_compare_toggle_open:'השוואת מינים ▾',
    species_compare_toggle_close:'הסתר השוואת מינים ▴',
    species_compare:'השוואת מינים',
    species_a:'מין א׳',
    species_b:'מין ב׳',
    filter_group:'תחום',
    filter_species_ac:'מין ספציפי (השלמה אוטומטית)',
    filter_districts:'נפות (Ctrl להרבה)',
    all_domains:'כל התחומים',
    apply:'הצג',
    reset:'אפס',
    advanced_intro:'ניתוח מתקדם: CDF, Lorenz, מתאמים, חלוקה מרחבית',
    compare_intro:'בחרו שתי יחידות להשוואה: סוג עץ, שכבה, נפה',
    side_type_a:'צד א׳ – סוג',
    side_type_b:'צד ב׳ – סוג',
    tree_type_opt:'סוג עץ',
    layer_opt:'שכבה',
    district_opt:'נפה',
    spaces_optional:'מרחבים (אופציונלי)',
    no_data_compare:'אין נתונים להשוואה',
    objects:'אובייקטים',
    metric:'מדד',
    object_count:'כמות אובייקטים',
    mean_h:'ממוצע גובה (ס"מ)',
    median_h:'חציון גובה (ס"מ)',
    std_h:'סטיית תקן גובה',
    min_h:'מינ׳ גובה',
    max_h:'מקס׳ גובה',
    mean_g:'ממוצע היקף (ס"מ)',
    median_g:'חציון היקף (ס"מ)',
    std_g:'סטיית תקן היקף',
    avg_compare:'השוואת ממוצעים',
    radar_norm:'רדאר (ערכים מנורמלים)',
    height_box:'התפלגות גובה – box',
    height_hist:'היסטוגרמת גובה',
    height_vs_girth:'גובה vs. היקף',
    choose_two_species:'בחרו שני מינים שונים',
    dominant_status:'מצב שכיח',
    species_group:'קבוצה',
    species_metrics_compare:'השוואת מדדים',
    avg_height_fruit:'ממוצע גובה (עצי פרי)',
    avg_girth_fruit:'ממוצע היקף (עצי פרי)',
    fruit_type_count:'סוגי עצי פרי',
    draw_polygon_name:'הקלד שם לפוליגון החדש:',
    draw_polygon_invalid:'שם לא תקין. הפוליגון לא נשמר.',
    draw_polygon_exists:'כבר קיימת נפה בשם זה. בחר שם אחר.',
    draw_polygon_saved:'הפוליגון נשמר כנפה חדשה.',
    draw_polygon_deleted:'הפוליגון המצויר נמחק.',
    draw_polygon_load_failed:'טעינת פוליגונים שמורים נכשלה.',
    draw_polygon_saved_storage:'פוליגונים מותאמים נשמרו מקומית.',
    draw_polygon_label_custom:'נפה מותאמת',
    districts_add_hint:'הוספת פוליגון:',
    districts_add_link:'לחצו כאן לציור אזור חדש',
    districts_export_json:'שמור JSON',
    districts_import_json:'טען JSON',
    draw_polygon_export_done:'קובץ JSON נשמר.',
    draw_polygon_import_done:'קובץ JSON נטען בהצלחה.',
    draw_polygon_import_bad:'קובץ JSON לא תקין.',
    bustans_intro:'רשימת בוסתנים — לחצו על בוסתן לצפייה בפירוט ובמפה',
    bustan_search:'חפש בוסתן...',
  },
  en:{
    loading:'Loading data...',
    ready:'Ready',
    layers_map:'Layers & Map',
    english:'English',
    hebrew:'Hebrew',
    fruit_trees:'Fruit Trees',
    carob_trees:'Non-Fruit Trees',
    boundaries:'Orchards (Boundary)',
    vegetation:'Vegetation',
    ag_tools:'Agricultural Tools',
    terraces:'Terraces',
    nafot:'Districts',
    nafot_districts:'Districts (Nafot)',
    district_analysis:'Analysis by District',
    show_all:'Show All',
    zoom_fit:'Zoom to Fit',
    clear_sel:'Clear Selection',
    export_csv:'Export CSV',
    search:'Search name / type...',
    overview:'Overview',
    bustans:'Bustans',
    districts:'Districts',
    objects:'Objects',
    analytics:'Analytics',
    advanced:'Advanced',
    compare:'Compare',
    side_a:'Side A',
    side_b:'Side B',
    tree_type:'Tree Type',
    layer:'Layer',
    bustan:'Bustan',
    compare_btn:'Compare',
    height:'Height (cm)',
    girth:'Trunk Girth (cm)',
    status:'Status',
    description:'Description',
    name:'Name',
    created:'Created',
    count:'Count',
    title:'Research Dashboard — Ancient Orchards in the Land of Israel',
    coords:'WGS84 Coordinates',
    tab_species:'Species',
    districts_intro:'Object analysis by Israeli districts — click a row to focus. Districts are also shown on the map in cyan.',
    grp_all:'All',
    click_species_detail:'Click a species name for detailed analysis',
    all_groups:'All groups',
    species_compare_toggle_open:'Species Comparison ▾',
    species_compare_toggle_close:'Hide Species Comparison ▴',
    species_compare:'Species Comparison',
    species_a:'Species A',
    species_b:'Species B',
    filter_group:'Group',
    filter_species_ac:'Specific Species (Autocomplete)',
    filter_districts:'Districts (Ctrl for multi-select)',
    all_domains:'All groups',
    apply:'Apply',
    reset:'Reset',
    advanced_intro:'Advanced analysis: CDF, Lorenz, correlations, spatial distribution',
    compare_intro:'Choose two units to compare: tree type, layer, district',
    side_type_a:'Side A – Type',
    side_type_b:'Side B – Type',
    tree_type_opt:'Tree Type',
    layer_opt:'Layer',
    district_opt:'District',
    spaces_optional:'Spaces (optional)',
    no_data_compare:'No data to compare',
    objects:'Objects',
    metric:'Metric',
    object_count:'Object Count',
    mean_h:'Mean Height (cm)',
    median_h:'Median Height (cm)',
    std_h:'Height Std Dev',
    min_h:'Min Height',
    max_h:'Max Height',
    mean_g:'Mean Girth (cm)',
    median_g:'Median Girth (cm)',
    std_g:'Girth Std Dev',
    avg_compare:'Average Comparison',
    radar_norm:'Radar (Normalized Values)',
    height_box:'Height Distribution – Box',
    height_hist:'Height Histogram',
    height_vs_girth:'Height vs. Girth',
    choose_two_species:'Choose two different species',
    dominant_status:'Dominant Status',
    species_group:'Group',
    species_metrics_compare:'Metrics Comparison',
    avg_height_fruit:'Average Height (Fruit Trees)',
    avg_girth_fruit:'Average Girth (Fruit Trees)',
    fruit_type_count:'Fruit Tree Types',
    draw_polygon_name:'Enter a name for the new polygon:',
    draw_polygon_invalid:'Invalid name. Polygon was not saved.',
    draw_polygon_exists:'A district with this name already exists. Choose another name.',
    draw_polygon_saved:'Polygon saved as a new district.',
    draw_polygon_deleted:'Drawn polygon deleted.',
    draw_polygon_load_failed:'Failed to load saved polygons.',
    draw_polygon_saved_storage:'Custom polygons were saved locally.',
    draw_polygon_label_custom:'Custom district',
    districts_add_hint:'Add polygon:',
    districts_add_link:'Click here to draw a new area',
    districts_export_json:'Save JSON',
    districts_import_json:'Load JSON',
    draw_polygon_export_done:'JSON file was saved.',
    draw_polygon_import_done:'JSON file was loaded successfully.',
    draw_polygon_import_bad:'Invalid JSON file.',
    bustans_intro:'List of Bustans — click a bustan to view details on map',
    bustan_search:'Search bustan...',
  }
};
function t(k){ return TR[LANG][k] || k; }
function lh(he,en){ return LANG==='he' ? he : en; }

/* ── API Config ─────────────────────────────────────────── */
const API_BASE = 'https://services5.arcgis.com/eJYUV73IZAY87Jwy/arcgis/rest/services/%D7%91%D7%95%D7%A1%D7%AA%D7%A0%D7%99%D7%9D_2_%D7%AA%D7%A6%D7%95%D7%92%D7%94/FeatureServer';

const LAYER_META = {
  boundaries: { id:0, name_he:'בוסתנים (תיחום)', name_en:'Orchards',          color:'#2563eb', geom:'polygon', typeField:'Name',   hidden:true },
  fruit:      { id:1, name_he:'עצי פרי',          name_en:'Fruit Trees',       color:'#16a34a', geom:'point',   typeField:'tree_type' },
  carob:      { id:2, name_he:'עצי סרק',           name_en:'Non-Fruit Trees',   color:'#8b6f47', geom:'point',   typeField:'Tree_type' },
  vegetation: { id:3, name_he:'צמחיה',             name_en:'Vegetation',        color:'#65a30d', geom:'point',   typeField:'tree_type' },
  agtools:    { id:4, name_he:'כלים חקלאיים',      name_en:'Agr. Tools',        color:'#ea580c', geom:'point',   typeField:'Stationary_agricultural_facilit' },
  terraces:   { id:5, name_he:'טרסות',             name_en:'Terraces',          color:'#7c3aed', geom:'line',    typeField:null },
};
/* Visible layer keys – excludes layers with hidden:true */
const LAYER_KEYS = Object.keys(LAYER_META).filter(lk=>!LAYER_META[lk].hidden);
const ALL_LAYER_KEYS = Object.keys(LAYER_META);  // includes hidden

/* POM tile URLs – verified from Palestine Open Maps */
const TILE_URLS = {
  osm:         'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  sat:         'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  pal20k:      'https://palopenmaps.org/tiles/pal20k-1940s/{z}/{x}/{y}.jpg',
  'pal-1940s': 'https://palopenmaps.org/tiles/pal-1940s/{z}/{x}/{y}.jpg',
  pal100k:     'https://palopenmaps.org/tiles/pal100k-1950s/{z}/{x}/{y}.jpg',
  pal250k:     'https://palopenmaps.org/tiles/pal250k-1946/{z}/{x}/{y}.jpg',
  pal63k:      'https://palopenmaps.org/tiles/pal63k-1880/{z}/{x}/{y}@2x.jpg',
  isr250k:     'https://palopenmaps.org/tiles/isr250k-1951/{z}/{x}/{y}@2x.jpg',
};

const TYPE_COLORS = [
  '#16a34a','#dc2626','#2563eb','#d97706','#7c3aed',
  '#0891b2','#be185d','#065f46','#92400e','#1d4ed8',
  '#6d28d9','#b45309','#047857','#9f1239','#1e3a8a',
  '#701a75','#7f1d1d','#064e3b','#1e3a8a','#78350f',
];

/* ── State ──────────────────────────────────────────────── */
let map;
let mapLayers  = {};   // { layerKey: L.GeoJSON }
let allFeats   = {};   // { layerKey: Feature[] }
let bustanFeats= [];
let nafotFeats = [];   // all district polygons (official + custom)
let officialNafotFeats = [];
let customNafotFeats = [];
let nafotLayer = null; // Leaflet layer for districts
let nafotDrawGroup = null;
let nafotDrawControl = null;
let layerVis   = {};
let typeVis    = {};
let selectedFeat = null;
const CUSTOM_NAFOT_STORAGE_KEY='bustanim_custom_nafot_v1';
let mapProjection = {
  active:false,
  keysByLayer:{},
  colorByKey:{},
  label:'',
};

/* ── Statistics helpers ─────────────────────────────────── */
const fmt  = v => (v==null||isNaN(v)) ? '–' : (+v).toLocaleString(LOCALE,{maximumFractionDigits:1});
const fmtI = v => (v==null||isNaN(v)) ? '–' : Math.round(+v).toLocaleString(LOCALE);
const STATUS_I18N = {
  'טוב': { he:'טוב', en:'Good' },
  'כשיר': { he:'כשיר', en:'Viable' },
  'חולה': { he:'חולה', en:'Diseased' },
  'מת': { he:'מת', en:'Dead' },
  'לא ידוע': { he:'לא ידוע', en:'Unknown' },
};
const STATUS_CANON = Object.keys(STATUS_I18N);
function statusKey(v){
  const val=(v==null||v==='')?'לא ידוע':String(v).trim();
  if(STATUS_I18N[val]) return val;
  const found=STATUS_CANON.find(k=>STATUS_I18N[k].en.toLowerCase()===val.toLowerCase());
  return found || 'לא ידוע';
}
function statusLabel(v){
  const k=statusKey(v);
  return STATUS_I18N[k] ? STATUS_I18N[k][LANG] : String(v);
}
function mean(arr){const a=arr.filter(x=>x!=null&&!isNaN(x));return a.length?a.reduce((s,x)=>s+x,0)/a.length:null;}
function median(arr){
  const a=arr.filter(x=>x!=null&&!isNaN(x)).map(Number).sort((a,b)=>a-b);
  if(!a.length)return null; const m=Math.floor(a.length/2);
  return a.length%2?a[m]:(a[m-1]+a[m])/2;
}
function stddev(arr){
  const a=arr.filter(x=>x!=null&&!isNaN(x)).map(Number);
  if(a.length<2)return 0; const m=mean(a);
  return Math.sqrt(a.reduce((s,x)=>s+(x-m)**2,0)/a.length);
}
function arrMin(arr){const a=arr.filter(x=>x!=null&&!isNaN(x));return a.length?Math.min(...a):null;}
function arrMax(arr){const a=arr.filter(x=>x!=null&&!isNaN(x));return a.length?Math.max(...a):null;}
function dateStr(ms){if(!ms)return '–';return new Date(ms).toLocaleDateString(LOCALE);}
function fieldArr(lk,field){return(allFeats[lk]||[]).map(f=>f.properties[field]).filter(v=>v!=null&&!isNaN(v)).map(Number);}

/* Feature display name */
function featLabel(feat,lk){
  const p=feat.properties; const meta=LAYER_META[lk];
  if(!meta)return'#'+p.OBJECTID;
  const tf=meta.typeField; return(tf&&p[tf])||(LANG==='he'?meta.name_he:meta.name_en);
}

/* Type distribution for a layer */
function typeDist(lk){
  const tf=LAYER_META[lk].typeField; if(!tf)return{};
  const counts={};
  (allFeats[lk]||[]).forEach(f=>{const v=(f.properties[tf]||lh('ללא שם','Unnamed'));counts[v]=(counts[v]||0)+1;});
  return counts;
}

/* Visible features */
function visibleFeats(lk){
  const tf=LAYER_META[lk].typeField;
  return(allFeats[lk]||[]).filter(f=>{
    if(!layerVis[lk])return false;
    if(tf){const v=f.properties[tf]||lh('ללא שם','Unnamed');if(typeVis[lk]&&typeVis[lk][v]===false)return false;}
    return true;
  });
}

/* Per-layer type colour cache */
const _tcCache={};
function getTypeColor(lk,val){
  if(!_tcCache[lk]){
    const dist=typeDist(lk); const cm={};
    Object.keys(dist).forEach((tv,i)=>{cm[tv]=TYPE_COLORS[i%TYPE_COLORS.length];});
    _tcCache[lk]=cm;
  }
  return _tcCache[lk][val]||LAYER_META[lk].color;
}

function featKey(lk,feat){
  const oid=feat?.properties?.OBJECTID;
  if(oid!=null)return `${lk}::${oid}`;
  return `${lk}::${JSON.stringify(feat?.geometry?.coordinates||'')}`;
}

function setMapProjectionStatus(msg=''){
  const el=document.getElementById('updateStatus');
  if(el)el.textContent=msg;
}

function clearMapProjection(skipRender=false){
  mapProjection={active:false,keysByLayer:{},colorByKey:{},label:''};
  setMapProjectionStatus('');
  if(!skipRender)renderAllLayers();
}

function applyMapProjectionGroups(groups,label=''){
  const keysByLayer={};
  const colorByKey={};
  let total=0;
  (groups||[]).forEach(g=>{
    const groupColor=g?.color||'';
    if(Array.isArray(g?.items)){
      g.items.forEach(({lk,feat})=>{
        if(!lk||!feat)return;
        const k=featKey(lk,feat);
        if(!keysByLayer[lk])keysByLayer[lk]=new Set();
        keysByLayer[lk].add(k);
        if(groupColor)colorByKey[k]=groupColor;
        total++;
      });
      return;
    }
    if(!g?.lk||!Array.isArray(g?.feats))return;
    g.feats.forEach(feat=>{
      const k=featKey(g.lk,feat);
      if(!keysByLayer[g.lk])keysByLayer[g.lk]=new Set();
      keysByLayer[g.lk].add(k);
      if(groupColor)colorByKey[k]=groupColor;
      total++;
    });
  });
  mapProjection={
    active:total>0,
    keysByLayer,
    colorByKey,
    label,
  };
  if(total>0)setMapProjectionStatus(label||lh('סינון מפה פעיל','Map filter active'));
  else setMapProjectionStatus('');
  renderAllLayers();
}

function getProjectedPointStyle(lk,feat,baseColor){
  if(!mapProjection.active){
    return {radius:5,fillColor:baseColor,color:'#fff',weight:1.2,opacity:1,fillOpacity:0.85};
  }
  const k=featKey(lk,feat);
  const layerSet=mapProjection.keysByLayer[lk];
  const matched=!!(layerSet&&layerSet.has(k));
  if(!matched){
    return {radius:4,fillColor:'#cbd5e1',color:'#f8fafc',weight:1,opacity:0.3,fillOpacity:0.15};
  }
  return {
    radius:6,
    fillColor:mapProjection.colorByKey[k]||baseColor,
    color:'#111827',
    weight:1.5,
    opacity:1,
    fillOpacity:0.95,
  };
}

function getProjectedShapeStyle(lk,feat,baseStyle){
  if(!mapProjection.active)return baseStyle;
  const k=featKey(lk,feat);
  const layerSet=mapProjection.keysByLayer[lk];
  const matched=!!(layerSet&&layerSet.has(k));
  if(!matched){
    return {
      color:'#cbd5e1',
      weight:1.2,
      opacity:0.22,
      fillColor:'#e2e8f0',
      fillOpacity:0.04,
    };
  }
  const hiColor=mapProjection.colorByKey[k]||baseStyle.color;
  return {
    color:hiColor,
    weight:(baseStyle.weight||2)+0.8,
    opacity:0.92,
    fillColor:hiColor,
    fillOpacity:Math.min((baseStyle.fillOpacity||0.12)+0.14,0.45),
  };
}

/* ── Fetch a layer (paginated) ──────────────────────────── */
async function fetchLayer(id){
  const url=`${API_BASE}/${id}/query?where=1%3D1&outFields=*&returnGeometry=true&f=geojson`;
  // ArcGIS enforces per-layer maxRecordCount (often 1000), so page size must match layer limits.
  let pageSize=1000;
  try{
    const metaRes=await fetch(`${API_BASE}/${id}?f=pjson`);
    if(metaRes.ok){
      const meta=await metaRes.json();
      const maxFromLayer=Number(meta?.maxRecordCount);
      if(Number.isFinite(maxFromLayer)&&maxFromLayer>0)pageSize=maxFromLayer;
    }
  }catch(e){
    console.warn(`Layer ${id} metadata fetch failed, using default page size`,e);
  }

  let all=[],offset=0,done=false;
  while(!done){
    const r=await fetch(`${url}&resultOffset=${offset}&resultRecordCount=${pageSize}`);
    if(!r.ok)throw new Error(`HTTP ${r.status} on layer ${id}`);
    const gj=await r.json();
    const feats=gj.features||[];
    all=all.concat(feats);
    if(feats.length<pageSize)done=true; else offset+=pageSize;
  }
  return all;
}

/* ── Fetch iplan districts (nafot) ──────────────────────── */
async function fetchNafot(){
  const url='https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/gvulot_retzef/MapServer/4/query?where=1%3D1&outFields=*&returnGeometry=true&f=geojson';
  try{
    const r=await fetch(url);
    if(!r.ok)throw new Error(`HTTP ${r.status}`);
    const gj=await r.json();
    officialNafotFeats=(gj.features||[]).filter(f=>f.properties&&f.properties.Nafa).map(f=>({
      ...f,
      properties:{...(f.properties||{}),_custom:false},
    }));
    rebuildNafotCollection();
  }catch(e){
    console.warn('Nafot load failed:',e);
    officialNafotFeats=[];
    rebuildNafotCollection();
  }
}

function rebuildNafotCollection(){
  /* Keep custom polygons first so they can override official district assignment if overlapping */
  nafotFeats=[...customNafotFeats,...officialNafotFeats];
}

function saveCustomNafotToStorage(){
  try{
    localStorage.setItem(CUSTOM_NAFOT_STORAGE_KEY,JSON.stringify(customNafotFeats));
  }catch(e){console.warn('Custom nafot save failed:',e);}
}

function loadCustomNafotFromStorage(){
  try{
    const raw=localStorage.getItem(CUSTOM_NAFOT_STORAGE_KEY);
    if(!raw){customNafotFeats=[];return;}
    const arr=JSON.parse(raw);
    if(!Array.isArray(arr)){customNafotFeats=[];return;}
    customNafotFeats=arr
      .filter(f=>f&&f.type==='Feature'&&f.geometry&&f.properties&&f.properties.Nafa)
      .map(f=>({
        ...f,
        properties:{...(f.properties||{}),_custom:true,_cid:f.properties?._cid||('custom_'+Date.now().toString(36)+Math.random().toString(36).slice(2,6))},
      }));
  }catch(e){
    console.warn('Custom nafot load failed:',e);
    customNafotFeats=[];
    setStatus(t('draw_polygon_load_failed'));
  }
}

function exportCustomNafotAsJSON(){
  try{
    const payload={
      schema:'bustanim-custom-nafot-v1',
      exportedAt:new Date().toISOString(),
      features:customNafotFeats,
    };
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json;charset=utf-8'});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download='bustanim_custom_nafot.json';
    a.click();
    URL.revokeObjectURL(a.href);
    setStatus(t('draw_polygon_export_done'));
  }catch(e){
    console.warn('Custom nafot export failed:',e);
  }
}

function importCustomNafotFromJSONText(text){
  try{
    const parsed=JSON.parse(text);
    let arr=[];
    if(Array.isArray(parsed))arr=parsed;
    else if(Array.isArray(parsed?.features))arr=parsed.features;
    else throw new Error('Invalid JSON structure');
    const norm=arr
      .filter(f=>f&&f.type==='Feature'&&f.geometry&&f.properties&&f.properties.Nafa)
      .map(f=>({
        ...f,
        properties:{...(f.properties||{}),_custom:true,_cid:f.properties?._cid||('custom_'+Date.now().toString(36)+Math.random().toString(36).slice(2,6))},
      }));
    customNafotFeats=norm;
    if(nafotDrawGroup){
      nafotDrawGroup.clearLayers();
      customNafotFeats.forEach(f=>{
        try{
          const gjLayer=L.geoJSON(f);
          gjLayer.eachLayer(layer=>{layer.feature=f;nafotDrawGroup.addLayer(layer);});
        }catch(e){console.warn('Custom import layer fail:',e);}
      });
    }
    refreshAfterNafotChange();
    setStatus(t('draw_polygon_import_done'));
    return true;
  }catch(e){
    console.warn('Custom nafot import failed:',e);
    setStatus(t('draw_polygon_import_bad'));
    return false;
  }
}

function calcAreaDunamFromLayer(layer){
  try{
    const latlngs=layer.getLatLngs?.();
    const ring=Array.isArray(latlngs)&&Array.isArray(latlngs[0]) ? latlngs[0] : null;
    if(!ring||!ring.length||!L.GeometryUtil||!L.GeometryUtil.geodesicArea)return null;
    const sqm=L.GeometryUtil.geodesicArea(ring);
    return sqm/1000; /* 1 dunam = 1000 m² */
  }catch(e){return null;}
}

function nameExistsInNafot(name,excludeCid=''){
  return nafotFeats.some(f=>{
    const n=(f.properties?.Nafa||'').trim();
    const cid=f.properties?._cid||'';
    return n===name && cid!==excludeCid;
  });
}

function refreshAfterNafotChange(){
  saveCustomNafotToStorage();
  rebuildNafotCollection();
  assignDistricts();
  renderNafotOnMap(true);
  districtChartsRendered=false;
  _speciesReg=null;
  analyticsRendered=false;
  advancedRendered=false;
  renderDistrictsTab();
  updateOverview();
  if(cmpInit){
    populateCmpSel('A');
    populateCmpSel('B');
    populateCmpSpaces('A');
    populateCmpSpaces('B');
  }
  const activeTab=document.querySelector('.tab.active')?.id;
  if(activeTab==='analytics')updateAnalytics();
  if(activeTab==='advanced')updateAdvanced();
  if(activeTab==='species')renderSpeciesTab();
}

function startCustomPolygonDraw(){
  if(!map || !window.L || !L.Draw || !L.Draw.Polygon)return;
  const drawer=new L.Draw.Polygon(map,{allowIntersection:false,showArea:true,shapeOptions:{color:'#e11d48',weight:2.5,fillColor:'#f43f5e',fillOpacity:0.14}});
  drawer.enable();
}

function initNafotDrawTools(){
  if(!map||nafotDrawGroup)return;
  if(!window.L || !L.Control || !L.Control.Draw)return;
  nafotDrawGroup=new L.FeatureGroup();
  map.addLayer(nafotDrawGroup);

  /* Load stored custom polygons into editable draw group */
  customNafotFeats.forEach(f=>{
    try{
      const gjLayer=L.geoJSON(f);
      gjLayer.eachLayer(layer=>{
        layer.feature={...f,properties:{...(f.properties||{}),_custom:true}};
        nafotDrawGroup.addLayer(layer);
      });
    }catch(e){console.warn('Failed to add stored custom nafa layer:',e);}
  });
  nafotDrawControl=new L.Control.Draw({
    position:'topleft',
    draw:{
      polygon:{allowIntersection:false,showArea:true,shapeOptions:{color:'#e11d48',weight:2.5,fillColor:'#f43f5e',fillOpacity:0.14}},
      polyline:false,
      rectangle:false,
      circle:false,
      marker:false,
      circlemarker:false,
    },
    edit:{
      featureGroup:nafotDrawGroup,
      remove:true,
      edit:true,
    }
  });
  map.addControl(nafotDrawControl);

  map.on(L.Draw.Event.CREATED,e=>{
    const layer=e.layer;
    const rawName=window.prompt(t('draw_polygon_name'),'')||'';
    const name=rawName.trim();
    if(!name){
      alert(t('draw_polygon_invalid'));
      return;
    }
    if(nameExistsInNafot(name)){
      alert(t('draw_polygon_exists'));
      return;
    }
    const cid='custom_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,7);
    const f=layer.toGeoJSON();
    const area=calcAreaDunamFromLayer(layer);
    f.properties={...(f.properties||{}),Nafa:name,Area_dunam:area,_custom:true,_cid:cid};
    layer.feature=f;
    nafotDrawGroup.addLayer(layer);
    customNafotFeats.push(f);
    refreshAfterNafotChange();
    setStatus(t('draw_polygon_saved'));
  });

  map.on(L.Draw.Event.EDITED,e=>{
    e.layers.eachLayer(layer=>{
      const cid=layer.feature?.properties?._cid;
      if(!cid)return;
      const idx=customNafotFeats.findIndex(f=>f.properties?._cid===cid);
      if(idx<0)return;
      const updated=layer.toGeoJSON();
      const prevName=customNafotFeats[idx].properties?.Nafa||'';
      const area=calcAreaDunamFromLayer(layer);
      updated.properties={...(updated.properties||{}),Nafa:prevName,Area_dunam:area,_custom:true,_cid:cid};
      layer.feature=updated;
      customNafotFeats[idx]=updated;
    });
    refreshAfterNafotChange();
  });

  map.on(L.Draw.Event.DELETED,e=>{
    const removedCids=[];
    e.layers.eachLayer(layer=>{
      const cid=layer.feature?.properties?._cid;
      if(cid)removedCids.push(cid);
    });
    if(removedCids.length){
      customNafotFeats=customNafotFeats.filter(f=>!removedCids.includes(f.properties?._cid));
      refreshAfterNafotChange();
      setStatus(t('draw_polygon_deleted'));
    }
  });
}

/* ── Load all layers ────────────────────────────────────── */
async function loadAll(){
  setStatus(t('loading'));
  const [nafotResult, ...layerResults]=await Promise.allSettled([
    fetchNafot(),
    ...ALL_LAYER_KEYS.map(lk=>fetchLayer(LAYER_META[lk].id).then(feats=>({lk,feats})))
  ]);
  if(nafotResult.status==='rejected')console.warn('Nafot load failed:',nafotResult.reason);
  layerResults.forEach(r=>{
    if(r.status==='fulfilled'){
      const{lk,feats}=r.value;
      /* Filter out test/dummy records from boundaries */
      allFeats[lk]=lk==='boundaries'
        ? feats.filter(f=>f.properties.Name!=='ניסיון - הבית של אליעזר')
        : feats;
      if(lk==='boundaries')bustanFeats=allFeats[lk];
    } else {
      console.warn('Layer load failed:',r.reason);
    }
  });
  /* Assign district to each tree/vegetation point */
  assignDistricts();
  updateReadyStatus();
}

/* ── Point-in-polygon (ray-casting, GeoJSON ring coords) ── */
function pointInRing(lng,lat,ring){
  let inside=false;
  for(let i=0,j=ring.length-1;i<ring.length;j=i++){
    const xi=ring[i][0],yi=ring[i][1];
    const xj=ring[j][0],yj=ring[j][1];
    if(((yi>lat)!==(yj>lat))&&(lng<(xj-xi)*(lat-yi)/(yj-yi)+xi))inside=!inside;
  }
  return inside;
}

function getNafaForPoint(lng,lat){
  for(const feat of nafotFeats){
    const geom=feat.geometry;
    if(!geom)continue;
    const rings=geom.type==='Polygon'?[geom.coordinates]:geom.coordinates;
    for(const poly of rings){
      if(poly.length&&pointInRing(lng,lat,poly[0])){
        // Check holes: if inside a hole, skip
        let inHole=false;
        for(let h=1;h<poly.length;h++){if(pointInRing(lng,lat,poly[h])){inHole=true;break;}}
        if(!inHole)return feat.properties.Nafa||'לא ידוע';
      }
    }
  }
  return 'לא ידוע';
}

function assignDistricts(){
  if(!nafotFeats.length)return;
  ['fruit','carob','vegetation','agtools','terraces'].forEach(lk=>{
    (allFeats[lk]||[]).forEach(f=>{
      const c=f.geometry?.coordinates;
      if(!c)return;
      let lng,lat;
      if(f.geometry.type==='Point'){[lng,lat]=c;}
      else if(f.geometry.type==='LineString'){[lng,lat]=c[Math.floor(c.length/2)];}
      else{[lng,lat]=c[0]?.[0]||[null,null];}
      if(lng!=null)f.properties._nafa=getNafaForPoint(lng,lat);
    });
  });
}

function updateReadyStatus(){
  const totalLoaded=LAYER_KEYS.reduce((s,lk)=>s+(allFeats[lk]||[]).length,0);
  const totalShown=LAYER_KEYS.reduce((s,lk)=>s+visibleFeats(lk).length,0);
  const objWord=lh('אובייקטים','objects');
  const shownLabel=lh('מוצגים במפה','shown on map');
  setStatus(`${t('ready')} — ${totalLoaded.toLocaleString(LOCALE)} ${objWord} (${totalShown.toLocaleString(LOCALE)} ${shownLabel})`);
}

/* ── Render nafot (district polygons) on map ────────────── */
function renderNafotOnMap(visible){
  if(nafotLayer){map.removeLayer(nafotLayer);nafotLayer=null;}
  if(!visible||!nafotFeats.length)return;
  const baseStyle={
    color:'#0e7490',
    weight:2.4,
    fillColor:'#06b6d4',
    fillOpacity:0.12,
    dashArray:'',
  };
  const hoverStyle={
    color:'#155e75',
    weight:3.8,
    fillColor:'#22d3ee',
    fillOpacity:0.28,
    dashArray:'',
  };
  const customBaseStyle={
    color:'#be123c',
    weight:2.8,
    fillColor:'#f43f5e',
    fillOpacity:0.18,
    dashArray:'7 4',
  };
  const customHoverStyle={
    color:'#9f1239',
    weight:4.2,
    fillColor:'#fb7185',
    fillOpacity:0.34,
    dashArray:'',
  };
  nafotLayer=L.geoJSON({type:'FeatureCollection',features:nafotFeats},{
    pane:'nafotPane',
    interactive:false,
    style:(feat)=>feat?.properties?._custom ? customBaseStyle : baseStyle,
    onEachFeature:(feat,layer)=>{
      const name=feat.properties.Nafa||'';
      const customTag=feat.properties?._custom ? ' ✏' : '';
      layer.bindTooltip(name+customTag,{
        permanent:true,
        direction:'center',
        className:'nafa-zone-label'+(feat.properties?._custom?' nafa-zone-label-custom':''),
      });
    }
  });
  nafotLayer.addTo(map);
  /* Push data layers to top */
  LAYER_KEYS.forEach(lk=>{if(mapLayers[lk])mapLayers[lk].bringToFront();});
}

/* ── Map init ───────────────────────────────────────────── */
function initMap(){
  map=L.map('map',{preferCanvas:true}).setView([31.9,34.85],9);
  map.createPane('nafotPane');
  map.getPane('nafotPane').style.zIndex='330';
  L.tileLayer(TILE_URLS['pal-1940s'],{maxZoom:20,attribution:'Palestine Open Maps'}).addTo(map);
}

function setBasemap(val){
  map.eachLayer(l=>{if(l instanceof L.TileLayer)map.removeLayer(l);});
  if(val.includes('+')){
    const[a,b]=val.split('+');
    L.tileLayer(TILE_URLS[a]||TILE_URLS.osm,{maxZoom:20,attribution:'© OpenStreetMap'}).addTo(map);
    L.tileLayer(TILE_URLS[b],{maxZoom:20,opacity:0.6,attribution:'Palestine Open Maps'}).addTo(map);
  } else {
    const url=TILE_URLS[val]||TILE_URLS.osm;
    const att=val==='osm'?'© OpenStreetMap':val==='sat'?'© Esri':'Palestine Open Maps';
    L.tileLayer(url,{maxZoom:20,attribution:att}).addTo(map);
  }
  LAYER_KEYS.forEach(lk=>{if(mapLayers[lk])mapLayers[lk].bringToFront();});
}

/* ── Render a layer on map ──────────────────────────────── */
function renderLayerOnMap(lk){
  if(mapLayers[lk]){map.removeLayer(mapLayers[lk]);delete mapLayers[lk];}
  const meta=LAYER_META[lk];
  const feats=visibleFeats(lk);
  if(!feats.length)return;
  const gj=L.geoJSON({type:'FeatureCollection',features:feats},{
    pointToLayer:(feat,latlng)=>{
      const tf=meta.typeField; const val=tf?(feat.properties[tf]||'ללא שם'):'';
      const col=tf?getTypeColor(lk,val):meta.color;
      return L.circleMarker(latlng,getProjectedPointStyle(lk,feat,col));
    },
    style:(feat)=>{
      const base=lk==='boundaries'
        ? {color:meta.color,weight:2,fillColor:meta.color,fillOpacity:0.12}
        : {color:meta.color,weight:2.5,fillColor:meta.color,fillOpacity:0.35};
      return getProjectedShapeStyle(lk,feat,base);
    },
    onEachFeature:(feat,layer)=>{
      const label=featLabel(feat,lk);
      layer.bindTooltip(label,{permanent:false,className:'polylabel'});
      layer.on('click',()=>{
        selectedFeat={lk,feat,layer};
        showModal(feat,lk);
        highlightFeat(layer,lk);
        showSelectionDetail(feat,lk);
      });
    }
  });
  gj.addTo(map);
  mapLayers[lk]=gj;
}

function renderAllLayers(){LAYER_KEYS.forEach(lk=>renderLayerOnMap(lk));}

function highlightFeat(layer,lk){
  LAYER_KEYS.forEach(k=>{
    if(mapLayers[k])mapLayers[k].eachLayer(l=>{
      if(l.setStyle)l.setStyle({weight:1.2,color:'#fff'});
    });
  });
  if(layer&&layer.setStyle)layer.setStyle({weight:3,color:'#fbbf24'});
}

function fitAll(){
  const allBounds=[];
  LAYER_KEYS.forEach(lk=>{
    try{if(mapLayers[lk])allBounds.push(mapLayers[lk].getBounds());}catch(e){}
  });
  if(!allBounds.length)return;
  let b=allBounds[0];
  allBounds.slice(1).forEach(b2=>b=b.extend(b2));
  if(b.isValid())map.fitBounds(b,{padding:[20,20]});
}

/* ── Object Modal ───────────────────────────────────────── */
function attachPhotoListeners(){
  const photos=document.querySelectorAll('.modal-photo');
  photos.forEach(img=>{
    if(img._photoHandlerBound)return; // prevent duplicate bindings
    img._photoHandlerBound=true;
    img.addEventListener('click',(e)=>{
      e.stopPropagation();
      const popup=document.getElementById('photoPopup');
      const popupImg=document.getElementById('photoPopupImg');
      if(popup && popupImg){
        popupImg.src=img.src;
        popupImg.alt=img.alt;
        popup.style.display='flex';
      }
    });
  });
}

async function showModal(feat,lk){
  const p=feat.properties; const meta=LAYER_META[lk];
  const typeVal=meta.typeField?(p[meta.typeField]||''):'';
  const col=meta.typeField?getTypeColor(lk,typeVal):meta.color;
  const SKIP_PREFIX=['esrignss','esrisnsr'];
  const SKIP_EXACT=['GlobalID','Shape'];
  const rows=Object.entries(p).filter(([k,v])=>{
    if(v==null)return false;
    if(SKIP_EXACT.includes(k))return false;
    if(SKIP_PREFIX.some(pfx=>k.startsWith(pfx)))return false;
    return true;
  }).map(([k,v])=>{
    let disp=v;
    if(typeof v==='number'&&v>9999999999)disp=dateStr(v);
    return `<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #f1f5f9">
      <span style="color:#475569;font-size:12px">${k}</span>
      <span style="font-weight:600;font-size:13px;max-width:240px;word-break:break-word;text-align:left">${disp}</span></div>`;
  });
  document.getElementById('objModalContent').innerHTML=`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
      <div style="width:18px;height:18px;border-radius:4px;background:${col};flex-shrink:0"></div>
      <div>
        <div style="font-size:19px;font-weight:700;color:#1e40af">${typeVal||(LANG==='he'?meta.name_he:meta.name_en)} #${p.OBJECTID}</div>
        <div style="font-size:12px;color:#475569">${LANG==='he'?meta.name_he:meta.name_en}</div>
      </div>
    </div>
    <div>${rows.join('')}</div>`;
  document.getElementById('objModal').style.display='block';
  /* Load photos async */
  const imgDiv=document.getElementById('objModalImages');
  if(imgDiv&&meta.id!=null){
    imgDiv.innerHTML='<div class="small" style="color:#94a3b8;margin-top:10px">טוען תמונות...</div>';
    try{
      const r=await fetch(`${API_BASE}/${meta.id}/${p.OBJECTID}/attachments?f=json`);
      const data=await r.json();
      const imgs=(data.attachmentInfos||[]).filter(a=>a.contentType&&a.contentType.startsWith('image/'));
      if(imgs.length){
        imgDiv.innerHTML='<div class="photo-gallery">'+
          imgs.map(a=>`<img src="${API_BASE}/${meta.id}/${p.OBJECTID}/attachments/${a.id}" class="modal-photo" alt="${a.name}" loading="lazy" />`).join('')+
          '</div>';
        attachPhotoListeners();
      } else {
        imgDiv.innerHTML='';
      }
    }catch(e){imgDiv.innerHTML='';}
  }
}

/* ── Layer Toggle Panel ─────────────────────────────────── */
function buildLayerToggles(){
  const el=document.getElementById('layerToggles');
  el.innerHTML=LAYER_KEYS.map(lk=>{
    const meta=LAYER_META[lk];
    const name=LANG==='he'?meta.name_he:meta.name_en;
    const dist=typeDist(lk);
    const typeRows=Object.entries(dist).map(([tv,cnt])=>{
      const col=getTypeColor(lk,tv);
      const chk=(typeVis[lk]&&typeVis[lk][tv]===false)?'':'checked';
      return `<div class="type-toggle"><label>
        <input type="checkbox" ${chk} data-lk="${lk}" data-type="${tv}">
        <span class="legendDot" style="background:${col}"></span>
        <span>${tv}</span> <span style="color:#94a3b8;font-size:11px">(${cnt})</span>
      </label></div>`;
    }).join('');
    return `<div class="layer-toggle-group">
      <div class="layer-name">
        <input type="checkbox" id="chk_${lk}" ${layerVis[lk]?'checked':''}>
        <span class="legendDot" style="background:${meta.color}"></span>
        <label for="chk_${lk}" style="cursor:pointer;font-weight:600">${name}</label>
        <span style="color:#94a3b8;font-size:11px;margin-right:4px">(${(allFeats[lk]||[]).length})</span>
      </div>
      ${typeRows}
    </div>`;
  }).join('');
  LAYER_KEYS.forEach(lk=>{
    const cb=document.getElementById(`chk_${lk}`);
    if(cb)cb.addEventListener('change',e=>{layerVis[lk]=e.target.checked;renderLayerOnMap(lk);});
  });
  el.querySelectorAll('input[data-type]').forEach(cb=>{
    cb.addEventListener('change',e=>{
      const{lk,type}=e.target.dataset;
      if(!typeVis[lk])typeVis[lk]={};
      typeVis[lk][type]=e.target.checked;
      renderLayerOnMap(lk);
    });
  });
}

/* ── Tabs ───────────────────────────────────────────────── */
let analyticsRendered=false, advancedRendered=false;

function setupTabs(){
  document.querySelectorAll('.tabbtn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const tab=btn.dataset.tab;
      document.querySelectorAll('.tabbtn').forEach(b=>b.classList.toggle('active',b===btn));
      document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.id===tab));
      if(tab==='analytics')updateAnalytics();
      else if(tab==='advanced')updateAdvanced();
      else if(tab==='compare')initCompareUI();
      else if(tab==='districts')renderDistrictsTab();
      else if(tab==='species')renderSpeciesTab();
    });
  });
}
function switchTab(id){
  document.querySelectorAll('.tabbtn').forEach(b=>b.classList.toggle('active',b.dataset.tab===id));
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.id===id));
}

/* ── Overview ───────────────────────────────────────────── */
function updateOverview(){
  const ff=allFeats['fruit']||[];
  const heights=ff.map(f=>f.properties.height).filter(v=>v&&v>0&&v<5000);
  const girths=ff.map(f=>f.properties.circumference_trunk).filter(v=>v&&v>0&&v<2000);
  document.getElementById('kFruitTrees').textContent=fmtI(ff.length);
  document.getElementById('kCarobTrees').textContent=fmtI((allFeats['carob']||[]).length);
  document.getElementById('kNafot').textContent=fmtI(nafotFeats.length);
  document.getElementById('kVegetation').textContent=fmtI((allFeats['vegetation']||[]).length);
  document.getElementById('kAgTools').textContent=fmtI((allFeats['agtools']||[]).length);
  document.getElementById('kTerraces').textContent=fmtI((allFeats['terraces']||[]).length);
  document.getElementById('kAvgH').textContent=fmt(mean(heights))+' '+lh('ס"מ','cm');
  document.getElementById('kAvgG').textContent=fmt(mean(girths))+' '+lh('ס"מ','cm');
  const types=new Set(ff.map(f=>f.properties.tree_type).filter(Boolean));
  document.getElementById('kFruitTypes').textContent=types.size;
  chartOverviewBar();
  chartOverviewPie();
}

function chartOverviewBar(){
  const labels=LAYER_KEYS.map(lk=>LANG==='he'?LAYER_META[lk].name_he:LAYER_META[lk].name_en);
  const vals=LAYER_KEYS.map(lk=>(allFeats[lk]||[]).length);
  const colors=LAYER_KEYS.map(lk=>LAYER_META[lk].color);
  Plotly.newPlot('chartOverviewBar',[{
    type:'bar',x:vals,y:labels,orientation:'h',
    marker:{color:colors},text:vals.map(v=>v.toLocaleString(LOCALE)),textposition:'outside',
  }],layout('כמות אובייקטים לפי שכבה','כמות',''),cfgPlot());
}

function chartOverviewPie(){
  const types=typeDist('fruit');
  const keys=Object.keys(types).sort((a,b)=>types[b]-types[a]);
  if(!keys.length)return;
  Plotly.newPlot('chartOverviewPie',[{
    type:'pie',labels:keys,values:keys.map(k=>types[k]),
    textinfo:'label+percent',hole:0.35,
    marker:{colors:keys.map((_,i)=>TYPE_COLORS[i%TYPE_COLORS.length])},
  }],{title:{text:'התפלגות סוגי עצי פרי',font:{size:13}},margin:{t:36,b:4,l:4,r:4},paper_bgcolor:'transparent'},cfgPlot());
}

/* ── Districts (Nafot) Tab ──────────────────────────────── */
let districtChartsRendered=false;
function renderDistrictsTab(){
  /* District summary table */
  const el=document.getElementById('districtList');
  if(!el)return;

  /* Collect unique districts across fruit+carob+vegetation */
  const LKEYS_FOR_DIST=['fruit','carob','vegetation','agtools','terraces'];
  const distMap={}; // nafa → { fruit, carob, vegetation, agtools, terraces }
  LKEYS_FOR_DIST.forEach(lk=>{
    (allFeats[lk]||[]).forEach(f=>{
      const nafa=f.properties._nafa||'לא ידוע';
      if(!distMap[nafa])distMap[nafa]={fruit:0,carob:0,vegetation:0,agtools:0,terraces:0};
      distMap[nafa][lk]=(distMap[nafa][lk]||0)+1;
    });
  });
  /* Include iplan district polygons even if no trees in them */
  nafotFeats.forEach(f=>{
    const n=f.properties.Nafa||'לא ידוע';
    if(!distMap[n])distMap[n]={fruit:0,carob:0,vegetation:0,agtools:0,terraces:0};
  });

  const customNames=new Set(customNafotFeats.map(f=>(f.properties?.Nafa||'').trim()).filter(Boolean));
  const sorted=Object.keys(distMap).sort((a,b)=>{
    const aCustom=customNames.has((a||'').trim());
    const bCustom=customNames.has((b||'').trim());
    if(aCustom!==bCustom)return aCustom?1:-1; /* custom districts always at bottom */
    const tA=LKEYS_FOR_DIST.reduce((s,lk)=>s+distMap[a][lk],0);
    const tB=LKEYS_FOR_DIST.reduce((s,lk)=>s+distMap[b][lk],0);
    return tB-tA;
  });

  el.innerHTML=`<table class="dist-table">
    <thead><tr>
      <th>${lh('נפה','District')}</th>
      <th title="${t('fruit_trees')}">${lh('פרי','Fruit')}</th>
      <th title="${t('carob_trees')}">${lh('סרק','Non-Fruit')}</th>
      <th title="${t('vegetation')}">${lh('צמחיה','Vegetation')}</th>
      <th title="${t('ag_tools')}">${lh('כלים','Tools')}</th>
      <th title="${t('terraces')}">${lh('טרסות','Terraces')}</th>
      <th>${lh('סה"כ','Total')}</th>
    </tr></thead>
    <tbody>
    ${sorted.map(nafa=>{
      const d=distMap[nafa];
      const tot=LKEYS_FOR_DIST.reduce((s,lk)=>s+d[lk],0);
      const isCustom=customNames.has((nafa||'').trim());
      return`<tr class="dist-row${isCustom?' dist-row-custom':''}" data-nafa="${nafa}">
        <td class="dist-name">${nafa}</td>
        <td>${d.fruit||0}</td>
        <td>${d.carob||0}</td>
        <td>${d.vegetation||0}</td>
        <td>${d.agtools||0}</td>
        <td>${d.terraces||0}</td>
        <td><strong>${tot}</strong></td>
      </tr>`;
    }).join('')}
    </tbody>
  </table>`;

  /* Click on row → zoom to district on map */
  el.querySelectorAll('.dist-row').forEach(row=>{
    row.addEventListener('click',()=>{
      const nafa=row.dataset.nafa;
      const nafaFeat=nafotFeats.find(f=>f.properties.Nafa===nafa);
      if(nafaFeat&&nafotLayer){
        nafotLayer.eachLayer(l=>{
          if(l.feature&&l.feature.properties.Nafa===nafa){
            if(l.getBounds)map.fitBounds(l.getBounds(),{padding:[40,40]});
          }
        });
      }
      applyMapProjectionGroups([
        {lk:'fruit',feats:(allFeats.fruit||[]).filter(f=>(f.properties._nafa||'לא ידוע')===nafa),color:LAYER_META.fruit.color},
        {lk:'carob',feats:(allFeats.carob||[]).filter(f=>(f.properties._nafa||'לא ידוע')===nafa),color:LAYER_META.carob.color},
        {lk:'vegetation',feats:(allFeats.vegetation||[]).filter(f=>(f.properties._nafa||'לא ידוע')===nafa),color:LAYER_META.vegetation.color},
        {lk:'agtools',feats:(allFeats.agtools||[]).filter(f=>(f.properties._nafa||'לא ידוע')===nafa),color:LAYER_META.agtools.color},
        {lk:'terraces',feats:(allFeats.terraces||[]).filter(f=>(f.properties._nafa||'לא ידוע')===nafa),color:LAYER_META.terraces.color},
      ],lh('מפה: נפה '+nafa,'Map: district '+nafa));
      showDistrictDetail(nafa);
    });
  });

  if(!districtChartsRendered){
    districtChartsRendered=true;
    renderDistrictCharts(distMap,sorted);
  }
}

function renderDistrictCharts(distMap,sorted){
  /* Chart 1: Stacked bar – fruit trees by district */
  const nafotForChart=sorted.filter(n=>n!=='לא ידוע').slice(0,15);
  const LKEYS_CHART=['fruit','carob','vegetation'];
  const colors={fruit:'#16a34a',carob:'#8b6f47',vegetation:'#65a30d'};
  const names={fruit:'עצי פרי',carob:'עצי סרק',vegetation:'צמחיה'};
  Plotly.newPlot('chartDistrictStack',
    LKEYS_CHART.map(lk=>({
      type:'bar',name:names[lk],
      x:nafotForChart.map(n=>(distMap[n]||{})[lk]||0),
      y:nafotForChart,
      orientation:'h',
      marker:{color:colors[lk]},
    })),
    layout('פיזור אובייקטים לפי נפה','כמות','',{barmode:'stack'}),
    cfgPlot()
  );

  /* Chart 2: Fruit tree species top-10 per district – heatmap */
  const fruitFeats=allFeats['fruit']||[];
  const allTypes=[...new Set(fruitFeats.map(f=>f.properties.tree_type).filter(Boolean))];
  const typeCounts={};
  nafotForChart.forEach(n=>{
    typeCounts[n]={};
    fruitFeats.filter(f=>(f.properties._nafa||'לא ידוע')===n)
      .forEach(f=>{const tv=f.properties.tree_type||'לא ידוע';typeCounts[n][tv]=(typeCounts[n][tv]||0)+1;});
  });
  /* Top species globally */
  const globalTypes=allTypes.sort((a,b)=>{
    const cB=nafotForChart.reduce((s,n)=>s+(typeCounts[n][b]||0),0);
    const cA=nafotForChart.reduce((s,n)=>s+(typeCounts[n][a]||0),0);
    return cB-cA;
  }).slice(0,12);

  const zHeat=nafotForChart.map(n=>globalTypes.map(tv=>typeCounts[n][tv]||0));
  if(zHeat.length&&globalTypes.length){
    Plotly.newPlot('chartDistrictHeatmap',[{
      type:'heatmap',
      z:zHeat,
      x:globalTypes,
      y:nafotForChart,
      colorscale:'YlGn',
      showscale:true,
    }],layout('מין עץ פרי × נפה (heatmap)','מין','נפה'),cfgPlot());
  }

  /* Chart 3: Pie – total fruit trees per district (top 10) */
  const top10=nafotForChart.slice(0,10);
  Plotly.newPlot('chartDistrictPie',[{
    type:'pie',
    labels:top10,
    values:top10.map(n=>distMap[n].fruit||0),
    textinfo:'label+percent',
    hole:0.3,
    marker:{colors:TYPE_COLORS.slice(0,10)},
  }],{title:{text:'עצי פרי לפי נפה',font:{size:13}},margin:{t:36,b:4,l:4,r:4},paper_bgcolor:'transparent'},cfgPlot());
}

/* ── District detail (reactive, with group filter + species drill-down) ── */
let _distDetailNafa='', _distDetailGroup='';

function showDistrictDetail(nafa){
  _distDetailNafa=nafa;
  _distDetailGroup='';
  const el=document.getElementById('districtDetail');
  if(!el)return;
  el.style.display='block';
  document.getElementById('districtDetailTitle').textContent='נפה: '+nafa;
  /* Wire group buttons + close buttons once per element */
  if(!el._grpEvInit){
    el._grpEvInit=true;
    el.querySelectorAll('.grp-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{_distDetailGroup=btn.dataset.grp;refreshDistrictDetail();});
    });
    const cl=document.getElementById('districtDetailClose');
    if(cl&&!cl._evInit){cl._evInit=true;cl.addEventListener('click',()=>{el.style.display='none';});}
    const spCl=document.getElementById('districtSpeciesDetailClose');
    if(spCl&&!spCl._evInit){spCl._evInit=true;spCl.addEventListener('click',()=>{document.getElementById('districtSpeciesDetailPanel').style.display='none';});}
  }
  refreshDistrictDetail();
  el.scrollIntoView({behavior:'smooth',block:'start'});
}

function refreshDistrictDetail(){
  const nafa=_distDetailNafa;
  const groupFilter=_distDetailGroup;
  /* Update active group button */
  document.querySelectorAll('.grp-btn').forEach(b=>b.classList.toggle('active',b.dataset.grp===groupFilter));
  /* Hide species drilldown on group change */
  const spPanel=document.getElementById('districtSpeciesDetailPanel');
  if(spPanel)spPanel.style.display='none';
  /* Collect species data for this district + optional group */
  const lkDefs=groupFilter?SPECIES_LKDEFS.filter(d=>d.lk===groupFilter):SPECIES_LKDEFS;
  const specMap={};
  lkDefs.forEach(({lk,field})=>{
    (allFeats[lk]||[]).forEach(f=>{
      if((f.properties._nafa||'לא ידוע')!==nafa)return;
      const tv=f.properties[field]||'ללא שם';
      const key=lk+'::'+tv;
      if(!specMap[key])specMap[key]={name:tv,lk,field,lkName:(LANG==='he'?LAYER_META[lk].name_he:LAYER_META[lk].name_en),lkColor:LAYER_META[lk].color,count:0,heights:[],girths:[],statuses:{}};
      const s=specMap[key]; s.count++;
      const h=f.properties.height; if(h&&+h>0&&+h<5000)s.heights.push(+h);
      const g=f.properties.circumference_trunk; if(g&&+g>0&&+g<2000)s.girths.push(+g);
      const st=statusKey(f.properties.status); s.statuses[st]=(s.statuses[st]||0)+1;
    });
  });
  const sorted=Object.values(specMap).sort((a,b)=>b.count-a.count);
  /* Stats table */
  document.getElementById('districtSpeciesTable').innerHTML=`<table class="species-table">
    <thead><tr>
      <th>${lh('מין','Species')}</th><th>${lh('קבוצה','Group')}</th><th>${lh('כמות','Count')}</th>
      <th>${lh('גובה ממוצע','Mean Height')}</th><th>${lh('חציון','Median')}</th><th>σ</th><th>${lh('מנ׳','Min')}</th><th>${lh('מקס׳','Max')}</th>
      <th>${lh('היקף ממוצע','Mean Girth')}</th><th>${lh('מצב שכיח','Dominant Status')}</th>
    </tr></thead>
    <tbody>${sorted.map(s=>{
      const hm=mean(s.heights),hmed=median(s.heights),hsd=stddev(s.heights),hmn=arrMin(s.heights),hmx=arrMax(s.heights);
      const gm=mean(s.girths);
      const topStRaw=Object.keys(s.statuses).sort((a,b)=>s.statuses[b]-s.statuses[a])[0]||'–';
      const topSt=topStRaw==='–' ? topStRaw : statusLabel(topStRaw);
      return`<tr class="species-row dist-species-row" data-key="${s.lk}::${s.name}">
        <td class="species-name" style="border-right:3px solid ${s.lkColor};padding-right:6px;cursor:pointer;color:var(--primary)">${s.name} ↗</td>
        <td><span class="layer-badge" style="background:${s.lkColor}">${s.lkName}</span></td>
        <td><strong>${s.count}</strong></td>
        <td>${hm!=null?fmt(hm)+' ס"מ':'–'}</td>
        <td>${hmed!=null?fmt(hmed)+' ס"מ':'–'}</td>
        <td>${hsd!=null?fmt(hsd):'–'}</td>
        <td>${hmn!=null?fmt(hmn)+' ס"מ':'–'}</td>
        <td>${hmx!=null?fmt(hmx)+' ס"מ':'–'}</td>
        <td>${gm!=null?fmt(gm)+' ס"מ':'–'}</td>
        <td>${topSt}</td>
      </tr>`;
    }).join('')}</tbody>
  </table>`;
  /* Wire row clicks for drilldown */
  document.querySelectorAll('.dist-species-row').forEach(row=>{
    row.addEventListener('click',()=>{
      const key=row.dataset.key;
      showDistrictSpeciesDetail(nafa,specMap[key]);
    });
  });
  /* Charts */
  ['chartDistrictSpeciesBar','chartDistrictSpeciesBox'].forEach(id=>{try{Plotly.purge(id);}catch(e){}});
  const top15=sorted.slice(0,15);
  Plotly.newPlot('chartDistrictSpeciesBar',[{type:'bar',x:top15.map(s=>s.count),y:top15.map(s=>s.name),orientation:'h',marker:{color:top15.map(s=>s.lkColor)},text:top15.map(s=>s.count),textposition:'outside'}],layout('הרכב מינים — '+nafa+(groupFilter?' ('+(LANG==='he'?LAYER_META[groupFilter].name_he:LAYER_META[groupFilter].name_en)+')':''),'כמות',''),cfgPlot());
  const top8=sorted.filter(s=>s.heights.length>0).slice(0,8);
  if(top8.length)Plotly.newPlot('chartDistrictSpeciesBox',top8.map((s,i)=>({type:'box',y:s.heights,name:s.name,marker:{color:TYPE_COLORS[i%TYPE_COLORS.length]},boxmean:true})),layout('גובה לפי מין — '+nafa,'מין','גובה (ס"מ)'),cfgPlot());
}

function showDistrictSpeciesDetail(nafa,spec){
  if(!spec)return;
  const focusFeats=(allFeats[spec.lk]||[]).filter(f=>{
    if((f.properties._nafa||'לא ידוע')!==nafa)return false;
    return (f.properties[spec.field]||'ללא שם')===spec.name;
  });
  applyMapProjectionGroups([
    {lk:spec.lk,feats:focusFeats,color:spec.lkColor}
  ],lh('מפה: '+spec.name+' בנפה '+nafa,'Map: '+spec.name+' in '+nafa));
  const panel=document.getElementById('districtSpeciesDetailPanel');
  panel.style.display='block';
  document.getElementById('districtSpeciesDetailTitle').textContent=spec.name+' — '+nafa+' ('+spec.count+' '+lh('אובייקטים','objects')+')';
  ['chartDistrictSpeciesHist','chartDistrictSpeciesGirth','chartDistrictSpeciesStatus'].forEach(id=>{
    try{Plotly.purge(id);}catch(e){}
    document.getElementById(id).innerHTML='';
  });
  const pc=cfgPlot();
  const STATUS_COLORS=['#16a34a','#f59e0b','#dc2626','#94a3b8','#475569','#0891b2'];
  if(spec.heights.length>1)
    Plotly.newPlot('chartDistrictSpeciesHist',[{type:'histogram',x:spec.heights,nbinsx:20,marker:{color:spec.lkColor,opacity:0.8}}],layout('התפלגות גובה – '+spec.name,'גובה (ס"מ)','כמות'),pc);
  if(spec.girths.length>1)
    Plotly.newPlot('chartDistrictSpeciesGirth',[{type:'histogram',x:spec.girths,nbinsx:20,marker:{color:'#065f46',opacity:0.8}}],layout('התפלגות היקף – '+spec.name,'היקף (ס"מ)','כמות'),pc);
  const sk=Object.keys(spec.statuses);
  if(sk.length)
    Plotly.newPlot('chartDistrictSpeciesStatus',[{type:'pie',labels:sk.map(statusLabel),values:sk.map(k=>spec.statuses[k]),hole:0.35,textinfo:'label+percent',marker:{colors:STATUS_COLORS}}],{title:{text:lh('מצב – ','Status – ')+spec.name,font:{size:13}},margin:{t:36,b:4,l:4,r:4},paper_bgcolor:'transparent'},pc);
  panel.scrollIntoView({behavior:'smooth',block:'start'});
}

function zoomToFeature(feat,lk){
  const layer=mapLayers[lk]; if(!layer)return;
  const fid=feat.properties.OBJECTID;
  layer.eachLayer(l=>{
    if(l.feature&&l.feature.properties.OBJECTID===fid){
      if(l.getBounds)map.fitBounds(l.getBounds(),{padding:[30,30]});
      else if(l.getLatLng)map.setView(l.getLatLng(),16);
      highlightFeat(l,lk);
    }
  });
}

function showSelectionDetail(feat,lk){
  const p=feat.properties; const meta=LAYER_META[lk];
  const typeVal=meta.typeField?(p[meta.typeField]||''):'';
  document.getElementById('selectionDetail').innerHTML=`
    <div class="card" style="margin-top:10px">
      <h5>${typeVal||(LANG==='he'?meta.name_he:meta.name_en)} #${p.OBJECTID}</h5>
      ${p.Name?`<div class="stat-row"><span class="stat-label">שם</span><span class="stat-value">${p.Name}</span></div>`:''}
      ${p.height?`<div class="stat-row"><span class="stat-label">גובה</span><span class="stat-value">${fmt(p.height)} ס"מ</span></div>`:''}
      ${p.circumference_trunk?`<div class="stat-row"><span class="stat-label">היקף גזע</span><span class="stat-value">${fmt(p.circumference_trunk)} ס"מ</span></div>`:''}
      ${p.status?`<div class="stat-row"><span class="stat-label">${t('status')}</span><span class="stat-value">${statusLabel(p.status)}</span></div>`:''}
      ${p.soil_type?`<div class="stat-row"><span class="stat-label">סוג קרקע</span><span class="stat-value">${p.soil_type}</span></div>`:''}
      ${p.Description?`<div class="stat-row"><span class="stat-label">תיאור</span><span class="stat-value">${p.Description}</span></div>`:''}
    </div>`;
}

/* ── Species (מינים) Tab ────────────────────────────────── */
let speciesInit=false, _speciesReg=null;
const SPECIES_LKDEFS=[
  {lk:'fruit',    field:'tree_type'},
  {lk:'carob',    field:'Tree_type'},
  {lk:'vegetation',field:'tree_type'},
];

function buildSpeciesRegistry(){
  const reg={};
  SPECIES_LKDEFS.forEach(({lk,field})=>{
    (allFeats[lk]||[]).forEach(f=>{
      const tv=f.properties[field]||'ללא שם';
      const key=lk+'::'+tv;
      if(!reg[key])reg[key]={name:tv,lk,field,lkName:(LANG==='he'?LAYER_META[lk].name_he:LAYER_META[lk].name_en),lkColor:LAYER_META[lk].color,heights:[],girths:[],statuses:{},nafot:{},count:0};
      const r=reg[key]; r.count++;
      const h=f.properties.height; if(h&&+h>0&&+h<5000)r.heights.push(+h);
      const g=f.properties.circumference_trunk; if(g&&+g>0&&+g<2000)r.girths.push(+g);
      const s=statusKey(f.properties.status); r.statuses[s]=(r.statuses[s]||0)+1;
      const n=f.properties._nafa||'לא ידוע'; r.nafot[n]=(r.nafot[n]||0)+1;
    });
  });
  Object.values(reg).forEach(r=>{
    r.h_mean=mean(r.heights);r.h_median=median(r.heights);r.h_std=stddev(r.heights);
    r.h_min=arrMin(r.heights);r.h_max=arrMax(r.heights);
    r.g_mean=mean(r.girths);r.g_median=median(r.girths);r.g_std=stddev(r.girths);
    r.g_min=arrMin(r.girths);r.g_max=arrMax(r.girths);
    const sk=Object.keys(r.statuses).sort((a,b)=>r.statuses[b]-r.statuses[a]);
    r.topStatus=sk[0]||'–';
  });
  return reg;
}

function renderSpeciesTab(){
  if(!_speciesReg)_speciesReg=buildSpeciesRegistry();
  if(!speciesInit){
    speciesInit=true;
    const fl=document.getElementById('speciesFilterLayer');
    if(!fl._evInit){fl._evInit=true;fl.addEventListener('change',renderSpeciesTable);}
    const si=document.getElementById('speciesSearch');
    if(!si._evInit){si._evInit=true;si.addEventListener('input',renderSpeciesTable);}
    const sc=document.getElementById('speciesDetailClose');
    if(sc&&!sc._evInit){sc._evInit=true;sc.addEventListener('click',()=>{document.getElementById('speciesDetail').style.display='none';});}
    /* Species comparison panel */
    const openCmp=document.getElementById('btnOpenSpeciesCmp');
    if(openCmp&&!openCmp._evInit){openCmp._evInit=true;openCmp.addEventListener('click',()=>{
      const p=document.getElementById('speciesCmpPanel');
      const open=p.style.display==='none'||!p.style.display;
      p.style.display=open?'block':'none';
      openCmp.textContent=open?t('species_compare_toggle_close'):t('species_compare_toggle_open');
      if(open)_populateSpeciesCmpSels();
    });}
    const cmpClose=document.getElementById('btnSpeciesCmpClose');
    if(cmpClose&&!cmpClose._evInit){cmpClose._evInit=true;cmpClose.addEventListener('click',()=>{
      document.getElementById('speciesCmpPanel').style.display='none';
      document.getElementById('btnOpenSpeciesCmp').textContent=t('species_compare_toggle_open');
    });}
    const runBtn=document.getElementById('btnRunSpeciesCmp');
    if(runBtn&&!runBtn._evInit){runBtn._evInit=true;runBtn.addEventListener('click',runSpeciesComparison);}
  }
  renderSpeciesTable();
}

function _populateSpeciesCmpSels(){
  const reg=_speciesReg; if(!reg)return;
  const entries=Object.entries(reg).sort((a,b)=>b[1].count-a[1].count);
  const opts=entries.map(([key,r])=>`<option value="${key}">${r.name} (${r.lkName})</option>`).join('');
  ['speciesCmpA','speciesCmpB'].forEach((id,i)=>{
    const sel=document.getElementById(id);
    if(sel){sel.innerHTML=opts;if(entries[i])sel.value=entries[i][0];}
  });
}

function runSpeciesComparison(){
  const reg=_speciesReg; if(!reg)return;
  const keyA=document.getElementById('speciesCmpA').value;
  const keyB=document.getElementById('speciesCmpB').value;
  if(!keyA||!keyB||keyA===keyB){document.getElementById('speciesCmpResult').innerHTML=`<div class="small">${t('choose_two_species')}</div>`;return;}
  const rA=reg[keyA], rB=reg[keyB];
  const featsA=(allFeats[rA.lk]||[]).filter(f=>(f.properties[rA.field]||'ללא שם')===rA.name);
  const featsB=(allFeats[rB.lk]||[]).filter(f=>(f.properties[rB.field]||'ללא שם')===rB.name);
  applyMapProjectionGroups([
    {lk:rA.lk,feats:featsA,color:'#2563eb'},
    {lk:rB.lk,feats:featsB,color:'#dc2626'},
  ],lh('מפה: השוואת מינים '+rA.name+' מול '+rB.name,'Map: species compare '+rA.name+' vs '+rB.name));
  const rows=[
    [t('object_count'),fmtI(rA.count),fmtI(rB.count)],
    [t('mean_h'),fmt(rA.h_mean),fmt(rB.h_mean)],
    [t('median_h'),fmt(rA.h_median),fmt(rB.h_median)],
    ['σ '+t('height'),fmt(rA.h_std),fmt(rB.h_std)],
    [t('min_h'),fmt(rA.h_min),fmt(rB.h_min)],
    [t('max_h'),fmt(rA.h_max),fmt(rB.h_max)],
    [t('mean_g'),fmt(rA.g_mean),fmt(rB.g_mean)],
    [t('median_g'),fmt(rA.g_median),fmt(rB.g_median)],
    ['σ '+t('girth'),fmt(rA.g_std),fmt(rB.g_std)],
    [t('dominant_status'),statusLabel(rA.topStatus),statusLabel(rB.topStatus)],
  ];
  document.getElementById('speciesCmpResult').innerHTML=`
    <div class="cmp-summary">
      <div class="cmp-summary-card side-a"><h5>${rA.name}</h5><div class="big-num">${fmtI(rA.count)}</div><div class="small">${lh(rA.lkName,LAYER_META[rA.lk].name_en)}</div></div>
      <div class="cmp-summary-card side-b"><h5>${rB.name}</h5><div class="big-num">${fmtI(rB.count)}</div><div class="small">${lh(rB.lkName,LAYER_META[rB.lk].name_en)}</div></div>
    </div>
    <table class="cmp-table" style="margin-top:10px">
      <thead><tr><th class="metric-name">${t('metric')}</th><th class="highlight-a">${rA.name}</th><th class="highlight-b">${rB.name}</th></tr></thead>
      <tbody>${rows.map(([m,a,b])=>`<tr><td class="metric-name">${m}</td><td>${a}</td><td>${b}</td></tr>`).join('')}</tbody>
    </table>`;
  const pc=cfgPlot();
  Plotly.newPlot('chartSpeciesCmpBox',[
    {type:'box',y:rA.heights,name:rA.name,marker:{color:'#3b82f6'},boxmean:true},
    {type:'box',y:rB.heights,name:rB.name,marker:{color:'#7c3aed'},boxmean:true},
    {type:'box',y:rA.girths,name:rA.name+' (היקף)',marker:{color:'#93c5fd'},boxmean:true,visible:'legendonly'},
    {type:'box',y:rB.girths,name:rB.name+' (היקף)',marker:{color:'#c4b5fd'},boxmean:true,visible:'legendonly'},
  ],layout(lh('גובה לפי מין – Box Plot','Height by Species – Box Plot'),'',lh('ס"מ','cm')),pc);
  Plotly.newPlot('chartSpeciesCmpBar',[
    {type:'bar',name:rA.name,x:[t('mean_h'),t('median_h'),t('mean_g')],y:[rA.h_mean||0,rA.h_median||0,rA.g_mean||0],marker:{color:'#3b82f6'}},
    {type:'bar',name:rB.name,x:[t('mean_h'),t('median_h'),t('mean_g')],y:[rB.h_mean||0,rB.h_median||0,rB.g_mean||0],marker:{color:'#7c3aed'}},
  ],layout(t('species_metrics_compare'),'',lh('ס"מ','cm'),{barmode:'group'}),pc);
  document.getElementById('speciesCmpPanel').scrollIntoView({behavior:'smooth',block:'nearest'});
}

function renderSpeciesTable(){
  const reg=_speciesReg; if(!reg)return;
  const lkFilter=document.getElementById('speciesFilterLayer').value;
  const q=document.getElementById('speciesSearch').value.trim().toLowerCase();
  let entries=Object.entries(reg).sort((a,b)=>b[1].count-a[1].count);
  if(lkFilter)entries=entries.filter(([,r])=>r.lk===lkFilter);
  if(q)entries=entries.filter(([,r])=>r.name.toLowerCase().includes(q));
  document.getElementById('speciesCount').textContent=entries.length+' '+lh('מינים','species');
  const el=document.getElementById('speciesTable');
  el.innerHTML=`<table class="species-table">
    <thead><tr>
      <th>${lh('מין','Species')}</th><th>${lh('קבוצה','Group')}</th><th>${lh('כמות','Count')}</th>
      <th>${lh('גובה ממוצע','Mean Height')}</th><th>${lh('חציון','Median')}</th><th>σ</th><th>${lh('מנ׳','Min')}</th><th>${lh('מקס׳','Max')}</th>
      <th>${lh('היקף ממוצע','Mean Girth')}</th><th>σ ${lh('היקף','Girth')}</th><th>${lh('מצב שכיח','Dominant Status')}</th>
    </tr></thead>
    <tbody>${entries.map(([key,r])=>`<tr class="species-row" data-key="${key}">
      <td class="species-name" style="border-right:3px solid ${r.lkColor};padding-right:6px">${r.name}</td>
      <td><span class="layer-badge" style="background:${r.lkColor}">${r.lkName}</span></td>
      <td><strong>${r.count}</strong></td>
      <td>${r.h_mean!=null?fmt(r.h_mean):'–'}</td>
      <td>${r.h_median!=null?fmt(r.h_median):'–'}</td>
      <td>${r.h_std!=null?fmt(r.h_std):'–'}</td>
      <td>${r.h_min!=null?fmt(r.h_min):'–'}</td>
      <td>${r.h_max!=null?fmt(r.h_max):'–'}</td>
      <td>${r.g_mean!=null?fmt(r.g_mean):'–'}</td>
      <td>${r.g_std!=null?fmt(r.g_std):'–'}</td>
      <td>${r.topStatus==='–' ? r.topStatus : statusLabel(r.topStatus)}</td>
    </tr>`).join('')}</tbody>
  </table>`;
  el.querySelectorAll('.species-row').forEach(row=>{
    row.addEventListener('click',()=>{
      el.querySelectorAll('.species-row').forEach(r=>r.classList.remove('selected'));
      row.classList.add('selected');
      showSpeciesDetail(row.dataset.key,reg);
    });
  });
}

function showSpeciesDetail(key,reg){
  const r=reg[key]; if(!r)return;
  const speciesFeats=(allFeats[r.lk]||[]).filter(f=>(f.properties[r.field]||'ללא שם')===r.name);
  applyMapProjectionGroups([
    {lk:r.lk,feats:speciesFeats,color:r.lkColor}
  ],lh('מפה: מין '+r.name,'Map: species '+r.name));
  const detail=document.getElementById('speciesDetail');
  detail.style.display='block';
  document.getElementById('speciesDetailTitle').textContent=r.name+' \u2014 '+lh(r.lkName,LAYER_META[r.lk].name_en)+' ('+r.count+' '+t('objects')+')';
  /* Purge old charts */
  ['chartSpeciesHeightHist','chartSpeciesGirthHist','chartSpeciesStatus','chartSpeciesNafot','chartSpeciesBoxNafot']
    .forEach(id=>{try{Plotly.purge(id);}catch(e){}document.getElementById(id).innerHTML='';});
  /* Stats grid */
  const nafotTop=Object.entries(r.nafot).filter(([n])=>n!=='לא ידוע').sort((a,b)=>b[1]-a[1]).slice(0,5).map(([n,c])=>n+' ('+c+')').join(', ');
  document.getElementById('speciesDetailStats').innerHTML=`
    <div class="ssg">
      <div class="ssg-card"><div class="ssg-val" style="color:${r.lkColor}">${r.count}</div><div class="ssg-lbl">כמות</div></div>
      <div class="ssg-card"><div class="ssg-val">${r.h_mean!=null?fmt(r.h_mean)+' ס"מ':'–'}</div><div class="ssg-lbl">גובה ממוצע</div></div>
      <div class="ssg-card"><div class="ssg-val">${r.h_median!=null?fmt(r.h_median)+' ס"מ':'–'}</div><div class="ssg-lbl">חציון גובה</div></div>
      <div class="ssg-card"><div class="ssg-val">${r.h_std!=null?fmt(r.h_std)+' ס"מ':'–'}</div><div class="ssg-lbl">σ גובה</div></div>
      <div class="ssg-card"><div class="ssg-val">${r.h_min!=null?fmt(r.h_min)+' ס"מ':'–'}</div><div class="ssg-lbl">מינ׳ גובה</div></div>
      <div class="ssg-card"><div class="ssg-val">${r.h_max!=null?fmt(r.h_max)+' ס"מ':'–'}</div><div class="ssg-lbl">מקס׳ גובה</div></div>
      <div class="ssg-card"><div class="ssg-val">${r.g_mean!=null?fmt(r.g_mean)+' ס"מ':'–'}</div><div class="ssg-lbl">היקף ממוצע</div></div>
      <div class="ssg-card"><div class="ssg-val">${r.g_median!=null?fmt(r.g_median)+' ס"מ':'–'}</div><div class="ssg-lbl">חציון היקף</div></div>
      <div class="ssg-card"><div class="ssg-val">${r.g_std!=null?fmt(r.g_std)+' ס"מ':'–'}</div><div class="ssg-lbl">σ היקף</div></div>
      <div class="ssg-card"><div class="ssg-val">${r.g_min!=null?fmt(r.g_min)+' ס"מ':'–'}</div><div class="ssg-lbl">מינ׳ היקף</div></div>
      <div class="ssg-card"><div class="ssg-val">${r.g_max!=null?fmt(r.g_max)+' ס"מ':'–'}</div><div class="ssg-lbl">מקס׳ היקף</div></div>
    </div>
    ${nafotTop?`<div class="small mt8"><strong>נפות מובילות:</strong> ${nafotTop}</div>`:''}`;
  const pc=cfgPlot();
  const STATUS_COLORS=['#16a34a','#f59e0b','#dc2626','#94a3b8','#475569','#0891b2'];
  /* Height histogram */
  if(r.heights.length>1)
    Plotly.newPlot('chartSpeciesHeightHist',[{type:'histogram',x:r.heights,nbinsx:25,marker:{color:r.lkColor,opacity:0.8}}],layout('התפלגות גובה – '+r.name,'גובה (ס"מ)','כמות'),pc);
  /* Girth histogram */
  if(r.girths.length>1)
    Plotly.newPlot('chartSpeciesGirthHist',[{type:'histogram',x:r.girths,nbinsx:25,marker:{color:'#065f46',opacity:0.8}}],layout('התפלגות היקף – '+r.name,'היקף (ס"מ)','כמות'),pc);
  /* Status pie */
  const sk=Object.keys(r.statuses);
  if(sk.length)
    Plotly.newPlot('chartSpeciesStatus',[{type:'pie',labels:sk.map(statusLabel),values:sk.map(k=>r.statuses[k]),hole:0.35,textinfo:'label+percent',marker:{colors:STATUS_COLORS}}],{title:{text:lh('מצב – ','Status – ')+r.name,font:{size:13}},margin:{t:36,b:4,l:4,r:4},paper_bgcolor:'transparent'},pc);
  /* Distribution by district */
  const nafotArr=Object.entries(r.nafot).filter(([n])=>n!=='לא ידוע').sort((a,b)=>b[1]-a[1]).slice(0,12);
  if(nafotArr.length)
    Plotly.newPlot('chartSpeciesNafot',[{type:'bar',x:nafotArr.map(([,c])=>c),y:nafotArr.map(([n])=>n),orientation:'h',marker:{color:r.lkColor},text:nafotArr.map(([,c])=>c),textposition:'outside'}],layout('פיזור לפי נפה – '+r.name,'כמות',''),pc);
  /* Box plot height by district */
  const boxData={};
  nafotArr.forEach(([n])=>boxData[n]=[]);
  (allFeats[r.lk]||[]).forEach(f=>{
    const tv=f.properties[r.field]||'ללא שם'; if(tv!==r.name)return;
    const n=f.properties._nafa||'לא ידוע';
    if(boxData[n]!==undefined){const h=f.properties.height;if(h&&+h>0&&+h<5000)boxData[n].push(+h);}
  });
  const boxTraces=nafotArr.map(([n],i)=>({type:'box',y:boxData[n]||[],name:n,marker:{color:TYPE_COLORS[i%TYPE_COLORS.length]},boxmean:true})).filter(t=>t.y.length>0);
  if(boxTraces.length>1)
    Plotly.newPlot('chartSpeciesBoxNafot',boxTraces,layout('גובה לפי נפה – '+r.name,'נפה','גובה (ס"מ)'),pc);
  detail.scrollIntoView({behavior:'smooth',block:'start'});
}

/* ── Analytics ──────────────────────────────────────────── */
function _buildAnalyticsSpeciesList(){
  const grp=document.getElementById('analyticsFilterGroup').value;
  const lkDefs=grp?SPECIES_LKDEFS.filter(d=>d.lk===grp):SPECIES_LKDEFS;
  const types=[...new Set(lkDefs.flatMap(({lk,field})=>(allFeats[lk]||[]).map(f=>f.properties[field]).filter(Boolean)))].sort();
  const dl=document.getElementById('analyticsSpeciesList');
  if(dl)dl.innerHTML=types.map(s=>`<option value="${s}">`).join('');
}

function _buildAnalyticsNafaList(){
  const nafaSet=new Set(nafotFeats.map(f=>f.properties?.Nafa).filter(n=>n&&n!=='לא ידוע'));
  const sel=document.getElementById('analyticsFilterNafa');
  if(sel){const prev=[...sel.selectedOptions].map(o=>o.value);sel.innerHTML=[...nafaSet].sort().map(n=>`<option value="${n}"${prev.includes(n)?' selected':''}>${n}</option>`).join('');}
}

function _getAnalyticsFeats(){
  const grp=document.getElementById('analyticsFilterGroup').value;
  const spec=document.getElementById('analyticsFilterSpecies').value.trim();
  const nafaSel=[...document.getElementById('analyticsFilterNafa').selectedOptions].map(o=>o.value);
  const lks=grp?[grp]:['fruit','carob','vegetation'];
  const feats={};
  lks.forEach(lk=>{
    const tf=LAYER_META[lk].typeField;
    feats[lk]=(allFeats[lk]||[]).filter(f=>{
      if(spec&&tf&&(f.properties[tf]||'')!==spec)return false;
      if(nafaSel.length&&!nafaSel.includes(f.properties._nafa||'לא ידוע'))return false;
      return true;
    });
  });
  return{lks,feats,grp,spec,nafaSel};
}

function renderAnalyticsCharts(){
  const{lks,feats,grp,spec,nafaSel}=_getAnalyticsFeats();
  const mainLk=grp||'fruit';
  const mainFeats=feats[mainLk]||[];
  const total=lks.reduce((s,lk)=>s+(feats[lk]||[]).length,0);
  if(total===0){
    clearMapProjection();
  } else {
    const statusColors={
      'טוב':'#16a34a',
      'כשיר':'#22c55e',
      'חולה':'#dc2626',
      'מת':'#334155',
      'לא ידוע':'#94a3b8',
    };
    const buckets={};
    lks.forEach(lk=>{
      (feats[lk]||[]).forEach(f=>{
        const st=statusKey(f.properties.status);
        if(!buckets[st])buckets[st]=[];
        buckets[st].push({lk,feat:f});
      });
    });
    const statusOrder=['טוב','כשיר','חולה','מת','לא ידוע'];
    const groups=statusOrder.filter(st=>buckets[st]?.length).map(st=>({
      label:statusLabel(st),
      color:statusColors[st],
      items:buckets[st],
    }));
    applyMapProjectionGroups(groups,lh('מפה: תוצאות מסנני אנליטיקה (בריא/חולה/מת...)','Map: analytics filter results (health status)'));
  }
  /* Status text */
  const stEl=document.getElementById('analyticsFilterStatus');
  if(stEl){
    const parts=[];
    if(grp)parts.push(lh('תחום: ','Group: ')+(LANG==='he'?LAYER_META[grp].name_he:LAYER_META[grp].name_en));
    if(spec)parts.push(lh('מין: ','Species: ')+spec);
    if(nafaSel.length)parts.push(lh('נפות: ','Districts: ')+nafaSel.join(', '));
    stEl.textContent=total.toLocaleString(LOCALE)+' '+lh('אובייקטים','objects')+(parts.length?' | '+parts.join(' | '):'');
  }
  const pc=cfgPlot();
  /* 1 – Type distribution */
  const tf=LAYER_META[mainLk].typeField;
  const td={}; mainFeats.forEach(f=>{const v=(tf?f.properties[tf]||'ללא שם':'–');td[v]=(td[v]||0)+1;});
  const tKeys=Object.keys(td).sort((a,b)=>td[b]-td[a]);
  Plotly.newPlot('chartTypeDist',[{type:'bar',x:tKeys,y:tKeys.map(k=>td[k]),marker:{color:tKeys.map((_,i)=>TYPE_COLORS[i%TYPE_COLORS.length])},text:tKeys.map(k=>td[k]),textposition:'outside'}],layout('התפלגות סוגים — '+(grp?(LANG==='he'?LAYER_META[grp].name_he:LAYER_META[grp].name_en):lh('כל התחומים','All groups')),'סוג','כמות'),pc);
  /* 2 – Height histogram */
  const hArr=mainFeats.map(f=>+f.properties.height).filter(v=>v>0&&v<5000);
  if(hArr.length)Plotly.newPlot('chartHeightDist',[{type:'histogram',x:hArr,nbinsx:30,marker:{color:LAYER_META[mainLk].color,opacity:0.75}}],layout('התפלגות גובה','גובה (ס"מ)','כמות'),pc);
  /* 3 – Girth histogram */
  const gArr=mainFeats.map(f=>+f.properties.circumference_trunk).filter(v=>v>0&&v<2000);
  if(gArr.length)Plotly.newPlot('chartGirthDist',[{type:'histogram',x:gArr,nbinsx:30,marker:{color:'#065f46',opacity:0.75}}],layout('התפלגות היקף גזע','היקף (ס"מ)','כמות'),pc);
  /* 4 – Box plot height by top types */
  const topTypes=tKeys.slice(0,8);
  const boxTraces=topTypes.map((tv,i)=>({type:'box',y:mainFeats.filter(f=>(tf?f.properties[tf]||'ללא שם':'–')===tv).map(f=>f.properties.height).filter(v=>v&&v>0&&v<5000),name:tv,marker:{color:TYPE_COLORS[i%TYPE_COLORS.length]}})).filter(t=>t.y.length>0);
  if(boxTraces.length)Plotly.newPlot('chartHeightBox',boxTraces,layout('גובה לפי סוג','סוג','גובה (ס"מ)'),pc);
  /* 5 – Status */
  const sd={}; mainFeats.forEach(f=>{const v=statusKey(f.properties.status);sd[v]=(sd[v]||0)+1;});
  const sk=Object.keys(sd),sv=sk.map(k=>sd[k]);
  if(sk.length)Plotly.newPlot('chartStatusDist',[{type:'bar',x:sk.map(statusLabel),y:sv,marker:{color:['#16a34a','#f59e0b','#dc2626','#94a3b8','#475569']},text:sv,textposition:'outside'}],layout('מצב',t('status'),'כמות'),pc);
  /* 6 – Heatmap layer × status */
  const statuses=['טוב','כשיר','חולה','מת','לא ידוע'];
  const zData=lks.map(lk=>statuses.map(sv=>(feats[lk]||[]).filter(f=>statusKey(f.properties.status)===sv).length));
  if(zData.some(row=>row.some(v=>v>0)))
    Plotly.newPlot('chartHeatLayer',[{type:'heatmap',z:zData,x:statuses.map(statusLabel),y:lks.map(lk=>lh(LAYER_META[lk].name_he,LAYER_META[lk].name_en)),colorscale:'YlGn',showscale:true}],layout(lh('מטריצת מצב × שכבה','Status × Layer matrix'),t('status'),t('layer')),pc);
  /* 7 – Scatter height vs girth */
  const scH=[],scG=[],scT=[];
  mainFeats.forEach(f=>{if(f.properties.height>0&&f.properties.circumference_trunk>0){scH.push(f.properties.height);scG.push(f.properties.circumference_trunk);scT.push(tf?f.properties[tf]||'':'');}});
  const scTypes=[...new Set(scT)];
  const scTraces=scTypes.slice(0,8).map((tv,i)=>{const idx=scT.map((v,j)=>v===tv?j:-1).filter(j=>j>=0);return{type:'scatter',mode:'markers',name:tv,x:idx.map(j=>scH[j]),y:idx.map(j=>scG[j]),marker:{color:TYPE_COLORS[i%TYPE_COLORS.length],size:5,opacity:0.6}};});
  if(scTraces.length)Plotly.newPlot('chartScatterHG',scTraces,layout('גובה vs. היקף גזע','גובה (ס"מ)','היקף (ס"מ)'),pc);
  /* 8 – Violin */
  const vTraces=topTypes.slice(0,6).map((tv,i)=>({type:'violin',y:mainFeats.filter(f=>(tf?f.properties[tf]||'ללא שם':'–')===tv).map(f=>f.properties.height).filter(v=>v&&v>0&&v<5000),name:tv,box:{visible:true},meanline:{visible:true},marker:{color:TYPE_COLORS[i%TYPE_COLORS.length]}})).filter(t=>t.y.length>0);
  if(vTraces.length)Plotly.newPlot('chartViolinH',vTraces,layout('גובה (ויולין) לפי סוג','סוג','גובה (ס"מ)'),pc);
}

function updateAnalytics(){
  if(!analyticsRendered){
    analyticsRendered=true;
    _buildAnalyticsSpeciesList();
    _buildAnalyticsNafaList();
    /* Wire controls with _evInit guards */
    const grpEl=document.getElementById('analyticsFilterGroup');
    if(!grpEl._evInit){grpEl._evInit=true;grpEl.addEventListener('change',()=>{_buildAnalyticsSpeciesList();renderAnalyticsCharts();});}
    const spEl=document.getElementById('analyticsFilterSpecies');
    if(!spEl._evInit){spEl._evInit=true;
      spEl.addEventListener('change',renderAnalyticsCharts);
      spEl.addEventListener('input',()=>{
        const v=spEl.value.trim();
        const dl=document.getElementById('analyticsSpeciesList');
        const opts=dl?[...dl.options].map(o=>o.value):[];
        if(!v||opts.includes(v))renderAnalyticsCharts();
      });
    }
    const nafaEl=document.getElementById('analyticsFilterNafa');
    if(nafaEl&&!nafaEl._evInit){nafaEl._evInit=true;nafaEl.addEventListener('change',renderAnalyticsCharts);}
    const applyBtn=document.getElementById('btnAnalyticsApply');
    if(applyBtn&&!applyBtn._evInit){applyBtn._evInit=true;applyBtn.addEventListener('click',renderAnalyticsCharts);}
    const resetBtn=document.getElementById('btnAnalyticsReset');
    if(resetBtn&&!resetBtn._evInit){resetBtn._evInit=true;resetBtn.addEventListener('click',()=>{
      document.getElementById('analyticsFilterGroup').value='';
      document.getElementById('analyticsFilterSpecies').value='';
      const nafaSel=document.getElementById('analyticsFilterNafa');
      [...nafaSel.options].forEach(o=>o.selected=false);
      _buildAnalyticsSpeciesList();
      renderAnalyticsCharts();
    });}
  }
  renderAnalyticsCharts();
}

/* Linear regression helper */
function linearReg(xs,ys){
  const n=Math.min(xs.length,ys.length);
  if(n<3)return null;
  let sx=0,sy=0,sxy=0,sxx=0;
  for(let i=0;i<n;i++){sx+=xs[i];sy+=ys[i];sxy+=xs[i]*ys[i];sxx+=xs[i]*xs[i];}
  const den=n*sxx-sx*sx;
  if(!den)return null;
  const slope=(n*sxy-sx*sy)/den;
  const intercept=(sy-slope*sx)/n;
  return{slope,intercept};
}

/* ── Advanced ───────────────────────────────────────────── */
function updateAdvanced(){
  if(advancedRendered)return;
  advancedRendered=true;

  /* CDF – height + girth */
  const hSort=fieldArr('fruit','height').filter(v=>v>0&&v<5000).sort((a,b)=>a-b);
  const gSort=fieldArr('fruit','circumference_trunk').filter(v=>v>0&&v<2000).sort((a,b)=>a-b);
  if(hSort.length){
    Plotly.newPlot('chartCDF',[
      {type:'scatter',x:hSort,y:hSort.map((_,i)=>(i+1)/hSort.length),mode:'lines',name:'גובה',line:{color:'#2563eb',width:2}},
      {type:'scatter',x:gSort,y:gSort.map((_,i)=>(i+1)/gSort.length),mode:'lines',name:'היקף',line:{color:'#059669',width:2},xaxis:'x2'},
    ],{
      title:{text:'CDF – גובה (כחול) והיקף (ירוק) — עצי פרי',font:{size:13}},
      xaxis:{title:'גובה (ס"מ)',automargin:true},
      xaxis2:{title:'היקף (ס"מ)',overlaying:'x',side:'top',showgrid:false,automargin:true},
      yaxis:{title:'F(x)'},
      margin:{t:44,b:44,l:48,r:12},paper_bgcolor:'transparent',plot_bgcolor:'#f8fafc',
      legend:{orientation:'h',y:-0.3},
    },cfgPlot());
  }

  /* Lorenz */
  if(hSort.length){
    const sum=hSort.reduce((s,v)=>s+v,0);
    let cum=0; const lx=[0],ly=[0];
    hSort.forEach((v,i)=>{cum+=v;lx.push((i+1)/hSort.length);ly.push(cum/sum);});
    const gini=(1-2*ly.reduce((s,v,i)=>s+(ly[i-1]!=null?(v+ly[i-1])*(lx[i]-(lx[i-1]||0)):0),0)).toFixed(3);
    Plotly.newPlot('chartLorenz',[
      {type:'scatter',x:lx,y:ly,mode:'lines',name:'Lorenz',line:{color:'#dc2626',width:2}},
      {type:'scatter',x:[0,1],y:[0,1],mode:'lines',name:'שוויון מוחלט',line:{color:'#94a3b8',dash:'dash'}},
    ],layout('עקומת Lorenz – גובה עצי פרי  |  Gini ≈ '+gini,'Cum. % עצים','Cum. % גובה'),cfgPlot());
  }

  /* Species richness per district (replaces naive area chart) */
  const nafaSpecies={};
  SPECIES_LKDEFS.forEach(({lk,field})=>{
    (allFeats[lk]||[]).forEach(f=>{
      const n=f.properties._nafa||'לא ידוע'; if(n==='לא ידוע')return;
      const s=f.properties[field]||'ללא שם';
      if(!nafaSpecies[n])nafaSpecies[n]={species:new Set(),fruit:new Set(),carob:new Set(),vegetation:new Set()};
      nafaSpecies[n].species.add(lk+'::'+s);
      nafaSpecies[n][lk]&&nafaSpecies[n][lk].add(s);
    });
  });
  const richSorted=Object.keys(nafaSpecies)
    .sort((a,b)=>nafaSpecies[b].species.size-nafaSpecies[a].species.size).slice(0,15);
  if(richSorted.length){
    Plotly.newPlot('chartBustanProfile',[
      {type:'bar',name:'עצי פרי',y:richSorted,x:richSorted.map(n=>nafaSpecies[n].fruit?.size||0),orientation:'h',marker:{color:'#16a34a'}},
      {type:'bar',name:'עצי סרק',y:richSorted,x:richSorted.map(n=>nafaSpecies[n].carob?.size||0),orientation:'h',marker:{color:'#8b6f47'}},
      {type:'bar',name:'צמחיה',y:richSorted,x:richSorted.map(n=>nafaSpecies[n].vegetation?.size||0),orientation:'h',marker:{color:'#65a30d'}},
    ],layout('עושר מינים לפי נפה (מינים ייחודיים)','מינים ייחודיים','נפה',{barmode:'stack'}),cfgPlot());
  }

  /* Correlation – height vs girth with regression line */
  const cH=fieldArr('fruit','height').filter(v=>v>0&&v<5000).slice(0,800);
  const cG=fieldArr('fruit','circumference_trunk').filter(v=>v>0&&v<2000).slice(0,800);
  const maxL=Math.min(cH.length,cG.length);
  if(maxL>10){
    const reg=linearReg(cH.slice(0,maxL),cG.slice(0,maxL));
    const regTraces=[{type:'scatter',mode:'markers',name:'מדידות',x:cH.slice(0,maxL),y:cG.slice(0,maxL),marker:{color:'#7c3aed',size:4,opacity:0.5}}];
    if(reg){
      const xs=[Math.min(...cH.slice(0,maxL)),Math.max(...cH.slice(0,maxL))];
      regTraces.push({type:'scatter',mode:'lines',name:`קו מגמה (y=${reg.slope.toFixed(2)}x${reg.intercept>=0?'+':''} ${reg.intercept.toFixed(0)})`,x:xs,y:xs.map(x=>reg.slope*x+reg.intercept),line:{color:'#dc2626',width:2,dash:'dot'}});
    }
    Plotly.newPlot('chartCorrelation',regTraces,layout('מתאם גובה – היקף גזע (פרי) + קו מגמה','גובה (ס"מ)','היקף (ס"מ)'),cfgPlot());
  }

  /* Grouped bar: type counts by layer */
  const lks3=['fruit','carob','vegetation'];
  const allTypesMerged=[...new Set(lks3.flatMap(lk=>Object.keys(typeDist(lk))))].slice(0,12);
  Plotly.newPlot('chartTypeByBustan',lks3.map((lk,i)=>{
    const dist=typeDist(lk);
    return{type:'bar',name:lh(LAYER_META[lk].name_he,LAYER_META[lk].name_en),x:allTypesMerged,y:allTypesMerged.map(tv=>dist[tv]||0),marker:{color:LAYER_META[lk].color}};
  }),layout('התפלגות סוגים לפי שכבה','סוג','כמות',{barmode:'group'}),cfgPlot());

  /* Size class by girth – with estimated age annotation */
  const gAll=fieldArr('fruit','circumference_trunk').filter(v=>v>0&&v<2000);
  const classes=['0–30','30–60','60–100','100–150','150–300','>300'];
  const ageHints=['שתיל / צעיר (~1–5 שנים)','גדילה (~5–15)','מבוגר (~15–30)','זקן (~30–60)','עתיק (~60–120)','עתיק מאוד (>120)'];
  const bounds=[[0,30],[30,60],[60,100],[100,150],[150,300],[300,9999]];
  const cnts=bounds.map(([mn,mx])=>gAll.filter(v=>v>=mn&&v<mx).length);
  Plotly.newPlot('chartSizeClass',[{
    type:'bar',x:classes,y:cnts,
    marker:{color:['#86efac','#4ade80','#16a34a','#15803d','#166534','#052e16']},
    text:cnts.map((c,i)=>c?c+'\n'+ageHints[i]:''),
    textposition:'inside',textfont:{size:9},
    hovertext:cnts.map((c,i)=>classes[i]+': '+c+' – '+ageHints[i]),
    hoverinfo:'text',
  }],layout('מחלקות היקף גזע – הערכת גיל (עצי פרי)','מחלקה גזע (ס"מ)','כמות Esri עצים'),cfgPlot());

  /* Treemap */
  const td2=typeDist('fruit');
  const tdK=Object.keys(td2),tdV=tdK.map(k=>td2[k]);
  Plotly.newPlot('chartTreemapTypes',[{type:'treemap',labels:tdK,parents:tdK.map(()=>''),values:tdV,textinfo:'label+value+percent parent',marker:{colors:tdK.map((_,i)=>TYPE_COLORS[i%TYPE_COLORS.length])}}],{title:{text:'Treemap: סוגי עצי פרי',font:{size:13}},margin:{t:32,b:4,l:4,r:4}},cfgPlot());

  /* Radar status */
  const rLayers=['fruit','carob','vegetation'];
  const rSt=['טוב','כשיר','חולה','מת'];
  Plotly.newPlot('chartRadarStatus',rLayers.map((lk,i)=>{
    const vals=rSt.map(sv=>(allFeats[lk]||[]).filter(f=>statusKey(f.properties.status)===sv).length);
    return{type:'scatterpolar',r:[...vals,vals[0]],theta:[...rSt.map(statusLabel),statusLabel(rSt[0])],fill:'toself',name:lh(LAYER_META[lk].name_he,LAYER_META[lk].name_en),marker:{color:LAYER_META[lk].color},opacity:0.6};
  }),{title:{text:lh('רדאר מצבי אובייקטים לפי שכבה','Object status radar by layer'),font:{size:13}},polar:{radialaxis:{visible:true}},margin:{t:36,b:20,l:20,r:20}},cfgPlot());
}

/* ── Compare ────────────────────────────────────────────── */
let cmpInit=false;
function initCompareUI(){
  if(cmpInit)return; cmpInit=true;
  populateCmpSel('A');
  populateCmpSel('B');
  populateCmpSpaces('A');
  populateCmpSpaces('B');
  const tA=document.getElementById('cmpTypeA');
  const tB=document.getElementById('cmpTypeB');
  const btn=document.getElementById('btnCompare');
  if(!tA._evInit){tA._evInit=true;tA.addEventListener('change',()=>populateCmpSel('A'));}
  if(!tB._evInit){tB._evInit=true;tB.addEventListener('change',()=>populateCmpSel('B'));}
  if(!btn._evInit){btn._evInit=true;btn.addEventListener('click',runCompare);}
}

function populateCmpSpaces(side){
  const sel=document.getElementById('cmpSpaces'+side);
  if(!sel)return;
  const prev=[...sel.selectedOptions].map(o=>o.value);
  const spaces=[...new Set(nafotFeats.map(f=>f.properties?.Nafa||'לא ידוע'))]
    .filter(n=>n!=='לא ידוע').sort();
  sel.innerHTML=spaces.map(n=>`<option value="${n}"${prev.includes(n)?' selected':''}>${n}</option>`).join('');
}

function getCmpSpaces(side){
  const sel=document.getElementById('cmpSpaces'+side);
  if(!sel)return [];
  return [...sel.selectedOptions].map(o=>o.value);
}

function populateCmpSel(side){
  const typeEl=document.getElementById('cmpType'+side);
  const selEl=document.getElementById('cmpSel'+side);
  const type=typeEl.value;
  selEl.innerHTML='';
  if(type==='treetype'){
    /* All species from fruit + carob + vegetation */
    const types=[...new Set(SPECIES_LKDEFS.flatMap(({lk,field})=>(allFeats[lk]||[]).map(f=>f.properties[field]).filter(Boolean)))].sort();
    types.forEach(tv=>{const o=document.createElement('option');o.value=tv;o.textContent=tv;selEl.appendChild(o);});
  } else if(type==='layer'){
    LAYER_KEYS.forEach(lk=>{const o=document.createElement('option');o.value=lk;o.textContent=LANG==='he'?LAYER_META[lk].name_he:LAYER_META[lk].name_en;selEl.appendChild(o);});
  } else if(type==='district'){
    const nafot=[...new Set(nafotFeats.map(f=>f.properties?.Nafa||'לא ידוע'))].filter(n=>n!=='לא ידוע').sort();
    nafot.forEach(n=>{const o=document.createElement('option');o.value=n;o.textContent=n;selEl.appendChild(o);});
  }
}

function getSampleForCmpSide(side){
  const type=document.getElementById('cmpType'+side).value;
  const val=document.getElementById('cmpSel'+side).value;
  const spaces=getCmpSpaces(side);
  if(!val)return{label:'',feats:[],items:[]};
  const filterBySpace=items=>spaces.length?items.filter(({feat})=>spaces.includes(feat.properties._nafa||'לא ידוע')):items;
  if(type==='treetype'){
    /* Search across all species layers, not just fruit */
    const items=SPECIES_LKDEFS.flatMap(({lk,field})=>(allFeats[lk]||[])
      .filter(f=>(f.properties[field]||'')===val)
      .map(feat=>({lk,feat})));
    const filtered=filterBySpace(items);
    return{label:val+(spaces.length?` | ${spaces.join(', ')}`:''),feats:filtered.map(i=>i.feat),items:filtered};
  } else if(type==='layer'){
    const label=LANG==='he'?LAYER_META[val].name_he:LAYER_META[val].name_en;
    const items=(allFeats[val]||[]).map(feat=>({lk:val,feat}));
    const filtered=filterBySpace(items);
    return{label:label+(spaces.length?` | ${spaces.join(', ')}`:''),feats:filtered.map(i=>i.feat),items:filtered};
  } else if(type==='district'){
    /* Combine all tree layers filtered by district */
    const items=['fruit','carob','vegetation'].flatMap(lk=>(allFeats[lk]||[])
      .filter(f=>(f.properties._nafa||'לא ידוע')===val)
      .map(feat=>({lk,feat})));
    const filtered=filterBySpace(items);
    return{label:val+(spaces.length?` | ${spaces.join(', ')}`:''),feats:filtered.map(i=>i.feat),items:filtered};
  }
  return{label:'',feats:[],items:[]};
}

function computeStats(feats){
  const h=feats.map(f=>f.properties.height).filter(v=>v&&v>0&&v<5000).map(Number);
  const g=feats.map(f=>f.properties.circumference_trunk).filter(v=>v&&v>0&&v<2000).map(Number);
  return{count:feats.length,mean_h:mean(h),median_h:median(h),std_h:stddev(h),min_h:arrMin(h),max_h:arrMax(h),mean_g:mean(g),median_g:median(g),std_g:stddev(g),min_g:arrMin(g),max_g:arrMax(g),h,g};
}

function runCompare(){
  const A=getSampleForCmpSide('A'), B=getSampleForCmpSide('B');
  if(!A.feats.length||!B.feats.length){document.getElementById('cmpResult').innerHTML=`<div class="small">${t('no_data_compare')}</div>`;return;}
  applyMapProjectionGroups([
    {items:A.items,color:'#2563eb'},
    {items:B.items,color:'#dc2626'},
  ],lh('מפה: השוואה A/B','Map: compare A/B'));
  const sA=computeStats(A.feats), sB=computeStats(B.feats);
  const rows=[
    [t('object_count'),fmtI(sA.count),fmtI(sB.count)],
    [t('mean_h'),fmt(sA.mean_h),fmt(sB.mean_h)],
    [t('median_h'),fmt(sA.median_h),fmt(sB.median_h)],
    [t('std_h'),fmt(sA.std_h),fmt(sB.std_h)],
    [t('min_h'),fmt(sA.min_h),fmt(sB.min_h)],
    [t('max_h'),fmt(sA.max_h),fmt(sB.max_h)],
    [t('mean_g'),fmt(sA.mean_g),fmt(sB.mean_g)],
    [t('median_g'),fmt(sA.median_g),fmt(sB.median_g)],
    [t('std_g'),fmt(sA.std_g),fmt(sB.std_g)],
  ];
  document.getElementById('cmpResult').innerHTML=`
    <div class="cmp-summary">
      <div class="cmp-summary-card side-a"><h5>${A.label}</h5><div class="big-num">${fmtI(sA.count)}</div><div class="small">${t('objects')}</div></div>
      <div class="cmp-summary-card side-b"><h5>${B.label}</h5><div class="big-num">${fmtI(sB.count)}</div><div class="small">${t('objects')}</div></div>
    </div>
    <table class="cmp-table" style="margin-top:12px">
      <thead><tr><th class="metric-name">${t('metric')}</th><th class="highlight-a">${A.label}</th><th class="highlight-b">${B.label}</th></tr></thead>
      <tbody>${rows.map(([m,a,b])=>`<tr><td class="metric-name">${m}</td><td>${a}</td><td>${b}</td></tr>`).join('')}</tbody>
    </table>`;

  Plotly.newPlot('cmpChartBar',[
    {type:'bar',name:A.label,x:[t('mean_h'),t('mean_g')],y:[sA.mean_h||0,sA.mean_g||0],marker:{color:'#3b82f6'}},
    {type:'bar',name:B.label,x:[t('mean_h'),t('mean_g')],y:[sB.mean_h||0,sB.mean_g||0],marker:{color:'#7c3aed'}},
  ],layout(t('avg_compare'),'',lh('ס"מ','cm'),{barmode:'group'}),cfgPlot());

  const rMetrics=[t('count'),t('mean_h'),t('mean_g'),t('median_h'),t('max_h')];
  const rA=[sA.count||0,sA.mean_h||0,sA.mean_g||0,sA.median_h||0,sA.max_h||0];
  const rB=[sB.count||0,sB.mean_h||0,sB.mean_g||0,sB.median_h||0,sB.max_h||0];
  const norm=rMetrics.map((_,i)=>Math.max(rA[i],rB[i],1));
  Plotly.newPlot('cmpChartRadar',[
    {type:'scatterpolar',r:[...rA.map((v,i)=>v/norm[i]),rA[0]/norm[0]],theta:[...rMetrics,rMetrics[0]],fill:'toself',name:A.label,marker:{color:'#3b82f6'}},
    {type:'scatterpolar',r:[...rB.map((v,i)=>v/norm[i]),rB[0]/norm[0]],theta:[...rMetrics,rMetrics[0]],fill:'toself',name:B.label,marker:{color:'#7c3aed'}},
  ],{title:{text:t('radar_norm'),font:{size:13}},polar:{radialaxis:{visible:true,range:[0,1]}},margin:{t:36,b:4,l:4,r:4}},cfgPlot());

  Plotly.newPlot('cmpChartBox',[
    {type:'box',y:sA.h,name:A.label,marker:{color:'#3b82f6'},boxmean:true},
    {type:'box',y:sB.h,name:B.label,marker:{color:'#7c3aed'},boxmean:true},
  ],layout(t('height_box'),'',t('height')),cfgPlot());

  Plotly.newPlot('cmpChartHist',[
    {type:'histogram',x:sA.h,name:A.label,opacity:0.7,marker:{color:'#3b82f6'},nbinsx:25},
    {type:'histogram',x:sB.h,name:B.label,opacity:0.7,marker:{color:'#7c3aed'},nbinsx:25},
  ],layout(t('height_hist'),t('height'),t('count'),{barmode:'overlay'}),cfgPlot());

  Plotly.newPlot('cmpChartScatter',[
    {type:'scatter',mode:'markers',x:sA.h,y:sA.g,name:A.label,marker:{color:'#3b82f6',size:5,opacity:0.6}},
    {type:'scatter',mode:'markers',x:sB.h,y:sB.g,name:B.label,marker:{color:'#7c3aed',size:5,opacity:0.6}},
  ],layout(t('height_vs_girth'),t('height'),t('girth')),cfgPlot());
}

/* Localize remaining hardcoded chart text fragments when switching to English */
function localizeChartText(txt){
  if(LANG==='he' || txt==null) return txt;
  let out=String(txt);
  const pairs=[
    ['התפלגות','Distribution'],['גובה','Height'],['היקף','Girth'],['גזע','Trunk'],
    ['כמות','Count'],['שכבה','Layer'],['שכבות','Layers'],['סוג','Type'],['סוגים','Types'],
    ['ממוצע','Mean'],['חציון','Median'],['סטיית תקן','Std Dev'],['מינ׳','Min'],['מקס׳','Max'],
    ['נפה','District'],['נפות','Districts'],['מינים','Species'],['מין','Species'],
    ['מצב','Status'],['עצי פרי','Fruit Trees'],['עצי סרק','Non-Fruit Trees'],['צמחיה','Vegetation'],
    ['השוואת','Comparison'],['רדאר','Radar'],['גובה vs. היקף','Height vs. Girth'],
    ['עקומת','Curve'],['מחלקות','Classes'],['הערכת גיל','Age Estimate']
  ];
  pairs.forEach(([he,en])=>{ out=out.split(he).join(en); });
  return out;
}

/* ── Plotly helpers ─────────────────────────────────────── */
function layout(title,xLabel='',yLabel='',extra={}){
  return Object.assign({
    title:{text:localizeChartText(title),font:{size:13}},
    xaxis:{title:localizeChartText(xLabel),automargin:true,tickfont:{size:11}},
    yaxis:{title:localizeChartText(yLabel),automargin:true,tickfont:{size:11}},
    margin:{t:36,b:44,l:48,r:12},
    paper_bgcolor:'transparent',plot_bgcolor:'#f8fafc',
    font:{family:'Segoe UI,Tahoma,Arial,sans-serif',size:12},
    legend:{orientation:'h',y:-0.25,font:{size:11}},
  },extra);
}
function cfgPlot(){return{responsive:true,displayModeBar:false};}

/* ── Search ─────────────────────────────────────────────── */
function setupSearch(){
  document.getElementById('searchObj').addEventListener('input',e=>{
    const q=e.target.value.trim().toLowerCase();
    if(!q){LAYER_KEYS.forEach(lk=>renderLayerOnMap(lk));return;}
    LAYER_KEYS.forEach(lk=>{
      if(mapLayers[lk])mapLayers[lk].eachLayer(l=>{
        if(!l.feature)return;
        const txt=JSON.stringify(Object.values(l.feature.properties||{})).toLowerCase();
        const el=l.getElement?l.getElement():null;
        if(el)el.style.opacity=txt.includes(q)?'1':'0.12';
      });
    });
  });
}

/* ── Export CSV ─────────────────────────────────────────── */
function exportCSV(){
  const lines=[LANG==='he'
    ? '\uFEFFשכבה,OBJECTID,סוג,גובה,היקף,מצב,תיאור'
    : '\uFEFFLayer,OBJECTID,Type,Height,Girth,Status,Description'];
  LAYER_KEYS.forEach(lk=>{
    const meta=LAYER_META[lk];
    (allFeats[lk]||[]).forEach(f=>{
      const p=f.properties;
      const tv=meta.typeField?(p[meta.typeField]||''):'';
      lines.push([(LANG==='he'?meta.name_he:meta.name_en),p.OBJECTID,tv,p.height||'',p.circumference_trunk||'',statusLabel(p.status),(p.Description||'').replace(/,/g,' ')].join(','));
    });
  });
  const blob=new Blob([lines.join('\n')],{type:'text/csv;charset=utf-8'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=LANG==='he'?'bustanim_data_he.csv':'bustanim_data_en.csv';a.click();
}

/* ── Language ────────────────────────────────────────────── */
function applyLang(){
  document.documentElement.lang=LANG;
  document.documentElement.dir=LANG==='he'?'rtl':'ltr';
  const setTxt=(id,val)=>{const el=document.getElementById(id);if(el)el.textContent=val;};
  const btnToggleLang=document.getElementById('btnToggleLang');
  if(btnToggleLang)btnToggleLang.textContent=LANG==='he'?'English':'עברית';
  document.getElementById('floatTitle').textContent=t('layers_map');
  document.getElementById('searchObj').placeholder=t('search');
  document.getElementById('btnShowAll').textContent=t('show_all');
  document.getElementById('btnFit').textContent=t('zoom_fit');
  document.getElementById('btnClearSel').textContent=t('clear_sel');
  document.getElementById('btnExportCSV').textContent=t('export_csv');
  const hdr=document.getElementById('hdrTitle');
  if(hdr)hdr.innerHTML=`${t('title')} <small style="font-size:0.7em;opacity:0.75">(v2)</small>`;
  setTxt('coordsLabel',t('coords'));
  setTxt('tabOverview',t('overview'));
  setTxt('tabBustans',t('bustans'));
  setTxt('tabDistricts',t('districts'));
  setTxt('tabSpecies',t('tab_species'));
  setTxt('tabAnalytics',t('analytics'));
  setTxt('tabAdvanced',t('advanced'));
  setTxt('tabCompare',t('compare'));
  document.getElementById('kLbl1').textContent=t('fruit_trees');
  document.getElementById('kLbl2').textContent=t('carob_trees');
  document.getElementById('kLbl3').textContent=t('nafot');
  document.getElementById('kLbl4').textContent=t('vegetation');
  document.getElementById('kLbl5').textContent=t('ag_tools');
  document.getElementById('kLbl6').textContent=t('terraces');
  document.getElementById('kLbl7').textContent=t('avg_height_fruit');
  document.getElementById('kLbl8').textContent=t('avg_girth_fruit');
  document.getElementById('kLbl9').textContent=t('fruit_type_count');
  setTxt('districtsIntro',t('districts_intro'));
  setTxt('distGrpAll',t('grp_all'));
  setTxt('distGrpFruit',t('fruit_trees'));
  setTxt('distGrpCarob',t('carob_trees'));
  setTxt('distGrpVegetation',t('vegetation'));
  setTxt('districtDrillHint',t('click_species_detail'));
  setTxt('districtsAddHint',t('districts_add_hint'));
  setTxt('btnAddDistrictPolygon',t('districts_add_link'));
  setTxt('btnExportDistrictsJSON',t('districts_export_json'));
  setTxt('btnImportDistrictsJSON',t('districts_import_json'));

  setTxt('speciesGroupAll',t('all_groups'));
  setTxt('speciesGroupFruit',t('fruit_trees'));
  setTxt('speciesGroupCarob',t('carob_trees'));
  setTxt('speciesGroupVegetation',t('vegetation'));
  const speciesSearch=document.getElementById('speciesSearch');
  if(speciesSearch)speciesSearch.placeholder=lh('חפש מין...','Search species...');
  setTxt('btnOpenSpeciesCmp',t('species_compare_toggle_open'));
  setTxt('speciesCmpTitle',t('species_compare'));
  setTxt('speciesCmpLblA',t('species_a'));
  setTxt('speciesCmpLblB',t('species_b'));
  setTxt('btnRunSpeciesCmp',t('compare_btn'));

  setTxt('analyticsLblGroup',t('filter_group'));
  setTxt('analyticsLblSpecies',t('filter_species_ac'));
  setTxt('analyticsLblDistricts',t('filter_districts'));
  setTxt('analyticsGroupAll',t('all_domains'));
  setTxt('analyticsGroupFruit',t('fruit_trees'));
  setTxt('analyticsGroupCarob',t('carob_trees'));
  setTxt('analyticsGroupVegetation',t('vegetation'));
  const afs=document.getElementById('analyticsFilterSpecies');
  if(afs)afs.placeholder=lh('הקלד מין...','Type species...');
  setTxt('btnAnalyticsApply',t('apply'));
  setTxt('btnAnalyticsReset',t('reset'));
  setTxt('advancedIntro',t('advanced_intro'));

  setTxt('compareIntro',t('compare_intro'));
  setTxt('labelSideA',t('side_type_a'));
  setTxt('labelSideB',t('side_type_b'));
  setTxt('cmpTypeATree',t('tree_type_opt'));
  setTxt('cmpTypeALayer',t('layer_opt'));
  setTxt('cmpTypeADistrict',t('district_opt'));
  setTxt('cmpTypeBTree',t('tree_type_opt'));
  setTxt('cmpTypeBLayer',t('layer_opt'));
  setTxt('cmpTypeBDistrict',t('district_opt'));
  setTxt('cmpSpacesLabelA',t('spaces_optional'));
  setTxt('cmpSpacesLabelB',t('spaces_optional'));
  setTxt('btnCompare',t('compare_btn'));
  setTxt('bustansIntro',t('bustans_intro'));
  const bustanSearchEl=document.getElementById('bustanSearch');
  if(bustanSearchEl)bustanSearchEl.placeholder=t('bustan_search');

  const groupBase=document.getElementById('bmGroupBase');
  const groupMix=document.getElementById('bmGroupMix');
  if(groupBase)groupBase.label=LANG==='he'?groupBase.dataset.labelHe:groupBase.dataset.labelEn;
  if(groupMix)groupMix.label=LANG==='he'?groupMix.dataset.labelHe:groupMix.dataset.labelEn;

  /* Refresh compare selects to reflect layer names language */
  if(cmpInit){
    populateCmpSel('A');
    populateCmpSel('B');
    populateCmpSpaces('A');
    populateCmpSpaces('B');
  }
}

function setStatus(msg){document.getElementById('statusText').textContent=msg;}

/* ── main ────────────────────────────────────────────────── */
async function init(){
  initMap();
  loadCustomNafotFromStorage();

  document.getElementById('btnFloatToggle').addEventListener('click',e=>{
    const body=document.getElementById('floatBody');
    const collapsed=body.classList.toggle('collapsed');
    e.currentTarget.classList.toggle('collapsed',collapsed);
    e.currentTarget.setAttribute('aria-expanded',String(!collapsed));
  });
  document.getElementById('basemapSel').addEventListener('change',e=>setBasemap(e.target.value));
  document.getElementById('btnShowAll').addEventListener('click',()=>{
    LAYER_KEYS.forEach(lk=>{layerVis[lk]=true;});
    LAYER_KEYS.forEach(lk=>{typeVis[lk]={};});
    clearMapProjection(true);
    buildLayerToggles();
    renderAllLayers();
    updateReadyStatus();
  });
  document.getElementById('btnFit').addEventListener('click',fitAll);
  document.getElementById('btnClearSel').addEventListener('click',()=>{
    selectedFeat=null;
    document.getElementById('selectionDetail').innerHTML='';
    clearMapProjection(true);
    LAYER_KEYS.forEach(k=>{if(mapLayers[k])mapLayers[k].eachLayer(l=>{if(l.setStyle)l.setStyle({weight:1.2,color:'#fff'});});});
    renderAllLayers();
  });
  document.getElementById('btnExportCSV').addEventListener('click',exportCSV);
  const addPolygonLink=document.getElementById('btnAddDistrictPolygon');
  if(addPolygonLink&&!addPolygonLink._evInit){
    addPolygonLink._evInit=true;
    addPolygonLink.addEventListener('click',e=>{
      e.preventDefault();
      startCustomPolygonDraw();
    });
  }
  const exportBtn=document.getElementById('btnExportDistrictsJSON');
  if(exportBtn&&!exportBtn._evInit){
    exportBtn._evInit=true;
    exportBtn.addEventListener('click',()=>exportCustomNafotAsJSON());
  }
  const importBtn=document.getElementById('btnImportDistrictsJSON');
  const importInput=document.getElementById('districtsJsonFile');
  if(importBtn&&importInput&&!importBtn._evInit){
    importBtn._evInit=true;
    importBtn.addEventListener('click',()=>importInput.click());
    importInput.addEventListener('change',async ()=>{
      const file=importInput.files&&importInput.files[0];
      if(!file)return;
      const txt=await file.text();
      importCustomNafotFromJSONText(txt);
      importInput.value='';
    });
  }
  const btnToggleLang=document.getElementById('btnToggleLang');
  if(btnToggleLang&&!btnToggleLang._evInit){
    btnToggleLang._evInit=true;
    btnToggleLang.addEventListener('click',()=>{
      LANG=LANG==='he'?'en':'he';
      analyticsRendered=false;advancedRendered=false;cmpInit=false;speciesInit=false;districtChartsRendered=false;_speciesReg=null;
      applyLang();buildLayerToggles();updateOverview();
    });
  }
  document.getElementById('objModalClose').addEventListener('click',()=>document.getElementById('objModal').style.display='none');
  document.getElementById('objModal').addEventListener('click',e=>{if(e.target===e.currentTarget)document.getElementById('objModal').style.display='none';});
  
  /* Photo lightbox – click overlay to close */
  const photoPopup=document.getElementById('photoPopup');
  if(photoPopup){
    photoPopup.addEventListener('click',e=>{if(e.target===e.currentTarget)photoPopup.style.display='none';});
  }
  /* Close photo lightbox on Escape */
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&photoPopup)photoPopup.style.display='none';});

  setupTabs();
  setupSearch();
  LAYER_KEYS.forEach(lk=>{layerVis[lk]=true;typeVis[lk]={};});

  await loadAll();

  /* Invalidate type colour caches now that data is loaded */
  Object.keys(_tcCache).forEach(k=>delete _tcCache[k]);

  renderAllLayers();
  renderNafotOnMap(true);  /* Show district polygons on map */
  initNafotDrawTools();
  buildLayerToggles();
  updateOverview();
  applyLang();
  setTimeout(fitAll,400);
}

document.addEventListener('DOMContentLoaded',init);