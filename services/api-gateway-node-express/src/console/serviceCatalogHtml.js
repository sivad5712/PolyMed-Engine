function renderServiceCatalog(services) {
  const getEndpoints = (name) => {
    if (name.toLowerCase().includes("gateway")) {
      return ["GET /console", "GET /api/platform/health"];
    } else if (name.toLowerCase().includes("patient")) {
      return ["POST /api/patients", "GET /api/patients/:id", "GET /api/providers", "GET /api/care-gaps/patient/:id"];
    } else if (name.toLowerCase().includes("risk")) {
      return ["POST /api/risk/score", "GET /api/risk/rules"];
    } else if (name.toLowerCase().includes("claims")) {
      return ["POST /api/claims", "POST /api/claims/:id/adjudicate"];
    } else if (name.toLowerCase().includes("analytics")) {
      return ["GET /api/analytics/summary"];
    } else if (name.toLowerCase().includes("notification")) {
      return ["POST /api/notifications"];
    }
    return [];
  };

  return services.map(s => {
    const endpoints = getEndpoints(s.service);
    const serviceKey = s.folder.replace('services/', '');
    return `
      <div class="card" id="service-card-${serviceKey}" style="display: flex; flex-direction: column; justify-content: space-between; transition: all 0.3s ease;">
        <div>
          <div class="card-header" style="margin-bottom: 0.5rem;">
            <div class="card-title" style="font-size: 1.05rem; font-weight: 700; color: #ffffff;">${s.service}</div>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.75rem;">
            ${s.technologyStack.map(t => `<span class="tech-tag" style="background: rgba(59, 130, 246, 0.1); border-color: rgba(59, 130, 246, 0.25); color: #60a5fa; font-size: 0.65rem; padding: 0.15rem 0.45rem;">${t}</span>`).join('')}
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 1rem;">
            ${s.responsibilities.map(r => `• ${r}`).join('<br>')}
          </div>
        </div>
        <div>
          <div style="margin-bottom: 0.75rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
            <div style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.35rem;">Primary Endpoints</div>
            <div style="display: flex; flex-direction: column; gap: 0.25rem;">
              ${endpoints.map(e => {
                const parts = e.split(' ');
                const isPost = parts[0] === 'POST';
                return `
                  <div style="display: flex; align-items: center; gap: 0.35rem; font-size: 0.75rem;">
                    <span style="font-size: 0.6rem; font-weight: 800; padding: 0.05rem 0.25rem; border-radius: 3px; background: ${isPost ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)'}; color: ${isPost ? '#10b981' : '#60a5fa'};">${parts[0]}</span>
                    <code style="font-family: var(--font-mono); color: var(--text-main); font-size: 0.7rem;">${parts[1]}</code>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
          <div class="card-meta">
            <span>Path: <span class="port-num" style="font-size: 0.7rem;">${s.folder}</span></span>
            <span class="service-badge status-up"><div class="badge-dot"></div>ONLINE</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

module.exports = renderServiceCatalog;
