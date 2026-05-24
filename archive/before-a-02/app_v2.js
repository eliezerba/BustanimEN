/* ============================================================
   Bustanim Research Dashboard  –  app_v2.js  (v2 – Full English)
   Loads 6 ArcGIS FeatureServer layers, renders Leaflet map,
   Plotly charts and comparison tools.
   v2: complete English translation of data values (tree types,
       district names, agricultural tools, field labels).
   ============================================================ */
"use strict";

/* ── Language ─────────────────────────────────────────────── */
let LANG = 'en';
const TR = {
  he:{
    loading:'טוען נתונים...',
    ready:'מוכן',
    layers_map:'שכבות ומפה',
    english:'English',
    hebrew:'עברית',
    fruit_trees:'עצי פרי',
    carob_trees:'רשומות מקור אופציונליות',
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
    bustans_search:'חפש בוסתן...',
    bustans_zones:'אזורים',
    bustans_area:'שטח (ד״ש)',
    bustans_type:'סוג',
    bustans_survived:'שרד',
    bustans_total_area:'שטח כולל',
    bustans_chart_title:'שטח לפי סוג (ד״ש)',
  },
  en:{
    loading:'Loading data...',
    ready:'Ready',
    layers_map:'Layers & Map',
    english:'English',
    hebrew:'Hebrew',
    fruit_trees:'Orchard Fruit Trees',
    carob_trees:'Non-Orchard / Wild Tree Records',
    boundaries:'Orchards (Boundary)',
    vegetation:'Non-Orchard Trees',
    ag_tools:'Agricultural Installations',
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
    bustans:'Historical Orchard',
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
    tab_species:'Orchard Fruit Trees',
    districts_intro:'Object counts by modern Israeli administrative districts. Click a row to focus the map. This view is an administrative spatial summary, not a historical or ecological regional classification.',
    grp_all:'All',
    click_species_detail:'Click an orchard fruit tree name for detailed analysis',
    all_groups:'All groups',
    species_compare_toggle_open:'Orchard Fruit Tree Comparison ▾',
    species_compare_toggle_close:'Hide Orchard Fruit Tree Comparison ▴',
    species_compare:'Orchard Fruit Tree Comparison',
    species_a:'Orchard Fruit Tree A',
    species_b:'Orchard Fruit Tree B',
    filter_group:'Group',
    filter_species_ac:'Specific Orchard Fruit Tree (Autocomplete)',
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
    choose_two_species:'Choose two different orchard fruit trees',
    dominant_status:'Dominant Status',
    species_group:'Group',
    species_metrics_compare:'Metrics Comparison',
    avg_height_fruit:'Average Height (Orchard Fruit Trees)',
    avg_girth_fruit:'Average Girth (Orchard Fruit Trees)',
    fruit_type_count:'Orchard Fruit Tree Types',
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
    bustans_intro:'List of Historical Orchard records — click a record to view details on the map',
    bustans_search:'Search historical orchard...',
    bustans_zones:'Zones',
    bustans_area:'Area (Dunam)',
    bustans_type:'Type',
    bustans_survived:'Survived',
    bustans_total_area:'Total area',
    bustans_chart_title:'Area by Type (Dunam)',
  }
};
function t(k){ return TR[LANG][k] || k; }
function lh(he,en){ return en; }

const NO_DATA_LABEL = 'No data';
const NOT_AVAILABLE_LABEL = 'Not available';

/* ── API Config ─────────────────────────────────────────── */
const API_BASE = 'https://services5.arcgis.com/eJYUV73IZAY87Jwy/arcgis/rest/services/%D7%91%D7%95%D7%A1%D7%AA%D7%A0%D7%99%D7%9D_2_%D7%AA%D7%A6%D7%95%D7%92%D7%94/FeatureServer';
const BUSTANIM_LAYER_API = 'https://services5.arcgis.com/eJYUV73IZAY87Jwy/arcgis/rest/services/%D7%AA%D7%99%D7%97%D7%95%D7%9D_%D7%91%D7%95%D7%A1%D7%AA%D7%A0%D7%99%D7%9D_%D7%9C%D7%93%D7%95%D7%97_%D7%A1%D7%95%D7%A4%D7%99/FeatureServer/0';

