const D=window.POC_DATA,$=id=>document.getElementById(id);
let module='scan',page=0,currentRows=[],selectedScenario='',groupRows=[];
const names={scan:'ScanPop',reach:'ReachOut',path:'PathAdapt'},colors={scan:'#158578',reach:'#4d70d3',path:'#9868cb'};
const worlds={NoContext:'Preferences have no effect',StablePreference:'Stable preferences',PreferenceReversal:'Changing preferences',MissingDelayed:'Missing / delayed responses'};
const mean=a=>a.reduce((s,x)=>s+x,0)/a.length;
function fmt(v,d=1){return Number(v).toFixed(d)}
function sign(v,d){return (v>0?'+':'')+fmt(v,d)}
function svg(content,h=260){return `<svg viewBox="0 0 640 ${h}" role="img" aria-label="${$('chart-title').textContent}">${content}</svg>`}
function chart(){const m=D.modules[module],col=colors[module];let s='';
 if(module==='path'){
  const x=i=>48+i*49,y=v=>225-v/320*195;
  for(let t=0;t<=300;t+=100)s+=`<line x1="48" x2="601" y1="${y(t)}" y2="${y(t)}" stroke="#e7edf2" stroke-dasharray="3 4"/><text x="35" y="${y(t)+4}" text-anchor="end" font-size="12">${t}</text>`;
  for(const [p,c] of [['Fixed','#b5c4d0'],['Balanced',col]]){const vals=m.curves[p],pts=vals.map((v,i)=>`${x(i)},${y(v)}`).join(' ');if(p==='Balanced')s+=`<polygon points="48,225 ${pts} 587,225" fill="#9868cb0d"/>`;s+=`<polyline points="${pts}" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;vals.forEach((v,i)=>{s+=`<circle cx="${x(i)}" cy="${y(v)}" r="3" fill="${c}"><title>Week ${i+1}: ${fmt(v)} completions per 100 (${p==='Fixed'?'Fixed support':'PathAdapt'})</title></circle>`});s+=`<text x="604" y="${y(vals[11])+(p==='Fixed'?14:-6)}" font-size="13" style="fill:${c};font-weight:600">${fmt(vals[11],0)}</text>`}
  for(let i=0;i<12;i++)s+=`<text x="${x(i)}" y="247" text-anchor="middle" font-size="11">${i+1}</text>`;
  s+='<text x="320" y="270" text-anchor="middle" font-size="11">Week of support</text>';$('chart').innerHTML=svg(s,280);
 }else{
  const scan=module==='scan',min=scan?.45:0,max=scan?.9:40,x=v=>195+(v-min)/(max-min)*390;
  (scan?[.5,.6,.7,.8,.9]:[0,10,20,30,40]).forEach(t=>{s+=`<line x1="${x(t)}" x2="${x(t)}" y1="12" y2="230" stroke="#edf1f5"/><text x="${x(t)}" y="254" text-anchor="middle" font-size="11">${fmt(t,scan?1:0)}</text>`});
  Object.entries(D.settings).forEach(([key,setting],i)=>{const r=m.settings[key],a=r.value.median,b=r.reference.median,y=29+i*37;s+=`<text x="0" y="${y+4}" font-size="12">${setting.label}</text><line x1="${x(b)}" x2="${x(a)}" y1="${y}" y2="${y}" stroke="${col}" stroke-opacity=".35" stroke-width="4"/><circle cx="${x(b)}" cy="${y}" r="5" fill="#bdcad5"><title>${setting.label}: reference ${fmt(b,scan?3:1)}</title></circle><circle cx="${x(a)}" cy="${y}" r="6" fill="${col}"><title>${setting.label}: ${names[module]} ${fmt(a,scan?3:1)}</title></circle><text x="${x(a)+12}" y="${y+4}" font-size="11" style="fill:${col};font-weight:600">${fmt(a,scan?3:1)}</text>`});$('chart').innerHTML=svg(s,270);
 }
}
function render(){const m=D.modules[module],s=m.summary,isPath=module==='path';
 document.querySelectorAll('[data-module]').forEach(b=>{b.classList.toggle('selected',b.dataset.module===module);if(b.getAttribute('role')==='tab'){b.setAttribute('aria-selected',String(b.dataset.module===module));b.tabIndex=b.dataset.module===module?0:-1}});
 $('result-panel').setAttribute('aria-labelledby','tab-'+module);
 $('legend-dot').style.background=colors[module];$('legend-name').textContent=names[module];$('legend-ref').textContent=isPath?'Fixed support':'Laboratory categories';$('chart-study').textContent=isPath?'FRESH PATHADAPT EVALUATION':'ORIGINAL RISK & REVIEW STUDY';$('chart-count').textContent='96 scenarios';
 $('chart-title').textContent={scan:'Better risk ranking across six settings',reach:'More future cases in the same review capacity',path:'Completed activities over 12 weeks'}[module];
 $('chart-caption').textContent={scan:'Median AUROC in each setting · 16 scenarios per setting · Higher is better. Dots show results, not confidence intervals.',reach:'Median future cases included in 80 reviews · 16 scenarios per setting. Required clinical checks are preserved.',path:'Mean cumulative completions per 100 invited people · Same invitation schedule · Four response patterns averaged equally.'}[module];
 $('insight-title').textContent={scan:'A clearer view of future risk.',reach:'More attention where it is needed.',path:'Better recommendations. Same effort.'}[module];
 $('insight-body').textContent=module==='scan'?`ScanPop has a median AUROC of ${fmt(s.value.median,3)}, compared with ${fmt(s.reference.median,3)} for broad laboratory categories.`:module==='reach'?`A median of ${fmt(s.value.median,0)} future cases appear on the review list, compared with ${fmt(s.reference.median,0)} using laboratory categories. Both approaches have 80 places.`:`About ${fmt(s.value.mean*100,0)} activities are completed per 100 invited people, compared with ${fmt(s.reference.mean*100,0)} under fixed support. These are activities, not counts of people.`;
 $('insight-number').textContent=`${s.wins}/${s.n}`;$('insight-number').style.color=colors[module];$('insight-label').textContent='scenarios with a better result than the reference';
 $('wins').innerHTML=`<i style="width:${s.wins/s.n*100}%;background:${colors[module]}"></i><i style="width:${s.losses/s.n*100}%;background:#d4ad89"></i><i style="width:${s.ties/s.n*100}%;background:#cbd5de"></i>`;
 $('win-labels').innerHTML=`<span>${s.wins} better</span><span>${s.losses} lower</span><span>${s.ties} tied</span>`;
 $('takeaway').textContent=module==='scan'?`Median paired gain: ${sign(s.gain.median,3)} AUROC. The middle 50% of gains range from ${sign(s.gain.q25,3)} to ${sign(s.gain.q75,3)}.`:module==='reach'?`Median paired improvement: ${sign(s.gain.median,0)} future cases, or ${sign(s.relative.median,1)}%. This gain is calculated within each scenario.`:`Estimated gain: ${sign(s.gain.mean*100,1)} activities per 100 people. The 95% simulation interval is ${sign(s.ci[0]*100,1)} to ${sign(s.ci[1]*100,1)}.`;
 $('world-label').hidden=!isPath;$('table-value').textContent=names[module];$('table-ref').textContent=isPath?'Fixed support':'Laboratory categories';
 $('explorer-subtitle').textContent=isPath?'Completed activities per 100 invited people · Fresh evaluation':'Original study · '+(module==='scan'?'Risk ranking (AUROC)':'Future cases included in 80 reviews');
 $('design-title').textContent=isPath?'More completions, without more invitations':'The same patients. The same review capacity.';
 $('design-facts').innerHTML=(isPath?[['12','weeks of support'],['6','maximum offers / person'],['4','response patterns']]:[['400','virtual patients / scenario'],['80','review places'],['12','month outcome horizon']]).map(([v,l])=>`<div><strong>${v}</strong><small>${l}</small></div>`).join('');
 $('design-note').textContent=isPath?'An offer is an invitation to complete an activity. Every policy uses the same offers and participants. PathAdapt chooses which activity to recommend.':'Required clinical checks take priority. The remaining review places are allocated by risk. The number of required checks varies across scenarios.';
 $('limitations').textContent=isPath?'The current policy was selected on development data before this fresh evaluation. Real participation data are the next step. Many simulated participants use all six offers before preferences change, so later adaptation remains a limited test.':'These are team-generated virtual patients. Results demonstrate the workflow under the tested assumptions. Real patient data and prospective evaluation are needed to establish clinical value.';
 page=0;chart();table();
}
function table(){groupRows=POC.rows(module,$('setting').value,$('world').value);let rows=groupRows.filter(r=>!$('outcome')||$('outcome').value==='all'||POC.outcome(r)===$('outcome').value);
 if(!rows.some(r=>POC.key(r)===selectedScenario))selectedScenario=rows.length?POC.key(rows[0]):'';
 page=selectedScenario?Math.floor(rows.findIndex(r=>POC.key(r)===selectedScenario)/6):0;
 currentRows=rows;const digits=module==='scan'?3:module==='reach'?0:1,scale=module==='path'?100:1;
 $('scenario-body').innerHTML=rows.length?rows.slice(page*6,page*6+6).map(r=>{let diff=(r.value-r.reference)*scale,cls=diff>1e-10?'':diff< -1e-10?'loss':'tie';return `<tr class="${selectedScenario===POC.key(r)?'selected-row':''}"><td><button class="scenario-row-button" data-scenario="${POC.key(r)}" aria-pressed="${selectedScenario===POC.key(r)}">${r.setting[0]} · E${String(r.environment).padStart(2,'0')}</button></td><td>${D.settings[r.setting].label}</td><td>${fmt(r.value*scale,digits)}</td><td>${fmt(r.reference*scale,digits)}</td><td class="${diff<0?'negative':'positive'}">${sign(diff,digits)}</td><td><span class="result-badge ${cls}">${cls==='loss'?'Lower':cls==='tie'?'Tied':'Better'}</span></td></tr>`}).join(''):'<tr><td colspan="6">No scenarios match this outcome. Choose another outcome filter.</td></tr>';
 $('page-status').textContent=rows.length?`Showing ${page*6+1}–${Math.min(page*6+6,rows.length)} of ${rows.length} scenarios`:'No matching scenarios';$('prev').disabled=page===0;$('next').disabled=(page+1)*6>=rows.length;
 $('filter-note').textContent=$('setting').value==='all'?'Headline results above remain the overall study results.':D.settings[$('setting').value].description;
 document.dispatchEvent(new Event('scenariochange'));
}
function selectScenario(key){selectedScenario=key;const i=currentRows.findIndex(r=>POC.key(r)===key);if(i>=0)page=Math.floor(i/6);table()}
function selectModule(m){view(m)}
function view(v){const next=v==='overview'?'scan':v;if(!names[next])return;module=next;document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===v));$('crumb').textContent=v==='overview'?'Overview':names[v];$('page-title').innerHTML=v==='overview'?'Better decisions. <span>At every step.</span>':{scan:'ScanPop. <span>Identify higher risk.</span>',reach:'ReachOut. <span>Make every review count.</span>',path:'PathAdapt. <span>Support that learns.</span>'}[v];render();history.replaceState(null,'','#'+v)}
for(const [key,s] of Object.entries(D.settings))$('setting').add(new Option(`${key[0]} · ${s.label}`,key));
document.querySelectorAll('[data-module]').forEach(b=>b.onclick=()=>selectModule(b.dataset.module));document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>view(b.dataset.view));
for(const id of ['setting','world'])$(id).onchange=()=>{page=0;table()};$('prev').onclick=()=>{page--;selectedScenario=POC.key(currentRows[page*6]);table()};$('next').onclick=()=>{page++;selectedScenario=POC.key(currentRows[page*6]);table()};
 $('scenario-body').onclick=e=>{const b=e.target.closest('[data-scenario]');if(b){selectScenario(b.dataset.scenario);document.querySelector(`[data-scenario="${selectedScenario}"]`)?.focus()}};
for(const id of ['method-open','notice-method','methods-bottom'])$(id).onclick=()=>$('methods').showModal();$('close-methods').onclick=()=>$('methods').close();$('methods').onclick=e=>{if(e.target===$('methods')){const r=$('methods').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('methods').close()}};
let previousFocus;$('methods').addEventListener('close',()=>{if(previousFocus)previousFocus.focus()});$('print').onclick=()=>{const q=new URLSearchParams({module,setting:$('setting').value,world:$('world').value,outcome:$('outcome')?.value||'all',scenario:selectedScenario});window.open('report.html?'+q,'_blank','noopener')};
 $('export').onclick=()=>{const scale=module==='path'?100:1,unit=module==='scan'?'AUROC':module==='reach'?'cases_per_80_reviews':'activities_per_100_invited';let text='module,study,setting,environment,response_pattern,unit,value,reference,difference\n'+currentRows.map(r=>[names[module],module==='path'?'fresh_evaluation':'original_study',r.setting,r.environment,module==='path'?$('world').value:'not_applicable',unit,r.value*scale,r.reference*scale,(r.value-r.reference)*scale].join(',')).join('\n');const url=URL.createObjectURL(new Blob([text],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download=`PreventSync_${names[module]}_results.csv`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
// One correctly labelled tab panel, one active keyboard tab, one module state.
const panel=document.createElement('section');panel.id='result-panel';panel.setAttribute('role','tabpanel');panel.tabIndex=0;
const first=document.querySelector('.analysis-grid');first.before(panel);
for(const sel of ['.analysis-grid','.scenario-panel','.bottom-grid'])panel.append(document.querySelector(sel));
document.querySelectorAll('[role="tab"]').forEach(b=>{b.id='tab-'+b.dataset.module;b.setAttribute('aria-controls','result-panel');b.onkeydown=e=>{const keys=['ArrowLeft','ArrowRight','Home','End'];if(!keys.includes(e.key))return;e.preventDefault();const ms=['scan','reach','path'],i=ms.indexOf(b.dataset.module),j=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowRight'?1:2))%3;view(ms[j]);$('tab-'+ms[j]).focus()}});
document.querySelector('.brand').onclick=e=>{e.preventDefault();view('overview')};window.addEventListener('hashchange',()=>view(location.hash.slice(1)||'overview'));
view(['scan','reach','path'].includes(location.hash.slice(1))?location.hash.slice(1):'overview');
