const CV_WORKS = [
  {type:"publication",title:"Development of an AI-Based Educational Service for Generating Convergence Inquiries Utilizing Big History: OASIS",year:"2024 · Journal",authors:["M. Cho","E. B. Kim","T. Kim","E. S. Kim","J. W. Song"]},
  {type:"publication",title:"An exploration of activity system contradictions following the legal status change of AI digital textbooks in elementary classrooms",year:"2026 · Journal",authors:["M. Cho","Y. Jo","S. Park","S. Choe","Y. H. Cho"]},
  {type:"publication",title:"Peer and Tutor in One: A Productive Failure-Based Architecture for Multi-role Conversational Agents in Physics Learning",year:"2026 · AIED proceedings",authors:["J. Koh","M. Cho","S. Keum"]},
  {type:"review",title:"The influence of self-efficacy on interaction patterns and perceptions in generative AI-assisted English reading",year:"Under review",authors:["M. Cho","Y. Kim","S. Ahn","S. Eun","Y. H. Cho"]},
  {type:"conference",title:"AI Support for Students’ Use of Resources in Conceptual Change",year:"2026 · Oral presentation",authors:["J. Jeong","M. Cho","P. S. Oh","K. W. Seo"]},
  {type:"conference",title:"Peer and Tutor in One: A Productive Failure-Based Architecture for Multi-role Conversational Agents in Physics Learning",year:"2026 · Oral presentation",authors:["J. Koh","M. Cho","S. Keum"]},
  {type:"conference",title:"Exploring Digital Education Disparities in South Korean Schools",year:"2026 · Oral presentation",authors:["A. Cho","J. C. Lee","J. Park","M. Cho","Y. H. Cho"]},
  {type:"conference",title:"Korean Teachers’ Neuromyths and Beliefs about Teaching Low-Achieving Students",year:"2026 · Oral presentation",authors:["S. Park","M. Cho","J. Park","C. Y. Yoo","Y. H. Cho"]},
  {type:"conference",title:"Analyzing teachers’ perceptions after AI Digital Textbooks were downgraded to supplemental resources: An activity theory approach",year:"2026 · Oral presentation",authors:["M. Cho","Y. Jo","S. Park","S. Choe","Y. H. Cho"]},
  {type:"conference",title:"Development of an AI-Based Educational Service for Generating Convergence Inquiries Utilizing Big History: OASIS",year:"2025 · Oral presentation",authors:["M. Cho","M. Jordan"]},
  {type:"conference",title:"Visual Attention in Mathematical Problem Solving Based on Performance and Learner Characteristics: A Pilot Study",year:"2026 · Poster",authors:["G. Lee","Y. Jo","J. Kwak","M. Cho"]},
  {type:"conference",title:"Educational Effects of a Generative AI-Based Virtual Patient Platform for Dental Clinical Interview Training: A Three-Group Randomized Comparison",year:"2026 · Poster",authors:["J. Lee","C. Lee","M. Cho","S. Y. Park","J. Ihm","H. Ko"]},
  {type:"conference",title:"Shared ChatGPT Dialogues as Cognitive Artifacts for Enhancing Human-Human Collaboration",year:"2026 · Poster",authors:["J. C. Lee","M. Cho","J. J. Pyo","Y. Shin"]},
  {type:"conference",title:"Development of an AI-based Collaborative Instructional Design Platform (Prototype) for Shared Mental Model Formation",year:"2025 · Poster",authors:["J. J. Pyo","Y. Shin","J. C. Lee","Y. H. Cho"]},
  {type:"conference",title:"Exploring How Learner Variables Influence GPT Interaction Types in English Reading: Analysis based on ICAP Framework",year:"2025 · Poster",authors:["M. Cho","Y. Kim","S. Ahn","S. Eun"]},
  {type:"conference",title:"An analysis of learners’ usage aspect of Chat GPT in English reading context",year:"2023 · Poster",authors:["Y. Kim","S. Ahn","M. Cho"]}
];

const svgNS = "http://www.w3.org/2000/svg";
const svg = document.querySelector("#network");
const edgeLayer = document.querySelector("#edges");
const nodeLayer = document.querySelector("#nodes");
const detailName = document.querySelector("#detail-name");
const detailSummary = document.querySelector("#detail-summary");
const detailCount = document.querySelector("#detail-count");
const detailWorks = document.querySelector("#detail-works");
const status = document.querySelector("#network-status");
const directory = document.querySelector("#collaborator-directory");
const selfName = "M. Cho";
let selectedFilter = "all";
let pinned = null;
let graph = null;

function el(name, attrs={}) {
  const node = document.createElementNS(svgNS, name);
  for (const [key,value] of Object.entries(attrs)) node.setAttribute(key, value);
  return node;
}

