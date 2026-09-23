const weeks = [
  ['UX/UI foundations: users, interfaces, and product teams','Semantic HTML, accessibility, and browser foundations','Systems, data, and Git foundations','Team kickoff: brief, roles, Git, and collaboration'],
  ['Research planning','HTML forms, input states, and client validation','TypeScript foundations','Problem framing'],
  ['Interviews and synthesis','CSS layout and responsiveness','Git branches and pull requests','Journey and feature slice'],
  ['Interaction design: visual feedback, states, and microcopy','JavaScript interaction and visual feedback','Express and REST basics','Visual-feedback handoff and behaviour review'],
  ['Usability testing and accessible interaction','Fetch and API states','PostgreSQL data modelling','P0 integration and review'],
  ['Marketplace discovery','React foundations','Prisma and repository patterns','P1 inception'],
  ['Information architecture and content design','React state and routing','API design and OpenAPI','Contract workshop'],
  ['Visual hierarchy and design tokens','Styling system','Authentication foundations','Sprint 1'],
  ['Components, states, and handoff','Forms and client validation','Authorization and ownership','Design/code review'],
  ['Trust, safety, and edge cases','Testing UI behavior','Validation, testing, and errors','Change request 1'],
  ['Measuring usability','Performance and browser quality','Observability and resilience','Sprint 2'],
  ['Design critique, research operations, and portfolio evidence','E2E, accessibility, and contract testing','Secure configuration, cloud deployment, and secrets','Release candidate'],
  ['P1 feedback analysis and product metrics','CI, supply-chain checks, and review-ready code','CI, database release, and dependency security','Pilot, SLO, and incident drill'],
  ['Case-study narrative','Refactor and maintainability','Data lifecycle and privacy','Showcase preparation'],
  ['Semester reflection','Semester reflection','Semester reflection','P1 release and retrospective'],
  ['Product metrics, KPIs, and prioritization','Existing-codebase orientation','Existing-system orientation','P2 discovery'],
  ['Co-design and service blueprint','Advanced state and server data','Transactions and concurrency','Scope and contract workshop'],
  ['Trust-focused UI and content','Advanced forms, recovery, and authentication UX','OAuth/OIDC awareness, notifications, and background work','P2 sprint 1'],
  ['Inclusive testing and AI interaction guardrails','Client security and AI-assisted feature boundaries','Threat modelling and abuse cases','Red-team review'],
  ['Design-system governance','Component quality at scale','API evolution','Change request 2'],
  ['Experiment design, ethics, and AI product literacy','Client observability and privacy-aware telemetry','Monitoring, SLOs, and incident response','P2 release and review'],
  ['Mega-project discovery','Architecture proposal','Architecture proposal','P3 selection'],
  ['Research, IA, and prototype','P3 setup','P3 setup','P3 inception'],
  ['High-fidelity system and handoff','P3 vertical slice','P3 vertical slice','P3 sprint 1'],
  ['Continuous research during delivery','Reliability, contract tests, and E2E coverage','Reliability, load testing, and recovery','P3 sprint 2'],
  ['Content, localization, empty states, and research ops','Performance and accessibility remediation','Performance and query analysis','P3 sprint 3'],
  ['Product quality audit','Production hardening and supply-chain security','Security hardening','P3 release candidate'],
  ['Communicating impact','Maintainer documentation and onboarding guide','Operational handover, cloud cost, and runbook','P3 launch'],
  ['Portfolio critique and interview practice','Technical portfolio, pair-review, and onboarding simulation','Technical portfolio, system explanation, and onboarding simulation','Demo day preparation'],
  ['Professional transition','Professional transition','Professional transition','Mega-project demo and final retrospective']
];
const tracks = [
  { key:'ux', label:'UI/UX', prefix:'UX', handoff:'Annotated design, states, content, and research evidence' },
  { key:'fe', label:'Front-End', prefix:'FE', handoff:'Working UI, tests, and a review-ready pull request' },
  { key:'be', label:'Back-End', prefix:'BE', handoff:'API/data capability, tests, and an operational note' },
  { key:'shared', label:'Team integration', prefix:'ST', handoff:'Integrated slice, decision record, and demo evidence' }
];
const phases = [
  ['01','Baseline','Weeks 01–05','Turn existing knowledge into a shared working product'],
  ['02','Understand','Weeks 06–10','Make the codebase, domain, and risks visible'],
  ['03','Design the change','Weeks 11–15','Define quality, contracts, and a releasable slice'],
  ['04','Build together','Weeks 16–20','Deliver a changing product with review discipline'],
  ['05','Ship safely','Weeks 21–25','Automate quality, security, and operational feedback'],
  ['06','Operate + improve','Weeks 26–30','Launch, measure, hand over, and explain the result']
];
const semesterNote = week => week <= 15 ? 'SEMESTER 1 · foundation project arc' : 'SEMESTER 2 · production project arc';
function projectFor(track, week, title) {
  const n = String(week).padStart(2,'0');
  if (track.key === 'ux') return { title:`${track.prefix}-${n} · ${title}`, brief:`Build the design artifact for the current product slice: ${title.toLowerCase()}. Make the user goal, constraints, states, accessibility, content, and success measure explicit.`, tasks:'Frame the problem → create the artifact in Figma or a research board → test/critique it with peers → record one decision and one open risk.', output:`${track.handoff}; a rationale and a short usability/accessibility check.`, dependency:'Needs the shared brief and current product evidence; Front-End consumes it and Back-End validates technical states.' };
  if (track.key === 'fe') return { title:`${track.prefix}-${n} · ${title}`, brief:`Implement a small production-shaped browser slice for “${title.toLowerCase()}” in the shared codebase, without hiding loading, empty, error, keyboard, or responsive states.`, tasks:'Read the brief and contract → build the smallest vertical slice → add focused tests and accessibility/performance checks → open a PR with screenshots and trade-offs.', output:`${track.handoff}; the UI must run locally and in the team preview environment.`, dependency:'Consumes UX states/content and Back-End contracts; returns implementation constraints and defects to both tracks.' };
  if (track.key === 'be') return { title:`${track.prefix}-${n} · ${title}`, brief:`Create the service, data, or platform capability needed for “${title.toLowerCase()}”, with safe validation, errors, ownership rules, and an operable local setup.`, tasks:'Model the domain → define the API/data contract → implement the smallest safe path → test failure cases → document run, migrate, and rollback steps.', output:`${track.handoff}; contract examples and a reproducible local command are required.`, dependency:'Uses the shared product slice and UX edge cases; Front-End consumes the contract and reports integration failures.' };
  return { title:`${track.prefix}-${n} · ${title}`, brief:`Run a team delivery exercise around “${title.toLowerCase()}”. The team must turn the three specialist outputs into one reviewable product increment.`, tasks:'Clarify scope → assign ownership → integrate the three outputs → run checks and a short demo → record decisions, risks, and the next slice.', output:`${track.handoff}; a merged increment, review notes, and a named owner for follow-up.`, dependency:'Requires active contributions from UI/UX, Front-End, and Back-End. No single track can complete this project alone.' };
}
const root = document.getElementById('roadmap');
root.innerHTML = phases.map((phase, phaseIndex) => {
  const start = phaseIndex * 5;
  const columns = weeks.slice(start, start + 5).map((weekData, offset) => {
    const week = start + offset + 1;
    return `<article class="week-column"><header class="week-head"><span>W${String(week).padStart(2,'0')}</span><small>${semesterNote(week)}</small></header>${tracks.map((track, trackIndex) => { const project = projectFor(track, week, weekData[trackIndex]); return `<button type="button" class="node ${track.key}" data-track="${track.key}" data-week="${week}"><span class="step">${project.title.split(' · ')[0]} · PROJECT</span><strong>${weekData[trackIndex]}</strong><small>${track.label} mini-project</small></button>`; }).join('')}</article>`;
  }).join('');
  return `<section class="phase-group"><div class="phase-banner"><span>${phase[0]}</span><div><strong>${phase[1]}</strong><small>${phase[2]} · ${phase[3]}</small></div></div><div class="weeks-grid">${columns}</div></section>`;
}).join('');
const dialog = document.getElementById('detail');
document.querySelectorAll('.node').forEach(node => node.addEventListener('click', () => {
  const week = Number(node.dataset.week); const trackIndex = tracks.findIndex(item => item.key === node.dataset.track); const track = tracks[trackIndex]; const project = projectFor(track, week, weeks[week - 1][trackIndex]); const phase = phases[Math.floor((week - 1) / 5)];
  document.getElementById('detail-kicker').textContent = `${track.label} · ${project.title.split(' · ')[0]} · WEEK ${String(week).padStart(2,'0')} · ${semesterNote(week)}`;
  document.getElementById('detail-title').textContent = project.title.split(' · ')[1];
  document.getElementById('detail-body').innerHTML = `<strong>PROJECT BRIEF</strong><br>${project.brief}<br><br><strong>WORKSHOP</strong><br>${project.tasks}`;
  document.getElementById('detail-output').innerHTML = `<strong>DELIVERABLE</strong><br>${project.output}<br><br><strong>HANDOFF / DEPENDENCY</strong><br>${project.dependency}<br><br><strong>ROADMAP PHASE</strong><br>${phase[0]} · ${phase[1]}`;
  dialog.showModal();
}));
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