const LAYER_META = {
  boundaries: { id:0, name_he:'בוסתנים (תיחום)', name_en:'Orchards',          color:'#2563eb', geom:'polygon', typeField:'Name',   hidden:true },
  fruit:      { id:1, name_he:'עצי פרי',          name_en:'Orchard Fruit Trees', color:'#16a34a', geom:'point',   typeField:'tree_type', displayGroup:'orchardFruitTrees' },
  carob:      { id:2, name_he:'עצי סרק',           name_en:'Non-Orchard / Wild Tree Records',   color:'#8b6f47', geom:'point',   typeField:'Tree_type', optional:true, defaultVisible:false, includeInDefaultAnalytics:false, collapsedByDefault:true, displayGroup:'optionalSourceLayers' },
  vegetation: { id:3, name_he:'צמחיה',             name_en:'Non-Orchard Trees', color:'#65a30d', geom:'point',   typeField:'tree_type', displayGroup:'nonOrchardTrees' },
  agtools:    { id:4, name_he:'כלים חקלאיים',      name_en:'Agricultural Installations', color:'#ea580c', geom:'point',   typeField:'Stationary_agricultural_facilit', displayGroup:'agriculturalInstallations' },
  terraces:   { id:5, name_he:'טרסות',             name_en:'Terraces',          color:'#7c3aed', geom:'line',    typeField:null, displayGroup:'agriculturalInstallations' },
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
/* Bustanim (report layer) state */
let bustanimFeats = [];       // features from report FeatureServer
let bustanimMapLayer = null;  // Leaflet layer for bustanim polygons
let selectedVillage = null;   // currently selected village name
const CUSTOM_NAFOT_STORAGE_KEY='bustanim_custom_nafot_v1';
let mapProjection = {
  active:false,
  keysByLayer:{},
  colorByKey:{},
  label:'',
};
let analyticsRendered=false;
let advancedRendered=false;
let displayGroupVis={
  orchardFruitTrees:true,
  nonOrchardTrees:false,
  agriculturalInstallations:false,
  optionalSourceLayers:false,
};

/* ── Statistics helpers ─────────────────────────────────── */
const fmt  = v => (v==null||isNaN(v)) ? NO_DATA_LABEL : (+v).toLocaleString('en-US',{maximumFractionDigits:1});
const fmtI = v => (v==null||isNaN(v)) ? '0' : Math.round(+v).toLocaleString('en-US');
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

/* ── Value Translation Tables (v2) ──────────────────────── */
const TREE_TYPE_EN = {
  /* Fruit trees (layer 1) */
  'זית':'Olive',          'תאנה':'Fig',           'רימון':'Pomegranate',
  'תמר':'Date Palm',      'גפן':'Grapevine',      'שקד':'Almond',
  'חרוב':'Carob',         'אגס':'Pear',           'תפוח':'Apple',
  'שזיף':'Plum',          'אגוז':'Walnut',         'הדר':'Citrus',
  'אפרסק':'Peach',        'חבוש':'Quince',        'גויבה':'Guava',
  'צבר':'Prickly Pear',   'תות':'Mulberry',       'משמש':'Apricot',
  /* Non-fruit trees (layer 2) */
  'אלה_אטלנטית':'Atlantic Pistachio',
  'אלה_מסטיק':'Mastic Pistachio',
  'אלה+ארץ-ישראל':'Palestine Pistacia',
  'אלון_מצוי':'Common Oak',
  'אלון_תבור':'Tabor Oak',
  'אשחר':'Styrax',        'אשל':'Tamarisk',
  'קטלב':'Storax',        'שיזף':'Jujube',        'שיטה':'Acacia',
  /* Vegetation (layer 3) */
  'אורן':'Pine',          'אקליפטוס':'Eucalyptus',
  'ברוש':'Cypress',       'צפצפה':'Poplar',       'שקמה':'Sycamore Fig',
  /* Common fallbacks */
  'אחר':'Other',          'ללא שם':'Unnamed',     'לא ידוע':'Unknown',
};
function normalizeTreeTypeKey(value){
  return String(value||'')
    .trim()
    .replace(/_/g,' ')
    .replace(/\s*\+\s*/g,'+')
    .replace(/\s+/g,' ')
    .toLowerCase();
}
const TREE_TYPE_EN_BY_NORM = Object.fromEntries(
  Object.entries(TREE_TYPE_EN).map(([k,v])=>[normalizeTreeTypeKey(k),v])
);
const AGTOOLS_EN = {
  'גת':'Wine Press',
  'בית בד':'Olive Press',
  'מחסן-אסם-ממגורה':'Storage',
  'מחסן':'Storage',
  'אסם':'Storage',
  'ממגורה':'Storage',
  'טרסה':'Terraces',
  'טרסות':'Terraces',
  'כבשן סיד':'Lime Kiln',
  'כבשן אחר':'Other Cultural Landscape Features',
  'ספלול':'Rock-cut Trough',
  'קולומבריום':'Columbarium',
  'תחנת קמח':'Flour Mill',
};
const NAFA_EN = {
  'ירושלים':'Jerusalem',
  'תל אביב - יפו':'Tel Aviv – Jaffa',
  'חיפה':'Haifa',
  'עכו':'Acre',
  'חדרה':'Hadera',
  'פתח תקווה':'Petah Tikva',
  'רמלה':'Ramla',
  'רחובות':'Rehovot',
  'באר שבע':'Beer Sheva',
  'צפת':'Safed',
  'יזרעאל':'Jezreel',
  'כנרת':'Kinneret',
  'השרון':'Ha-Sharon',
  'אשקלון':'Ashkelon',
  'רמת הגולן':'Golan Heights',
  'לא ידוע':'Unknown',
};
const nafaEnByHe = Object.create(null);

function normalizeFieldKey(k){
  return String(k||'').toLowerCase().replace(/[^a-z0-9]/g,'');
}

function getNafaEnglishFromProps(props){
  if(!props||typeof props!=='object')return '';
  const wanted=new Set([
    'areaen','areaenglish','nafaen','nafaenglish','districten','districtenglish','spaceen','spaceenglish'
  ]);
  for(const [k,v] of Object.entries(props)){
    if(v==null)continue;
    if(wanted.has(normalizeFieldKey(k))){
      const txt=String(v).trim();
      if(txt)return txt;
    }
  }
  return '';
}

/* ── Bustanim (report layer) description codes ──────────── */
const BUSTAN_DESC_EN  = {'C.':'Citrus','O.':'Orchard','Ol.':'Olive','V.':'Vine','Other':'Other'};
const BUSTAN_DESC_HE  = {'C.':'הדר','O.':'פרדס','Ol.':'זית','V.':'גפן','Other':'אחר'};
const BUSTAN_DESC_COLOR = {'C.':'#f59e0b','O.':'#16a34a','Ol.':'#78350f','V.':'#7c3aed','Other':'#6b7280'};
function bustanDescLabel(desc){
  if(!desc)return NOT_AVAILABLE_LABEL;
  return LANG==='he' ? (BUSTAN_DESC_HE[desc]||desc) : (BUSTAN_DESC_EN[desc]||desc);
}

function displayAgInstallationType(value){
  const raw=String(value ?? '').trim();
  if(!raw)return 'Other Cultural Landscape Features';
  const norm=raw.toLowerCase();
  if(raw==='ללא שם' || raw==='אחר' || raw==='Other' || norm==='unknown' || norm==='undefined' || norm==='null'){
    return 'Other Cultural Landscape Features';
  }
  return AGTOOLS_EN[raw] || 'Other Cultural Landscape Features';
}

function getLayerTypeValue(lk, feature){
  const tf=LAYER_META[lk]?.typeField;
  if(!tf)return '';
  return String(feature?.properties?.[tf]||'').trim();
}

function isPricklyPearValue(rawValue){
  const raw=String(rawValue||'').trim();
  const norm=normalizeTreeTypeKey(raw).replace(/\+/g,' ');
  return raw==='צבר' || norm==='prickly pear' || norm==='pricklypear';
}

function getDisplayGroupForFeature(layerKey, feature){
  if(layerKey==='fruit'){
    return isPricklyPearValue(getLayerTypeValue(layerKey,feature)) ? 'nonOrchardTrees' : 'orchardFruitTrees';
  }
  if(layerKey==='vegetation')return 'nonOrchardTrees';
  if(layerKey==='agtools' || layerKey==='terraces')return 'agriculturalInstallations';
  if(layerKey==='carob')return 'optionalSourceLayers';
  return layerKey;
}

/* Translate a data value based on layer key and current language */
function typeValueLabel(val, lk) {
  if (!val) return NOT_AVAILABLE_LABEL;
  if (LANG === 'he') return val;
  if (lk === 'agtools') return displayAgInstallationType(val);
  return TREE_TYPE_EN[val] || TREE_TYPE_EN_BY_NORM[normalizeTreeTypeKey(val)] || String(val);
}
/* Translate / transliterate a Nafa (district) name */
function nafaLabel(naf) {
  if (!naf) return NOT_AVAILABLE_LABEL;
  if (LANG === 'he') return naf;
  return nafaEnByHe[naf] || NAFA_EN[naf] || naf;
}
/* Shorthand unit */
function cmUnit() { return LANG === 'he' ? ' ס"מ' : ' cm'; }

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
function dateStr(ms){if(!ms)return NOT_AVAILABLE_LABEL;return new Date(ms).toLocaleDateString('en-US');}
function fieldArr(lk,field){return(allFeats[lk]||[]).map(f=>f.properties[field]).filter(v=>v!=null&&!isNaN(v)).map(Number);}

function normalizedLabel(s){
  return String(s||'').trim().toLowerCase();
}

function resolveSpeciesInput(input, lkDefs){
  const raw = String(input||'').trim();
  if(!raw)return '';
  const norm = normalizedLabel(raw);
  const candidates = new Set();
  (lkDefs||[]).forEach(({lk,field})=>{
    (allFeats[lk]||[]).forEach(f=>{
      const v = String(f.properties[field]||'').trim();
      if(v)candidates.add(v);
    });
  });
  const list=[...candidates];
  const exactRaw=list.find(v=>normalizedLabel(v)===norm);
  if(exactRaw)return exactRaw;
  const exactEn=list.find(v=>normalizedLabel(typeValueLabel(v,'fruit'))===norm || normalizedLabel(typeValueLabel(v,'carob'))===norm || normalizedLabel(typeValueLabel(v,'vegetation'))===norm);
  return exactEn || '';
}

/* Feature display name */
function featLabel(feat,lk){
  const p=feat.properties; const meta=LAYER_META[lk];
  if(!meta)return'#'+p.OBJECTID;
  const tf=meta.typeField;
  const rawVal=tf&&p[tf];
  if(!rawVal)return LANG==='he'?meta.name_he:meta.name_en;
  return typeValueLabel(rawVal,lk);
}

/* Type distribution for a layer */
function typeDist(lk){
  const tf=LAYER_META[lk].typeField; if(!tf)return{};
  const counts={};
  (allFeats[lk]||[]).forEach(f=>{const v=(f.properties[tf]||'ללא שם');counts[v]=(counts[v]||0)+1;});
  return counts;
}

/* Visible features */
function visibleFeats(lk){
  const tf=LAYER_META[lk].typeField;
  return(allFeats[lk]||[]).filter(f=>{
    if(!layerVis[lk])return false;
    const dg=getDisplayGroupForFeature(lk,f);
    if(!displayGroupVis[dg])return false;
    if(tf){
      const v=f.properties[tf]||'ללא שם';
      if(typeVis[lk]&&typeVis[lk][v]===false)return false;
    } else if(typeVis[lk]&&typeVis[lk].__all__===false){
      return false;
    }
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
    officialNafotFeats=(gj.features||[]).filter(f=>f.properties&&f.properties.Nafa).map(f=>{
      const nafa=(f.properties?.Nafa||'').trim();
      const areaEn=getNafaEnglishFromProps(f.properties);
      if(nafa&&areaEn)nafaEnByHe[nafa]=areaEn;
      return {
        ...f,
        properties:{...(f.properties||{}),_custom:false,_nafa_en:areaEn||undefined},
      };
    });
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

/* ── Fetch Bustanim report layer (village boundary polygons) ── */
async function fetchBustanimLayer(){
  const url=`${BUSTANIM_LAYER_API}/query?where=1%3D1&outFields=OBJECTID,Village,Description,Dunam,Survived&returnGeometry=true&f=geojson`;
  const pageSize=2000;
  let all=[],offset=0,done=false;
  while(!done){
    const r=await fetch(`${url}&resultOffset=${offset}&resultRecordCount=${pageSize}`);
    if(!r.ok)throw new Error(`HTTP ${r.status} on bustanimLayer`);
    const gj=await r.json();
    const feats=gj.features||[];
    all=all.concat(feats);
    if(feats.length<pageSize)done=true; else offset+=pageSize;
  }
  bustanimFeats=all;
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
    position:'bottomright',
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
  const [nafotResult, bustanimResult, ...layerResults]=await Promise.allSettled([
    fetchNafot(),
    fetchBustanimLayer(),
    ...ALL_LAYER_KEYS.map(lk=>fetchLayer(LAYER_META[lk].id).then(feats=>({lk,feats})))
  ]);
  if(nafotResult.status==='rejected')console.warn('Nafot load failed:',nafotResult.reason);
  if(bustanimResult.status==='rejected')console.warn('Bustanim layer load failed:',bustanimResult.reason);
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
  setStatus(`${t('ready')} — ${totalLoaded.toLocaleString('he-IL')} ${objWord} (${totalShown.toLocaleString('he-IL')} ${shownLabel})`);
}

/* ── Render nafot (district polygons) on map ────────────── */
function renderNafotOnMap(visible){
  if(nafotLayer){map.removeLayer(nafotLayer);nafotLayer=null;}
  if(!visible||!nafotFeats.length)return;
  const baseStyle={color:'#0e7490',weight:2.4,fillColor:'#06b6d4',fillOpacity:0.12,dashArray:''};
  const customBaseStyle={color:'#be123c',weight:2.8,fillColor:'#f43f5e',fillOpacity:0.18,dashArray:'7 4'};
  const customHoverStyle={color:'#9f1239',weight:4.2,fillColor:'#fb7185',fillOpacity:0.34,dashArray:''};
  nafotLayer=L.geoJSON({type:'FeatureCollection',features:nafotFeats},{
    pane:'nafotPane',
    interactive:true,
    style:(feat)=>feat?.properties?._custom ? customBaseStyle : baseStyle,
    onEachFeature:(feat,layer)=>{
      const isCustom=!!feat.properties?._custom;
      const name=feat.properties.Nafa||'';
      layer.bindTooltip(nafaLabel(name)+(isCustom?' ✏':''),{
        permanent:true,direction:'center',
        className:'nafa-zone-label'+(isCustom?' nafa-zone-label-custom':''),
      });
      if(isCustom){
        const cid=feat.properties._cid;
        layer.on('mouseover',()=>layer.setStyle(customHoverStyle));
        layer.on('mouseout',()=>layer.setStyle(customBaseStyle));
        layer.on('click',function(e){
          L.DomEvent.stopPropagation(e);
          const dlLabel='Download GeoJSON';
          const delLabel='Delete';
          const confirmMsg='Delete district "'+name+'"?';
          const uid='_cp_'+cid.replace(/[^a-z0-9]/gi,'_');
          const popHtml=
            '<div style="min-width:155px">'+
            '<div style="font-weight:700;margin-bottom:8px;font-size:13px">'+name+'</div>'+
            '<div style="display:flex;gap:6px">'+
            '<button id="'+uid+'_dl" style="padding:5px 10px;background:#0e7490;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:12px">⬇ '+dlLabel+'</button>'+
            '<button id="'+uid+'_del" style="padding:5px 10px;background:#be123c;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:12px">🗑 '+delLabel+'</button>'+
            '</div></div>';
          layer.bindPopup(popHtml,{maxWidth:260,closeButton:true}).openPopup();
          map.once('popupopen',()=>{
            const dlBtn=document.getElementById(uid+'_dl');
            const delBtn=document.getElementById(uid+'_del');
            if(dlBtn)dlBtn.onclick=()=>{
              const blob=new Blob([JSON.stringify({type:'FeatureCollection',features:[feat]},null,2)],{type:'application/json'});
              const a=document.createElement('a');a.href=URL.createObjectURL(blob);
              a.download=(name||'polygon').replace(/\s+/g,'_')+'.geojson';
              a.click();URL.revokeObjectURL(a.href);
            };
            if(delBtn)delBtn.onclick=()=>{
              if(!confirm(confirmMsg))return;
              customNafotFeats=customNafotFeats.filter(f=>f.properties?._cid!==cid);
              if(nafotDrawGroup)nafotDrawGroup.eachLayer(l=>{if(l.feature?.properties?._cid===cid)nafotDrawGroup.removeLayer(l);});
              layer.closePopup();
              refreshAfterNafotChange();
              setStatus(t('draw_polygon_deleted'));
            };
          });
        });
      }
    }
  });
  nafotLayer.addTo(map);
  LAYER_KEYS.forEach(lk=>{if(mapLayers[lk])mapLayers[lk].bringToFront();});
}

/* ── Map init ───────────────────────────────────────────── */
function initMap(){
  map=L.map('map',{preferCanvas:true,zoomControl:false}).setView([31.9,34.85],9);
  L.control.zoom({position:'bottomleft'}).addTo(map);
  map.createPane('nafotPane');
  map.getPane('nafotPane').style.zIndex='330';
  L.tileLayer(TILE_URLS.sat,{maxZoom:20,attribution:'© Esri'}).addTo(map);
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
        <div style="font-size:19px;font-weight:700;color:#1e40af">${typeValueLabel(typeVal,lk)||lh(meta.name_he,meta.name_en)} #${p.OBJECTID}</div>
        <div style="font-size:12px;color:#475569">${lh(meta.name_he,meta.name_en)}</div>
      </div>
    </div>
    <div>${rows.join('')}</div>`;
  document.getElementById('objModal').style.display='block';
  /* Load photos async */
  const imgDiv=document.getElementById('objModalImages');
  if(imgDiv&&meta.id!=null){
    imgDiv.innerHTML=`<div class="small" style="color:#94a3b8;margin-top:10px">${lh('טוען תמונות...','Loading images...')}</div>`;
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
  const GROUPS=[
    {
      key:'orchardFruitTrees',
      title:'Orchard Fruit Trees',
      color:LAYER_META.fruit.color,
      openByDefault:false,
      detailsClass:'layer-group-main',
      note:'',
      collect:()=>{
        const out=[];
        const counts={};
        (allFeats.fruit||[]).forEach(f=>{
          if(getDisplayGroupForFeature('fruit',f)!=='orchardFruitTrees')return;
          const tv=f.properties.tree_type||'ללא שם';
          const k='fruit::'+tv;
          counts[k]=(counts[k]||{lk:'fruit',tv,label:typeValueLabel(tv,'fruit'),count:0});
          counts[k].count++;
        });
        Object.values(counts).sort((a,b)=>b.count-a.count).forEach(x=>out.push(x));
        return out;
      },
    },
    {
      key:'nonOrchardTrees',
      title:'Non-Orchard Trees',
      color:LAYER_META.vegetation.color,
      openByDefault:false,
      detailsClass:'layer-group-main',
      note:'',
      collect:()=>{
        const out=[];
        const counts={};
        (allFeats.vegetation||[]).forEach(f=>{
          const tv=f.properties.tree_type||'ללא שם';
          const k='vegetation::'+tv;
          counts[k]=(counts[k]||{lk:'vegetation',tv,label:typeValueLabel(tv,'vegetation'),count:0});
          counts[k].count++;
        });
        (allFeats.fruit||[]).forEach(f=>{
          if(getDisplayGroupForFeature('fruit',f)!=='nonOrchardTrees')return;
          const tv=f.properties.tree_type||'ללא שם';
          const k='fruit::'+tv;
          counts[k]=(counts[k]||{lk:'fruit',tv,label:typeValueLabel(tv,'fruit'),count:0});
          counts[k].count++;
        });
        Object.values(counts).sort((a,b)=>b.count-a.count).forEach(x=>out.push(x));
        return out;
      },
    },
    {
      key:'agriculturalInstallations',
      title:'Agricultural Installations',
      color:LAYER_META.agtools.color,
      openByDefault:false,
      detailsClass:'layer-group-main',
      note:'Includes: Wine Press, Olive Press, Storage, Terraces, Other Cultural Landscape Features',
      collect:()=>{
        const out=[];
        const counts={};
        (allFeats.agtools||[]).forEach(f=>{
          const tv=f.properties.Stationary_agricultural_facilit||'ללא שם';
          const k='agtools::'+tv;
          counts[k]=(counts[k]||{lk:'agtools',tv,label:typeValueLabel(tv,'agtools'),count:0});
          counts[k].count++;
        });
        const terraceCount=(allFeats.terraces||[]).length;
        if(terraceCount>0){
          out.push({lk:'terraces',tv:'__all__',label:'Terraces',count:terraceCount});
        }
        Object.values(counts).sort((a,b)=>b.count-a.count).forEach(x=>out.push(x));
        return out;
      },
    },
    {
      key:'optionalSourceLayers',
      title:'Additional Source Layers',
      color:LAYER_META.carob.color,
      openByDefault:false,
      detailsClass:'optional-source-layers',
      note:'',
      collect:()=>{
        const out=[];
        const counts={};
        (allFeats.carob||[]).forEach(f=>{
          const tv=f.properties.Tree_type||'ללא שם';
          const k='carob::'+tv;
          counts[k]=(counts[k]||{lk:'carob',tv,label:typeValueLabel(tv,'carob'),count:0});
          counts[k].count++;
        });
        Object.values(counts).sort((a,b)=>b.count-a.count).forEach(x=>out.push(x));
        return out;
      },
      childLabel:'Non-Orchard / Wild Tree Records',
    },
  ];

  const mkGroupHtml=(g)=>{
    const rows=g.collect();
    const total=rows.reduce((s,r)=>s+r.count,0);
    const openAttr=g.openByDefault?' open':'';
    const parentId=`chk_dg_${g.key}`;
    const note=g.note?`<p class="small" style="margin:6px 0 8px">${g.note}</p>`:'';
    const childTitle=g.childLabel?`<div class="small" style="font-weight:600;margin-bottom:4px">${g.childLabel}</div>`:'';
    const typeRows=rows.map(r=>{
      const checked=(typeVis[r.lk]&&typeVis[r.lk][r.tv]===false)?'':'checked';
      const typeId=`chk_type_${g.key}_${r.lk}_${String(r.tv).replace(/[^a-zA-Z0-9_\-]/g,'_')}`;
      return `<div class="type-toggle"><label for="${typeId}">
        <input id="${typeId}" type="checkbox" ${checked} data-lk="${r.lk}" data-type="${r.tv}">
        <span class="legendDot" style="background:${r.lk==='terraces'?LAYER_META.terraces.color:getTypeColor(r.lk,r.tv)}"></span>
        <span>${r.label}</span> <span style="color:#94a3b8;font-size:11px">(${r.count})</span>
      </label></div>`;
    }).join('');
    return `<details class="${g.detailsClass}"${openAttr}>
      <summary class="layer-group-summary">
        <span class="layer-group-arrow" aria-hidden="true">▸</span>
        <span class="layer-name" style="display:flex;align-items:center;gap:6px">
          <input type="checkbox" id="${parentId}" ${displayGroupVis[g.key]?'checked':''}>
          <span class="legendDot" style="background:${g.color}"></span>
          <span>${g.title}</span>
          <span style="color:#94a3b8;font-size:11px">(${total})</span>
        </span>
      </summary>
      ${note}
      ${childTitle}
      <div class="layer-toggle-group" style="margin-top:6px">${typeRows}</div>
    </details>`;
  };

  el.innerHTML=GROUPS.map(mkGroupHtml).join('');

  GROUPS.forEach(g=>{
    const cb=document.getElementById(`chk_dg_${g.key}`);
    if(!cb)return;
    cb.addEventListener('click',e=>e.stopPropagation());
    cb.addEventListener('change',e=>{
      displayGroupVis[g.key]=e.target.checked;
      renderAllLayers();
      updateReadyStatus();
    });
  });

  el.querySelectorAll('input[data-type]').forEach(cb=>{
    cb.addEventListener('click',e=>e.stopPropagation());
    cb.addEventListener('change',e=>{
      const{lk,type}=e.target.dataset;
      if(!typeVis[lk])typeVis[lk]={};
      typeVis[lk][type]=e.target.checked;
      renderLayerOnMap(lk);
      updateReadyStatus();
    });
  });
}

/* ── Bustanim Map Layer ─────────────────────────────────── */
function renderBustanimOnMap(village){
  if(bustanimMapLayer){map.removeLayer(bustanimMapLayer);bustanimMapLayer=null;}
  if(!bustanimFeats.length)return;
  const toShow=village ? bustanimFeats.filter(f=>f.properties.Village===village) : bustanimFeats;
  if(!toShow.length)return;
  bustanimMapLayer=L.geoJSON(toShow,{
    style:feat=>{
      const c=BUSTAN_DESC_COLOR[feat.properties.Description]||'#6b7280';
      return{color:c,weight:1.5,fillColor:c,fillOpacity:0.35,opacity:0.8};
    },
    onEachFeature:(feat,layer)=>{
      const p=feat.properties;
      layer.bindPopup(`<b>${p.Village||NOT_AVAILABLE_LABEL}</b><br>${bustanDescLabel(p.Description)}<br>${fmt(p.Dunam)} ${lh('ד"ש','dn')}<br>${lh('שרד','Survived')}: ${p.Survived||NOT_AVAILABLE_LABEL}`);
    }
  }).addTo(map);
  if(village&&bustanimMapLayer.getLayers().length)map.fitBounds(bustanimMapLayer.getBounds(),{padding:[20,20]});
}

/* ── Bustanim Tab ───────────────────────────────────────── */
function renderBustansTab(){
  const el=document.getElementById('bustansList');
  if(!el)return;

  /* Group features by Village */
  const villages={};
  bustanimFeats.forEach(f=>{
    const v=f.properties.Village||'Unknown';
    if(!villages[v])villages[v]=[];
    villages[v].push(f);
  });

  const query=(document.getElementById('bustanSearch')?.value||'').toLowerCase();
  const names=Object.keys(villages).sort().filter(v=>!query||v.toLowerCase().includes(query));

  el.innerHTML=names.map(v=>{
    const feats=villages[v];
    const totalDunam=feats.reduce((s,f)=>s+(f.properties.Dunam||0),0);
    const active=v===selectedVillage?';background:#eff6ff':'';
    return `<div class="bustan-row" data-village="${v.replace(/"/g,'&quot;')}" style="cursor:pointer;padding:7px 10px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center${active}">
      <span style="font-weight:600;font-size:13px">${v}</span>
      <span style="font-size:12px;color:#64748b">${feats.length} ${t('bustans_zones')} · ${fmt(totalDunam)} ${lh('ד"ש','dn')}</span>
    </div>`;
  }).join('');

  el.querySelectorAll('.bustan-row').forEach(row=>{
    row.addEventListener('click',()=>showBustanDetail(row.dataset.village,villages[row.dataset.village]));
  });
}

function showBustanDetail(village,feats){
  selectedVillage=village;
  renderBustanimOnMap(village);

  document.getElementById('bustanDetailTitle').textContent=village;

  /* Group by Description type */
  const byDesc={};
  feats.forEach(f=>{
    const d=f.properties.Description||'Other';
    if(!byDesc[d])byDesc[d]={count:0,dunam:0,survived:0};
    byDesc[d].count++;
    byDesc[d].dunam+=(f.properties.Dunam||0);
    if(f.properties.Survived==='Yes')byDesc[d].survived++;
  });

  const totalDunam=feats.reduce((s,f)=>s+(f.properties.Dunam||0),0);
  const survivedCount=feats.filter(f=>f.properties.Survived==='Yes').length;

  const rows=Object.entries(byDesc).sort((a,b)=>b[1].dunam-a[1].dunam).map(([desc,data])=>{
    return `<tr>
      <td style="padding:4px 6px">${bustanDescLabel(desc)}</td>
      <td style="padding:4px 6px;text-align:center">${data.count}</td>
      <td style="padding:4px 6px;text-align:center">${fmt(data.dunam)}</td>
      <td style="padding:4px 6px;text-align:center">${data.survived}/${data.count}</td>
    </tr>`;
  }).join('');

  document.getElementById('bustanZonesTable').innerHTML=`
    <p style="font-size:12px;color:#64748b;margin-bottom:6px">
      ${t('bustans_total_area')}: <b>${fmt(totalDunam)} ${lh('ד"ש','dn')}</b> &nbsp;|&nbsp;
      ${t('bustans_survived')}: <b>${survivedCount}/${feats.length}</b>
    </p>
    <table style="width:100%;border-collapse:collapse;font-size:12px">
      <thead><tr style="background:var(--bg-alt);border-bottom:1px solid var(--border)">
        <th style="padding:4px 6px;text-align:right">${t('bustans_type')}</th>
        <th style="padding:4px 6px">${t('bustans_zones')}</th>
        <th style="padding:4px 6px">${t('bustans_area')}</th>
        <th style="padding:4px 6px">${t('bustans_survived')}</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>`;

  /* Bar chart: area by type */
  const descs=Object.keys(byDesc).sort((a,b)=>byDesc[b].dunam-byDesc[a].dunam);
  Plotly.newPlot('chartBustanZones',[{
    type:'bar',
    x:descs.map(d=>bustanDescLabel(d)),
    y:descs.map(d=>byDesc[d].dunam),
    marker:{color:descs.map(d=>BUSTAN_DESC_COLOR[d]||'#6b7280')},
    text:descs.map(d=>fmt(byDesc[d].dunam)),
    textposition:'outside',
  }],layout(t('bustans_chart_title'),'',lh('ד"ש','Dunam')),cfgPlot());

  document.getElementById('bustanDetail').style.display='block';
  /* Highlight selected row */
  renderBustansTab();
}



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
      else if(tab==='bustans'){renderBustansTab();renderBustanimOnMap(selectedVillage);}
      else{if(bustanimMapLayer){map.removeLayer(bustanimMapLayer);bustanimMapLayer=null;}}
    });
  });
}
function switchTab(id){
  document.querySelectorAll('.tabbtn').forEach(b=>b.classList.toggle('active',b.dataset.tab===id));
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.id===id));
}

/* ── Overview ───────────────────────────────────────────── */
function updateOverview(){
  const fruitFeats=allFeats.fruit||[];
  const orchardFeats=fruitFeats.filter(f=>getDisplayGroupForFeature('fruit',f)==='orchardFruitTrees');
  const nonOrchFeats=(allFeats.vegetation||[]).concat(fruitFeats.filter(f=>getDisplayGroupForFeature('fruit',f)==='nonOrchardTrees'));
  const agriTotal=(allFeats.agtools||[]).length+(allFeats.terraces||[]).length;
  const heights=orchardFeats.map(f=>f.properties.height).filter(v=>v&&v>0&&v<5000);
  const girths=orchardFeats.map(f=>f.properties.circumference_trunk).filter(v=>v&&v>0&&v<2000);
  document.getElementById('kFruitTrees').textContent=fmtI(orchardFeats.length);
  document.getElementById('kCarobTrees').textContent=fmtI(nonOrchFeats.length);
  document.getElementById('kNafot').textContent=fmtI(nafotFeats.length);
  document.getElementById('kVegetation').textContent=fmtI(agriTotal);
  document.getElementById('kAgTools').textContent=fmtI((allFeats['carob']||[]).length);
  document.getElementById('kTerraces').textContent=fmtI((allFeats['terraces']||[]).length);
  document.getElementById('kAvgH').textContent=fmt(mean(heights))+cmUnit();
  document.getElementById('kAvgG').textContent=fmt(mean(girths))+cmUnit();
  const types=new Set(orchardFeats.map(f=>f.properties.tree_type).filter(Boolean));
  document.getElementById('kFruitTypes').textContent=types.size;
  chartOverviewBar();
  chartOverviewPie();
}

function chartOverviewBar(){
  const labels=['Orchard Fruit Trees','Non-Orchard Trees','Agricultural Installations'];
  const vals=[
    (allFeats.fruit||[]).filter(f=>getDisplayGroupForFeature('fruit',f)==='orchardFruitTrees').length,
    (allFeats.vegetation||[]).length+(allFeats.fruit||[]).filter(f=>getDisplayGroupForFeature('fruit',f)==='nonOrchardTrees').length,
    (allFeats.agtools||[]).length+(allFeats.terraces||[]).length,
  ];
  const colors=[LAYER_META.fruit.color,LAYER_META.vegetation.color,LAYER_META.agtools.color];
  Plotly.newPlot('chartOverviewBar',[{
    type:'bar',x:vals,y:labels,orientation:'h',
    marker:{color:colors},text:vals.map(v=>v.toLocaleString('he-IL')),textposition:'outside',
  }],layout('כמות אובייקטים לפי שכבה','כמות',''),cfgPlot());
}

function chartOverviewPie(){
  const types={};
  (allFeats.fruit||[]).forEach(f=>{
    if(getDisplayGroupForFeature('fruit',f)!=='orchardFruitTrees')return;
    const tv=f.properties.tree_type||'ללא שם';
    types[tv]=(types[tv]||0)+1;
  });
  const keys=Object.keys(types).sort((a,b)=>types[b]-types[a]);
  if(!keys.length)return;
  Plotly.newPlot('chartOverviewPie',[{
    type:'pie',labels:keys.map(k=>typeValueLabel(k,'fruit')),values:keys.map(k=>types[k]),
    textinfo:'label+percent',hole:0.35,
    marker:{colors:keys.map((_,i)=>TYPE_COLORS[i%TYPE_COLORS.length])},
  }],{title:{text:lh('התפלגות סוגי עצי פרי','Fruit Tree Type Distribution'),font:{size:13}},margin:{t:36,b:4,l:4,r:4},paper_bgcolor:'transparent'},cfgPlot());
}

/* ── Districts (Nafot) Tab ──────────────────────────────── */
let districtChartsRendered=false;
function renderDistrictsTab(){
  /* District summary table */
  const el=document.getElementById('districtList');
  if(!el)return;

  const distMap={}; // nafa → { orchard, nonOrchard, agricultural, optional }
  ['fruit','carob','vegetation','agtools','terraces'].forEach(lk=>{
    (allFeats[lk]||[]).forEach(f=>{
      const nafa=f.properties._nafa||'לא ידוע';
      if(!distMap[nafa])distMap[nafa]={orchard:0,nonOrchard:0,agricultural:0,optional:0};
      const dg=getDisplayGroupForFeature(lk,f);
      if(dg==='orchardFruitTrees')distMap[nafa].orchard++;
      else if(dg==='nonOrchardTrees')distMap[nafa].nonOrchard++;
      else if(dg==='agriculturalInstallations')distMap[nafa].agricultural++;
      else if(dg==='optionalSourceLayers')distMap[nafa].optional++;
    });
  });
  /* Include iplan district polygons even if no trees in them */
  nafotFeats.forEach(f=>{
    const n=f.properties.Nafa||'לא ידוע';
    if(!distMap[n])distMap[n]={orchard:0,nonOrchard:0,agricultural:0,optional:0};
  });

  const customNames=new Set(customNafotFeats.map(f=>(f.properties?.Nafa||'').trim()).filter(Boolean));
  const sorted=Object.keys(distMap).sort((a,b)=>{
    const aCustom=customNames.has((a||'').trim());
    const bCustom=customNames.has((b||'').trim());
    if(aCustom!==bCustom)return aCustom?1:-1; /* custom districts always at bottom */
    const tA=distMap[a].orchard+distMap[a].nonOrchard+distMap[a].agricultural;
    const tB=distMap[b].orchard+distMap[b].nonOrchard+distMap[b].agricultural;
    return tB-tA;
  });

  el.innerHTML=`<table class="dist-table">
    <thead><tr>
      <th>${lh('נפה','District')}</th>
      <th title="Orchard Fruit Trees">Orchard</th>
      <th title="Non-Orchard Trees">Non-Orchard</th>
      <th title="Agricultural Installations">Agricultural</th>
      <th title="Optional Source Layers">Optional</th>
      <th>${lh('סה"כ','Total')}</th>
    </tr></thead>
    <tbody>
    ${sorted.map(nafa=>{
      const d=distMap[nafa];
      const tot=d.orchard+d.nonOrchard+d.agricultural;
      const isCustom=customNames.has((nafa||'').trim());
      return`<tr class="dist-row${isCustom?' dist-row-custom':''}" data-nafa="${nafa}">
        <td class="dist-name">${nafaLabel(nafa)}</td>
        <td>${d.orchard||0}</td>
        <td>${d.nonOrchard||0}</td>
        <td>${d.agricultural||0}</td>
        <td>${d.optional||0}</td>
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
        {lk:'terraces',feats:(allFeats.terraces||[]).filter(f=>(f.properties._nafa||'לא ידוע')===nafa),color:LAYER_META.agtools.color},
      ],lh('מפה: נפה '+nafa,'Map: district '+nafaLabel(nafa)));
      showDistrictDetail(nafa);
    });
  });

  if(!districtChartsRendered){
    districtChartsRendered=true;
    renderDistrictCharts(distMap,sorted);
  }
}

function renderDistrictCharts(distMap,sorted){
  /* Chart 1: Stacked bar – display groups by district */
  const nafotForChart=sorted.filter(n=>n!=='לא ידוע').slice(0,15);
  const GROUP_KEYS=['orchard','nonOrchard','agricultural'];
  const colors={orchard:'#16a34a',nonOrchard:'#65a30d',agricultural:'#ea580c'};
  const names={orchard:'Orchard Fruit Trees',nonOrchard:'Non-Orchard Trees',agricultural:'Agricultural Installations'};
  Plotly.newPlot('chartDistrictStack',
    GROUP_KEYS.map(lk=>({
      type:'bar',name:names[lk],
      x:nafotForChart.map(n=>(distMap[n]||{})[lk]||0),
      y:nafotForChart.map(nafaLabel),
      orientation:'h',
      marker:{color:colors[lk]},
    })),
    layout(lh('פיזור אובייקטים לפי נפה','Objects by District'),lh('כמות','Count'),'',{barmode:'stack'}),
    cfgPlot()
  );

  /* Chart 2: Fruit tree species top-10 per district – heatmap */
  const fruitFeats=(allFeats['fruit']||[]).filter(f=>getDisplayGroupForFeature('fruit',f)==='orchardFruitTrees');
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
      x:globalTypes.map(tv=>typeValueLabel(tv,'fruit')),
      y:nafotForChart.map(nafaLabel),
      colorscale:'YlGn',
      showscale:true,
    }],layout(lh('מין עץ פרי × נפה (heatmap)','Orchard Fruit Tree × District (Heatmap)'),lh('מין','Orchard Fruit Tree'),lh('נפה','District')),cfgPlot());
  }

  /* Chart 3: Pie – total fruit trees per district (top 10) */
  const top10=nafotForChart.slice(0,10);
  Plotly.newPlot('chartDistrictPie',[{
    type:'pie',
    labels:top10.map(nafaLabel),
    values:top10.map(n=>distMap[n].orchard||0),
    textinfo:'label+percent',
    hole:0.3,
    marker:{colors:TYPE_COLORS.slice(0,10)},
  }],{title:{text:lh('עצי פרי לפי נפה','Orchard Fruit Trees by District'),font:{size:13}},margin:{t:36,b:4,l:4,r:4},paper_bgcolor:'transparent'},cfgPlot());
}

/* ── District detail (reactive, with group filter + species drill-down) ── */
let _distDetailNafa='', _distDetailGroup='';

function showDistrictDetail(nafa){
  _distDetailNafa=nafa;
  _distDetailGroup='';
  const el=document.getElementById('districtDetail');
  if(!el)return;
  el.style.display='block';
  document.getElementById('districtDetailTitle').textContent=lh('נפה: ','District: ')+nafaLabel(nafa);
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
      const displayLk=(lk==='fruit'&&isPricklyPearValue(tv))?'vegetation':lk;
      const key=displayLk+'::'+tv;
      if(!specMap[key])specMap[key]={name:tv,lk:displayLk,field,lkName:LAYER_META[displayLk].name_he,lkColor:LAYER_META[displayLk].color,count:0,heights:[],girths:[],statuses:{},items:[]};
      const s=specMap[key]; s.count++;
      s.items.push({lk,feat:f});
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
      const topStRaw=Object.keys(s.statuses).sort((a,b)=>s.statuses[b]-s.statuses[a])[0]||NOT_AVAILABLE_LABEL;
      const topSt=topStRaw===NOT_AVAILABLE_LABEL ? topStRaw : statusLabel(topStRaw);
      return`<tr class="species-row dist-species-row" data-key="${s.lk}::${s.name}">
        <td class="species-name" style="border-right:3px solid ${s.lkColor};padding-right:6px;cursor:pointer;color:var(--primary)">${typeValueLabel(s.name,s.lk)} ↗</td>
        <td><span class="layer-badge" style="background:${s.lkColor}">${lh(s.lkName,LAYER_META[s.lk].name_en)}</span></td>
        <td><strong>${s.count}</strong></td>
        <td>${hm!=null?fmt(hm)+cmUnit():NO_DATA_LABEL}</td>
        <td>${hmed!=null?fmt(hmed)+cmUnit():NO_DATA_LABEL}</td>
        <td>${hsd!=null?fmt(hsd):NO_DATA_LABEL}</td>
        <td>${hmn!=null?fmt(hmn)+cmUnit():NO_DATA_LABEL}</td>
        <td>${hmx!=null?fmt(hmx)+cmUnit():NO_DATA_LABEL}</td>
        <td>${gm!=null?fmt(gm)+cmUnit():NO_DATA_LABEL}</td>
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
  Plotly.newPlot('chartDistrictSpeciesBar',[{type:'bar',x:top15.map(s=>s.count),y:top15.map(s=>typeValueLabel(s.name,s.lk)),orientation:'h',marker:{color:top15.map(s=>s.lkColor)},text:top15.map(s=>s.count),textposition:'outside'}],layout(lh('הרכב מינים — ','Species Composition — ')+nafaLabel(nafa)+(groupFilter?' ('+lh(LAYER_META[groupFilter].name_he,LAYER_META[groupFilter].name_en)+')':''),lh('כמות','Count'),''),cfgPlot());
  const top8=sorted.filter(s=>s.heights.length>0).slice(0,8);
  if(top8.length)Plotly.newPlot('chartDistrictSpeciesBox',top8.map((s,i)=>({type:'box',y:s.heights,name:typeValueLabel(s.name,s.lk),marker:{color:TYPE_COLORS[i%TYPE_COLORS.length]},boxmean:true})),layout(lh('גובה לפי מין — ','Height by Species — ')+nafaLabel(nafa),lh('מין','Species'),lh('גובה (ס"מ)','Height (cm)')),cfgPlot());
}

function showDistrictSpeciesDetail(nafa,spec){
  if(!spec)return;
  const focusItems=(spec.items||[]).filter(({feat})=>(feat.properties._nafa||'לא ידוע')===nafa);
  applyMapProjectionGroups([
    {items:focusItems,color:spec.lkColor}
  ],lh('מפה: '+spec.name+' בנפה '+nafa,'Map: '+typeValueLabel(spec.name,spec.lk)+' in '+nafaLabel(nafa)));
  const panel=document.getElementById('districtSpeciesDetailPanel');
  panel.style.display='block';
  document.getElementById('districtSpeciesDetailTitle').textContent=typeValueLabel(spec.name,spec.lk)+' — '+nafaLabel(nafa)+' ('+spec.count+' '+t('objects')+')';
  ['chartDistrictSpeciesHist','chartDistrictSpeciesGirth','chartDistrictSpeciesStatus'].forEach(id=>{
    try{Plotly.purge(id);}catch(e){}
    document.getElementById(id).innerHTML='';
  });
  const pc=cfgPlot();
  const STATUS_COLORS=['#16a34a','#f59e0b','#dc2626','#94a3b8','#475569','#0891b2'];
  if(spec.heights.length>1)
    Plotly.newPlot('chartDistrictSpeciesHist',[{type:'histogram',x:spec.heights,nbinsx:20,marker:{color:spec.lkColor,opacity:0.8}}],layout(lh('התפלגות גובה – ','Height Distribution – ')+typeValueLabel(spec.name,spec.lk),lh('גובה (ס"מ)','Height (cm)'),lh('כמות','Count')),pc);
  if(spec.girths.length>1)
    Plotly.newPlot('chartDistrictSpeciesGirth',[{type:'histogram',x:spec.girths,nbinsx:20,marker:{color:'#065f46',opacity:0.8}}],layout(lh('התפלגות היקף – ','Girth Distribution – ')+typeValueLabel(spec.name,spec.lk),lh('היקף (ס"מ)','Girth (cm)'),lh('כמות','Count')),pc);
  const sk=Object.keys(spec.statuses);
  if(sk.length)
    Plotly.newPlot('chartDistrictSpeciesStatus',[{type:'pie',labels:sk.map(statusLabel),values:sk.map(k=>spec.statuses[k]),hole:0.35,textinfo:'label+percent',marker:{colors:STATUS_COLORS}}],{title:{text:lh('מצב – ','Status – ')+typeValueLabel(spec.name,spec.lk),font:{size:13}},margin:{t:36,b:4,l:4,r:4},paper_bgcolor:'transparent'},pc);
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
      <h5>${typeValueLabel(typeVal,lk)||lh(meta.name_he,meta.name_en)} #${p.OBJECTID}</h5>
      ${p.Name?`<div class="stat-row"><span class="stat-label">${lh('שם','Name')}</span><span class="stat-value">${p.Name}</span></div>`:''}
      ${p.height?`<div class="stat-row"><span class="stat-label">${lh('גובה','Height')}</span><span class="stat-value">${fmt(p.height)}${cmUnit()}</span></div>`:''}
      ${p.circumference_trunk?`<div class="stat-row"><span class="stat-label">${lh('היקף גזע','Trunk Girth')}</span><span class="stat-value">${fmt(p.circumference_trunk)}${cmUnit()}</span></div>`:''}
      ${p.status?`<div class="stat-row"><span class="stat-label">${t('status')}</span><span class="stat-value">${statusLabel(p.status)}</span></div>`:''}
      ${p.soil_type?`<div class="stat-row"><span class="stat-label">${lh('סוג קרקע','Soil Type')}</span><span class="stat-value">${p.soil_type}</span></div>`:''}
      ${p.Description?`<div class="stat-row"><span class="stat-label">${lh('תיאור','Description')}</span><span class="stat-value">${p.Description}</span></div>`:''}
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
      const displayLk=(lk==='fruit'&&isPricklyPearValue(tv))?'vegetation':lk;
      const key=displayLk+'::'+tv;
      if(!reg[key])reg[key]={name:tv,lk:displayLk,field,lkName:LAYER_META[displayLk].name_he,lkColor:LAYER_META[displayLk].color,heights:[],girths:[],statuses:{},nafot:{},count:0,sampleItems:[]};
      const r=reg[key]; r.count++;
      r.sampleItems.push({lk,feat:f});
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
    r.topStatus=sk[0]||NOT_AVAILABLE_LABEL;
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
  const opts=entries.map(([key,r])=>`<option value="${key}">${typeValueLabel(r.name,r.lk)} (${lh(r.lkName,LAYER_META[r.lk].name_en)})</option>`).join('');
  ['speciesCmpA','speciesCmpB'].forEach((id,i)=>{
    const sel=document.getElementById(id);
    if(sel){sel.innerHTML=opts;if(entries[i])sel.value=entries[i][0];}
  });
  const dSel=document.getElementById('speciesCmpDistrict');
  if(dSel){
    const prev=dSel.value||'';
    const districts=[...new Set(nafotFeats.map(f=>f.properties?.Nafa).filter(Boolean).filter(n=>n!=='לא ידוע'))].sort();
    dSel.innerHTML=`<option value="">All districts</option>`+districts.map(n=>`<option value="${n}">${nafaLabel(n)}</option>`).join('');
    dSel.value=districts.includes(prev)?prev:'';
  }
}

function runSpeciesComparison(){
  const reg=_speciesReg; if(!reg)return;
  const keyA=document.getElementById('speciesCmpA').value;
  const keyB=document.getElementById('speciesCmpB').value;
  const district=document.getElementById('speciesCmpDistrict')?.value||'';
  if(!keyA||!keyB||keyA===keyB){document.getElementById('speciesCmpResult').innerHTML=`<div class="small">${t('choose_two_species')}</div>`;return;}
  const rA=reg[keyA], rB=reg[keyB];
  const itemsA=(rA.sampleItems||[]).filter(({feat})=>!district || (feat.properties._nafa||'לא ידוע')===district);
  const itemsB=(rB.sampleItems||[]).filter(({feat})=>!district || (feat.properties._nafa||'לא ידוע')===district);
  const featsA=itemsA.map(x=>x.feat);
  const featsB=itemsB.map(x=>x.feat);
  if(!featsA.length||!featsB.length){
    document.getElementById('speciesCmpResult').innerHTML=`<div class="small">No data for selected district filter.</div>`;
    ['chartSpeciesCmpBox','chartSpeciesCmpBar'].forEach(id=>{try{Plotly.purge(id);}catch(e){} const el=document.getElementById(id); if(el)el.innerHTML='';});
    return;
  }
  applyMapProjectionGroups([
    {items:itemsA,color:'#2563eb'},
    {items:itemsB,color:'#dc2626'},
  ],lh('מפה: השוואת מינים '+rA.name+' מול '+rB.name,'Map: species compare '+typeValueLabel(rA.name,rA.lk)+' vs '+typeValueLabel(rB.name,rB.lk)));
  const sA=computeStats(featsA);
  const sB=computeStats(featsB);
  const rows=[
    [t('object_count'),fmtI(sA.count),fmtI(sB.count)],
    [t('mean_h'),fmt(sA.mean_h),fmt(sB.mean_h)],
    [t('median_h'),fmt(sA.median_h),fmt(sB.median_h)],
    ['σ '+t('height'),fmt(sA.std_h),fmt(sB.std_h)],
    [t('min_h'),fmt(sA.min_h),fmt(sB.min_h)],
    [t('max_h'),fmt(sA.max_h),fmt(sB.max_h)],
    [t('mean_g'),fmt(sA.mean_g),fmt(sB.mean_g)],
    [t('median_g'),fmt(sA.median_g),fmt(sB.median_g)],
    ['σ '+t('girth'),fmt(sA.std_g),fmt(sB.std_g)],
    [t('dominant_status'),statusLabel(rA.topStatus),statusLabel(rB.topStatus)],
  ];
  document.getElementById('speciesCmpResult').innerHTML=`
    <div class="cmp-summary">
      <div class="cmp-summary-card side-a"><h5>${typeValueLabel(rA.name,rA.lk)}</h5><div class="big-num">${fmtI(sA.count)}</div><div class="small">${lh(rA.lkName,LAYER_META[rA.lk].name_en)}</div></div>
      <div class="cmp-summary-card side-b"><h5>${typeValueLabel(rB.name,rB.lk)}</h5><div class="big-num">${fmtI(sB.count)}</div><div class="small">${lh(rB.lkName,LAYER_META[rB.lk].name_en)}</div></div>
    </div>
    ${district?`<div class="small" style="margin-top:6px">District filter: <strong>${nafaLabel(district)}</strong></div>`:''}
    <table class="cmp-table" style="margin-top:10px">
      <thead><tr><th class="metric-name">${t('metric')}</th><th class="highlight-a">${typeValueLabel(rA.name,rA.lk)}</th><th class="highlight-b">${typeValueLabel(rB.name,rB.lk)}</th></tr></thead>
      <tbody>${rows.map(([m,a,b])=>`<tr><td class="metric-name">${m}</td><td>${a}</td><td>${b}</td></tr>`).join('')}</tbody>
    </table>`;
  const pc=cfgPlot();
    Plotly.newPlot('chartSpeciesCmpBox',[
    {type:'box',y:sA.h,name:typeValueLabel(rA.name,rA.lk),marker:{color:'#3b82f6'},boxmean:true},
    {type:'box',y:sB.h,name:typeValueLabel(rB.name,rB.lk),marker:{color:'#7c3aed'},boxmean:true},
    {type:'box',y:sA.g,name:typeValueLabel(rA.name,rA.lk)+lh(' (היקף)',' (Girth)'),marker:{color:'#93c5fd'},boxmean:true,visible:'legendonly'},
    {type:'box',y:sB.g,name:typeValueLabel(rB.name,rB.lk)+lh(' (היקף)',' (Girth)'),marker:{color:'#c4b5fd'},boxmean:true,visible:'legendonly'},
  ],layout(lh('גובה לפי מין – Box Plot','Height by Species – Box Plot'),'',lh('ס"מ','cm')),pc);
  Plotly.newPlot('chartSpeciesCmpBar',[
    {type:'bar',name:typeValueLabel(rA.name,rA.lk),x:[t('mean_h'),t('median_h'),t('mean_g')],y:[sA.mean_h||0,sA.median_h||0,sA.mean_g||0],marker:{color:'#3b82f6'}},
    {type:'bar',name:typeValueLabel(rB.name,rB.lk),x:[t('mean_h'),t('median_h'),t('mean_g')],y:[sB.mean_h||0,sB.median_h||0,sB.mean_g||0],marker:{color:'#7c3aed'}},
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
  document.getElementById('speciesCount').textContent=entries.length+' '+lh('מינים','orchard fruit trees');
  const el=document.getElementById('speciesTable');
  el.innerHTML=`<table class="species-table">
    <thead><tr>
      <th>${lh('מין','Species')}</th><th>${lh('קבוצה','Group')}</th><th>${lh('כמות','Count')}</th>
      <th>${lh('גובה ממוצע','Mean Height')}</th><th>${lh('חציון','Median')}</th><th>σ</th><th>${lh('מנ׳','Min')}</th><th>${lh('מקס׳','Max')}</th>
      <th>${lh('היקף ממוצע','Mean Girth')}</th><th>σ ${lh('היקף','Girth')}</th><th>${lh('מצב שכיח','Dominant Status')}</th>
    </tr></thead>
    <tbody>${entries.map(([key,r])=>`<tr class="species-row" data-key="${key}">
      <td class="species-name" style="border-right:3px solid ${r.lkColor};padding-right:6px">${typeValueLabel(r.name,r.lk)}</td>
      <td><span class="layer-badge" style="background:${r.lkColor}">${lh(r.lkName,LAYER_META[r.lk].name_en)}</span></td>
      <td><strong>${r.count}</strong></td>
      <td>${r.h_mean!=null?fmt(r.h_mean):NO_DATA_LABEL}</td>
      <td>${r.h_median!=null?fmt(r.h_median):NO_DATA_LABEL}</td>
      <td>${r.h_std!=null?fmt(r.h_std):NO_DATA_LABEL}</td>
      <td>${r.h_min!=null?fmt(r.h_min):NO_DATA_LABEL}</td>
      <td>${r.h_max!=null?fmt(r.h_max):NO_DATA_LABEL}</td>
      <td>${r.g_mean!=null?fmt(r.g_mean):NO_DATA_LABEL}</td>
      <td>${r.g_std!=null?fmt(r.g_std):NO_DATA_LABEL}</td>
      <td>${r.topStatus===NOT_AVAILABLE_LABEL ? r.topStatus : statusLabel(r.topStatus)}</td>
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
  const speciesItems=r.sampleItems||[];
  const speciesFeats=speciesItems.map(x=>x.feat);
  applyMapProjectionGroups([
    {items:speciesItems,color:r.lkColor}
  ],lh('מפה: מין '+r.name,'Map: species '+typeValueLabel(r.name,r.lk)));
  const detail=document.getElementById('speciesDetail');
  detail.style.display='block';
  document.getElementById('speciesDetailTitle').textContent=typeValueLabel(r.name,r.lk)+' \u2014 '+lh(r.lkName,LAYER_META[r.lk].name_en)+' ('+r.count+' '+t('objects')+')';
  /* Purge old charts */
  ['chartSpeciesHeightHist','chartSpeciesGirthHist','chartSpeciesStatus','chartSpeciesNafot','chartSpeciesBoxNafot']
    .forEach(id=>{try{Plotly.purge(id);}catch(e){}document.getElementById(id).innerHTML='';});
  /* Stats grid */
  const nafotTop=Object.entries(r.nafot).filter(([n])=>n!=='לא ידוע').sort((a,b)=>b[1]-a[1]).slice(0,5).map(([n,c])=>nafaLabel(n)+' ('+c+')').join(', ');
  document.getElementById('speciesDetailStats').innerHTML=`
    <div class="ssg">
      <div class="ssg-card"><div class="ssg-val" style="color:${r.lkColor}">${r.count}</div><div class="ssg-lbl">${lh('כמות','Count')}</div></div>
      <div class="ssg-card"><div class="ssg-val">${r.h_mean!=null?fmt(r.h_mean)+cmUnit():NO_DATA_LABEL}</div><div class="ssg-lbl">${lh('גובה ממוצע','Mean Height')}</div></div>
      <div class="ssg-card"><div class="ssg-val">${r.h_median!=null?fmt(r.h_median)+cmUnit():NO_DATA_LABEL}</div><div class="ssg-lbl">${lh('חציון גובה','Median Height')}</div></div>
      <div class="ssg-card"><div class="ssg-val">${r.h_std!=null?fmt(r.h_std)+cmUnit():NO_DATA_LABEL}</div><div class="ssg-lbl">σ ${lh('גובה','Height')}</div></div>
      <div class="ssg-card"><div class="ssg-val">${r.h_min!=null?fmt(r.h_min)+cmUnit():NO_DATA_LABEL}</div><div class="ssg-lbl">${lh('מינ׳ גובה','Min Height')}</div></div>
      <div class="ssg-card"><div class="ssg-val">${r.h_max!=null?fmt(r.h_max)+cmUnit():NO_DATA_LABEL}</div><div class="ssg-lbl">${lh('מקס׳ גובה','Max Height')}</div></div>
      <div class="ssg-card"><div class="ssg-val">${r.g_mean!=null?fmt(r.g_mean)+cmUnit():NO_DATA_LABEL}</div><div class="ssg-lbl">${lh('היקף ממוצע','Mean Girth')}</div></div>
      <div class="ssg-card"><div class="ssg-val">${r.g_median!=null?fmt(r.g_median)+cmUnit():NO_DATA_LABEL}</div><div class="ssg-lbl">${lh('חציון היקף','Median Girth')}</div></div>
      <div class="ssg-card"><div class="ssg-val">${r.g_std!=null?fmt(r.g_std)+cmUnit():NO_DATA_LABEL}</div><div class="ssg-lbl">σ ${lh('היקף','Girth')}</div></div>
      <div class="ssg-card"><div class="ssg-val">${r.g_min!=null?fmt(r.g_min)+cmUnit():NO_DATA_LABEL}</div><div class="ssg-lbl">${lh('מינ׳ היקף','Min Girth')}</div></div>
      <div class="ssg-card"><div class="ssg-val">${r.g_max!=null?fmt(r.g_max)+cmUnit():NO_DATA_LABEL}</div><div class="ssg-lbl">${lh('מקס׳ היקף','Max Girth')}</div></div>
    </div>
    ${nafotTop?`<div class="small mt8"><strong>${lh('נפות מובילות:','Top Districts:')}</strong> ${nafotTop}</div>`:''}`;
  const pc=cfgPlot();
  const STATUS_COLORS=['#16a34a','#f59e0b','#dc2626','#94a3b8','#475569','#0891b2'];
  /* Height histogram */
  if(r.heights.length>1)
    Plotly.newPlot('chartSpeciesHeightHist',[{type:'histogram',x:r.heights,nbinsx:25,marker:{color:r.lkColor,opacity:0.8}}],layout('Height Distribution – '+typeValueLabel(r.name,r.lk),'Height (cm)','Count'),pc);
  /* Girth histogram */
  if(r.girths.length>1)
    Plotly.newPlot('chartSpeciesGirthHist',[{type:'histogram',x:r.girths,nbinsx:25,marker:{color:'#065f46',opacity:0.8}}],layout('Girth Distribution – '+typeValueLabel(r.name,r.lk),'Girth (cm)','Count'),pc);
  /* Status pie */
  const sk=Object.keys(r.statuses);
  if(sk.length)
    Plotly.newPlot('chartSpeciesStatus',[{type:'pie',labels:sk.map(statusLabel),values:sk.map(k=>r.statuses[k]),hole:0.35,textinfo:'label+percent',marker:{colors:STATUS_COLORS}}],{title:{text:lh('מצב – ','Status – ')+r.name,font:{size:13}},margin:{t:36,b:4,l:4,r:4},paper_bgcolor:'transparent'},pc);
  /* Distribution by district */
  const nafotArr=Object.entries(r.nafot).filter(([n])=>n!=='לא ידוע').sort((a,b)=>b[1]-a[1]).slice(0,12);
  if(nafotArr.length)
    Plotly.newPlot('chartSpeciesNafot',[{type:'bar',x:nafotArr.map(([,c])=>c),y:nafotArr.map(([n])=>nafaLabel(n)),orientation:'h',marker:{color:r.lkColor},text:nafotArr.map(([,c])=>c),textposition:'outside'}],layout('Distribution by District – '+typeValueLabel(r.name,r.lk),'Count',''),pc);
  /* Box plot height by district */
  const boxData={};
  nafotArr.forEach(([n])=>boxData[n]=[]);
  (allFeats[r.lk]||[]).forEach(f=>{
    const tv=f.properties[r.field]||'ללא שם'; if(tv!==r.name)return;
    const n=f.properties._nafa||'לא ידוע';
    if(boxData[n]!==undefined){const h=f.properties.height;if(h&&+h>0&&+h<5000)boxData[n].push(+h);}
  });
  const boxTraces=nafotArr.map(([n],i)=>({type:'box',y:boxData[n]||[],name:nafaLabel(n),marker:{color:TYPE_COLORS[i%TYPE_COLORS.length]},boxmean:true})).filter(t=>t.y.length>0);
  if(boxTraces.length>1)
    Plotly.newPlot('chartSpeciesBoxNafot',boxTraces,layout('Height by District – '+typeValueLabel(r.name,r.lk),'District','Height (cm)'),pc);
  detail.scrollIntoView({behavior:'smooth',block:'start'});
}

/* ── Analytics ──────────────────────────────────────────── */
function _buildAnalyticsSpeciesList(){
  const grp=document.getElementById('analyticsFilterGroup').value;
  const lkDefs=grp?SPECIES_LKDEFS.filter(d=>d.lk===grp):SPECIES_LKDEFS.filter(d=>d.lk!=='carob');
  const typePairs=[...new Set(lkDefs.flatMap(({lk,field})=>(allFeats[lk]||[]).map(f=>f.properties[field]).filter(Boolean)))].map(raw=>({raw,label:typeValueLabel(raw,grp||'fruit')}));
  const types=typePairs.map(x=>x.label).sort((a,b)=>a.localeCompare(b));
  const dl=document.getElementById('analyticsSpeciesList');
  if(dl)dl.innerHTML=types.map(s=>`<option value="${s}">`).join('');
}

function _buildAnalyticsNafaList(){
  const nafaSet=new Set(nafotFeats.map(f=>f.properties?.Nafa).filter(n=>n&&n!=='לא ידוע'));
  const sel=document.getElementById('analyticsFilterNafa');
  if(sel){const prev=[...sel.selectedOptions].map(o=>o.value);sel.innerHTML=[...nafaSet].sort().map(n=>`<option value="${n}"${prev.includes(n)?' selected':''}>${nafaLabel(n)}</option>`).join('');}
}

function _getAnalyticsFeats(){
  const grp=document.getElementById('analyticsFilterGroup').value;
  const specInput=document.getElementById('analyticsFilterSpecies').value.trim();
  const nafaSel=[...document.getElementById('analyticsFilterNafa').selectedOptions].map(o=>o.value);
  const lks=grp==='vegetation' ? ['vegetation','fruit'] : (grp ? [grp] : ['fruit','vegetation','agtools','terraces']);
  const lkDefs=grp?SPECIES_LKDEFS.filter(d=>d.lk===grp):SPECIES_LKDEFS.filter(d=>d.lk!=='carob');
  const specRaw=resolveSpeciesInput(specInput,lkDefs);
  const feats={};
  lks.forEach(lk=>{
    const tf=LAYER_META[lk].typeField;
    feats[lk]=(allFeats[lk]||[]).filter(f=>{
      const dg=getDisplayGroupForFeature(lk,f);
      if(grp==='fruit' && dg!=='orchardFruitTrees')return false;
      if(grp==='vegetation' && dg!=='nonOrchardTrees')return false;
      if(!grp && lk==='fruit' && dg!=='orchardFruitTrees')return false;
      if(specInput&&specRaw&&tf&&(f.properties[tf]||'')!==specRaw)return false;
      if(specInput&&!specRaw)return false;
      if(nafaSel.length&&!nafaSel.includes(f.properties._nafa||'לא ידוע'))return false;
      return true;
    });
  });
  return{lks,feats,grp,specInput,specRaw,nafaSel};
}

function renderAnalyticsCharts(){
  const{lks,feats,grp,specInput,specRaw,nafaSel}=_getAnalyticsFeats();
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
    if(grp)parts.push(lh('תחום: ','Group: ')+lh(LAYER_META[grp].name_he,LAYER_META[grp].name_en));
    if(specInput)parts.push(lh('מין: ','Species: ')+(specRaw?typeValueLabel(specRaw,grp||'fruit'):NOT_AVAILABLE_LABEL));
    if(nafaSel.length)parts.push(lh('נפות: ','Districts: ')+nafaSel.map(nafaLabel).join(', '));
    stEl.textContent=total.toLocaleString()+' '+t('objects')+(parts.length?' | '+parts.join(' | '):'');
  }
  const pc=cfgPlot();
  /* 1 – Type distribution */
  const tf=LAYER_META[mainLk].typeField;
  const td={}; mainFeats.forEach(f=>{const v=(tf?f.properties[tf]||'ללא שם':NOT_AVAILABLE_LABEL);td[v]=(td[v]||0)+1;});
  const tKeys=Object.keys(td).sort((a,b)=>td[b]-td[a]);
  Plotly.newPlot('chartTypeDist',[{type:'bar',x:tKeys.map(tv=>typeValueLabel(tv,mainLk)),y:tKeys.map(k=>td[k]),marker:{color:tKeys.map((_,i)=>TYPE_COLORS[i%TYPE_COLORS.length])},text:tKeys.map(k=>td[k]),textposition:'outside'}],layout('Type Distribution — '+(grp?LAYER_META[grp].name_en:'All Groups'),'Type','Count'),pc);
  /* 2 – Height histogram */
  const hArr=mainFeats.map(f=>+f.properties.height).filter(v=>v>0&&v<5000);
  if(hArr.length)Plotly.newPlot('chartHeightDist',[{type:'histogram',x:hArr,nbinsx:30,marker:{color:LAYER_META[mainLk].color,opacity:0.75}}],layout('Height Distribution','Height (cm)','Count'),pc);
  /* 3 – Girth histogram */
  const gArr=mainFeats.map(f=>+f.properties.circumference_trunk).filter(v=>v>0&&v<2000);
  if(gArr.length)Plotly.newPlot('chartGirthDist',[{type:'histogram',x:gArr,nbinsx:30,marker:{color:'#065f46',opacity:0.75}}],layout('Trunk Girth Distribution','Girth (cm)','Count'),pc);
  /* 4 – Box plot height by top types */
  const topTypes=tKeys.slice(0,8);
  const boxTraces=topTypes.map((tv,i)=>({type:'box',y:mainFeats.filter(f=>(tf?f.properties[tf]||'ללא שם':NOT_AVAILABLE_LABEL)===tv).map(f=>f.properties.height).filter(v=>v&&v>0&&v<5000),name:typeValueLabel(tv,mainLk),marker:{color:TYPE_COLORS[i%TYPE_COLORS.length]}})).filter(t=>t.y.length>0);
  if(boxTraces.length)Plotly.newPlot('chartHeightBox',boxTraces,layout('Height by Type','Type','Height (cm)'),pc);
  /* 5 – Status */
  const sd={}; mainFeats.forEach(f=>{const v=statusKey(f.properties.status);sd[v]=(sd[v]||0)+1;});
  const sk=Object.keys(sd),sv=sk.map(k=>sd[k]);
  if(sk.length)Plotly.newPlot('chartStatusDist',[{type:'bar',x:sk.map(statusLabel),y:sv,marker:{color:['#16a34a','#f59e0b','#dc2626','#94a3b8','#475569']},text:sv,textposition:'outside'}],layout('Status',t('status'),'Count'),pc);
  /* 6 – Heatmap layer × status */
  const statuses=['טוב','כשיר','חולה','מת','לא ידוע'];
  const zData=lks.map(lk=>statuses.map(sv=>(feats[lk]||[]).filter(f=>statusKey(f.properties.status)===sv).length));
  if(zData.some(row=>row.some(v=>v>0)))
    Plotly.newPlot('chartHeatLayer',[{type:'heatmap',z:zData,x:statuses.map(statusLabel),y:lks.map(lk=>lh(LAYER_META[lk].name_he,LAYER_META[lk].name_en)),colorscale:'YlGn',showscale:true}],layout('Status × Layer Matrix',t('status'),t('layer')),pc);
  /* 7 – Scatter height vs girth */
  const scH=[],scG=[],scT=[];
  mainFeats.forEach(f=>{if(f.properties.height>0&&f.properties.circumference_trunk>0){scH.push(f.properties.height);scG.push(f.properties.circumference_trunk);scT.push(tf?f.properties[tf]||'':'');}});
  const scTypes=[...new Set(scT)];
  const scTraces=scTypes.slice(0,8).map((tv,i)=>{const idx=scT.map((v,j)=>v===tv?j:-1).filter(j=>j>=0);return{type:'scatter',mode:'markers',name:typeValueLabel(tv,mainLk),x:idx.map(j=>scH[j]),y:idx.map(j=>scG[j]),marker:{color:TYPE_COLORS[i%TYPE_COLORS.length],size:5,opacity:0.6}};});
  if(scTraces.length)Plotly.newPlot('chartScatterHG',scTraces,layout('Height vs. Trunk Girth','Height (cm)','Girth (cm)'),pc);
  /* 8 – Violin */
  const vTraces=topTypes.slice(0,6).map((tv,i)=>({type:'violin',y:mainFeats.filter(f=>(tf?f.properties[tf]||'ללא שם':NOT_AVAILABLE_LABEL)===tv).map(f=>f.properties.height).filter(v=>v&&v>0&&v<5000),name:typeValueLabel(tv,mainLk),box:{visible:true},meanline:{visible:true},marker:{color:TYPE_COLORS[i%TYPE_COLORS.length]}})).filter(t=>t.y.length>0);
  if(vTraces.length)Plotly.newPlot('chartViolinH',vTraces,layout('Height (Violin) by Type','Type','Height (cm)'),pc);
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
      {type:'scatter',x:hSort,y:hSort.map((_,i)=>(i+1)/hSort.length),mode:'lines',name:'Height',line:{color:'#2563eb',width:2}},
      {type:'scatter',x:gSort,y:gSort.map((_,i)=>(i+1)/gSort.length),mode:'lines',name:'Girth',line:{color:'#059669',width:2},xaxis:'x2'},
    ],{
      title:{text:'CDF – Height (blue) and Girth (green) — Orchard Fruit Trees',font:{size:13}},
      xaxis:{title:'Height (cm)',automargin:true},
      xaxis2:{title:'Girth (cm)',overlaying:'x',side:'top',showgrid:false,automargin:true},
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
      {type:'scatter',x:[0,1],y:[0,1],mode:'lines',name:'Perfect Equality',line:{color:'#94a3b8',dash:'dash'}},
    ],layout('Lorenz Curve – Orchard Fruit Tree Height  |  Gini ≈ '+gini,'Cum. % Trees','Cum. % Height'),cfgPlot());
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
      {type:'bar',name:lh('עצי פרי','Orchard Fruit Trees'),y:richSorted.map(nafaLabel),x:richSorted.map(n=>nafaSpecies[n].fruit?.size||0),orientation:'h',marker:{color:'#16a34a'}},
      {type:'bar',name:lh('עצי סרק','Non-Orchard / Wild Tree Records'),y:richSorted.map(nafaLabel),x:richSorted.map(n=>nafaSpecies[n].carob?.size||0),orientation:'h',marker:{color:'#8b6f47'}},
      {type:'bar',name:lh('צמחיה','Non-Orchard Trees'),y:richSorted.map(nafaLabel),x:richSorted.map(n=>nafaSpecies[n].vegetation?.size||0),orientation:'h',marker:{color:'#65a30d'}},
    ],layout('Species Richness by District (Unique Types)','Unique Types','District',{barmode:'stack'}),cfgPlot());
  }

  /* Correlation – height vs girth with regression line */
  const cH=fieldArr('fruit','height').filter(v=>v>0&&v<5000).slice(0,800);
  const cG=fieldArr('fruit','circumference_trunk').filter(v=>v>0&&v<2000).slice(0,800);
  const maxL=Math.min(cH.length,cG.length);
  if(maxL>10){
    const reg=linearReg(cH.slice(0,maxL),cG.slice(0,maxL));
    const regTraces=[{type:'scatter',mode:'markers',name:'Samples',x:cH.slice(0,maxL),y:cG.slice(0,maxL),marker:{color:'#7c3aed',size:4,opacity:0.5}}];
    if(reg){
      const xs=[Math.min(...cH.slice(0,maxL)),Math.max(...cH.slice(0,maxL))];
      regTraces.push({type:'scatter',mode:'lines',name:`Trend Line (y=${reg.slope.toFixed(2)}x${reg.intercept>=0?'+':''} ${reg.intercept.toFixed(0)})`,x:xs,y:xs.map(x=>reg.slope*x+reg.intercept),line:{color:'#dc2626',width:2,dash:'dot'}});
    }
    Plotly.newPlot('chartCorrelation',regTraces,layout('Height-Girth Correlation (Orchard Fruit Trees) + Trend Line','Height (cm)','Girth (cm)'),cfgPlot());
  }

  /* Grouped bar: type counts by layer */
  const lks3=['fruit','carob','vegetation'];
  const allTypesMerged=[...new Set(lks3.flatMap(lk=>Object.keys(typeDist(lk))))].slice(0,12);
  Plotly.newPlot('chartTypeByBustan',lks3.map((lk,i)=>{
    const dist=typeDist(lk);
    return{type:'bar',name:lh(LAYER_META[lk].name_he,LAYER_META[lk].name_en),x:allTypesMerged.map(tv=>typeValueLabel(tv,'fruit')),y:allTypesMerged.map(tv=>dist[tv]||0),marker:{color:LAYER_META[lk].color}};
  }),layout('Type Distribution by Layer','Type','Count',{barmode:'group'}),cfgPlot());

  /* Size class by girth – with estimated age annotation */
  const gAll=fieldArr('fruit','circumference_trunk').filter(v=>v>0&&v<2000);
  const classes=['0–30','30–60','60–100','100–150','150–300','>300'];
  const ageHints=['Seedling / Young (~1-5 years)','Growth (~5-15)','Mature (~15-30)','Old (~30-60)','Ancient (~60-120)','Very Ancient (>120)'];
  const bounds=[[0,30],[30,60],[60,100],[100,150],[150,300],[300,9999]];
  const cnts=bounds.map(([mn,mx])=>gAll.filter(v=>v>=mn&&v<mx).length);
  Plotly.newPlot('chartSizeClass',[{
    type:'bar',x:classes,y:cnts,
    marker:{color:['#86efac','#4ade80','#16a34a','#15803d','#166534','#052e16']},
    text:cnts.map((c,i)=>c?c+'\n'+ageHints[i]:''),
    textposition:'inside',textfont:{size:9},
    hovertext:cnts.map((c,i)=>classes[i]+': '+c+' – '+ageHints[i]),
    hoverinfo:'text',
  }],layout('Trunk Girth Classes – Age Estimate (Orchard Fruit Trees)','Girth Class (cm)','Tree Count'),cfgPlot());

  /* Treemap */
  const td2=typeDist('fruit');
  const tdK=Object.keys(td2),tdV=tdK.map(k=>td2[k]);
  Plotly.newPlot('chartTreemapTypes',[{type:'treemap',labels:tdK.map(tv=>typeValueLabel(tv,'fruit')),parents:tdK.map(()=>''),values:tdV,textinfo:'label+value+percent parent',marker:{colors:tdK.map((_,i)=>TYPE_COLORS[i%TYPE_COLORS.length])}}],{title:{text:'Treemap: Orchard Fruit Tree Types',font:{size:13}},margin:{t:32,b:4,l:4,r:4}},cfgPlot());

  /* Radar status */
  const rLayers=['fruit','carob','vegetation'];
  const rSt=['טוב','כשיר','חולה','מת'];
  Plotly.newPlot('chartRadarStatus',rLayers.map((lk,i)=>{
    const vals=rSt.map(sv=>(allFeats[lk]||[]).filter(f=>statusKey(f.properties.status)===sv).length);
    return{type:'scatterpolar',r:[...vals,vals[0]],theta:[...rSt.map(statusLabel),statusLabel(rSt[0])],fill:'toself',name:lh(LAYER_META[lk].name_he,LAYER_META[lk].name_en),marker:{color:LAYER_META[lk].color},opacity:0.6};
  }),{title:{text:'Object Status Radar by Layer',font:{size:13}},polar:{radialaxis:{visible:true}},margin:{t:36,b:20,l:20,r:20}},cfgPlot());
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
  sel.innerHTML=spaces.map(n=>`<option value="${n}"${prev.includes(n)?' selected':''}>${nafaLabel(n)}</option>`).join('');
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
    types.forEach(tv=>{const o=document.createElement('option');o.value=tv;o.textContent=typeValueLabel(tv,'fruit');selEl.appendChild(o);});
  } else if(type==='layer'){
    LAYER_KEYS.forEach(lk=>{const o=document.createElement('option');o.value=lk;o.textContent=LANG==='he'?LAYER_META[lk].name_he:LAYER_META[lk].name_en;selEl.appendChild(o);});
  } else if(type==='district'){
    const nafot=[...new Set(nafotFeats.map(f=>f.properties?.Nafa||'לא ידוע'))].filter(n=>n!=='לא ידוע').sort();
    nafot.forEach(n=>{const o=document.createElement('option');o.value=n;o.textContent=nafaLabel(n);selEl.appendChild(o);});
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
    return{label:nafaLabel(val)+(spaces.length?` | ${spaces.map(nafaLabel).join(', ')}`:''),feats:filtered.map(i=>i.feat),items:filtered};
  } else if(type==='layer'){
    const label=lh(LAYER_META[val].name_he,LAYER_META[val].name_en);
    const items=(allFeats[val]||[]).map(feat=>({lk:val,feat}));
    const filtered=filterBySpace(items);
    return{label:label+(spaces.length?` | ${spaces.map(nafaLabel).join(', ')}`:''),feats:filtered.map(i=>i.feat),items:filtered};
  } else if(type==='district'){
    /* Combine all tree layers filtered by district */
    const items=['fruit','carob','vegetation'].flatMap(lk=>(allFeats[lk]||[])
      .filter(f=>(f.properties._nafa||'לא ידוע')===val)
      .map(feat=>({lk,feat})));
    const filtered=filterBySpace(items);
    return{label:nafaLabel(val)+(spaces.length?` | ${spaces.map(nafaLabel).join(', ')}`:''),feats:filtered.map(i=>i.feat),items:filtered};
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
    ['מצב','Status'],['עצי פרי','Orchard Fruit Trees'],['עצי סרק','Non-Orchard / Wild Tree Records'],['צמחיה','Non-Orchard Trees'],
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

const CHART_HELP = {
  chartOverviewBar:'Shows total object counts by layer.',
  chartOverviewPie:'Shows orchard fruit tree composition by type.',
  chartDistrictStack:'Compares layer counts by district (stacked bars).',
  chartDistrictHeatmap:'Heatmap of orchard fruit tree types by district.',
  chartDistrictPie:'Share of orchard fruit trees across top districts.',
  chartDistrictSpeciesBar:'Top species composition inside selected district.',
  chartDistrictSpeciesBox:'Height spread by top species in selected district.',
  chartDistrictSpeciesHist:'Height distribution for selected species.',
  chartDistrictSpeciesGirth:'Girth distribution for selected species.',
  chartDistrictSpeciesStatus:'Status mix for selected species.',
  chartSpeciesCmpBox:'Box plots comparing selected species metrics.',
  chartSpeciesCmpBar:'Mean and median metric comparison.',
  chartSpeciesHeightHist:'Height distribution for selected species.',
  chartSpeciesGirthHist:'Girth distribution for selected species.',
  chartSpeciesStatus:'Status share for selected species.',
  chartSpeciesNafot:'Selected species distribution by district.',
  chartSpeciesBoxNafot:'Height distribution by district for selected species.',
  chartTypeDist:'Type composition under current analytics filters.',
  chartHeightDist:'Height distribution under current filters.',
  chartGirthDist:'Girth distribution under current filters.',
  chartHeightBox:'Height spread by type under current filters.',
  chartStatusDist:'Status counts under current filters.',
  chartHeatLayer:'Status-by-layer matrix under filters.',
  chartScatterHG:'Height-to-girth relationship.',
  chartViolinH:'Violin distribution of heights by type.',
  chartCDF:'CDF curves for orchard fruit tree size metrics.',
  chartLorenz:'Lorenz curve for orchard fruit tree height inequality.',
  chartBustanProfile:'Species richness by district.',
  chartCorrelation:'Height-girth correlation with trend line.',
  chartTypeByBustan:'Type counts by layer.',
  chartSizeClass:'Tree-size classes with rough age hints.',
  chartTreemapTypes:'Treemap of orchard fruit tree type share.',
  chartRadarStatus:'Layer-level status profile radar chart.',
  cmpChartBar:'Mean metric comparison between Side A and Side B.',
  cmpChartRadar:'Normalized radar comparison between Side A and Side B.',
  cmpChartBox:'Height box comparison between Side A and Side B.',
  cmpChartHist:'Height histogram comparison between Side A and Side B.',
  cmpChartScatter:'Height-girth scatter comparison for both sides.',
  chartBustanZones:'Area by type within selected historical orchard.'
};

function chartTitleFromId(id){
  return id.replace(/^chart/,'').replace(/^cmpChart/,'Compare ').replace(/([A-Z])/g,' $1').trim();
}

function ensureChartHelpModal(){
  if(document.getElementById('chartHelpOverlay'))return;
  const html=`
    <div id="chartHelpOverlay" class="chart-help-overlay" role="dialog" aria-modal="true" aria-labelledby="chartHelpTitle">
      <div class="chart-help-modal">
        <button id="chartHelpClose" class="chart-help-close" aria-label="Close help">×</button>
        <h3 id="chartHelpTitle" class="chart-help-title"></h3>
        <div id="chartHelpBody" class="chart-help-body"></div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend',html);
  const overlay=document.getElementById('chartHelpOverlay');
  const closeBtn=document.getElementById('chartHelpClose');
  const close=()=>{
    overlay.classList.remove('open');
    if(overlay._lastBtn)overlay._lastBtn.focus();
  };
  closeBtn.addEventListener('click',close);
  overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open'))close();});
}

function openChartHelp(chartId,btn){
  const overlay=document.getElementById('chartHelpOverlay');
  const titleEl=document.getElementById('chartHelpTitle');
  const bodyEl=document.getElementById('chartHelpBody');
  titleEl.textContent=chartTitleFromId(chartId);
  bodyEl.textContent=CHART_HELP[chartId] || 'This chart summarizes filtered records from the current view.';
  overlay._lastBtn=btn;
  overlay.classList.add('open');
  document.getElementById('chartHelpClose').focus();
}

function initChartHelpUI(){
  ensureChartHelpModal();
  const chartEls=[...document.querySelectorAll('[id^="chart"], [id^="cmpChart"]')];
  chartEls.forEach(el=>{
    if(el._helpBound)return;
    el._helpBound=true;
    el.classList.add('chart-host');
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='chart-info-btn';
    btn.setAttribute('aria-label','Chart help');
    btn.title='Chart help';
    btn.textContent='i';
    btn.addEventListener('click',()=>openChartHelp(el.id,btn));
    el.appendChild(btn);
  });
}

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
  const lines=['\uFEFFשכבה,OBJECTID,סוג,גובה,היקף,מצב,תיאור'];
  LAYER_KEYS.forEach(lk=>{
    const meta=LAYER_META[lk];
    (allFeats[lk]||[]).forEach(f=>{
      const p=f.properties;
      const tv=meta.typeField?(p[meta.typeField]||''):'';
      lines.push([meta.name_he,p.OBJECTID,tv,p.height||'',p.circumference_trunk||'',p.status||'',(p.Description||'').replace(/,/g,' ')].join(','));
    });
  });
  const blob=new Blob([lines.join('\n')],{type:'text/csv;charset=utf-8'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='bustanim_data.csv';a.click();
}

/* ── Language ────────────────────────────────────────────── */
function applyLang(){
  document.documentElement.lang=LANG;
  document.documentElement.dir=LANG==='he'?'rtl':'ltr';
  const setTxt=(id,val)=>{const el=document.getElementById(id);if(el)el.textContent=val;};
  {const _b=document.getElementById('btnToggleLang');if(_b)_b.textContent=LANG==='he'?'English':'עברית';}
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
  setTxt('tabDistricts',t('districts'));
  setTxt('tabSpecies',t('tab_species'));
  setTxt('tabAnalytics',t('analytics'));
  setTxt('tabAdvanced',t('advanced'));
  setTxt('tabCompare',t('compare'));
  setTxt('tabBustans',t('bustans'));
  document.getElementById('kLbl1').textContent=t('fruit_trees');
  document.getElementById('kLbl2').textContent=t('vegetation');
  document.getElementById('kLbl3').textContent=t('nafot');
  document.getElementById('kLbl4').textContent=t('ag_tools');
  document.getElementById('kLbl5').textContent=t('carob_trees');
  document.getElementById('kLbl6').textContent=lh('טרסות (שכבת מקור)','Terraces (source layer)');
  document.getElementById('kLbl7').textContent=t('avg_height_fruit');
  document.getElementById('kLbl8').textContent=t('avg_girth_fruit');
  document.getElementById('kLbl9').textContent=t('fruit_type_count');
  setTxt('districtsIntro',t('districts_intro'));
  setTxt('distGrpAll',t('grp_all'));
  setTxt('distGrpFruit',t('fruit_trees'));
  setTxt('distGrpCarob',lh('רשומות מקור אופציונליות','Optional Source Layer'));
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
  if(speciesSearch)speciesSearch.placeholder=lh('חפש מין...','Search orchard fruit tree...');
  setTxt('btnOpenSpeciesCmp',t('species_compare_toggle_open'));
  setTxt('speciesCmpTitle',t('species_compare'));
  setTxt('speciesCmpLblA',t('species_a'));
  setTxt('speciesCmpLblB',t('species_b'));
  setTxt('speciesCmpDistrictLbl',t('district_opt'));
  setTxt('btnRunSpeciesCmp',t('compare_btn'));
  const spDist=document.getElementById('speciesCmpDistrict');
  if(spDist&&spDist.options.length){spDist.options[0].textContent='All districts';}

  setTxt('analyticsLblGroup',t('filter_group'));
  setTxt('analyticsLblSpecies',t('filter_species_ac'));
  setTxt('analyticsLblDistricts',t('filter_districts'));
  setTxt('analyticsGroupAll',t('all_domains'));
  setTxt('analyticsGroupFruit',t('fruit_trees'));
  setTxt('analyticsGroupCarob',t('carob_trees'));
  setTxt('analyticsGroupVegetation',t('vegetation'));
  const afs=document.getElementById('analyticsFilterSpecies');
  if(afs)afs.placeholder=lh('הקלד מין...','Type orchard fruit tree...');
  setTxt('btnAnalyticsApply',t('apply'));
  setTxt('btnAnalyticsReset',t('reset'));
  setTxt('advancedIntro',t('advanced_intro'));

  setTxt('compareIntro',t('compare_intro'));
  setTxt('labelSideA',t('side_type_a'));  setTxt('labelSideB',t('side_type_b'));
  setTxt('cmpTypeATree',t('tree_type_opt'));
  setTxt('cmpTypeALayer',t('layer_opt'));
  setTxt('cmpTypeADistrict',t('district_opt'));
  setTxt('cmpTypeBTree',t('tree_type_opt'));
  setTxt('cmpTypeBLayer',t('layer_opt'));
  setTxt('cmpTypeBDistrict',t('district_opt'));
  setTxt('cmpSpacesLabelA',t('spaces_optional'));
  setTxt('cmpSpacesLabelB',t('spaces_optional'));
  setTxt('btnCompare',t('compare_btn'));

  const groupBase=document.getElementById('bmGroupBase');
  const groupMix=document.getElementById('bmGroupMix');
  if(groupBase)groupBase.label=LANG==='he'?groupBase.dataset.labelHe:groupBase.dataset.labelEn;
  if(groupMix)groupMix.label=LANG==='he'?groupMix.dataset.labelHe:groupMix.dataset.labelEn;

  /* Bustans tab */
  setTxt('bustansIntro',t('bustans_intro'));
  const bustanSearchEl=document.getElementById('bustanSearch');
  if(bustanSearchEl)bustanSearchEl.placeholder=t('bustans_search');
  /* Re-render bustans list to update labels if currently visible */
  const activeBustans=document.getElementById('bustans')?.classList.contains('active');
  if(activeBustans)renderBustansTab();

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
  applyLang();
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
    displayGroupVis={
      orchardFruitTrees:true,
      nonOrchardTrees:true,
      agriculturalInstallations:true,
      optionalSourceLayers:true,
    };
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
  {const _b=document.getElementById('btnToggleLang');if(_b)_b.addEventListener('click',()=>{LANG=LANG==='he'?'en':'he';localStorage.setItem('bustanim_lang',LANG);analyticsRendered=false;advancedRendered=false;cmpInit=false;speciesInit=false;districtChartsRendered=false;_speciesReg=null;applyLang();buildLayerToggles();updateOverview();});}
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
  initChartHelpUI();
  setupSearch();
  /* Bustan search live filter */
  const bustanSearchEl=document.getElementById('bustanSearch');
  if(bustanSearchEl)bustanSearchEl.addEventListener('input',renderBustansTab);
  /* Bustan detail close button */
  const bustanCloseBtn=document.getElementById('bustanDetailClose');
  if(bustanCloseBtn){
    bustanCloseBtn.addEventListener('click',()=>{
      document.getElementById('bustanDetail').style.display='none';
      selectedVillage=null;
      if(bustanimMapLayer){map.removeLayer(bustanimMapLayer);bustanimMapLayer=null;}
      renderBustansTab();
    });
  }
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