function visibleWorks() {
  return selectedFilter === "all" ? CV_WORKS : CV_WORKS.filter(work => work.type === selectedFilter);
}

function buildGraph(works) {
  const people = new Set();
  const edgeCounts = new Map();
  const worksByPerson = new Map();
  for (const work of works) {
    for (const person of work.authors) {
      people.add(person);
      if (!worksByPerson.has(person)) worksByPerson.set(person, []);
      worksByPerson.get(person).push(work);
    }
    for (let i=0;i<work.authors.length;i++) for (let j=i+1;j<work.authors.length;j++) {
      const a=work.authors[i], b=work.authors[j], key=[a,b].sort().join("||");
      edgeCounts.set(key,(edgeCounts.get(key)||0)+1);
    }
  }
  const collaborators=[...people].filter(person=>person!==selfName).sort((a,b)=>a.localeCompare(b));
  const countFor=person=>(worksByPerson.get(person)||[]).length;
  const nodes=[{id:selfName,count:countFor(selfName),x:480,y:310,vx:0,vy:0},...collaborators.map((id,index)=>{
    const angle=index*2.399963229728653;
    const radius=115+Math.sqrt((index+1)/Math.max(collaborators.length,1))*175;
    return {id,count:countFor(id),x:480+Math.cos(angle)*radius,y:310+Math.sin(angle)*radius,vx:0,vy:0};
  })];
  const nodeById=new Map(nodes.map(node=>[node.id,node]));
  const edges=[...edgeCounts].map(([key,count])=>{
    const [a,b]=key.split("||");
    return {a,b,count,ego:a===selfName||b===selfName};
  });
  const mobile=window.matchMedia("(max-width: 680px)").matches;
  const W=960,H=620,cx=W/2,cy=H/2;
  for(let step=0;step<240;step++){
    for(const node of nodes){if(node.id===selfName)continue;node.vx+=(cx-node.x)*.0018;node.vy+=(cy-node.y)*.0018;}
    for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
      const a=nodes[i],b=nodes[j];let dx=b.x-a.x,dy=b.y-a.y;let d2=dx*dx+dy*dy;
      if(d2<16){dx+=1;dy-=1;d2=16;}
      const d=Math.sqrt(d2),force=920/d2;
      const fx=dx/d*force,fy=dy/d*force;
      if(a.id!==selfName){a.vx-=fx;a.vy-=fy;}
      if(b.id!==selfName){b.vx+=fx;b.vy+=fy;}
    }
    for(const edge of edges){
      const a=nodeById.get(edge.a),b=nodeById.get(edge.b);let dx=b.x-a.x,dy=b.y-a.y;const d=Math.max(1,Math.hypot(dx,dy));
      const target=edge.ego?174:102;const strength=(edge.ego?0.006:0.0035)*Math.min(edge.count,3);
      const force=(d-target)*strength;const fx=dx/d*force,fy=dy/d*force;
      if(a.id!==selfName){a.vx+=fx;a.vy+=fy;}
      if(b.id!==selfName){b.vx-=fx;b.vy-=fy;}
    }
    for(const node of nodes){
      if(node.id===selfName){node.x=cx;node.y=cy;continue;}
      node.vx*=.78;node.vy*=.78;
      const speed=Math.hypot(node.vx,node.vy),limit=5;
      if(speed>limit){node.vx*=limit/speed;node.vy*=limit/speed;}
      node.x=Math.max(38,Math.min(W-38,node.x+node.vx));
      node.y=Math.max(36,Math.min(H-36,node.y+node.vy));
    }
  }
  return {nodes,edges,nodeById,worksByPerson,collaborators,works,mobile};
}

