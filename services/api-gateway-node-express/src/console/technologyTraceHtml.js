function renderTechnologyTrace(stackMap) {
  const serviceDetails = [
    {
      name: "API Gateway",
      techs: ["Node.js", "Express.js"],
      purpose: "Runtime for asynchronous routing proxy, header injection, logging, and metrics aggregation endpoints.",
      route: "GET /console"
    },
    {
      name: "Patient Management Service",
      techs: ["Java", "Spring Boot", "Spring MVC", "Spring Security", "Hibernate"],
      purpose: "Primary system of record for patient profiles, provider directories, care teams, care gaps, and HIPAA compliance audits.",
      route: "POST /api/patients"
    },
    {
      name: "Clinical Risk Scoring Service",
      techs: ["Scala"],
      purpose: "Functional mathematics engine evaluating biometric readings and medication compliance functions without side effects.",
      route: "POST /api/risk/score"
    },
    {
      name: "Claims Workflow Service",
      techs: ["Django"],
      purpose: "Relational claim ingestion engine auditing diagnostic classifications and tracking adjudicator workflow transitions.",
      route: "POST /api/claims"
    },
    {
      name: "Healthcare Analytics Service",
      techs: ["Flask"],
      purpose: "Lightweight reporting service executing data queries to compile population KPIs and care gap stats.",
      route: "GET /api/analytics/summary"
    },
    {
      name: "Notification Service",
      techs: ["PHP", "Laravel"],
      purpose: "Event-based alert engine checking quiet hours rules, interpolating patient alerts, and logging message outputs.",
      route: "POST /api/notifications"
    }
  ];

  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.25rem;">
      ${serviceDetails.map(s => `
        <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; border-color: rgba(255,255,255,0.06); background: rgba(18, 20, 29, 0.45);">
          <div>
            <div style="font-weight: 700; font-size: 0.95rem; color: #ffffff; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: space-between;">
              <span>${s.name}</span>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.75rem;">
              ${s.techs.map(t => `<span class="tech-tag" style="border-color: rgba(59, 130, 246, 0.2); color: #60a5fa; background: rgba(59,130,246,0.03); font-size: 0.65rem; padding: 0.15rem 0.45rem;">${t}</span>`).join('')}
            </div>
            <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 1rem;">${s.purpose}</p>
          </div>
          <div style="border-top: 1px solid var(--border-color); padding-top: 0.75rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem;">
            <span style="color: var(--text-muted); font-weight: 600;">Main Route:</span>
            <code style="font-family: var(--font-mono); color: #34d399; font-weight: 700; background: rgba(52, 211, 153, 0.05); padding: 0.15rem 0.35rem; border-radius: 4px;">${s.route}</code>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

module.exports = renderTechnologyTrace;
