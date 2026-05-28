/* ============================================================
   Bustanim Research Dashboard – app_v4.js
   Environmental Context transformation: lazy-loaded contextual
   GIS layers, environmental profiling, area analysis.
   Only modifies version4.html behaviour – no production impact.
   ============================================================ */
"use strict";

(function(){
  if(typeof init!=='function' || typeof applyLang!=='function'){
    console.error('Version 4 enhancer could not find the base dashboard script.');
    return;
  }

  /* ---- colour palette ---- */
  const CONTEXT_COLOR_RAMP = ['#2563eb','#0f766e','#0891b2','#d97706','#7c3aed','#be185d','#16a34a','#b45309'];
  const MAX_CATEGORY_COUNT = 8;
  const EXTENT_PAD_FACTOR   = 0.08;
  let viewportRefreshTimer  = null;
  let attributeViewMode     = 'summary';
  let showAdvancedSources   = false;
  let activeMode            = 'layers';
  let contextMapLegendControl = null;
  const DEBUG_CONTEXT_CLICK = false;

  const SOIL_GROUP_PALETTE = ['#7a4e2b','#b47b3e','#c7a775','#6f7d3a','#c66b3d','#8d4b3f','#7a6a58','#6f6b3f'];
  const SOIL_SURVEY_GENERIC_PALETTE = ['#6b8e23','#9f7f3f','#9c4f2d','#4a6f8f','#8b6a3d','#a67743','#6f7f63','#8a8a8a'];
  const RAINFALL_PALETTE = {
    veryDry: '#b9c8d6',
    dry: '#8fb4d6',
    semiArid: '#5f95c6',
    mediterranean: '#3f75ac',
    humidMediterranean: '#1f4f86',
    unknown: '#94a3b8',
  };

  /* ---- technical fields to suppress in popups / details ---- */
  const TECHNICAL_FIELDS = new Set([
    'OBJECTID','FID','GlobalID','Shape','SHAPE','Shape__Area','Shape__Length',
    'geometry','esrignss_accuracy','esrignss_direction',
  ]);

  /* ---- theme catalog (display metadata for undiscovered themes) ---- */
  const CONTEXT_THEME_CATALOG = {
    soilType:         {shortLabel:'Soil Type',       displayName:'Soil Type',             themeGroup:'physical', description:'Broad soil group classification for the national territory.',   whyItMatters:'Soil type is a primary determinant of traditional orchard siting and species selection.'},
    landUse:          {shortLabel:'Land Use',        displayName:'Land Use / Land Cover',  themeGroup:'physical', description:'Land-use categories derived from national mapping.',            whyItMatters:'Reveals relationships between orchards and surrounding agricultural or urban landscapes.',  discoveryStatus:'not-found'},
    humanImpact:      {shortLabel:'Human Impact',    displayName:'Human Impact Index',     themeGroup:'physical', description:'Composite index of infrastructure, settlement, and alteration.',whyItMatters:'Identifies orchards under pressure from development and land-cover change.',                   discoveryStatus:'not-found'},
    landCover:        {shortLabel:'Land Cover',      displayName:'Vegetation Land Cover',  themeGroup:'physical', description:'Vegetation and surface-cover polygons from remote sensing.',    whyItMatters:'Shows the vegetation matrix in which heritage orchards are embedded.',                        discoveryStatus:'not-found'},
    ecosystemUnits:   {shortLabel:'Ecosystems',      displayName:'Ecosystem Units',        themeGroup:'physical', description:'Eco-system classification polygons for Israel.',                whyItMatters:'Helps situate orchards within broader ecological units relevant to conservation planning.',    discoveryStatus:'not-found'},
    openAreasCorridors:{shortLabel:'Open Corridors', displayName:'Open Areas & Corridors', themeGroup:'physical', description:'Designated open-space and ecological corridor polygons.',        whyItMatters:'Heritage orchards often serve as refugia within open-space corridors.',                       discoveryStatus:'not-found'},
    rainfallClimate:  {shortLabel:'Rainfall',        displayName:'Rainfall / Climate Zones',themeGroup:'physical', description:'Annual rainfall and climatic-zone polygon bands.',             whyItMatters:'Precipitation governs water stress and traditional dryland orchard practices.',               discoveryStatus:'not-found'},
    topographySlope:  {shortLabel:'Topography',      displayName:'Topography / Slope',     themeGroup:'physical', description:'DEM-derived slope classes or topographic units.',               whyItMatters:'Slope and aspect influence micro-climate, water retention, and traditional terrace cultivation.',discoveryStatus:'not-found'},
  };

  /* ---- field-label override map ---- */
  const CONTEXT_FIELD_LABELS = {
    FID:'Feature ID',
    OBJECTID:'Object ID',
    GlobalID:'Global ID',
    ID:'ID',
    CONTOUR:'Contour value',
    Shape__Length:'Length',
    Shape__Area:'Area',
    MIS_POL:'Soil polygon ID',
    SoilDepth:'Soil depth',
    SoilTextur:'Soil texture',
    Drainage:'Drainage',
    SlopeType:'Slope type',
    WaterErosi:'Water erosion',
    WindErosio:'Wind erosion',
    AccumRock:'Rock accumulation',
    SurveyNum:'Survey number',
    COD_SIMAN:'Code',
    DARGA:'Class',
    HK_Type:'Soil group type',
    HK_Description:'Soil group description',
    HK_GeneralType:'General type',
    HK_GeneralDescription:'General description',
    AREA:'Area',
    PERIMETER:'Perimeter',
    Color:'Color',
    'עומק':'Soil depth',
    'מרקם':'Soil texture',
    'ניקוז':'Drainage',
    'מדרון':'Slope type',
    'סחיפת':'Water erosion',
    'סחיפ_1':'Wind erosion',
    'צבע':'Color',
    'תאור_':'Description',
  };

  const HEBREW_VALUE_TRANSLATIONS = {
    'אין נתונים':'No data',
    'לא ידוע':'Unknown',
    'אחר':'Other',
    'כן':'Yes',
    'לא':'No',
    'נמוך':'Low',
    'בינוני':'Moderate',
    'גבוה':'High',
    'עמוק':'Deep',
    'בינוני עמוק':'Moderately deep',
    'רדוד':'Shallow',
    'קיים':'Present',
    'לא קיים':'Absent',
  };

  const HEBREW_TERM_TRANSLATIONS = {
    'חמרה':'hamra',
    'טין':'clay',
    'חרסית':'clayey',
    'אבקית':'silty',
    'חולית':'sandy',
    'חול':'sand',
    'קרקע':'soil',
    'קרקעות':'soils',
    'מישורית':'flat',
    'מישור':'plain',
    'בינונית':'moderate',
    'עמוקה':'deep',
    'רדודה':'shallow',
    'תלולה':'steep',
    'מתונה':'gentle',
    'סחיפה':'erosion',
    'חמורה':'severe',
    'קלה':'light',
    'אבנים':'stones',
    'כמות':'amount',
    'ניתן':'can be',
    'לסקל':'cleared of stones',
    'בהוצאה':'by removal',
    'חום':'brown',
    'כהה':'dark',
    'בהיר':'light',
    'תאור':'description',
    'יחידה':'unit',
    'יחידות':'units',
    'ניקוז':'drainage',
    'מדרון':'slope',
    'מרקם':'texture',
    'עומק':'depth',
  };

  const HEBREW_CHAR_TO_LATIN = {
    'א':'a','ב':'b','ג':'g','ד':'d','ה':'h','ו':'v','ז':'z','ח':'kh','ט':'t',
    'י':'y','כ':'k','ך':'k','ל':'l','מ':'m','ם':'m','נ':'n','ן':'n','ס':'s',
    'ע':'a','פ':'p','ף':'p','צ':'ts','ץ':'ts','ק':'q','ר':'r','ש':'sh','ת':'t',
  };

  /* ---- layer definitions ---- */
  const CONTEXT_LAYER_DEFS = {

    /* PHYSICAL / CONFIGURED */
    soilGroups250000: {
      id:'soilGroups250000',
      shortLabel:'SOIL TYPE',
      displayName:'Soil Groups 1:250,000',
      description:'Generalized national soil-group polygons for broad environmental context.',
      whyItMatters:'Soil type helps explain orchard location, drainage, species suitability, and traditional agricultural use.',
      url:'https://services3.arcgis.com/Fqk0gVrfcnumlR5m/arcgis/rest/services/SoilGroups_1_250_000/FeatureServer',
      layerId:0,
      technicalName:'SoilGroups_250_000',
      geometryType:'Polygon',
      objectIdField:'OBJECTID',
      themeGroup:'physical',
      discoveryStatus:'configured',
      defaultVisible:false,
      opacity:0.34,
      minZoom:8,
      defaultStyleOption:'generalType',
      neutralLegend:'Generalized soil group units',
      popupFields:[
        {label:'General soil group',fields:['HK_GeneralDescription','HK_GeneralType']},
        {label:'Detailed soil group',fields:['HK_Description','HK_Type']},
        {label:'Code',fields:['HK_Type']},
      ],
      requestFields:['OBJECTID','HK_Type','HK_Description','HK_GeneralType','HK_GeneralDescription','Shape__Area','Shape__Length','GlobalID'],
      styleOptions:{
        generalType:{label:'General soil group',legendTitle:'General soil group',valueFields:['HK_GeneralType'],displayFields:['HK_GeneralDescription','HK_GeneralType']},
        type:{label:'Detailed soil group',legendTitle:'Detailed soil group',valueFields:['HK_Type'],displayFields:['HK_Description','HK_Type']},
      },
      neutralStyle:{color:'#334155',fillColor:'#94a3b8'},
    },

    /* UNDISCOVERED THEME PLACEHOLDERS */
    landUse:           {id:'landUse',           shortLabel:'Land Use',        displayName:'Land Use / Land Cover',   description:'Land-use categories derived from national mapping.',            whyItMatters:'Reveals relationships between orchards and surrounding agricultural or urban landscapes.',   themeGroup:'physical',discoveryStatus:'not-found',disabled:true,geometryType:'Polygon',objectIdField:'OBJECTID',defaultVisible:false,opacity:0.35,minZoom:9,url:'',layerId:0,technicalName:'',requestFields:[],popupFields:[],neutralStyle:{color:'#94a3b8',fillColor:'#94a3b8'}},
    humanImpact:       {id:'humanImpact',       shortLabel:'Human Impact',    displayName:'Human Impact Index',      description:'Composite index of infrastructure, settlement, and land alteration.',whyItMatters:'Identifies orchards under pressure from development and land-cover change.',                  themeGroup:'physical',discoveryStatus:'not-found',disabled:true,geometryType:'Polygon',objectIdField:'OBJECTID',defaultVisible:false,opacity:0.35,minZoom:9,url:'',layerId:0,technicalName:'',requestFields:[],popupFields:[],neutralStyle:{color:'#94a3b8',fillColor:'#94a3b8'}},
    landCover:         {id:'landCover',         shortLabel:'Land Cover',      displayName:'Vegetation Land Cover',   description:'Vegetation and surface-cover polygons from remote sensing.',    whyItMatters:'Shows the vegetation matrix in which heritage orchards are embedded.',                       themeGroup:'physical',discoveryStatus:'not-found',disabled:true,geometryType:'Polygon',objectIdField:'OBJECTID',defaultVisible:false,opacity:0.35,minZoom:9,url:'',layerId:0,technicalName:'',requestFields:[],popupFields:[],neutralStyle:{color:'#94a3b8',fillColor:'#94a3b8'}},
    ecosystemUnits:    {id:'ecosystemUnits',    shortLabel:'Ecosystems',      displayName:'Ecosystem Units',         description:'Eco-system classification polygons for Israel.',                whyItMatters:'Helps situate orchards within broader ecological units relevant to conservation planning.',   themeGroup:'physical',discoveryStatus:'not-found',disabled:true,geometryType:'Polygon',objectIdField:'OBJECTID',defaultVisible:false,opacity:0.35,minZoom:9,url:'',layerId:0,technicalName:'',requestFields:[],popupFields:[],neutralStyle:{color:'#94a3b8',fillColor:'#94a3b8'}},
    openAreasCorridors:{id:'openAreasCorridors',shortLabel:'Open Corridors',  displayName:'Open Areas & Corridors',  description:'Designated open-space and ecological corridor polygons.',        whyItMatters:'Heritage orchards often serve as refugia within open-space corridors.',                      themeGroup:'physical',discoveryStatus:'not-found',disabled:true,geometryType:'Polygon',objectIdField:'OBJECTID',defaultVisible:false,opacity:0.35,minZoom:9,url:'',layerId:0,technicalName:'',requestFields:[],popupFields:[],neutralStyle:{color:'#94a3b8',fillColor:'#94a3b8'}},
    rainfallClimate:   {id:'rainfallClimate',   shortLabel:'Rainfall',        displayName:'Rainfall / Climate Zones',description:'Annual rainfall and climatic-zone polygon bands.',             whyItMatters:'Precipitation governs water stress and traditional dryland orchard practices.',              themeGroup:'physical',discoveryStatus:'not-found',disabled:true,geometryType:'Polygon',objectIdField:'OBJECTID',defaultVisible:false,opacity:0.35,minZoom:8,url:'',layerId:0,technicalName:'',requestFields:[],popupFields:[],neutralStyle:{color:'#94a3b8',fillColor:'#94a3b8'}},
    topographySlope:   {id:'topographySlope',   shortLabel:'Topography',      displayName:'Topography / Slope',      description:'DEM-derived slope classes or topographic units.',               whyItMatters:'Slope and aspect influence micro-climate, water retention, and traditional terrace cultivation.',themeGroup:'physical',discoveryStatus:'not-found',disabled:true,geometryType:'Polygon',objectIdField:'OBJECTID',defaultVisible:false,opacity:0.35,minZoom:8,url:'',layerId:0,technicalName:'',requestFields:[],popupFields:[],neutralStyle:{color:'#94a3b8',fillColor:'#94a3b8'}},

    /* ADVANCED SOURCES */
    soilSurvey20000: {
      id:'soilSurvey20000',
      shortLabel:'DETAILED SOIL',
      displayName:'Detailed Soil Survey 1:20,000',
      description:'Detailed soil survey polygons with depth, texture, drainage, slope, erosion, rock accumulation, and color.',
      whyItMatters:'Fine-grained soil conditions help interpret terraces, orchard suitability, water retention, and erosion risk.',
      url:'https://services1.arcgis.com/mPH9o04hKi8EZj1o/arcgis/rest/services/%D7%A1%D7%A7%D7%A8_%D7%A7%D7%A8%D7%A7%D7%A2_20000/FeatureServer',
      layerId:0,
      technicalName:'Soil survey 20000',
      geometryType:'Polygon',
      objectIdField:'OBJECTID',
      themeGroup:'advanced',
      discoveryStatus:'configured',
      defaultVisible:false,
      opacity:0.36,
      minZoom:11,
      defaultStyleOption:'soilDepth',
      neutralLegend:'Detailed soil survey units',
      popupFields:[
        {label:'Soil polygon ID',fields:['MIS_POL']},
        {label:'Soil depth',fields:['SoilDepth','עומק']},
        {label:'Soil texture',fields:['SoilTextur','מרקם']},
        {label:'Drainage',fields:['Drainage','ניקוז']},
        {label:'Slope type',fields:['SlopeType','מדרון']},
        {label:'Water erosion',fields:['WaterErosi','סחיפת']},
        {label:'Wind erosion',fields:['WindErosio','סחיפ_1']},
        {label:'Rock accumulation',fields:['AccumRock']},
        {label:'Soil color',fields:['Color','צבע']},
        {label:'Survey number',fields:['SurveyNum']},
        {label:'Description',fields:['תאור_']},
      ],
      requestFields:['FID','OBJECTID','MIS_POL','AREA','PERIMETER','COD_SIMAN','DARGA','SurveyNum','SoilTextur','SoilDepth','Drainage','SlopeType','WaterErosi','WindErosio','AccumRock','Color','Shape__Area','Shape__Length','עומק','מרקם','ניקוז','מדרון','סחיפת','סחיפ_1','צבע','תאור_'],
      styleOptions:{
        soilDepth:{label:'Soil depth',legendTitle:'Soil depth',valueFields:['SoilDepth','עומק'],displayFields:['SoilDepth','עומק']},
        soilTexture:{label:'Soil texture',legendTitle:'Soil texture',valueFields:['SoilTextur','מרקם'],displayFields:['SoilTextur','מרקם']},
        drainage:{label:'Drainage',legendTitle:'Drainage',valueFields:['Drainage','ניקוז'],displayFields:['Drainage','ניקוז']},
        slopeType:{label:'Slope type',legendTitle:'Slope type',valueFields:['SlopeType','מדרון'],displayFields:['SlopeType','מדרון']},
        waterErosion:{label:'Water erosion',legendTitle:'Water erosion',valueFields:['WaterErosi','סחיפת'],displayFields:['WaterErosi','סחיפת']},
        windErosion:{label:'Wind erosion',legendTitle:'Wind erosion',valueFields:['WindErosio','סחיפ_1'],displayFields:['WindErosio','סחיפ_1']},
        rockAccumulation:{label:'Rock accumulation',legendTitle:'Rock accumulation',valueFields:['AccumRock'],displayFields:['AccumRock']},
        soilColor:{label:'Soil color',legendTitle:'Soil color',valueFields:['Color','צבע'],displayFields:['Color','צבע']},
      },
      neutralStyle:{color:'#475569',fillColor:'#64748b'},
    },

    rainfallContours: {
      id:'rainfallContours',
      shortLabel:'RAINFALL CONTOURS',
      displayName:'Rainfall Contours (100 mm)',
      description:'Contour lines showing equal-rainfall values.',
      whyItMatters:'Rainfall patterns help explain dryland orchard distribution, water stress, and climatic context.',
      url:'https://services5.arcgis.com/eJYUV73IZAY87Jwy/arcgis/rest/services/isreal_contur100m/FeatureServer',
      layerId:0,
      technicalName:'isreal_contur100m',
      geometryType:'Polyline',
      objectIdField:'FID',
      themeGroup:'advanced',
      discoveryStatus:'configured',
      defaultVisible:false,
      opacity:0.74,
      minZoom:8,
      defaultStyleOption:'rainfallClass',
      popupFields:[
        {label:'Annual rainfall',fields:['CONTOUR'],format:'rainfall'},
      ],
      requestFields:['FID','ID','CONTOUR','Shape__Length'],
      styleOptions:{
        rainfallClass:{label:'Rainfall class',legendTitle:'Rainfall contours',valueFields:['CONTOUR'],displayFields:['CONTOUR'],classifier:classifyRainfallValue},
        contourValue:{label:'Exact contour value',legendTitle:'Rainfall contours',valueFields:['CONTOUR'],displayFields:['CONTOUR']},
      },
      neutralLegend:'Rainfall contour lines',
      style:{color:'#2b6cb0',weight:2.4},
    },
  };

  /* ordered lists by group (configured + verified only) */
  const LAYER_ORDER_PHYSICAL  = ['soilGroups250000'];
  const LAYER_ORDER_ADVANCED  = ['soilSurvey20000','rainfallContours'];
  const CONTEXT_LAYER_ORDER   = [...LAYER_ORDER_PHYSICAL, ...LAYER_ORDER_ADVANCED];

  /* ---- per-layer state ---- */
  const contextState = {
    initialized:false,
    activeRecordFeature:null,
    areaProfilePolygon:null,
    layers: Object.fromEntries(
      CONTEXT_LAYER_ORDER.map(id=>[
        id,{
          visible:false,
          opacity:CONTEXT_LAYER_DEFS[id].opacity,
          status:'idle',
          errorMessage:'',
          metadata:null,
          metadataPromise:null,
          leafletLayer:null,
          cache:new Map(),
          detailCache:new Map(),
          pendingDetailRequests:new Map(),
          loadedBounds:[],
          legendItems:[],
          legendTitle:'',
          featureCount:0,
          styleOption:CONTEXT_LAYER_DEFS[id].defaultStyleOption||'',
          rendererMode:'neutral',
          rendererFieldLabel:'',
          rendererFieldKey:'',
          categoryLookup:new Map(),
          categoryLabelLookup:new Map(),
          lastRequestToken:0,
          fetchPromise:null,
          pendingViewportKey:'',
          warningKey:'',
        }
      ])
    ),
  };

  /* ---- discovery summary for debug ---- */
  window.__contextLayerDiscoveryV4 = {
    configured: CONTEXT_LAYER_ORDER.filter(id=>CONTEXT_LAYER_DEFS[id].discoveryStatus==='configured'),
    notFound:   CONTEXT_LAYER_ORDER.filter(id=>CONTEXT_LAYER_DEFS[id].discoveryStatus==='not-found'),
    disabled:   CONTEXT_LAYER_ORDER.filter(id=>CONTEXT_LAYER_DEFS[id].disabled),
  };

  /* ================================================================
     INIT HOOKS
  ================================================================ */

  const originalApplyLang = applyLang;
  applyLang = function applyLangVersion4(){
    originalApplyLang();
    applyVersion4Labels();
  };

  const originalInit = init;
  document.removeEventListener('DOMContentLoaded', init);
  init = async function initVersion4(){
    await originalInit();
    initializeVersion4Context();
  };
  document.addEventListener('DOMContentLoaded', init);

  /* wrap showModal so selecting a feature also triggers env profile */
  const _origShowModal = typeof showModal === 'function' ? showModal : null;
  if(_origShowModal){
    window.showModal = async function showModalV4(feat, lk){
      await _origShowModal(feat, lk);
      updateEnvironmentalProfileForRecord(feat);
    };
  }

  /* ================================================================
     CORE INIT
  ================================================================ */

  function initializeVersion4Context(){
    if(contextState.initialized)return;
    contextState.initialized=true;
    document.body.classList.add('version4-experimental');
    ensureContextPanes();
    buildContextPanel();
    bindContextUi();
    ensureMapLegendControl();
    applyVersion4Labels();
    updateDiscoveryNote();
    map.on('moveend',()=>{
      window.clearTimeout(viewportRefreshTimer);
      viewportRefreshTimer=window.setTimeout(()=>{void handleContextViewportChange();},180);
    });
    /* hook draw events for area profile */
    map.on(L.Draw.Event.CREATED, e=>{
      if(activeMode==='area') applyAreaProfile(e.layer);
    });
    renderContextPanel();
  }

  function applyVersion4Labels(){
    const hdr=document.getElementById('hdrTitle');
    if(hdr)hdr.innerHTML=`${t('title')} <small style="font-size:0.7em;opacity:0.75">(v4 experimental)</small>`;
    const tab=document.getElementById('tabContextLayers');
    if(tab)tab.textContent='Environmental Context';
    const intro=document.getElementById('contextLayersIntro');
    if(intro)intro.textContent='Optional GIS layers that provide ecological, soil, climatic and land-cover context for interpreting heritage orchards. Layers are loaded lazily — only when enabled.';
    const attrLbl=document.getElementById('contextAttrModeLabel');
    if(attrLbl)attrLbl.textContent='Attribute details';
    const attrSel=document.getElementById('contextAttrMode');
    if(attrSel){
      const optSummary=attrSel.querySelector('option[value="summary"]');
      const optFull=attrSel.querySelector('option[value="full"]');
      if(optSummary)optSummary.textContent='Summary';
      if(optFull)optFull.textContent='Full';
    }
    const detailsTitle=document.getElementById('contextLayerDetailsTitle');
    if(detailsTitle)detailsTitle.textContent='Environmental profile';
    const detailsBody=document.getElementById('contextLayerDetailsBody');
    if(detailsBody && detailsBody.classList.contains('context-details-empty')){
      detailsBody.textContent='Click a contextual layer feature on the map to inspect its attributes here.';
    }
    const btnEssential=document.getElementById('btnShowEssentialLayers');
    if(btnEssential)btnEssential.textContent='Show physical soil layer';
    const advLabel=document.getElementById('contextShowAdvancedLabel');
    if(advLabel)advLabel.textContent='Show advanced source layers';
  }

  function ensureContextPanes(){
    if(!map.getPane('contextPolygonPane'))map.createPane('contextPolygonPane');
    if(!map.getPane('contextLinePane'))map.createPane('contextLinePane');
    map.getPane('contextPolygonPane').style.zIndex='340';
    map.getPane('contextLinePane').style.zIndex='350';
    map.getPane('contextPolygonPane').style.pointerEvents='auto';
    map.getPane('contextLinePane').style.pointerEvents='auto';
  }

  /* ================================================================
     DISCOVERY NOTE
  ================================================================ */

  function updateDiscoveryNote(){
    const note=document.getElementById('contextDiscoveryNote');
    if(!note)return;
    note.innerHTML=`
      <strong>${CONTEXT_LAYER_ORDER.length} connected contextual layers</strong> &mdash;
      only verified, active layers are shown in this version.`;
  }

  /* ================================================================
     PANEL BUILD
  ================================================================ */

  function buildContextPanel(){
    ensureContextPanelScaffold();
    renderLayerSection('sectionPhysical','contextLayersPanelList', LAYER_ORDER_PHYSICAL);
    renderLayerSection('sectionAdvanced','contextAdvancedPanelList', LAYER_ORDER_ADVANCED);
    const physSec=document.getElementById('sectionPhysical');
    if(physSec)physSec.style.display='';
    const physicalHeader=document.querySelector('#sectionPhysical .context-layer-section-header');
    if(physicalHeader)physicalHeader.textContent='Physical environment / Soil type';
    updateAdvancedSectionVisibility();
  }

  function ensureContextPanelScaffold(){
    const panel=document.getElementById('contextLayers');
    if(!panel)return;

    if(!document.getElementById('contextGlobalControls')){
      const controls=document.createElement('div');
      controls.id='contextGlobalControls';
      controls.className='context-global-controls';
      controls.innerHTML=`
        <button id="btnShowEssentialLayers" type="button">Show physical soil layer</button>
        <button id="btnHideAllContextLayers" type="button">Hide all context layers</button>
        <span class="context-attr-mode-wrap">
          <label id="contextAttrModeLabel" for="contextAttrMode">Attribute details</label>
          <select id="contextAttrMode">
            <option value="summary" selected>Summary</option>
            <option value="full">Full</option>
          </select>
        </span>
        <label class="context-advanced-toggle" for="contextShowAdvanced">
          <input type="checkbox" id="contextShowAdvanced">
          <span id="contextShowAdvancedLabel">Show advanced source layers</span>
        </label>`;
      const discoveryNote=document.getElementById('contextDiscoveryNote');
      if(discoveryNote && discoveryNote.parentNode){
        discoveryNote.parentNode.insertBefore(controls, discoveryNote.nextSibling);
      }else{
        panel.appendChild(controls);
      }
    }

    if(!document.getElementById('sectionAdvanced')){
      const advancedSection=document.createElement('div');
      advancedSection.id='sectionAdvanced';
      advancedSection.className='context-layer-section is-advanced';
      advancedSection.innerHTML=`
        <div class="context-layer-section-header">Advanced source layers</div>
        <div id="contextAdvancedPanelList" class="context-layer-grid"></div>`;
      const profile=document.getElementById('contextLayerDetails');
      if(profile && profile.parentNode){
        profile.parentNode.insertBefore(advancedSection, profile);
      }else{
        panel.appendChild(advancedSection);
      }
    }

    if(!document.getElementById('areaProfilePanel')){
      const areaPanel=document.createElement('div');
      areaPanel.id='areaProfilePanel';
      areaPanel.className='area-profile-panel';
      areaPanel.style.display='none';
      areaPanel.innerHTML=`
        <div class="context-profile-header">
          <h4>Area profile</h4>
          <button id="btnClearAreaProfile" type="button">Clear area</button>
        </div>
        <div id="areaProfileBody" class="area-profile-body">Draw a polygon on the map to generate an area profile.</div>`;
      panel.appendChild(areaPanel);
    }
  }

  function renderLayerSection(sectionId, gridId, ids){
    const grid=document.getElementById(gridId);
    if(!grid)return;
    grid.innerHTML = ids.map(id=>buildLayerCardHtml(id)).join('');
  }

  function buildLayerCardHtml(id){
    const def=CONTEXT_LAYER_DEFS[id];
    const isDisabled=!!def.disabled;
    const disabledAttr=isDisabled?' disabled':'';
    const styleSelect=(!isDisabled && def.styleOptions) ? `
      <div class="context-layer-control">
        <label for="contextStyle_${id}">Style by</label>
        <select id="contextStyle_${id}">
          ${Object.entries(def.styleOptions).map(([key,opt])=>`<option value="${key}">${opt.label}</option>`).join('')}
        </select>
      </div>` : '';
    const discoveryBadge=def.discoveryStatus==='not-found'
      ? `<span class="context-layer-discovery-status is-not-found">Not found in project sources</span>`
      : def.discoveryStatus==='configured'
        ? `<span class="context-layer-discovery-status is-configured">Configured</span>`
        : '';
    return `
      <article class="context-layer-card${isDisabled?' is-disabled':''}" id="contextCard_${id}" data-context-layer="${id}">
        <div class="context-layer-head">
          <div class="context-layer-toggle">
            <input type="checkbox" id="contextToggle_${id}"${disabledAttr}>
            <div>
              <label for="contextToggle_${id}" class="context-layer-title">${escapeHtml(def.displayName)}</label>
              <span class="context-layer-short-label">${escapeHtml(def.shortLabel)}</span>
              <div class="context-layer-subtitle" id="contextMeta_${id}">${isDisabled?'Source not yet discovered':'Off by default. Loaded on demand.'}</div>
            </div>
          </div>
          ${discoveryBadge}
        </div>
        <p class="context-layer-description">${escapeHtml(def.description)}</p>
        ${def.whyItMatters?`<p class="context-layer-why"><strong>Why it matters:</strong> ${escapeHtml(def.whyItMatters)}</p>`:''}
        ${!isDisabled ? `
        <div class="context-layer-controls">
          ${styleSelect}
          <div class="context-layer-control">
            <label for="contextOpacity_${id}">Opacity</label>
            <div class="context-opacity-row">
              <input id="contextOpacity_${id}" type="range" min="15" max="80" step="5" value="${Math.round(contextState.layers[id].opacity*100)}">
              <span class="context-opacity-value" id="contextOpacityVal_${id}">${Math.round(contextState.layers[id].opacity*100)}%</span>
            </div>
          </div>
        </div>
        <div class="context-legend-box" id="contextLegend_${id}"></div>
        <div class="context-layer-status" id="contextStatus_${id}"></div>
        <div class="context-layer-actions">
          <button id="contextRetry_${id}" type="button" hidden>Retry</button>
        </div>` : ''}
      </article>`;
  }

  function bindContextUi(){
    /* layer-level controls */
    CONTEXT_LAYER_ORDER.forEach(id=>{
      const def=CONTEXT_LAYER_DEFS[id];
      if(def.disabled)return;
      const toggle  =document.getElementById(`contextToggle_${id}`);
      const opacity =document.getElementById(`contextOpacity_${id}`);
      const styleSel=document.getElementById(`contextStyle_${id}`);
      const retry   =document.getElementById(`contextRetry_${id}`);
      if(toggle)  toggle.addEventListener('change',  e=>{void setContextLayerVisibility(id,e.target.checked);});
      if(opacity) opacity.addEventListener('input',   e=>{
        contextState.layers[id].opacity=Number(e.target.value)/100;
        applyContextLayerStyle(id);
        renderContextPanel();
      });
      if(styleSel)styleSel.addEventListener('change', e=>{
        contextState.layers[id].styleOption=e.target.value;
        updateContextRenderer(id);
        renderContextPanel();
      });
      if(retry)   retry.addEventListener('click',()=>{void ensureContextLayerData(id,{force:true});});
    });
    /* attr mode */
    const attrSel=document.getElementById('contextAttrMode');
    if(attrSel)attrSel.value=attributeViewMode;
    if(attrSel)attrSel.addEventListener('change',e=>{attributeViewMode=e.target.value==='summary'?'summary':'full';});
    /* global controls */
    const btnEssential=document.getElementById('btnShowEssentialLayers');
    if(btnEssential)btnEssential.addEventListener('click',()=>showEssentialLayers());
    const btnHideAll=document.getElementById('btnHideAllContextLayers');
    if(btnHideAll)btnHideAll.addEventListener('click',()=>hideAllContextLayers());
    /* advanced toggle */
    const advChk=document.getElementById('contextShowAdvanced');
    if(advChk)advChk.addEventListener('change',e=>{showAdvancedSources=e.target.checked;updateAdvancedSectionVisibility();});
    /* mode buttons */
    const modeBtnLayers =document.getElementById('modeBtnLayers');
    const modeBtnProfile=document.getElementById('modeBtnProfile');
    const modeBtnArea   =document.getElementById('modeBtnArea');
    if(modeBtnLayers) modeBtnLayers.addEventListener('click', ()=>switchMode('layers'));
    if(modeBtnProfile)modeBtnProfile.addEventListener('click',()=>switchMode('profile'));
    if(modeBtnArea)   modeBtnArea.addEventListener('click',   ()=>switchMode('area'));
    /* clear area profile */
    const btnClearArea=document.getElementById('btnClearAreaProfile');
    if(btnClearArea)btnClearArea.addEventListener('click',()=>clearAreaProfile());
    /* tab click */
    const tab=document.getElementById('tabContextLayers');
    if(tab)tab.addEventListener('click',()=>renderContextPanel());
  }

  /* ================================================================
     MODE SWITCHING
  ================================================================ */

  function switchMode(mode){
    activeMode=mode;
    ['layers','profile','area'].forEach(m=>{
      const btn=document.getElementById(m==='layers'?'modeBtnLayers':m==='profile'?'modeBtnProfile':'modeBtnArea');
      if(btn)btn.classList.toggle('active',m===mode);
    });
    const layerCtrls=document.getElementById('contextGlobalControls');
    if(layerCtrls)layerCtrls.style.display=mode==='layers'?'':'none';
    const sectionPhysical=document.getElementById('sectionPhysical');
    if(sectionPhysical)sectionPhysical.style.display=mode==='layers'?'':'none';
    updateAdvancedSectionVisibility();
    const profilePanel=document.getElementById('contextLayerDetails');
    if(profilePanel)profilePanel.style.display=mode==='profile'?'':'none';
    const areaPanel=document.getElementById('areaProfilePanel');
    if(areaPanel)areaPanel.style.display=mode==='area'?'':'none';
    /* if switching to profile mode, render current record profile */
    if(mode==='profile' && contextState.activeRecordFeature)renderRecordProfile(contextState.activeRecordFeature);
  }

  /* ================================================================
     GLOBAL CONTROLS
  ================================================================ */

  function showEssentialLayers(){
    LAYER_ORDER_PHYSICAL.forEach(id=>{void setContextLayerVisibility(id,true);});
    LAYER_ORDER_ADVANCED.forEach(id=>{void setContextLayerVisibility(id,false);});
  }

  function hideAllContextLayers(){
    CONTEXT_LAYER_ORDER.forEach(id=>{
      if(!CONTEXT_LAYER_DEFS[id].disabled)void setContextLayerVisibility(id,false);
    });
  }

  function updateAdvancedSectionVisibility(){
    const sec=document.getElementById('sectionAdvanced');
    if(!sec)return;
    const shouldShow = activeMode==='layers' && showAdvancedSources;
    sec.style.display=shouldShow ? '' : 'none';
  }

  async function setContextLayerVisibility(id, visible){
    const state=contextState.layers[id];
    state.visible=visible;
    if(!visible){
      if(state.leafletLayer && map.hasLayer(state.leafletLayer))map.removeLayer(state.leafletLayer);
      renderContextPanel();
      return;
    }
    await ensureContextLayerData(id,{force:false});
  }

  async function handleContextViewportChange(){
    for(const id of CONTEXT_LAYER_ORDER){
      const def=CONTEXT_LAYER_DEFS[id];
      if(def.disabled)continue;
      if(contextState.layers[id].visible){
        try{await ensureContextLayerData(id,{force:false});}
        catch(err){handleContextError(id,err);}
      }
    }
  }

  async function ensureContextLayerData(id,{force=false}={}){
    const def=CONTEXT_LAYER_DEFS[id];
    const state=contextState.layers[id];
    if(def.disabled)return;
    if(!state.visible){renderContextPanel();return;}
    if(map.getZoom()<def.minZoom){
      state.status='idle';
      if(state.leafletLayer && map.hasLayer(state.leafletLayer))map.removeLayer(state.leafletLayer);
      renderContextPanel();return;
    }
    await ensureContextMetadata(id);
    const bounds=map.getBounds();
    const viewportKey=buildViewportKey(bounds,map.getZoom());
    if(!force && state.featureCount>0 && isViewportCovered(state.loadedBounds,bounds)){
      if(state.leafletLayer && !map.hasLayer(state.leafletLayer))state.leafletLayer.addTo(map);
      applyContextLayerStyle(id);
      bringPrimaryLayersToFront();
      state.status='loaded';
      renderContextPanel();
      return;
    }
    if(!force && state.fetchPromise)return state.fetchPromise;
    if(!force && state.fetchPromise && state.pendingViewportKey===viewportKey)return state.fetchPromise;
    state.status='loading';
    state.errorMessage='';
    state.pendingViewportKey=viewportKey;
    renderContextPanel();
    const requestToken=++state.lastRequestToken;
    state.fetchPromise=(async()=>{
      try{
        const features=await fetchContextFeaturesForViewport(def,state,bounds);
        if(requestToken!==state.lastRequestToken)return;
        mergeContextFeatures(def,state,features);
        state.loadedBounds.push(bounds.pad(EXTENT_PAD_FACTOR));
        updateContextRenderer(id);
        renderContextLayer(id);
        state.status='loaded';
        state.errorMessage='';
        renderContextPanel();
      }catch(error){
        if(requestToken!==state.lastRequestToken)return;
        handleContextError(id,error);
      }finally{
        if(state.pendingViewportKey===viewportKey)state.pendingViewportKey='';
        state.fetchPromise=null;
      }
    })();
    return state.fetchPromise;
  }

  async function ensureContextMetadata(id){
    const def=CONTEXT_LAYER_DEFS[id];
    const state=contextState.layers[id];
    if(state.metadata)return state.metadata;
    if(state.metadataPromise)return state.metadataPromise;
    state.metadataPromise=(async()=>{
      const response=await fetch(`${def.url}/${def.layerId}?f=pjson`);
      if(!response.ok)throw new Error(`HTTP ${response.status}`);
      const meta=await response.json();
      state.metadata={
        maxRecordCount:Number(meta?.maxRecordCount)||1000,
        objectIdField:meta?.objectIdField||def.objectIdField,
      };
      return state.metadata;
    })();
    try{
      return await state.metadataPromise;
    }finally{
      state.metadataPromise=null;
    }
  }

  async function fetchContextFeaturesForViewport(def,state,bounds){
    const layerUrl=`${def.url}/${def.layerId}`;
    const pageSize=Math.max(50,Number(state.metadata?.maxRecordCount)||1000);
    const fields=buildContextOutFields(def);
    const baseParams=new URLSearchParams({
      where:'1=1',
      returnGeometry:'true',
      outFields:fields.join(','),
      outSR:'4326',
      inSR:'4326',
      geometry:`${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`,
      geometryType:'esriGeometryEnvelope',
      spatialRel:'esriSpatialRelIntersects',
      f:'geojson',
    });
    const features=[];
    let offset=0;
    let done=false;
    while(!done){
      const response=await fetch(`${layerUrl}/query?${baseParams.toString()}&resultOffset=${offset}&resultRecordCount=${pageSize}`);
      if(!response.ok)throw new Error(`HTTP ${response.status}`);
      const payload=await response.json();
      if(payload?.error)throw new Error(payload.error.message||'ArcGIS service error');
      const pageFeatures=payload.features||[];
      features.push(...pageFeatures);
      if(pageFeatures.length<pageSize)done=true;
      else offset+=pageSize;
    }
    return features;
  }

  function buildContextOutFields(def){
    const fields=new Set(def.requestFields||[]);
    fields.add(def.objectIdField);
    (def.popupFields||[]).forEach(entry=>(entry.fields||[]).forEach(field=>fields.add(field)));
    if(def.styleOptions){
      Object.values(def.styleOptions).forEach(option=>{
        (option.valueFields||[]).forEach(field=>fields.add(field));
        (option.displayFields||[]).forEach(field=>fields.add(field));
      });
    }
    return [...fields].filter(Boolean);
  }

  function mergeContextFeatures(def,state,features){
    features.forEach(feature=>{
      const objectId=getContextObjectId(def,state,feature);
      if(objectId==null)return;
      state.cache.set(String(objectId),feature);
    });
    state.featureCount=state.cache.size;
  }

  function getContextObjectId(def,state,feature){
    const props=feature?.properties||{};
    const candidateFields=[state.metadata?.objectIdField,def.objectIdField,'OBJECTID','FID','GlobalID'];
    for(const field of candidateFields){
      const value=props[field];
      if(value!=null && value!=='')return value;
    }
    return feature?.id ?? null;
  }

  function renderContextLayer(id){
    const def=CONTEXT_LAYER_DEFS[id];
    const state=contextState.layers[id];
    if(state.leafletLayer){
      if(map.hasLayer(state.leafletLayer))map.removeLayer(state.leafletLayer);
      state.leafletLayer=null;
    }
    const features=[...state.cache.values()];
    state.featureCount=features.length;
    if(!features.length){
      bringPrimaryLayersToFront();
      renderContextPanel();
      return;
    }
    state.leafletLayer=L.geoJSON({type:'FeatureCollection',features},{
      interactive:true,
      pane:def.geometryType==='Polyline' ? 'contextLinePane' : 'contextPolygonPane',
      style:feature=>getContextFeatureStyle(def,state,feature),
      onEachFeature:(feature,layer)=>{
        layer.on('mouseover',()=>{
          const mapContainer=map?.getContainer?.();
          if(mapContainer)mapContainer.style.cursor='pointer';
          if(typeof layer.setStyle==='function'){
            if(def.geometryType==='Polyline'){
              layer.setStyle({weight:Math.max(3.2, (def.style?.weight||2.4)+1.2),opacity:0.95});
            }else{
              const base=getContextFeatureStyle(def,state,feature);
              layer.setStyle({weight:Math.max(1.9,(base.weight||1.2)+0.9),fillOpacity:Math.min(0.72,(base.fillOpacity||0.3)+0.1),opacity:Math.min(0.98,(base.opacity||0.6)+0.15)});
            }
          }
        });
        layer.on('mouseout',()=>{
          const mapContainer=map?.getContainer?.();
          if(mapContainer)mapContainer.style.cursor='';
          if(typeof layer.setStyle==='function'){
            layer.setStyle(getContextFeatureStyle(def,state,feature));
          }
        });
        layer.on('click',async event=>{
          if(DEBUG_CONTEXT_CLICK)console.debug('Context feature click', def.id, getContextObjectId(def,state,feature));
          if(event?.originalEvent)L.DomEvent.stop(event.originalEvent);
          const popupHtml='<div class="context-popup-value">Loading feature details...</div>';
          layer.bindPopup(popupHtml,{maxWidth:320}).openPopup(event.latlng);
          const detailedProps=await getFeaturePropertiesWithDetails(def,state,feature);
          const summary=buildContextFeatureSummary(def,state,detailedProps,feature);
          layer.setPopupContent(buildContextPopupHtml(summary));
          renderContextFeatureDetails(summary);
        });
      },
    });
    if(state.visible)state.leafletLayer.addTo(map);
    bringPrimaryLayersToFront();
    renderContextPanel();
  }

  function updateContextRenderer(id){
    const def=CONTEXT_LAYER_DEFS[id];
    const state=contextState.layers[id];
    state.categoryLookup=new Map();
    state.categoryLabelLookup=new Map();
    const features=[...state.cache.values()];
    if(!features.length){
      state.rendererMode='neutral';
      state.legendTitle='Legend';
      state.legendItems=[{label:def.neutralLegend,color:def.neutralStyle.color,kind:def.geometryType==='Polyline'?'line':'polygon'}];
      updateContextLayerRenderingDebug(id,[]);
      applyContextLayerStyle(id);
      return;
    }

    const option=getLayerStyleOption(def,state);
    const categories=collectContextCategories(features,option,{def,state});
    const visibleCategories=limitCategoriesForLegend(categories,MAX_CATEGORY_COUNT);
    state.rendererMode='categorical';
    state.legendTitle=option?.legendTitle || 'Legend';
    const colorMap=buildCategoryColorMap(visibleCategories, pickPaletteName(def,state), def.neutralStyle?.color || '#94a3b8');
    visibleCategories.forEach(cat=>{
      state.categoryLookup.set(cat.key, colorMap.get(cat.key) || def.neutralStyle?.color || '#94a3b8');
      state.categoryLabelLookup.set(cat.key, cat.label);
    });
    state.legendItems=buildReadableLegend(def,state,visibleCategories);
    updateContextLayerRenderingDebug(id,visibleCategories);
    applyContextLayerStyle(id);
  }

  function collectContextCategories(features, option, options={}){
    if(!option)return [];
    const categories=new Map();
    features.forEach(feature=>{
      const props=feature?.properties||{};
      const rawValue=firstNonEmptyField(props,option.valueFields||[]);
      const labelValue=firstNonEmptyField(props,option.displayFields||option.valueFields||[]);
      const classified = typeof option.classifier==='function'
        ? option.classifier(rawValue,feature,options)
        : null;
      const key=classified?.key || normalizeCategoryKey(rawValue);
      const label=classified?.label || normalizeCategoryLabel(labelValue!=null ? labelValue : rawValue);
      const safeKey=key || 'unknown';
      if(!categories.has(safeKey))categories.set(safeKey,{key:safeKey,label:label||'Unknown',count:0,rawValues:new Set()});
      const entry=categories.get(safeKey);
      entry.count++;
      if(rawValue!=null && String(rawValue).trim()!=='')entry.rawValues.add(String(rawValue).trim());
    });
    return [...categories.values()]
      .sort((a,b)=>b.count-a.count)
      .map(item=>({key:item.key,label:item.label,count:item.count,rawValues:[...item.rawValues]}));
  }

  function limitCategoriesForLegend(categories, maxCount=8){
    if(categories.length<=maxCount)return categories;
    const kept=categories.slice(0,maxCount-1);
    const rest=categories.slice(maxCount-1);
    const otherCount=rest.reduce((sum,item)=>sum+item.count,0);
    return [...kept,{key:'other',label:'Other',count:otherCount,rawValues:[]}];
  }

  function buildCategoryColorMap(categories, paletteName, fallbackColor){
    const mapOut=new Map();
    categories.forEach((category,index)=>{
      let color=fallbackColor;
      if(paletteName==='soilGroups'){
        color=category.key==='other' ? '#8b7a66' : SOIL_GROUP_PALETTE[index%SOIL_GROUP_PALETTE.length];
      }else if(paletteName==='rainfall'){
        color=pickRainfallColor(category.key);
      }else if(paletteName==='rainfallExact'){
        const ramp=['#bdd3e5','#95b9d9','#6a9fcb','#4a87bc','#306ea3','#225989','#17466f','#12395d'];
        color=category.key==='other' ? '#8b96a3' : ramp[index%ramp.length];
      }else if(paletteName==='soilDepth'){
        color=pickSoilDepthColor(category.label, index);
      }else if(paletteName==='drainage'){
        color=pickDrainageColor(category.label, index);
      }else if(paletteName==='slopeType'){
        color=pickSlopeColor(category.label, index);
      }else if(paletteName==='erosion'){
        color=pickErosionColor(category.label, index);
      }else{
        color=category.key==='other' ? '#8a8176' : SOIL_SURVEY_GENERIC_PALETTE[index%SOIL_SURVEY_GENERIC_PALETTE.length] || CONTEXT_COLOR_RAMP[index%CONTEXT_COLOR_RAMP.length];
      }
      mapOut.set(category.key,color);
    });
    return mapOut;
  }

  function getFeatureCategoryKey(def, state, feature){
    const option=getLayerStyleOption(def,state);
    if(!option)return 'unknown';
    const props=feature?.properties||{};
    const raw=firstNonEmptyField(props,option.valueFields||[]);
    if(typeof option.classifier==='function'){
      const classified=option.classifier(raw,feature,{def,state});
      return classified?.key || 'unknown';
    }
    const baseKey=normalizeCategoryKey(raw);
    if(state.categoryLookup.has(baseKey))return baseKey;
    if(baseKey && !state.categoryLookup.has(baseKey))return 'other';
    return 'unknown';
  }

  function getFeatureCategoryLabel(def, state, feature){
    const key=getFeatureCategoryKey(def,state,feature);
    if(state.categoryLabelLookup?.has(key))return state.categoryLabelLookup.get(key);
    return normalizeCategoryLabel(key);
  }

  function buildReadableLegend(def, state, categories){
    const kind=def.geometryType==='Polyline' ? 'line' : 'polygon';
    return categories.map(cat=>({
      label:`${cat.label} — ${cat.count}`,
      color:state.categoryLookup.get(cat.key) || def.neutralStyle?.color || '#94a3b8',
      count:cat.count,
      kind,
    }));
  }

  function getContextFeatureStyle(def,state,feature){
    if(def.geometryType==='Polyline'){
      const key=getFeatureCategoryKey(def,state,feature);
      const color=state.categoryLookup.get(key) || def.style.color;
      return {
        color,
        weight:Math.max(2.2,def.style.weight||2.4),
        opacity:clamp(state.opacity+0.12,0.62,0.95),
      };
    }
    let color=def.neutralStyle.color;
    if(state.rendererMode==='categorical'){
      const key=getFeatureCategoryKey(def,state,feature);
      color=state.categoryLookup.get(key)||def.neutralStyle.color;
    }
    return {
      color,
      weight:Math.max(1.2,1.45),
      opacity:Math.max(0.55,Math.min(0.98,state.opacity+0.38)),
      fillColor:color,
      fillOpacity:Math.max(0.25,Math.min(0.58,state.opacity*0.72)),
    };
  }

  async function getFeaturePropertiesWithDetails(def,state,feature){
    const props={...(feature?.properties||{})};
    const objectId=getContextObjectId(def,state,feature);
    if(objectId==null)return props;
    const cacheKey=String(objectId);
    if(state.detailCache.has(cacheKey))return {...props,...state.detailCache.get(cacheKey)};
    if(state.pendingDetailRequests.has(cacheKey)){
      const attrs=await state.pendingDetailRequests.get(cacheKey);
      return attrs ? {...props,...attrs} : props;
    }
    const req=(async()=>{
      try{
        await ensureContextMetadata(def.id);
        const oidField=state.metadata?.objectIdField || def.objectIdField;
        const where=buildObjectIdWhereClause(oidField,objectId);
        const url=`${def.url}/${def.layerId}/query?where=${encodeURIComponent(where)}&outFields=*&returnGeometry=false&f=json`;
        const response=await fetch(url);
        if(!response.ok)return null;
        const payload=await response.json();
        const attrs=payload?.features?.[0]?.attributes || null;
        if(attrs)state.detailCache.set(cacheKey,attrs);
        return attrs;
      }catch(_error){
        return null;
      }finally{
        state.pendingDetailRequests.delete(cacheKey);
      }
    })();
    state.pendingDetailRequests.set(cacheKey,req);
    const attributes=await req;
    return attributes ? {...props,...attributes} : props;
  }

  function buildObjectIdWhereClause(field, value){
    if(typeof value==='number')return `${field}=${value}`;
    const asNumber=Number(value);
    if(Number.isFinite(asNumber) && String(asNumber)===String(value).trim())return `${field}=${asNumber}`;
    const escaped=String(value).replace(/'/g,"''");
    return `${field}='${escaped}'`;
  }

  function getLayerStyleOption(def,state){
    return def.styleOptions ? def.styleOptions[state.styleOption]||def.styleOptions[def.defaultStyleOption]||Object.values(def.styleOptions)[0] : null;
  }

  function applyContextLayerStyle(id){
    const state=contextState.layers[id];
    const def=CONTEXT_LAYER_DEFS[id];
    if(!state.leafletLayer)return;
    state.leafletLayer.setStyle(feature=>getContextFeatureStyle(def,state,feature));
    if(state.visible && !map.hasLayer(state.leafletLayer))state.leafletLayer.addTo(map);
    bringPrimaryLayersToFront();
  }

  function bringPrimaryLayersToFront(){
    const pointPriority=[];
    LAYER_KEYS.forEach(lk=>{
      if(LAYER_META?.[lk]?.geom==='point')pointPriority.push(lk);
    });
    pointPriority.forEach(lk=>{
      if(mapLayers[lk] && typeof mapLayers[lk].bringToFront==='function')mapLayers[lk].bringToFront();
    });
  }

  function buildContextPopupHtml(summary){
    const rows=(summary.rows||[])
      .map(row=>buildContextRowHtml(row.label,row.value))
      .join('');
    const advancedRows=(attributeViewMode==='full' ? (summary.advancedRows||[]).map(row=>buildContextRowHtml(row.label,row.value)).join('') : '');
    return `
      <div class="context-popup-card">
        <div class="context-popup-title">${escapeHtml(summary.title || 'Context layer')}</div>
        ${summary.subtitle ? `<div class="context-popup-subtitle">${escapeHtml(summary.subtitle)}</div>` : ''}
        ${summary.whyItMatters ? `<div class="context-popup-subtitle"><strong>Why it matters:</strong> ${escapeHtml(summary.whyItMatters)}</div>` : ''}
        ${rows || '<div class="context-popup-value">No details available.</div>'}
        ${advancedRows ? `<div class="context-popup-subtitle" style="margin-top:8px">Additional attributes</div>${advancedRows}` : ''}
      </div>`;
  }

  function renderContextFeatureDetails(summary){
    const title=document.getElementById('contextLayerDetailsTitle');
    const body=document.getElementById('contextLayerDetailsBody');
    if(title)title.textContent='Environmental profile';
    if(!body)return;
    const rows=(summary.rows||[])
      .map(row=>`<div class="context-details-row"><div class="context-details-label">${escapeHtml(row.label)}</div><div class="context-details-value">${escapeHtml(row.value)}</div></div>`)
      .filter(Boolean)
      .join('');
    const additionalRows=(attributeViewMode==='full' ? (summary.advancedRows||[]) : [])
      .map(row=>`<div class="context-details-row"><div class="context-details-label">${escapeHtml(row.label)}</div><div class="context-details-value">${escapeHtml(row.value)}</div></div>`)
      .join('');
    const additionalSection=additionalRows
      ? `<div class="context-details-layer" style="margin-top:8px">Additional attributes</div><div class="context-details-grid">${additionalRows}</div>`
      : '';
    body.classList.remove('context-details-empty');
    body.innerHTML=`
      <div class="context-details-card">
        <div class="context-details-layer">${escapeHtml(summary.title || 'Context layer')}</div>
        ${summary.subtitle ? `<div class="context-details-layer">${escapeHtml(summary.subtitle)}</div>` : ''}
        ${summary.whyItMatters ? `<div class="context-details-empty">${escapeHtml(summary.whyItMatters)}</div>` : ''}
        <div class="context-details-grid">${rows || '<div class="context-details-empty">No details available for this feature.</div>'}</div>
        ${additionalSection}
      </div>`;
  }

  function buildContextFeatureSummary(def, state, props, feature){
    const rows=[];
    const usedFields=new Set();
    (def.popupFields||[]).forEach(field=>{
      const value=formatContextValue(firstNonEmptyField(props,field.fields||[]),field.format);
      if(value==null)return;
      rows.push({label:field.label,value});
      (field.fields||[]).forEach(name=>usedFields.add(name));
    });

    const categoryLabel=getFeatureCategoryLabel(def,state,feature);
    if(categoryLabel && !rows.some(row=>row.label==='Class' || row.label==='Category')){
      rows.push({label:def.geometryType==='Polyline' ? 'Class' : 'Category', value:categoryLabel});
    }

    if(def.id==='rainfallContours'){
      const contour=Number(firstNonEmptyField(props,['CONTOUR']));
      if(Number.isFinite(contour)){
        if(!rows.some(row=>row.label==='Annual rainfall'))rows.unshift({label:'Annual rainfall',value:`${contour.toLocaleString('en-US')} mm`});
      }
      rows.push({label:'Interpretation',value:'This line marks an equal-rainfall boundary. For easier landscape interpretation, use rainfall bands/climate zones if available.'});
    }

    const advancedRows=buildAllAttributesRows(def,props,usedFields);

    const summaryTitle = def.id==='soilGroups250000'
      ? 'Soil Groups'
      : def.id==='soilSurvey20000'
        ? 'Detailed Soil Survey'
        : def.id==='rainfallContours'
          ? 'Rainfall contour'
          : def.displayName;

    return {
      title:summaryTitle,
      subtitle:categoryLabel || '',
      categoryLabel,
      whyItMatters:def.whyItMatters || '',
      rows,
      advancedRows,
    };
  }

  function buildAllAttributesRows(def, props, excludedFields){
    return Object.entries(props||{})
      .filter(([field,raw])=>!excludedFields.has(field) && !isTechnicalField(field) && raw!=null && typeof raw!=='object' && String(raw).trim()!=='')
      .sort(([a],[b])=>a.localeCompare(b))
      .map(([field,raw])=>{
        const label=getContextFieldLabel(field);
        const value=formatContextValue(raw,'auto');
        if(value==null)return null;
        return {label,value};
      })
      .filter(Boolean);
  }

  function getContextFieldLabel(field){
    if(CONTEXT_FIELD_LABELS[field])return CONTEXT_FIELD_LABELS[field];
    return toEnglishDisplayString(field);
  }

  function buildContextRowHtml(label,value){
    if(value==null || value==='')return '';
    return `<div class="context-popup-row"><div class="context-popup-label">${escapeHtml(label)}</div><div class="context-popup-value">${escapeHtml(value)}</div></div>`;
  }

  /* ================================================================
     ENVIRONMENTAL PROFILE FOR SELECTED RECORD
  ================================================================ */

  function updateEnvironmentalProfileForRecord(recordFeature){
    contextState.activeRecordFeature=recordFeature;
    if(activeMode==='profile')renderRecordProfile(recordFeature);
  }

  function renderRecordProfile(recordFeature){
    const body=document.getElementById('contextLayerDetailsBody');
    if(!body)return;
    if(!recordFeature){
      body.classList.add('context-details-empty');
      body.innerHTML='Select a record on the map to view its environmental profile here.';
      return;
    }
    const coords=extractRecordCoords(recordFeature);
    if(!coords){
      body.innerHTML='<div class="environmental-profile-empty">Could not determine coordinates for this record.</div>';
      return;
    }
    const {lng,lat}=coords;
    const sections=[];
    for(const id of CONTEXT_LAYER_ORDER){
      const def=CONTEXT_LAYER_DEFS[id];
      if(def.disabled||def.geometryType!=='Polygon')continue;
      const state=contextState.layers[id];
      if(state.featureCount===0)continue;
      const match=findContextPolygonContaining(id,lng,lat);
      if(!match)continue;
      const props=match.properties||{};
      const rowsHtml=(def.popupFields||[]).map(f=>{
        const val=formatContextValue(firstNonEmptyField(props,f.fields||[]),f.format);
        if(val==null)return '';
        return `<div class="environmental-profile-row"><span class="env-profile-label">${escapeHtml(f.label)}</span><span class="env-profile-value">${escapeHtml(val)}</span></div>`;
      }).filter(Boolean).join('');
      if(rowsHtml){
        sections.push(`
          <div class="environmental-profile-section">
            <div class="env-profile-layer-name">${escapeHtml(def.displayName)}</div>
            <div class="environmental-profile-grid">${rowsHtml}</div>
          </div>`);
      }
    }
    body.classList.remove('context-details-empty');
    if(sections.length===0){
      body.innerHTML='<div class="environmental-profile-empty">No context layers are loaded for the location of this record. Enable layers in Layer view first.</div>';
    }else{
      body.innerHTML=sections.join('');
    }
  }

  function extractRecordCoords(feature){
    const geom=feature?.geometry;
    if(!geom)return null;
    if(geom.type==='Point'){const [lng,lat]=geom.coordinates;return{lng,lat};}
    if(geom.type==='MultiPoint'){const [lng,lat]=geom.coordinates[0];return{lng,lat};}
    const props=feature?.properties||{};
    const lat=props['lat']||props['latitude']||props['y']||props['Y']||null;
    const lng=props['lng']||props['longitude']||props['x']||props['X']||null;
    if(lat!=null&&lng!=null)return{lng:Number(lng),lat:Number(lat)};
    return null;
  }

  function findContextPolygonContaining(id,lng,lat){
    const state=contextState.layers[id];
    for(const feature of state.cache.values()){
      const geom=feature?.geometry;
      if(!geom)continue;
      if(geomContainsPoint(geom,lng,lat))return feature;
    }
    return null;
  }

  function geomContainsPoint(geom,lng,lat){
    if(geom.type==='Polygon')return pointInPolygonRings(geom.coordinates,lng,lat);
    if(geom.type==='MultiPolygon')return geom.coordinates.some(poly=>pointInPolygonRings(poly,lng,lat));
    return false;
  }

  function pointInPolygonRings(rings,lng,lat){
    if(!rings||!rings.length)return false;
    if(!raycast(rings[0],lng,lat))return false;
    for(let i=1;i<rings.length;i++){if(raycast(rings[i],lng,lat))return false;}
    return true;
  }

  function raycast(ring,x,y){
    let inside=false;
    for(let i=0,j=ring.length-1;i<ring.length;j=i++){
      const [xi,yi]=ring[i],[xj,yj]=ring[j];
      if(((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi))inside=!inside;
    }
    return inside;
  }

  /* ================================================================
     AREA PROFILE
  ================================================================ */

  function applyAreaProfile(drawnLayer){
    contextState.areaProfilePolygon=drawnLayer;
    renderAreaProfile(drawnLayer);
  }

  function clearAreaProfile(){
    contextState.areaProfilePolygon=null;
    const body=document.getElementById('areaProfileBody');
    if(body)body.innerHTML='Draw a polygon on the map to generate an area profile.';
  }

  function renderAreaProfile(drawnLayer){
    const body=document.getElementById('areaProfileBody');
    if(!body)return;
    const geoJsonGeom=drawnLayer.toGeoJSON().geometry;
    body.innerHTML='<div class="area-profile-loading">Computing area profile…</div>';
    window.setTimeout(()=>{
      const sections=[];
      for(const id of CONTEXT_LAYER_ORDER){
        const def=CONTEXT_LAYER_DEFS[id];
        if(def.disabled||def.geometryType==='Polyline')continue;
        const state=contextState.layers[id];
        if(state.featureCount===0)continue;
        const inside=[];
        for(const feature of state.cache.values()){
          const geom=feature?.geometry;
          if(!geom)continue;
          const c=computeCentroid(geom);
          if(c&&geomContainsPoint(geoJsonGeom,c[0],c[1]))inside.push(feature);
        }
        if(!inside.length)continue;
        const distrib=buildDistribution(inside,def);
        if(!distrib)continue;
        sections.push(`
          <div class="area-profile-section">
            <div class="area-profile-layer-name">${escapeHtml(def.displayName)}</div>
            <div class="area-profile-summary">${inside.length} polygon${inside.length!==1?'s':''} in area</div>
            ${distrib}
          </div>`);
      }
      if(!sections.length){
        body.innerHTML='<div class="environmental-profile-empty">No context polygons found in the drawn area. Enable layers in Layer view first, then ensure the area overlaps loaded features.</div>';
      }else{
        body.innerHTML=sections.join('');
      }
    },0);
  }

  function computeCentroid(geom){
    let coords=null;
    if(geom.type==='Polygon')coords=geom.coordinates[0];
    else if(geom.type==='MultiPolygon')coords=geom.coordinates[0][0];
    if(!coords||!coords.length)return null;
    let x=0,y=0;
    coords.forEach(c=>{x+=c[0];y+=c[1];});
    return[x/coords.length,y/coords.length];
  }

  function buildDistribution(features,def){
    const state=contextState.layers[def.id];
    const option=getLayerStyleOption(def,state);
    if(!option)return null;
    const categories=limitCategoriesForLegend(collectContextCategories(features,option,{def,state}),MAX_CATEGORY_COUNT);
    if(!categories.length)return null;
    const total=categories.reduce((sum,item)=>sum+item.count,0);
    const rows=categories.map(item=>{
      const pct=total>0 ? ((item.count/total)*100).toFixed(1) : '0.0';
      return `
      <div class="area-profile-dist-row">
        <span class="area-dist-label">${escapeHtml(item.label)} (${pct}%)</span>
        <span class="area-dist-count">${item.count}</span>
      </div>`;
    }).join('');
    return `<div class="area-profile-distribution">${rows}</div>`;
  }

  function renderContextPanel(){
    CONTEXT_LAYER_ORDER.forEach(id=>{
      const def=CONTEXT_LAYER_DEFS[id];
      if(def.disabled)return;
      const state=contextState.layers[id];
      const card=document.getElementById(`contextCard_${id}`);
      const toggle=document.getElementById(`contextToggle_${id}`);
      const opacity=document.getElementById(`contextOpacity_${id}`);
      const opacityValue=document.getElementById(`contextOpacityVal_${id}`);
      const styleSel=document.getElementById(`contextStyle_${id}`);
      const legend=document.getElementById(`contextLegend_${id}`);
      const status=document.getElementById(`contextStatus_${id}`);
      const meta=document.getElementById(`contextMeta_${id}`);
      const retry=document.getElementById(`contextRetry_${id}`);
      if(toggle)toggle.checked=state.visible;
      if(opacity)opacity.value=String(Math.round(state.opacity*100));
      if(opacityValue)opacityValue.textContent=`${Math.round(state.opacity*100)}%`;
      if(styleSel)styleSel.value=state.styleOption;
      if(meta){
        if(state.featureCount>0){
          meta.textContent=`${state.featureCount.toLocaleString('en-US')} cached features in viewed areas`;
        }else if(state.visible){
          meta.textContent='Enabled. Waiting for first matching features in the current map extent.';
        }else{
          meta.textContent='Off by default. Loaded on demand.';
        }
      }
      if(legend){
        legend.innerHTML=renderLegendHtml(def,state);
      }
      if(status){
        const statusPayload=getContextStatusPayload(def,state);
        status.className=`context-layer-status ${statusPayload.className}`;
        status.textContent=statusPayload.text;
      }
      if(retry)retry.hidden=!state.errorMessage;
      if(card){
        card.classList.toggle('is-loading',state.status==='loading');
        card.classList.toggle('is-error',!!state.errorMessage);
        card.classList.toggle('is-active',state.visible);
      }
    });
    renderMapLegend();
  }

  function ensureMapLegendControl(){
    if(contextMapLegendControl)return;
    contextMapLegendControl=L.control({position:'bottomleft'});
    contextMapLegendControl.onAdd=function onAdd(){
      const div=L.DomUtil.create('div','context-map-legend');
      div.id='contextMapLegend';
      div.innerHTML='<div class="context-map-legend-empty">No contextual layer is active.</div>';
      L.DomEvent.disableClickPropagation(div);
      L.DomEvent.disableScrollPropagation(div);
      return div;
    };
    contextMapLegendControl.addTo(map);
  }

  function renderMapLegend(){
    const container=document.getElementById('contextMapLegend');
    if(!container)return;
    const active=CONTEXT_LAYER_ORDER
      .map(id=>({id,def:CONTEXT_LAYER_DEFS[id],state:contextState.layers[id]}))
      .filter(item=>item.state.visible && item.state.featureCount>0);
    if(!active.length){
      container.innerHTML='<div class="context-map-legend-empty">No contextual layer is active.</div>';
      return;
    }
    container.innerHTML=`
      <div class="context-map-legend-title">Map Legend</div>
      ${active.map(({def,state})=>{
        const items=(state.legendItems&&state.legendItems.length)
          ? state.legendItems
          : [{label:def.neutralLegend || 'Layer',color:(def.neutralStyle&&def.neutralStyle.color)||'#94a3b8'}];
        return `
          <div class="context-map-legend-layer">
            <div class="context-map-legend-layer-title">${escapeHtml(def.shortLabel)}</div>
            <div class="context-map-legend-layer-mode">${escapeHtml(getLayerStyleOption(def,state)?.label || 'Default style')}</div>
            ${items.slice(0,8).map(item=>`<div class="context-map-legend-item"><span class="context-map-legend-swatch${item.kind==='line'?' line':''}" style="${item.kind==='line' ? `border-top-color:${item.color}` : `background:${item.color};border-color:${item.color}`}"></span><span>${escapeHtml(item.label)}</span></div>`).join('')}
          </div>`;
      }).join('')}`;
  }

  function renderLegendHtml(def,state){
    const items=(state.legendItems&&state.legendItems.length)
      ? state.legendItems
      : [{label:def.neutralLegend || 'Layer legend',color:(def.neutralStyle&&def.neutralStyle.color)||'#94a3b8'}];
    return `
      <div class="context-legend-title">${escapeHtml(state.legendTitle||'Legend')}</div>
      <div class="context-legend-items">
        ${items.map(item=>`<div class="context-legend-item"><span class="context-legend-swatch${item.kind==='line'?' line':''}" style="${item.kind==='line' ? `border-top-color:${item.color}` : `background:${item.color};border-color:${item.color}`}"></span><span>${escapeHtml(item.label)}</span></div>`).join('')}
      </div>`;
  }

  function getContextStatusPayload(def,state){
    if(state.errorMessage)return {className:'is-error',text:state.errorMessage};
    if(state.status==='loading')return {className:'is-loading',text:'Loading current map view...'};
    if(state.visible && map.getZoom()<def.minZoom)return {className:'is-idle',text:`Zoom in to level ${def.minZoom} or closer to load this layer.`};
    if(state.visible && state.featureCount>0)return {className:'is-loaded',text:'Loaded for the current map extent. Pan or zoom to request additional features on demand.'};
    if(state.visible)return {className:'is-idle',text:'Enabled, but no matching features are currently cached in this map view. Pan or zoom and try again.'};
    if(state.featureCount>0)return {className:'is-loaded',text:'Cached and ready. Turn the layer on to display the current cached view.'};
    return {className:'is-idle',text:'Layer is off. No requests are made until you enable it.'};
  }

  function handleContextError(id,error){
    const def=CONTEXT_LAYER_DEFS[id];
    const state=contextState.layers[id];
    state.status='error';
    state.errorMessage=`${def.displayName} is currently unavailable. The main dashboard is still working.`;
    renderContextPanel();
    showContextWarning(id,def.displayName,state.errorMessage);
    console.warn(`Context layer failed: ${id}`,error);
  }

  function showContextWarning(id,title,message){
    const stack=document.getElementById('contextWarningStack');
    if(!stack)return;
    const key=`${id}:${message}`;
    const state=contextState.layers[id];
    if(state.warningKey===key)return;
    state.warningKey=key;
    const toast=document.createElement('div');
    toast.className='context-warning-toast';
    toast.innerHTML=`<strong>${escapeHtml(title)}</strong><span>${escapeHtml(message)}</span>`;
    stack.appendChild(toast);
    window.setTimeout(()=>{
      toast.remove();
      if(state.warningKey===key)state.warningKey='';
    },6000);
  }

  function isViewportCovered(loadedBounds, bounds){
    return loadedBounds.some(stored=>stored.contains(bounds));
  }

  function buildViewportKey(bounds, zoom){
    return [
      zoom,
      bounds.getWest().toFixed(4),
      bounds.getSouth().toFixed(4),
      bounds.getEast().toFixed(4),
      bounds.getNorth().toFixed(4),
    ].join('|');
  }

  function firstNonEmptyField(props, fields){
    for(const field of fields){
      const value=props[field];
      if(value!=null && String(value).trim()!=='')return value;
    }
    return null;
  }

  function formatContextValue(value, format){
    if(value==null || String(value).trim()==='')return null;
    if(format==='rainfall'){
      const numeric=Number(value);
      if(Number.isFinite(numeric))return `${numeric.toLocaleString('en-US',{maximumFractionDigits:1})} mm`;
    }
    if(format==='area' || format==='length' || format==='number'){
      const numeric=Number(value);
      if(Number.isFinite(numeric))return numeric.toLocaleString('en-US',{maximumFractionDigits:2});
    }
    if(typeof value==='number')return value.toLocaleString('en-US',{maximumFractionDigits:4});
    return toEnglishDisplayString(value);
  }

  function normalizeCategoryKey(value){
    const normalized=normalizeCategoryLabel(value);
    return normalized ? normalized.toLowerCase() : 'unknown';
  }

  function normalizeCategoryLabel(value){
    const text=toEnglishDisplayString(value);
    return text && text.trim() ? text.trim() : 'Unknown';
  }

  function isTechnicalField(field){
    if(!field)return true;
    if(TECHNICAL_FIELDS.has(field))return true;
    if(/^shape/i.test(field))return true;
    return false;
  }

  function pickPaletteName(def,state){
    if(def.id==='soilGroups250000')return 'soilGroups';
    if(def.id==='rainfallContours'){
      return state.styleOption==='contourValue' ? 'rainfallExact' : 'rainfall';
    }
    if(def.id==='soilSurvey20000'){
      if(state.styleOption==='soilDepth')return 'soilDepth';
      if(state.styleOption==='drainage')return 'drainage';
      if(state.styleOption==='slopeType')return 'slopeType';
      if(state.styleOption==='waterErosion' || state.styleOption==='windErosion')return 'erosion';
    }
    return 'generic';
  }

  function pickSoilDepthColor(label, index){
    const lower=String(label||'').toLowerCase();
    if(lower.includes('deep'))return '#6f4b2c';
    if(lower.includes('moderately'))return '#a17343';
    if(lower.includes('shallow'))return '#d6b181';
    if(lower.includes('unknown'))return '#94a3b8';
    return SOIL_SURVEY_GENERIC_PALETTE[index%SOIL_SURVEY_GENERIC_PALETTE.length];
  }

  function pickDrainageColor(label, index){
    const lower=String(label||'').toLowerCase();
    if(lower.includes('well') || lower.includes('good'))return '#4f8a52';
    if(lower.includes('moderate'))return '#b08f46';
    if(lower.includes('poor') || lower.includes('bad'))return '#5f7e95';
    if(lower.includes('unknown'))return '#94a3b8';
    return SOIL_SURVEY_GENERIC_PALETTE[index%SOIL_SURVEY_GENERIC_PALETTE.length];
  }

  function pickSlopeColor(label, index){
    const lower=String(label||'').toLowerCase();
    if(lower.includes('flat') || lower.includes('gentle'))return '#d4b77d';
    if(lower.includes('moderate'))return '#ad7f3f';
    if(lower.includes('steep'))return '#7f3e2c';
    if(lower.includes('unknown'))return '#94a3b8';
    return SOIL_SURVEY_GENERIC_PALETTE[index%SOIL_SURVEY_GENERIC_PALETTE.length];
  }

  function pickErosionColor(label, index){
    const lower=String(label||'').toLowerCase();
    if(lower.includes('none') || lower.includes('low') || lower.includes('light'))return '#d6c7aa';
    if(lower.includes('moderate'))return '#cc8443';
    if(lower.includes('high') || lower.includes('severe'))return '#8b4630';
    if(lower.includes('unknown'))return '#94a3b8';
    return SOIL_SURVEY_GENERIC_PALETTE[index%SOIL_SURVEY_GENERIC_PALETTE.length];
  }

  function classifyRainfallValue(rawValue){
    const numeric=Number(rawValue);
    if(!Number.isFinite(numeric))return {key:'unknown',label:'Unknown'};
    if(numeric<250)return {key:'verydry',label:'Very dry (<250 mm)'};
    if(numeric<400)return {key:'dry',label:'Dry (250-400 mm)'};
    if(numeric<550)return {key:'semiarid',label:'Semi-arid (400-550 mm)'};
    if(numeric<700)return {key:'mediterranean',label:'Mediterranean (550-700 mm)'};
    return {key:'humidmed',label:'Humid Mediterranean (>700 mm)'};
  }

  function pickRainfallColor(key){
    if(key==='verydry')return RAINFALL_PALETTE.veryDry;
    if(key==='dry')return RAINFALL_PALETTE.dry;
    if(key==='semiarid')return RAINFALL_PALETTE.semiArid;
    if(key==='mediterranean')return RAINFALL_PALETTE.mediterranean;
    if(key==='humidmed')return RAINFALL_PALETTE.humidMediterranean;
    return RAINFALL_PALETTE.unknown;
  }

  function updateContextLayerRenderingDebug(id,categories){
    if(!window.__contextLayerRenderingV4)window.__contextLayerRenderingV4={layers:{}};
    const state=contextState.layers[id];
    window.__contextLayerRenderingV4.layers[id]={
      activeStyleOption:state.styleOption,
      rendererMode:state.rendererMode,
      categoryCount:categories.length,
      legendItems:state.legendItems,
      featureCount:state.featureCount,
    };
  }

  function toEnglishDisplayString(value){
    const text=String(value??'').trim();
    if(!text)return '';
    if(HEBREW_VALUE_TRANSLATIONS[text])return HEBREW_VALUE_TRANSLATIONS[text];
    if(hasHebrew(text))return translateHebrewPhrase(text);
    return text;
  }

  function hasHebrew(text){
    return /[\u0590-\u05FF]/.test(String(text||''));
  }

  function transliterateHebrewText(text){
    const clean=String(text||'').trim();
    if(!clean)return '';
    const converted=[...clean].map(ch=>HEBREW_CHAR_TO_LATIN[ch]??ch).join('');
    return converted.replace(/\s+/g,' ').trim();
  }

  function translateHebrewPhrase(text){
    const source=String(text||'').trim();
    if(!source)return '';
    const tokenized=source.split(/(\s+|,|;|\.|\(|\)|:|\-|\/)/g);
    const translated=tokenized.map(token=>{
      const key=token.trim();
      if(!key)return token;
      if(HEBREW_TERM_TRANSLATIONS[key])return HEBREW_TERM_TRANSLATIONS[key];
      if(hasHebrew(key))return transliterateHebrewText(key);
      return token;
    }).join('');
    return translated.replace(/\s+/g,' ').trim();
  }

  function clamp(value,min,max){
    return Math.max(min,Math.min(max,value));
  }

  function escapeHtml(value){
    return String(value)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;')
      .replace(/'/g,'&#39;');
  }
})();