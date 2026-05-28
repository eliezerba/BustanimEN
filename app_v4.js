/* ============================================================
   Bustanim Research Dashboard – app_v4.js
   Adds lazy-loaded contextual GIS layers to the local Version 4
   experimental entry point without changing production behavior.
   ============================================================ */
"use strict";

(function(){
  if(typeof init!=='function' || typeof applyLang!=='function'){
    console.error('Version 4 enhancer could not find the base dashboard script.');
    return;
  }

  const CONTEXT_COLOR_RAMP = ['#2563eb','#0f766e','#0891b2','#d97706','#7c3aed','#be185d','#16a34a','#b45309'];
  const CONTEXT_LAYER_ORDER = ['soilGroups250000','soilSurvey20000','rainfallContours'];
  const MAX_CATEGORY_COUNT = 8;
  const EXTENT_PAD_FACTOR = 0.08;
  let viewportRefreshTimer = null;
  let attributeViewMode = 'full';

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

  const CONTEXT_LAYER_DEFS = {
    rainfallContours: {
      id:'rainfallContours',
      displayName:'Rainfall Contours',
      description:'Contour lines that provide climatic and environmental context for interpreting heritage orchards.',
      url:'https://services5.arcgis.com/eJYUV73IZAY87Jwy/arcgis/rest/services/isreal_contur100m/FeatureServer',
      layerId:0,
      technicalName:'isreal_contur100m',
      geometryType:'Polyline',
      objectIdField:'FID',
      defaultVisible:false,
      opacity:0.68,
      minZoom:8,
      popupFields:[
        {label:'Contour value',fields:['CONTOUR']},
        {label:'ID',fields:['ID']},
        {label:'Length',fields:['Shape__Length'],format:'length'},
      ],
      requestFields:['FID','ID','CONTOUR','Shape__Length'],
      legend:{title:'Legend',items:[{label:'Line = contour value',kind:'line',color:'#2b6cb0'}]},
      style:{color:'#2b6cb0',weight:1.9},
    },
    soilSurvey20000: {
      id:'soilSurvey20000',
      displayName:'Detailed Soil Survey 1:20,000',
      description:'Detailed soil survey polygons with information about soil depth, texture, drainage, slope, erosion, and related soil characteristics.',
      url:'https://services1.arcgis.com/mPH9o04hKi8EZj1o/arcgis/rest/services/%D7%A1%D7%A7%D7%A8_%D7%A7%D7%A8%D7%A7%D7%A2_20000/FeatureServer',
      layerId:0,
      technicalName:'Soil survey 20000',
      geometryType:'Polygon',
      objectIdField:'OBJECTID',
      defaultVisible:false,
      opacity:0.34,
      minZoom:11,
      defaultStyleOption:'soilDepth',
      neutralLegend:'Transparent polygons = detailed soil survey units',
      popupFields:[
        {label:'Soil polygon ID',fields:['MIS_POL']},
        {label:'Soil depth',fields:['SoilDepth','עומק']},
        {label:'Soil texture',fields:['SoilTextur','מרקם']},
        {label:'Drainage',fields:['Drainage','ניקוז']},
        {label:'Slope type',fields:['SlopeType','מדרון']},
        {label:'Water erosion',fields:['WaterErosi','סחיפת']},
        {label:'Wind erosion',fields:['WindErosio','סחיפ_1']},
        {label:'Rock accumulation',fields:['AccumRock']},
        {label:'Survey number',fields:['SurveyNum']},
        {label:'Description',fields:['תאור_']},
        {label:'Area',fields:['Shape__Area'],format:'area'},
      ],
      requestFields:['FID','OBJECTID','MIS_POL','AREA','PERIMETER','COD_SIMAN','DARGA','SurveyNum','SoilTextur','SoilDepth','Drainage','SlopeType','WaterErosi','WindErosio','AccumRock','Color','Shape__Area','Shape__Length','עומק','מרקם','ניקוז','מדרון','סחיפת','סחיפ_1','צבע','תאור_'],
      styleOptions:{
        soilDepth:{label:'Soil depth',legendTitle:'Soil depth categories',valueFields:['SoilDepth','עומק'],displayFields:['SoilDepth','עומק']},
        soilTexture:{label:'Soil texture',legendTitle:'Soil texture categories',valueFields:['SoilTextur','מרקם'],displayFields:['SoilTextur','מרקם']},
        drainage:{label:'Drainage',legendTitle:'Drainage categories',valueFields:['Drainage','ניקוז'],displayFields:['Drainage','ניקוז']},
        slopeType:{label:'Slope type',legendTitle:'Slope type categories',valueFields:['SlopeType','מדרון'],displayFields:['SlopeType','מדרון']},
      },
      neutralStyle:{color:'#475569',fillColor:'#64748b'},
    },
    soilGroups250000: {
      id:'soilGroups250000',
      displayName:'Soil Groups 1:250,000',
      description:'Generalized national soil-group polygons for broad environmental context.',
      url:'https://services3.arcgis.com/Fqk0gVrfcnumlR5m/arcgis/rest/services/SoilGroups_1_250_000/FeatureServer',
      layerId:0,
      technicalName:'SoilGroups_250_000',
      geometryType:'Polygon',
      objectIdField:'OBJECTID',
      defaultVisible:false,
      opacity:0.3,
      minZoom:8,
      neutralLegend:'Transparent polygons = generalized soil group units',
      popupFields:[
        {label:'Soil group type',fields:['HK_Type']},
        {label:'Soil group description',fields:['HK_Description']},
        {label:'General type',fields:['HK_GeneralType']},
        {label:'General description',fields:['HK_GeneralDescription']},
        {label:'Area',fields:['Shape__Area'],format:'area'},
      ],
      requestFields:['OBJECTID','HK_Type','HK_Description','HK_GeneralType','HK_GeneralDescription','Shape__Area','Shape__Length','GlobalID'],
      styleOptions:{
        generalType:{label:'General soil group',legendTitle:'General soil group',valueFields:['HK_GeneralType'],displayFields:['HK_GeneralDescription','HK_GeneralType']},
        type:{label:'Soil group type',legendTitle:'Soil group type',valueFields:['HK_Type'],displayFields:['HK_Description','HK_Type']},
      },
      neutralStyle:{color:'#334155',fillColor:'#94a3b8'},
    },
  };

  const contextState = {
    initialized:false,
    layers:Object.fromEntries(Object.keys(CONTEXT_LAYER_DEFS).map(id=>[
      id,
      {
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
        lastRequestToken:0,
        fetchPromise:null,
        pendingViewportKey:'',
        warningKey:'',
      }
    ])),
  };

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

  function initializeVersion4Context(){
    if(contextState.initialized)return;
    contextState.initialized=true;
    document.body.classList.add('version4-experimental');
    ensureContextPanes();
    buildContextPanel();
    bindContextUi();
    applyVersion4Labels();
    map.on('moveend',()=>{
      window.clearTimeout(viewportRefreshTimer);
      viewportRefreshTimer=window.setTimeout(()=>{ void handleContextViewportChange(); },180);
    });
    renderContextPanel();
  }

  function applyVersion4Labels(){
    const hdr=document.getElementById('hdrTitle');
    if(hdr)hdr.innerHTML=`${t('title')} <small style="font-size:0.7em;opacity:0.75">(v4 experimental)</small>`;
    const tab=document.getElementById('tabContextLayers');
    if(tab)tab.textContent='Context Layers';
    const intro=document.getElementById('contextLayersIntro');
    if(intro)intro.textContent='These optional layers provide environmental and geographic context for interpreting heritage orchards. They are loaded only when enabled.';
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
    if(detailsTitle)detailsTitle.textContent='Context layer details';
    const detailsBody=document.getElementById('contextLayerDetailsBody');
    if(detailsBody && detailsBody.classList.contains('context-details-empty')){
      detailsBody.textContent='Click a contextual layer feature on the map to inspect its attributes here.';
    }
  }

  function ensureContextPanes(){
    if(!map.getPane('contextPolygonPane'))map.createPane('contextPolygonPane');
    if(!map.getPane('contextLinePane'))map.createPane('contextLinePane');
    map.getPane('contextPolygonPane').style.zIndex='340';
    map.getPane('contextLinePane').style.zIndex='350';
  }

  function buildContextPanel(){
    const host=document.getElementById('contextLayersPanelList');
    if(!host)return;
    const panel=document.getElementById('contextLayers');
    if(panel && !document.getElementById('contextAttrModeWrap')){
      const modeWrap=document.createElement('div');
      modeWrap.id='contextAttrModeWrap';
      modeWrap.style.cssText='display:flex;align-items:center;gap:8px;margin-bottom:10px;';
      modeWrap.innerHTML=`
        <label id="contextAttrModeLabel" for="contextAttrMode" style="font-size:12px;font-weight:700;color:var(--primary)">Attribute details</label>
        <select id="contextAttrMode" style="padding:5px 8px;border:1px solid var(--border);border-radius:8px;font-size:12px">
          <option value="summary">Summary</option>
          <option value="full">Full</option>
        </select>`;
      host.parentNode.insertBefore(modeWrap,host);
      const modeSel=modeWrap.querySelector('#contextAttrMode');
      modeSel.value=attributeViewMode;
    }
    host.innerHTML=CONTEXT_LAYER_ORDER.map(id=>{
      const def=CONTEXT_LAYER_DEFS[id];
      const styleSelect=def.styleOptions ? `
        <div class="context-layer-control">
          <label for="contextStyle_${id}">Style by</label>
          <select id="contextStyle_${id}">
            ${Object.entries(def.styleOptions).map(([key,opt])=>`<option value="${key}"${key===contextState.layers[id].styleOption?' selected':''}>${opt.label}</option>`).join('')}
          </select>
        </div>` : '';
      return `
        <article class="context-layer-card" id="contextCard_${id}" data-context-layer="${id}">
          <div class="context-layer-head">
            <div class="context-layer-toggle">
              <input type="checkbox" id="contextToggle_${id}">
              <div>
                <label for="contextToggle_${id}" class="context-layer-title">${def.displayName}</label>
                <div class="context-layer-subtitle" id="contextMeta_${id}">Off by default. Loaded on demand.</div>
              </div>
            </div>
          </div>
          <p class="context-layer-description">${def.description}</p>
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
          </div>
        </article>`;
    }).join('');
  }

  function bindContextUi(){
    CONTEXT_LAYER_ORDER.forEach(id=>{
      const toggle=document.getElementById(`contextToggle_${id}`);
      const opacity=document.getElementById(`contextOpacity_${id}`);
      const styleSel=document.getElementById(`contextStyle_${id}`);
      const retry=document.getElementById(`contextRetry_${id}`);
      if(toggle)toggle.addEventListener('change',event=>{void setContextLayerVisibility(id,event.target.checked);});
      if(opacity)opacity.addEventListener('input',event=>{
        contextState.layers[id].opacity=Number(event.target.value)/100;
        applyContextLayerStyle(id);
        renderContextPanel();
      });
      if(styleSel)styleSel.addEventListener('change',event=>{
        contextState.layers[id].styleOption=event.target.value;
        updateContextRenderer(id);
        renderContextPanel();
      });
      if(retry)retry.addEventListener('click',()=>{void ensureContextLayerData(id,{force:true});});
    });
    const attrSel=document.getElementById('contextAttrMode');
    if(attrSel)attrSel.addEventListener('change',event=>{
      attributeViewMode=event.target.value==='summary' ? 'summary' : 'full';
    });
    const tab=document.getElementById('tabContextLayers');
    if(tab)tab.addEventListener('click',()=>renderContextPanel());
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
      if(contextState.layers[id].visible){
        try{
          await ensureContextLayerData(id,{force:false});
        }catch(error){
          handleContextError(id,error);
        }
      }
    }
  }

  async function ensureContextLayerData(id,{force=false}={}){
    const def=CONTEXT_LAYER_DEFS[id];
    const state=contextState.layers[id];
    if(!state.visible){
      renderContextPanel();
      return;
    }
    if(map.getZoom()<def.minZoom){
      state.status='idle';
      if(state.leafletLayer && map.hasLayer(state.leafletLayer))map.removeLayer(state.leafletLayer);
      renderContextPanel();
      return;
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
      pane:def.geometryType==='Polyline' ? 'contextLinePane' : 'contextPolygonPane',
      style:feature=>getContextFeatureStyle(def,state,feature),
      onEachFeature:(feature,layer)=>{
        layer.on('click',async event=>{
          if(event?.originalEvent)L.DomEvent.stop(event.originalEvent);
          const popupHtml='<div class="context-popup-value">Loading feature details...</div>';
          layer.bindPopup(popupHtml,{maxWidth:320}).openPopup(event.latlng);
          const detailedProps=await getFeaturePropertiesWithDetails(def,state,feature);
          layer.setPopupContent(buildContextPopupHtml(def,detailedProps));
          renderContextFeatureDetails(def,detailedProps);
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
    if(def.geometryType==='Polyline'){
      state.rendererMode='line';
      state.legendTitle=def.legend.title;
      state.legendItems=def.legend.items;
      applyContextLayerStyle(id);
      return;
    }
    const features=[...state.cache.values()];
    if(!features.length){
      state.rendererMode='neutral';
      state.legendTitle='Legend';
      state.legendItems=[{label:def.neutralLegend,color:def.neutralStyle.color}];
      applyContextLayerStyle(id);
      return;
    }

    if(id==='soilSurvey20000'){
      const option=def.styleOptions[state.styleOption]||def.styleOptions[def.defaultStyleOption];
      const categories=collectContextCategories(features,option);
      if(categories.length>=2 && categories.length<=MAX_CATEGORY_COUNT && isReadableCategorySet(categories)){
        state.rendererMode='categorical';
        state.legendTitle=option.legendTitle;
        state.legendItems=categories.map((item,index)=>({label:item.label,color:CONTEXT_COLOR_RAMP[index%CONTEXT_COLOR_RAMP.length]}));
        categories.forEach((item,index)=>state.categoryLookup.set(item.key,CONTEXT_COLOR_RAMP[index%CONTEXT_COLOR_RAMP.length]));
      }else{
        state.rendererMode='neutral';
        state.legendTitle='Legend';
        state.legendItems=[{label:def.neutralLegend,color:def.neutralStyle.color}];
      }
      applyContextLayerStyle(id);
      return;
    }

    if(id==='soilGroups250000'){
      const general=collectContextCategories(features,def.styleOptions.generalType);
      const typed=collectContextCategories(features,def.styleOptions.type);
      const chosen=(general.length>=2 && general.length<=MAX_CATEGORY_COUNT)
        ? {categories:general,option:def.styleOptions.generalType}
        : (typed.length>=2 && typed.length<=MAX_CATEGORY_COUNT ? {categories:typed,option:def.styleOptions.type} : null);
      if(chosen){
        state.rendererMode='categorical';
        state.legendTitle=chosen.option.legendTitle;
        state.legendItems=chosen.categories.map((item,index)=>({label:item.label,color:CONTEXT_COLOR_RAMP[index%CONTEXT_COLOR_RAMP.length]}));
        chosen.categories.forEach((item,index)=>state.categoryLookup.set(item.key,CONTEXT_COLOR_RAMP[index%CONTEXT_COLOR_RAMP.length]));
      }else{
        state.rendererMode='neutral';
        state.legendTitle='Legend';
        state.legendItems=[{label:def.neutralLegend,color:def.neutralStyle.color}];
      }
      applyContextLayerStyle(id);
    }
  }

  function collectContextCategories(features, option){
    const categories=new Map();
    features.forEach(feature=>{
      const props=feature?.properties||{};
      const rawValue=firstNonEmptyField(props,option.valueFields||[]);
      const labelValue=firstNonEmptyField(props,option.displayFields||option.valueFields||[]);
      if(rawValue==null || labelValue==null)return;
      const key=normalizeCategoryKey(rawValue);
      if(!key)return;
      if(!categories.has(key))categories.set(key,{key,label:toEnglishDisplayString(labelValue),count:0});
      categories.get(key).count++;
    });
    return [...categories.values()].sort((a,b)=>b.count-a.count);
  }

  function isReadableCategorySet(categories){
    if(!categories.length)return false;
    return categories.some(item=>/[A-Za-z0-9]/.test(item.label) && item.label.trim().length>1);
  }

  function getContextFeatureStyle(def,state,feature){
    if(def.geometryType==='Polyline'){
      return {
        color:def.style.color,
        weight:def.style.weight,
        opacity:clamp(state.opacity,0.2,0.85),
      };
    }
    let color=def.neutralStyle.color;
    if(state.rendererMode==='categorical'){
      const option=idToStyleOption(def,state);
      const key=option ? normalizeCategoryKey(firstNonEmptyField(feature.properties||{},option.valueFields||[])) : '';
      color=state.categoryLookup.get(key)||def.neutralStyle.color;
    }
    return {
      color,
      weight:1.45,
      opacity:Math.min(0.98,state.opacity+0.38),
      fillColor:color,
      fillOpacity:Math.max(0.14,Math.min(0.42,state.opacity*0.62)),
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

  function idToStyleOption(def,state){
    if(def.id==='soilGroups250000'){
      if(state.legendTitle===def.styleOptions.generalType.legendTitle)return def.styleOptions.generalType;
      if(state.legendTitle===def.styleOptions.type.legendTitle)return def.styleOptions.type;
      return null;
    }
    return def.styleOptions ? def.styleOptions[state.styleOption]||def.styleOptions[def.defaultStyleOption] : null;
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

  function buildContextPopupHtml(def, props){
    const usedFields=new Set();
    const rows=(def.popupFields||[])
      .map(field=>buildContextRowHtml(field.label,formatContextValue(firstNonEmptyField(props,field.fields||[]),field.format)))
      .map((html,idx)=>{
        const fieldDef=(def.popupFields||[])[idx];
        if(html)fieldDef.fields.forEach(name=>usedFields.add(name));
        return html;
      })
      .filter(Boolean)
      .join('');
    const moreRows=attributeViewMode==='full' ? buildAllAttributesRows(def,props,usedFields).join('') : '';
    const moreSection=moreRows
      ? `<div class="context-popup-subtitle" style="margin-top:8px">All available attributes</div>${moreRows}`
      : '';
    return `
      <div class="context-popup-card">
        <div class="context-popup-title">${escapeHtml(def.displayName)}</div>
        <div class="context-popup-subtitle">${escapeHtml(def.technicalName)}</div>
        ${rows || '<div class="context-popup-value">No details available.</div>'}
        ${moreSection}
      </div>`;
  }

  function renderContextFeatureDetails(def, props){
    const title=document.getElementById('contextLayerDetailsTitle');
    const body=document.getElementById('contextLayerDetailsBody');
    if(title)title.textContent='Context layer details';
    if(!body)return;
    const usedFields=new Set();
    const rows=(def.popupFields||[])
      .map(field=>{
        const value=formatContextValue(firstNonEmptyField(props,field.fields||[]),field.format);
        if(value==null)return '';
        field.fields.forEach(name=>usedFields.add(name));
        return `<div class="context-details-row"><div class="context-details-label">${escapeHtml(field.label)}</div><div class="context-details-value">${escapeHtml(value)}</div></div>`;
      })
      .filter(Boolean)
      .join('');
    const additionalRows=(attributeViewMode==='full' ? buildAllAttributesRows(def,props,usedFields) : []).map(row=>
      row
        .replace('context-popup-row','context-details-row')
        .replace('context-popup-label','context-details-label')
        .replace('context-popup-value','context-details-value')
    ).join('');
    const additionalSection=additionalRows
      ? `<div class="context-details-layer" style="margin-top:8px">All available attributes</div><div class="context-details-grid">${additionalRows}</div>`
      : '';
    body.classList.remove('context-details-empty');
    body.innerHTML=`
      <div class="context-details-card">
        <div class="context-details-layer">${escapeHtml(def.displayName)}</div>
        <div class="context-details-grid">${rows || '<div class="context-details-empty">No details available for this feature.</div>'}</div>
        ${additionalSection}
      </div>`;
  }

  function buildAllAttributesRows(def, props, excludedFields){
    return Object.entries(props||{})
      .filter(([field,raw])=>!excludedFields.has(field) && raw!=null && String(raw).trim()!=='')
      .sort(([a],[b])=>a.localeCompare(b))
      .map(([field,raw])=>{
        const label=getContextFieldLabel(field);
        const value=formatContextValue(raw,'auto');
        if(value==null)return '';
        return buildContextRowHtml(label,value);
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

  function renderContextPanel(){
    CONTEXT_LAYER_ORDER.forEach(id=>{
      const def=CONTEXT_LAYER_DEFS[id];
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
    if(format==='area' || format==='length' || format==='number'){
      const numeric=Number(value);
      if(Number.isFinite(numeric))return numeric.toLocaleString('en-US',{maximumFractionDigits:2});
    }
    if(typeof value==='number')return value.toLocaleString('en-US',{maximumFractionDigits:4});
    return toEnglishDisplayString(value);
  }

  function normalizeCategoryKey(value){
    return String(value||'').trim().toLowerCase();
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