const projects = [
  ['P01','Product kickoff and baseline',['UX/UI foundations: users, interfaces, and product teams','Semantic HTML, accessibility, and browser foundations','Systems, data, and Git foundations']],
  ['P02','Problem framing sprint',['Research planning','HTML forms, input states, and client validation','TypeScript foundations']],
  ['P03','Journey and feature slice',['Interviews and synthesis','CSS layout and responsiveness','Git branches and pull requests']],
  ['P04','Feedback interaction slice',['Interaction design: visual feedback, states, and microcopy','JavaScript interaction and visual feedback','Express and REST basics']],
  ['P05','First integrated form',['Usability testing and accessible interaction','Fetch and API states','PostgreSQL data modelling']],
  ['P06','Marketplace MVP foundation',['Marketplace discovery','React foundations','Prisma and repository patterns']],
  ['P07','Contracted discovery flow',['Information architecture and content design','React state and routing','API design and OpenAPI']],
  ['P08','Authenticated workspace slice',['Visual hierarchy and design tokens','Styling system','Authentication foundations']],
  ['P09','Owned dashboard component',['Components, states, and handoff','Forms and client validation','Authorization and ownership']],
  ['P10','Change request recovery',['Trust, safety, and edge cases','Testing UI behavior','Validation, testing, and errors']],
  ['P11','Sprint quality slice',['Measuring usability','Performance and browser quality','Observability and resilience']],
  ['P12','Release candidate',['Design critique, research operations, and portfolio evidence','E2E, accessibility, and contract testing','Secure configuration, cloud deployment, and secrets']],
  ['P13','Pilot release and incident drill',['P1 feedback analysis and product metrics','CI, supply-chain checks, and review-ready code','CI, database release, and dependency security']],
  ['P14','Handover package',['Case-study narrative','Refactor and maintainability','Data lifecycle and privacy']],
  ['P15','Semester 1 release retrospective',['Semester reflection','Semester reflection','Semester reflection']],
  ['P16','P2 discovery and prioritization',['Product metrics, KPIs, and prioritization','Existing-codebase orientation','Existing-system orientation']],
  ['P17','Concurrency-safe workflow',['Co-design and service blueprint','Advanced state and server data','Transactions and concurrency']],
  ['P18','Secure account workflow',['Trust-focused UI and content','Advanced forms, recovery, and authentication UX','OAuth/OIDC awareness, notifications, and background work']],
  ['P19','Red-team hardening',['Inclusive testing and AI interaction guardrails','Client security and AI-assisted feature boundaries','Threat modelling and abuse cases']],
  ['P20','Design-system evolution',['Design-system governance','Component quality at scale','API evolution']],
  ['P21','Observable experiment',['Experiment design, ethics, and AI product literacy','Client observability and privacy-aware telemetry','Monitoring, SLOs, and incident response']],
  ['P22','Mega-project architecture',['Mega-project discovery','Architecture proposal','Architecture proposal']],
  ['P23','Mega-project inception',['Research, IA, and prototype','P3 setup','P3 setup']],
  ['P24','Mega-project vertical slice',['High-fidelity system and handoff','P3 vertical slice','P3 vertical slice']],
  ['P25','Reliable delivery sprint',['Continuous research during delivery','Reliability, contract tests, and E2E coverage','Reliability, load testing, and recovery']],
  ['P26','Performance and localization pass',['Content, localization, empty states, and research ops','Performance and accessibility remediation','Performance and query analysis']],
  ['P27','Production hardening',['Product quality audit','Production hardening and supply-chain security','Security hardening']],
  ['P28','Launch and operational handover',['Communicating impact','Maintainer documentation and onboarding guide','Operational handover, cloud cost, and runbook']],
  ['P29','Demo and portfolio package',['Portfolio critique and interview practice','Technical portfolio, pair-review, and onboarding simulation','Technical portfolio, system explanation, and onboarding simulation']],
  ['P30','Mega-project launch and retrospective',['Professional transition','Professional transition','Professional transition']]
];
const phases = [['01','Baseline','P01–P05','Start with one shared product slice'],['02','Understand','P06–P10','Expose the system and deliver change safely'],['03','Design the change','P11–P15','Release the first product arc'],['04','Build together','P16–P20','Handle change, scale, and collaboration'],['05','Ship safely','P21–P25','Operate the product with evidence'],['06','Operate + improve','P26–P30','Launch, hand over, and learn']];
const roles = [
  { key:'ux', label:'UI/UX', color:'ux', verb:'Design and validate' },
  { key:'fe', label:'Front-End', color:'fe', verb:'Implement and verify' },
  { key:'be', label:'Back-End', color:'be', verb:'Model and operate' }
];
function subtasks(project, week) {
  const [code, name, topics] = project;
  const ux = `Create ${topics[0].toLowerCase()} for ${name.toLowerCase()}: map the user goal, states, content, accessibility risks, and success measure; test it with peers.`;
  const fe = `Implement ${topics[1].toLowerCase()} for ${name.toLowerCase()}: consume the UX states and API contract, cover loading/error/empty/responsive behavior, and submit a reviewed PR.`;
  const be = `Build ${topics[2].toLowerCase()} for ${name.toLowerCase()}: define the data/API contract, validation, authorization and failure paths; add tests and a run/rollback note.`;
  const shared = `Integrate ${code} as one vertical slice: clarify scope, connect the three outputs, run the quality checks, demo the result, and record decisions, risks, and the next handoff.`;
  return [ux, fe, be, shared];
}
const root = document.getElementById('roadmap');
root.innerHTML = phases.map((phase, phaseIndex) => {
  const slice = projects.slice(phaseIndex * 5, phaseIndex * 5 + 5);
  return `<section class="phase-group"><div class="phase-banner"><span>${phase[0]}</span><div><strong>${phase[1]}</strong><small>${phase[2]} · ${phase[3]}</small></div></div><div class="project-line">${slice.map((project, index) => { const week = phaseIndex * 5 + index + 1; return `<button type="button" class="project-node" data-project="${week - 1}"><span class="project-code">${project[0]} · WEEK ${String(week).padStart(2,'0')}</span><strong>${project[1]}</strong><span class="project-meta">3 tracks + integration</span><span class="project-rail"><i class="ux"></i><i class="fe"></i><i class="be"></i><i class="shared"></i></span></button>`; }).join('<span class="connector" aria-hidden="true">→</span>')}</div></section>`;
}).join('');
const dialog = document.getElementById('detail');
document.querySelectorAll('.project-node').forEach(node => node.addEventListener('click', () => {
  const index = Number(node.dataset.project); const project = projects[index]; const week = index + 1; const tasks = subtasks(project, week); const semester = week <= 15 ? 'SEMESTER 1' : 'SEMESTER 2';
  document.getElementById('detail-kicker').textContent = `${project[0]} · WEEK ${String(week).padStart(2,'0')} · ${semester}`;
  document.getElementById('detail-title').textContent = project[1];
  document.getElementById('detail-body').innerHTML = `<strong>PROJECT RULE</strong><br>One shared project. The three tracks work in parallel, then the team integrates one vertical slice before the session ends.<div class="subtask-grid">${roles.map((role, i) => `<section class="subtask ${role.color}"><h3>${role.label}</h3><p>${tasks[i]}</p><small>INPUT · ${project[2][i]}</small></section>`).join('')}<section class="subtask shared"><h3>Team Integration</h3><p>${tasks[3]}</p><small>OUTPUT · merged increment + demo + decision log</small></section></div>`;
  document.getElementById('detail-output').innerHTML = `<strong>PROJECT DELIVERABLE</strong><br>Working integrated slice, three specialist artifacts, review evidence, and a handoff note for the next project.`;
  dialog.showModal();
}));
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