function render() {
  graph=buildGraph(visibleWorks());
  edgeLayer.replaceChildren();nodeLayer.replaceChildren();directory.replaceChildren();pinned=null;
  const {nodes,edges,nodeById,worksByPerson,collaborators,works}=graph;
  document.querySelector("#network-description").textContent=`A co-authorship graph with Minsun Cho and ${collaborators.length} collaborators across ${works.length} CV-listed outputs. Select a collaborator for shared works.`;
  for(const edge of edges){
    const a=nodeById.get(edge.a),b=nodeById.get(edge.b);
    const line=el("line",{x1:a.x,y1:a.y,x2:b.x,y2:b.y,"stroke-width":edge.ego?1+edge.count*.55:.7+edge.count*.4,class:`edge${edge.ego?" ego":""}`,"data-a":edge.a,"data-b":edge.b,"data-count":edge.count});
    const title=el("title");title.textContent=`${edge.a} and ${edge.b}: ${edge.count} shared CV-listed ${edge.count===1?"item":"items"}`;line.append(title);edgeLayer.append(line);
  }
  for(const person of nodes){
    const radius=person.id===selfName?19:6+Math.min(7,Math.sqrt(person.count)*2);
    const group=el("g",{class:`net-node${person.id===selfName?" is-center":""}`,tabindex:"0",role:"button","aria-label":person.id===selfName?"Minsun Cho, center of the network":`${person.id}, ${person.count} CV-listed co-authored items`,"data-id":person.id});
    const circle=el("circle",{cx:person.x,cy:person.y,r:radius,fill:person.id===selfName?"#183b63":person.count>1?"#6f96b6":"#a8bfd3"});
    const label=el("text",{x:person.x+(person.id===selfName?0:radius+4),y:person.y+(person.id===selfName?4:4),"text-anchor":person.id===selfName?"middle":"start"});label.textContent=person.id===selfName?"Minsun Cho":person.id;
    const title=el("title");title.textContent=person.id===selfName?"Minsun Cho":`${person.id} · ${person.count} CV-listed item(s)`;
    group.append(circle,label,title);
    group.addEventListener("mouseenter",()=>focusPerson(person.id,false));
    group.addEventListener("mouseleave",()=>{if(!pinned)clearFocus();});
    group.addEventListener("focus",()=>focusPerson(person.id,false));
    group.addEventListener("blur",()=>{if(!pinned)clearFocus();});
    group.addEventListener("click",()=>{pinned=pinned===person.id?null:person.id;if(pinned)focusPerson(pinned,true);else clearFocus();});
    group.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();group.click();}});
    nodeLayer.append(group);
  }
  collaborators.forEach(person=>{
    const button=document.createElement("button");button.type="button";button.className="filter-button collaborator-button";button.textContent=person;
    button.addEventListener("click",()=>{pinned=person;focusPerson(person,true);document.querySelector("#detail-name").scrollIntoView({block:"nearest",behavior:"smooth"});});directory.append(button);
  });
  detailName.textContent="Minsun Cho";detailSummary.textContent=`${collaborators.length} collaborators across ${works.length} CV-listed outputs. Select a node to see shared work.`;detailCount.textContent="";detailWorks.replaceChildren();status.textContent="";
}

function focusPerson(person,pin){
  if(pin)pinned=person;
  const neighbours=new Set([person]);
  graph.edges.forEach(edge=>{if(edge.a===person)neighbours.add(edge.b);if(edge.b===person)neighbours.add(edge.a);});
  nodeLayer.querySelectorAll(".net-node").forEach(node=>node.classList.toggle("is-muted",!neighbours.has(node.dataset.id)));
  edgeLayer.querySelectorAll(".edge").forEach(edge=>{
    const active=edge.dataset.a===person||edge.dataset.b===person;
    edge.classList.toggle("is-active",active);edge.classList.toggle("is-muted",!active);
  });
  if(person===selfName){detailName.textContent="Minsun Cho";detailSummary.textContent=`${graph.collaborators.length} collaborators across ${graph.works.length} CV-listed outputs.`;detailCount.textContent="Select a collaborator to view shared work.";detailWorks.replaceChildren();return;}
  const shared=(graph.worksByPerson.get(person)||[]).filter(work=>work.authors.includes(selfName));
  detailName.textContent=person;detailSummary.textContent=`Co-author listed with Minsun Cho in ${shared.length} ${shared.length===1?"CV-listed item":"CV-listed items"}.`;
  detailCount.textContent=`${shared.length} shared ${shared.length===1?"item":"items"}`;
  detailWorks.replaceChildren();
  shared.forEach(work=>{const li=document.createElement("li");li.textContent=`${work.year}: ${work.title}`;detailWorks.append(li);});
  status.textContent=pin?"Selected. Click the node again to clear.":"";
}

function clearFocus(){
  nodeLayer.querySelectorAll(".net-node").forEach(node=>node.classList.remove("is-muted"));
  edgeLayer.querySelectorAll(".edge").forEach(edge=>edge.classList.remove("is-muted","is-active"));
  detailName.textContent="Minsun Cho";detailSummary.textContent=`${graph.collaborators.length} collaborators across ${graph.works.length} CV-listed outputs. Select a node to see shared work.`;detailCount.textContent="";detailWorks.replaceChildren();status.textContent="";
}

document.querySelectorAll(".filter-button[data-filter]").forEach(button=>button.addEventListener("click",()=>{
  selectedFilter=button.dataset.filter;
  document.querySelectorAll(".filter-button[data-filter]").forEach(item=>item.setAttribute("aria-pressed",String(item===button)));
  render();
}));
render();
