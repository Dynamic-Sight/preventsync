/* Shared, data-backed selections used by dashboard and complete report. */
window.POC={
 names:{scan:'ScanPop',reach:'ReachOut',path:'PathAdapt'},
 worlds:{NoContext:'Preferences have no effect',StablePreference:'Stable preferences',PreferenceReversal:'Changing preferences',MissingDelayed:'Missing / delayed responses'},
 mean:a=>a.reduce((s,x)=>s+x,0)/a.length,
 median:a=>{const s=[...a].sort((a,b)=>a-b),i=Math.floor(s.length/2);return s.length%2?s[i]:(s[i-1]+s[i])/2},
 key:r=>r.setting+'|'+r.environment,
 outcome:r=>r.value-r.reference>1e-10?'better':r.value-r.reference< -1e-10?'lower':'tied',
 rows(m,setting='all',world='all',outcome='all'){
  let rows=POC_DATA.modules[m].rows.filter(r=>setting==='all'||r.setting===setting);
  if(m==='path'){
   if(world!=='all')rows=rows.filter(r=>r.world===world);
   else{const groups={};for(const r of rows)(groups[this.key(r)]??=[]).push(r);rows=Object.values(groups).map(g=>{const r={...g[0],world:'all'};for(const k of ['value','reference','completions','reference_completions','offers'])r[k]=this.mean(g.map(x=>x[k]));return r})}
  }
  return rows.filter(r=>outcome==='all'||this.outcome(r)===outcome);
 },
 scope(m,setting,world,outcome){return `${m==='path'?POC_DATA.studies.path:POC_DATA.studies.original} · ${setting==='all'?'All six settings':POC_DATA.settings[setting].label}${m==='path'?' · '+(world==='all'?'Four response patterns averaged equally':this.worlds[world]):''} · ${outcome==='all'?'All outcomes':outcome+' outcomes only'}`},
 unit:m=>m==='scan'?'AUROC':m==='reach'?'future cases / 80 reviews':'completed activities / 100 invited people'
};
