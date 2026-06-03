function renderWorkflowMap() {
  const workflows = [
    {
      name: "Patient Onboarding",
      tech: "Java / Spring Boot",
      route: "POST /api/patients",
      steps: [
        "Gateway assigns Request Correlation ID",
        "Spring Security verifies auditor role rules",
        "Hibernate maps and persists patient record",
        "Spring MVC formats tech trace JSON response"
      ]
    },
    {
      name: "Clinical Risk Scoring",
      tech: "Scala",
      route: "POST /api/risk/score",
      steps: [
        "Gateway maps inputs & routes payload to Scala",
        "Scala rule evaluation checks vitals & adherence",
        "Functional pattern matching computes risk tier",
        "Mathematical scoring response generated"
      ]
    },
    {
      name: "Claims Review",
      tech: "Django",
      route: "POST /api/claims",
      steps: [
        "Gateway verifies CPT charges & routes claims",
        "Django ORM saves claims linked to member DB",
        "Django Views transition review states (Approve/Deny)",
        "Audit history record log entry created in SQLite"
      ]
    },
    {
      name: "Analytics Summary",
      tech: "Flask",
      route: "GET /api/analytics/summary",
      steps: [
        "Gateway routes analytics telemetry fetch request",
        "Flask routes via analytics blueprint controller",
        "Aggregate population KPIs compiled dynamically",
        "Telemetry payload attached to response"
      ]
    },
    {
      name: "Patient Notification",
      tech: "PHP / Laravel",
      route: "POST /api/notifications",
      steps: [
        "Gateway forwards message request to PHP",
        "Laravel templates checked against configurations",
        "Audit database logs preferences checks",
        "Notification dispatched successfully"
      ]
    }
  ];

  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem;">
      ${workflows.map(w => `
        <div class="workflow-box" style="padding: 1.25rem; margin-bottom: 0; display: flex; flex-direction: column; justify-content: space-between; border-color: rgba(255,255,255,0.06); background: rgba(18, 20, 29, 0.45);">
          <div>
            <div style="font-weight: 700; font-size: 0.95rem; color: #a7f3d0; margin-bottom: 0.35rem;">${w.name}</div>
            <div style="font-size: 0.7rem; font-family: var(--font-mono); color: var(--accent-blue); margin-bottom: 0.75rem; font-weight: 600;">${w.route}</div>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; padding: 0;">
              ${w.steps.map((s, idx) => `
                <li style="font-size: 0.75rem; color: var(--text-muted); display: flex; gap: 0.35rem; line-height: 1.3;">
                  <span style="color: var(--accent-blue); font-weight: 700;">${idx + 1}.</span>
                  <span>${s}</span>
                </li>
              `).join('')}
            </ul>
          </div>
          <div style="border-top: 1px solid var(--border-color); padding-top: 0.75rem; margin-top: 1rem; font-size: 0.7rem; color: var(--text-muted);">
            Stack: <span style="font-weight: 600; color: #ffffff;">${w.tech}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

module.exports = renderWorkflowMap;
