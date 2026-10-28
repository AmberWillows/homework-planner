(function(root){
const key=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const date=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d,12)};
const days=(a,b)=>Math.round((Date.UTC(...parts(b))-Date.UTC(...parts(a)))/86400000);
const parts=s=>{let [y,m,d]=s.split('-').map(Number);return [y,m-1,d]};
const next=s=>{let d=date(s);d.setDate(d.getDate()+1);return key(d)};
function views(assignments,today){let result=new Map();for(const a of assignments){let end=a.completedAt?key(new Date(a.completedAt)):today;if(end<a.due)end=a.due;for(let d=a.due;d<=end;d=next(d)){if(!result.has(d))result.set(d,[]);result.get(d).push(a)}}return [...result].sort(([a],[b])=>a.localeCompare(b))}
const api={key,date,days,next,views};if(typeof module!=='undefined')module.exports=api;else root.Planner=api;
})(typeof window==='undefined'?globalThis:window);
