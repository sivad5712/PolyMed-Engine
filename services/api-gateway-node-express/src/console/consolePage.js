const renderServiceCatalog = require('./serviceCatalogHtml');
const renderTechnologyTrace = require('./technologyTraceHtml');
const renderWorkflowMap = require('./workflowMapHtml');

function getConsolePageHtml(catalog, stackMap, workflows) {
  const catalogHtml = renderServiceCatalog(catalog);
  const traceHtml = renderTechnologyTrace(stackMap);
  const workflowHtml = renderWorkflowMap(workflows);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PolyMed Engine - Developer Console</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-main: #0a0b10;
      --bg-card: rgba(20, 22, 33, 0.7);
      --bg-panel: #121422;
      --border-color: rgba(255, 255, 255, 0.08);
      --accent-blue: #3b82f6;
      --accent-teal: #0d9488;
      --accent-purple: #8b5cf6;
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --font-family: 'Plus Jakarta Sans', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: var(--bg-main);
      color: var(--text-main);
      font-family: var(--font-family);
      line-height: 1.6;
      padding: 2.5rem;
      background-image: 
        radial-gradient(circle at 5% 10%, rgba(59, 130, 246, 0.06) 0%, transparent 40%),
        radial-gradient(circle at 95% 90%, rgba(139, 92, 246, 0.05) 0%, transparent 45%);
      background-attachment: fixed;
    }

    header {
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 1.25rem;
    }

    h1 {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.04em;
      background: linear-gradient(135deg, #ffffff 40%, #93c5fd 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin-top: 0.25rem;
      font-weight: 500;
    }

    .platform-badge {
      background: rgba(59, 130, 246, 0.1);
      border: 1px solid rgba(59, 130, 246, 0.25);
      color: var(--accent-blue);
      padding: 0.4rem 1rem;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 600;
      font-family: var(--font-mono);
    }

    .container {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 800;
      margin-bottom: 1.25rem;
      color: #ffffff;
      border-left: 4px solid var(--accent-blue);
      padding-left: 0.75rem;
      letter-spacing: -0.02em;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
    }

    @media (max-width: 1024px) {
      .card-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .grid-2 {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .card-grid {
        grid-template-columns: 1fr;
      }
    }

    .card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      padding: 1.25rem;
      transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
    }

    .card:hover {
      transform: translateY(-2px);
      border-color: rgba(59, 130, 246, 0.3);
      box-shadow: 0 4px 20px rgba(59, 130, 246, 0.05);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }

    .card-title { font-weight: 700; font-size: 1rem; }

    .tech-tag {
      font-size: 0.7rem;
      font-weight: 700;
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: var(--accent-blue);
    }

    .card-description { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem; }

    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.75rem;
      border-top: 1px solid var(--border-color);
      padding-top: 0.75rem;
      color: var(--text-muted);
    }

    .port-num { font-family: var(--font-mono); color: #38bdf8; }

    .service-badge { display: flex; align-items: center; gap: 0.35rem; font-weight: 600; }
    .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; }

    /* Timelines */
    .workflow-box {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      padding: 1.25rem;
    }

    .explorer-panel {
      background: var(--bg-panel);
      border: 1px solid var(--border-color);
      border-radius: 18px;
      padding: 2rem;
    }

    .btn-action {
      background: linear-gradient(135deg, var(--accent-blue) 0%, #1d4ed8 100%);
      color: white;
      border: none;
      padding: 0.65rem 1rem;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(59, 130, 246, 0.15);
      transition: transform 0.15s, opacity 0.15s;
    }

    .btn-action:hover { opacity: 0.95; transform: translateY(-1px); }
    .btn-action:active { transform: translateY(0); }

    .terminal {
      background: #050609;
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 1rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      overflow-y: auto;
      color: #10b981;
      white-space: pre-wrap;
    }

    /* Simulator Styling */
    .summary-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.25rem;
      margin-bottom: 1.25rem;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
      padding-bottom: 0.45rem;
      margin-bottom: 0.45rem;
      font-size: 0.85rem;
    }

    .summary-label {
      color: var(--text-muted);
      font-weight: 600;
    }

    .summary-value {
      font-weight: 700;
      color: #ffffff;
    }

    .tier-badge {
      font-size: 0.65rem;
      font-weight: 800;
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
      letter-spacing: 0.05em;
      display: inline-block;
    }

    .tier-high { background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; }
    .tier-med { background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); color: #f59e0b; }
    .tier-low { background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; }

    @keyframes pulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }

    /* Simulator Spacing and Layout CSS */
    .simulator-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(380px, 0.9fr);
      gap: 24px;
      align-items: start;
    }

    .simulator-left {
      display: flex;
      flex-direction: column;
      gap: 18px;
      justify-content: flex-start;
    }

    .patient-summary-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 0.75rem 1rem;
      margin-bottom: 0;
    }

    .workflow-actions {
      margin-top: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .button-row-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }

    .button-row-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }

    .button-row-1 {
      display: grid;
      grid-template-columns: 1fr;
      gap: 8px;
    }

    @media (max-width: 1024px) {
      .simulator-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .button-row-3 {
        grid-template-columns: 1fr;
      }
      .button-row-2 {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <!-- Hero Header -->
  <header>
    <div>
      <h1>PolyMed Engine Console</h1>
      <div class="subtitle">Enterprise Healthcare Polyglot Backend Platform</div>
      <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.4rem; max-width: 900px; line-height: 1.4;">
        PolyMed Engine demonstrates healthcare backend workflows across a polyglot service architecture. Use the calculator below to simulate patient onboarding, clinical risk scoring, claims workflow, analytics, and notifications while seeing which backend stack powers each action.
      </p>
    </div>
    <div class="platform-badge">PORT 3000 CONSOLE</div>
  </header>

  <div class="container">
    
    <!-- Section 2: Healthcare Workflow Simulator -->
    <div class="explorer-panel" style="padding: 2rem;">
      <div style="font-weight: 800; font-size: 1.35rem; color: #ffffff; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z"/></svg>
        Healthcare Workflow Simulator
      </div>
      <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
        Select a patient scenario and run a workflow to see which backend service, route, and technology stack powers the action.
      </div>

      <div class="simulator-grid">
        
        <!-- Left Side: Patient Scenario -->
        <div class="simulator-left">
          <div style="margin-bottom: 0;">
            <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.5rem;">Select Patient Scenario</label>
            <select id="patientSelect" onchange="updateSelectedPatient()" style="background: #0a0b10; border: 1px solid var(--border-color); border-radius: 8px; padding: 0.65rem 0.75rem; color: var(--text-main); font-family: var(--font-family); font-size: 0.85rem; outline: none; width: 100%; cursor: pointer;">
              <option value="highRiskSenior">High-Risk Senior Patient (Aaron Burr)</option>
              <option value="mediumRiskChronic">Medium-Risk Chronic Care Patient (Maya Patel)</option>
              <option value="lowRiskPreventive">Low-Risk Preventive Care Patient (Daniel Kim)</option>
              <option value="claimsHeavy">Claims-Heavy Patient (Sofia Rodriguez)</option>
              <option value="openCareGaps">Open Care Gaps Patient (Evelyn Carter)</option>
            </select>
          </div>

          <!-- Patient Summary Card -->
          <div class="patient-summary-card">
            <div class="summary-row">
              <span class="summary-label">Patient Name:</span>
              <span id="sumName" class="summary-value">-</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">Age:</span>
              <span id="sumAge" class="summary-value">-</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">Risk Level:</span>
              <span id="sumRisk" class="tier-badge tier-low">-</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">Conditions:</span>
              <span id="sumConditions" class="summary-value">-</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">Open Care Gaps:</span>
              <span id="sumGaps" class="summary-value">-</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">Claims Activity:</span>
              <span id="sumClaims" class="summary-value">-</span>
            </div>
            <div class="summary-row" style="border-bottom: none; padding-bottom: 0; margin-bottom: 0;">
              <span class="summary-label">Care Priority:</span>
              <span id="sumPriority" class="summary-value">-</span>
            </div>
          </div>

          <!-- Buttons Panel -->
          <div class="workflow-actions">
            <div>
              <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.15rem;">Run Healthcare Workflow</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Choose an action to generate a backend technology trace.</div>
            </div>

            <div class="button-row-3">
              <button id="btn-onboard" class="btn-action" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid rgba(255,255,255,0.08); font-size: 0.75rem; padding: 0.55rem 0.45rem;" onclick="renderWorkflowResult('onboarding')">Run Patient Onboarding</button>
              <button id="btn-score" class="btn-action" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid rgba(255,255,255,0.08); font-size: 0.75rem; padding: 0.55rem 0.45rem;" onclick="renderWorkflowResult('risk')">Calculate Clinical Risk</button>
              <button id="btn-claim" class="btn-action" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid rgba(255,255,255,0.08); font-size: 0.75rem; padding: 0.55rem 0.45rem;" onclick="renderWorkflowResult('claims')">Submit Claims Review</button>
            </div>
            
            <div class="button-row-2">
              <button id="btn-analytics" class="btn-action" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid rgba(255,255,255,0.08); font-size: 0.75rem; padding: 0.55rem 0.45rem;" onclick="renderWorkflowResult('analytics')">Generate Analytics Summary</button>
              <button id="btn-notification" class="btn-action" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid rgba(255,255,255,0.08); font-size: 0.75rem; padding: 0.55rem 0.45rem;" onclick="renderWorkflowResult('notification')">Trigger Care Team Notification</button>
            </div>

            <div class="button-row-1">
              <button id="btn-full" class="btn-action" style="background: linear-gradient(135deg, var(--accent-blue) 0%, #1d4ed8 100%); font-weight: 800; border: 1px solid rgba(255,255,255,0.15); font-size: 0.8rem; padding: 0.65rem 1rem;" onclick="renderWorkflowResult('fullJourney')">Run Full Patient Journey</button>
            </div>
          </div>
        </div>

        <!-- Right Side: Workflow Result & Technology Trace -->
        <div style="background: rgba(255, 255, 255, 0.01); border: 1px solid var(--border-color); border-radius: 14px; padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; min-height: 480px;">
          <div>
            <div style="font-weight: 700; font-size: 1.05rem; color: #ffffff; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; display: flex; align-items: center; justify-content: space-between;">
              <span style="display: flex; align-items: center; gap: 0.5rem;">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Workflow Result & Technology Trace
              </span>
              <div style="display: flex; flex-direction: column; align-items: flex-end;">
                <span id="executionBadge" style="font-size: 0.65rem; font-weight: 700; color: #10b981; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); padding: 0.15rem 0.45rem; border-radius: 4px; display: none;">Execution Status: Completed</span>
                <span id="executionTime" style="font-size: 0.6rem; color: var(--text-muted); margin-top: 0.2rem; display: none;">Last Executed: -</span>
              </div>
            </div>

            <!-- Default Standby/Empty State -->
            <div id="activeTraceStandby" style="color: var(--text-muted); font-size: 0.8rem; padding: 2rem 1rem;">
              <span style="font-size: 2.25rem; display: block; margin-bottom: 0.75rem; text-align: center;">⚡</span>
              <strong style="font-size: 0.95rem; color: #ffffff; display: block; margin-bottom: 0.75rem; text-align: center;">Ready to Run Healthcare Workflow</strong>
              <p style="text-align: center; margin-bottom: 1.5rem;">Select a patient scenario and click a workflow action to generate a real-time backend technology trace.</p>
              
              <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.75rem; margin-bottom: 0.75rem;">
                <div style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.35rem;">1. Selected Patient Summary</div>
                <div style="font-size: 0.75rem; color: #ffffff; display: flex; justify-content: space-between;">
                  <span>Active Profile: <strong id="standbyPatientName">-</strong></span>
                  <span>Risk Level: <span id="standbyPatientRisk" class="tier-badge">-</span></span>
                </div>
              </div>

              <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.75rem; margin-bottom: 0.75rem;">
                <div style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.35rem;">2. Available Workflows</div>
                <ul style="font-size: 0.75rem; color: var(--text-muted); padding-left: 1.1rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.25rem;">
                  <li>Patient Onboarding</li>
                  <li>Clinical Risk Scoring</li>
                  <li>Claims Review</li>
                  <li>Healthcare Analytics</li>
                  <li>Care Team Notification</li>
                  <li>Full Patient Journey</li>
                </ul>
              </div>

              <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.75rem; text-align: center;">
                <div style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">3. Simulator Execution Status</div>
                <strong style="color: var(--accent-blue); font-size: 0.85rem;">No execution yet</strong>
              </div>
            </div>

            <!-- Inline Trace Details Panel -->
            <div id="activeTraceDetails" style="display: none; margin-top: 1rem; flex-direction: column; gap: 0.75rem;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; background: rgba(255,255,255,0.01); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.6rem;">
                <div>
                  <span style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block;">Selected Workflow</span>
                  <strong id="traceWorkflow" style="font-size: 0.85rem; color: #ffffff;">-</strong>
                </div>
                <div>
                  <span style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block;">Backend Service</span>
                  <strong id="traceService" style="font-size: 0.8rem; color: #a7f3d0;">-</strong>
                </div>
              </div>

              <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.6rem;">
                <span style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block;">Technology Stack & Route</span>
                <div id="traceStackBadges" style="display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.25rem; margin-bottom: 0.25rem;">
                  <!-- Technology badges inserted dynamically -->
                </div>
                <code id="traceRoute" style="font-family: var(--font-mono); color: #34d399; font-size: 0.7rem; font-weight: 700; background: rgba(52, 211, 153, 0.05); padding: 0.15rem 0.35rem; border-radius: 4px; display: inline-block; margin-top: 0.25rem;">-</code>
                <p id="traceWhy" style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.45rem; line-height: 1.35;"></p>
              </div>

              <div style="background: rgba(16, 185, 129, 0.02); border: 1px solid rgba(16, 185, 129, 0.15); border-radius: 8px; padding: 0.6rem;">
                <span style="font-size: 0.65rem; font-weight: 700; color: #10b981; text-transform: uppercase; display: block;">Simulated Result</span>
                <div id="traceResponse" style="font-size: 0.75rem; font-weight: 600; color: #ffffff; margin-top: 0.1rem; line-height: 1.35;">-</div>
                
                <!-- Extra detailed fields -->
                <div id="extraResultsContainer" style="margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.75rem; border-top: 1px solid rgba(255,255,255,0.03); padding-top: 0.35rem;">
                  <!-- Dynamically populated key-value rows -->
                </div>
              </div>

              <!-- Trace Steps List -->
              <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.6rem;">
                <span style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 0.35rem;">Trace Steps</span>
                <ol id="traceStepsList" style="padding-left: 1.1rem; font-size: 0.75rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.25rem; line-height: 1.3;">
                  <!-- Dynamically populated -->
                </ol>
              </div>
            </div>
          </div>

          <!-- JSON Trace Preview -->
          <div style="margin-top: 1rem;">
            <div style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">Technology Trace JSON Preview</div>
            <pre id="jsonPreview" style="background: #050608; border: 1px solid var(--border-color); border-radius: 8px; padding: 0.5rem 0.75rem; font-family: var(--font-mono); font-size: 0.65rem; max-height: 100px; overflow-y: auto; color: #a7f3d0; white-space: pre-wrap; margin: 0;"></pre>
          </div>
        </div>

      </div>
    </div>

    <!-- Section 3: Compact Technology Stack Summary -->
    <div>
      <div class="section-title">Backend Technology Stack Map</div>
      ${traceHtml}
    </div>

    <!-- Section 4: Healthcare Enterprise Workflow Map -->
    <div>
      <div class="section-title">Healthcare Enterprise Workflow Map</div>
      ${workflowHtml}
    </div>

    <!-- Section 5: Service Catalog -->
    <div>
      <div class="section-title">Ecosystem Service Catalog</div>
      <div class="card-grid">
        ${catalogHtml}
      </div>
    </div>

    <!-- Section 6: API Endpoint Explorer -->
    <div>
      <div class="section-title">API Endpoint Explorer</div>
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 1.5rem;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
          <!-- Patient Service Endpoints -->
          <div style="background: rgba(255,255,255,0.015); border: 1px solid var(--border-color); border-radius: 12px; padding: 1rem;">
            <div style="font-weight: 700; font-size: 0.95rem; color: #a7f3d0; margin-bottom: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.35rem;">Patient Management Service (Java)</div>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div>
                <div style="display: flex; align-items: center; gap: 0.35rem;">
                  <span style="background: #10b981; color: #0a0b10; font-size: 0.65rem; font-weight: 800; padding: 0.1rem 0.35rem; border-radius: 4px;">POST</span>
                  <code style="font-size: 0.75rem; font-family: var(--font-mono); color: #ffffff;">/api/patients</code>
                </div>
                <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem;">Registers a new patient demographic file.</div>
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 0.35rem;">
                  <span style="background: #3b82f6; color: #ffffff; font-size: 0.65rem; font-weight: 800; padding: 0.1rem 0.35rem; border-radius: 4px;">GET</span>
                  <code style="font-size: 0.75rem; font-family: var(--font-mono); color: #ffffff;">/api/patients/:id</code>
                </div>
                <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem;">Retrieve complete patient charts.</div>
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 0.35rem;">
                  <span style="background: #3b82f6; color: #ffffff; font-size: 0.65rem; font-weight: 800; padding: 0.1rem 0.35rem; border-radius: 4px;">GET</span>
                  <code style="font-size: 0.75rem; font-family: var(--font-mono); color: #ffffff;">/api/providers</code>
                </div>
                <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem;">Query register of active clinicians.</div>
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 0.35rem;">
                  <span style="background: #3b82f6; color: #ffffff; font-size: 0.65rem; font-weight: 800; padding: 0.1rem 0.35rem; border-radius: 4px;">GET</span>
                  <code style="font-size: 0.75rem; font-family: var(--font-mono); color: #ffffff;">/api/care-gaps/patient/:id</code>
                </div>
                <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem;">Query open gaps for care management.</div>
              </div>
            </div>
          </div>

          <!-- Risk Scoring Service Endpoints -->
          <div style="background: rgba(255,255,255,0.015); border: 1px solid var(--border-color); border-radius: 12px; padding: 1rem;">
            <div style="font-weight: 700; font-size: 0.95rem; color: #a7f3d0; margin-bottom: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.35rem;">Clinical Risk Scoring Service (Scala)</div>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div>
                <div style="display: flex; align-items: center; gap: 0.35rem;">
                  <span style="background: #10b981; color: #0a0b10; font-size: 0.65rem; font-weight: 800; padding: 0.1rem 0.35rem; border-radius: 4px;">POST</span>
                  <code style="font-size: 0.75rem; font-family: var(--font-mono); color: #ffffff;">/api/risk/score</code>
                </div>
                <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem;">Calculate patient clinical risk score.</div>
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 0.35rem;">
                  <span style="background: #3b82f6; color: #ffffff; font-size: 0.65rem; font-weight: 800; padding: 0.1rem 0.35rem; border-radius: 4px;">GET</span>
                  <code style="font-size: 0.75rem; font-family: var(--font-mono); color: #ffffff;">/api/risk/rules</code>
                </div>
                <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem;">Query catalog of active rules definitions.</div>
              </div>
            </div>
          </div>

          <!-- Claims Service Endpoints -->
          <div style="background: rgba(255,255,255,0.015); border: 1px solid var(--border-color); border-radius: 12px; padding: 1rem;">
            <div style="font-weight: 700; font-size: 0.95rem; color: #a7f3d0; margin-bottom: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.35rem;">Claims Workflow Service (Django)</div>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div>
                <div style="display: flex; align-items: center; gap: 0.35rem;">
                  <span style="background: #10b981; color: #0a0b10; font-size: 0.65rem; font-weight: 800; padding: 0.1rem 0.35rem; border-radius: 4px;">POST</span>
                  <code style="font-size: 0.75rem; font-family: var(--font-mono); color: #ffffff;">/api/claims</code>
                </div>
                <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem;">Submit a new medical insurance claim.</div>
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 0.35rem;">
                  <span style="background: #10b981; color: #0a0b10; font-size: 0.65rem; font-weight: 800; padding: 0.1rem 0.35rem; border-radius: 4px;">POST</span>
                  <code style="font-size: 0.75rem; font-family: var(--font-mono); color: #ffffff;">/api/claims/:id/adjudicate</code>
                </div>
                <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem;">Adjudicate claim state transitions.</div>
              </div>
            </div>
          </div>

          <!-- Analytics & Notifications Endpoints -->
          <div style="background: rgba(255,255,255,0.015); border: 1px solid var(--border-color); border-radius: 12px; padding: 1rem;">
            <div style="font-weight: 700; font-size: 0.95rem; color: #a7f3d0; margin-bottom: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.35rem;">Analytics & Notifications Services</div>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div>
                <div style="display: flex; align-items: center; gap: 0.35rem;">
                  <span style="background: #3b82f6; color: #ffffff; font-size: 0.65rem; font-weight: 800; padding: 0.1rem 0.35rem; border-radius: 4px;">GET</span>
                  <code style="font-size: 0.75rem; font-family: var(--font-mono); color: #ffffff;">/api/analytics/summary</code>
                </div>
                <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem;">Generate aggregated healthcare population KPIs (Flask).</div>
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 0.35rem;">
                  <span style="background: #10b981; color: #0a0b10; font-size: 0.65rem; font-weight: 800; padding: 0.1rem 0.35rem; border-radius: 4px;">POST</span>
                  <code style="font-size: 0.75rem; font-family: var(--font-mono); color: #ffffff;">/api/notifications</code>
                </div>
                <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem;">Trigger templated alerts and preferences (Laravel).</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 7: Documentation & System Architecture Notes -->
    <div>
      <div class="section-title">Documentation & System Architecture Notes</div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
        <div class="card" style="padding: 1.25rem; border-color: rgba(255,255,255,0.06);">
          <div style="font-weight: 700; font-size: 0.95rem; color: #ffffff; margin-bottom: 0.5rem;">Architecture Overview</div>
          <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 1rem;">
            Detailed multi-service mapping of data flow, endpoints contracts, correlation IDs logic, and tracing standards.
          </p>
          <a href="file:///Users/SivaD/Desktop/PolyMed%20Engine/architecture.md" style="font-size: 0.75rem; color: var(--accent-blue); text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 0.25rem;">
            Open architecture.md &rarr;
          </a>
        </div>
        <div class="card" style="padding: 1.25rem; border-color: rgba(255,255,255,0.06);">
          <div style="font-weight: 700; font-size: 0.95rem; color: #ffffff; margin-bottom: 0.5rem;">Service Boundaries</div>
          <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 1rem;">
            Documentation defining component scopes, ownership boundaries, and coding stacks separation details.
          </p>
          <a href="file:///Users/SivaD/Desktop/PolyMed%20Engine/service-boundaries.md" style="font-size: 0.75rem; color: var(--accent-blue); text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 0.25rem;">
            Open service-boundaries.md &rarr;
          </a>
        </div>
        <div class="card" style="padding: 1.25rem; border-color: rgba(255,255,255,0.06);">
          <div style="font-weight: 700; font-size: 0.95rem; color: #ffffff; margin-bottom: 0.5rem;">API Contracts Spec</div>
          <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 1rem;">
            Rigorous endpoints schema specifications, payloads validation models, and success/error envelope shapes.
          </p>
          <a href="file:///Users/SivaD/Desktop/PolyMed%20Engine/api-contracts.md" style="font-size: 0.75rem; color: var(--accent-blue); text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 0.25rem;">
            Open api-contracts.md &rarr;
          </a>
        </div>
        <div class="card" style="padding: 1.25rem; border-color: rgba(255,255,255,0.06);">
          <div style="font-weight: 700; font-size: 0.95rem; color: #ffffff; margin-bottom: 0.5rem;">Security & HIPAA Strategy</div>
          <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 1rem;">
            Explanations on role permissions, HIPAA security logging parameters, and clinical filters auditing.
          </p>
          <a href="file:///Users/SivaD/Desktop/PolyMed%20Engine/security-design.md" style="font-size: 0.75rem; color: var(--accent-blue); text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 0.25rem;">
            Open security-design.md &rarr;
          </a>
        </div>
      </div>
    </div>

  </div>

  <script>
    const patientScenarios = {
      highRiskSenior: {
        label: "High-Risk Senior Patient",
        name: "Aaron Burr",
        age: 68,
        riskLevel: "High",
        conditions: ["Diabetes", "Hypertension", "COPD"],
        openCareGaps: 3,
        claimsActivity: "High",
        carePriority: "Immediate Follow-Up",
        baseRiskScore: 78
      },
      mediumRiskChronic: {
        label: "Medium-Risk Chronic Care Patient",
        name: "Maya Patel",
        age: 54,
        riskLevel: "Medium",
        conditions: ["Asthma", "Hypertension"],
        openCareGaps: 2,
        claimsActivity: "Moderate",
        carePriority: "Care Plan Review",
        baseRiskScore: 52
      },
      lowRiskPreventive: {
        label: "Low-Risk Preventive Care Patient",
        name: "Daniel Kim",
        age: 32,
        riskLevel: "Low",
        conditions: ["None"],
        openCareGaps: 0,
        claimsActivity: "Low",
        carePriority: "Preventive Care",
        baseRiskScore: 20
      },
      claimsHeavy: {
        label: "Claims-Heavy Patient",
        name: "Sofia Rodriguez",
        age: 47,
        riskLevel: "Medium",
        conditions: ["Chronic Pain", "Diabetes"],
        openCareGaps: 1,
        claimsActivity: "Very High",
        carePriority: "Claims Review",
        baseRiskScore: 62
      },
      openCareGaps: {
        label: "Open Care Gaps Patient",
        name: "Evelyn Carter",
        age: 61,
        riskLevel: "High",
        conditions: ["Hypertension", "Kidney Disease"],
        openCareGaps: 4,
        claimsActivity: "Moderate",
        carePriority: "Care Gap Closure",
        baseRiskScore: 70
      }
    };

    let activeWorkflowType = null;

    function getSelectedScenario() {
      const select = document.getElementById('patientSelect');
      const val = select.value;
      return patientScenarios[val] || null;
    }

    function calculateRiskForScenario(p) {
      if (!p) return null;
      let score = p.baseRiskScore;
      
      // Override or compute to match requested values exactly
      if (p.name === "Aaron Burr") score = 86;
      else if (p.name === "Sofia Rodriguez") score = 68;
      else if (p.name === "Daniel Kim") score = 22;
      else if (p.name === "Maya Patel") score = 58;
      else if (p.name === "Evelyn Carter") score = 82;

      let band = "LOW_RISK";
      if (score >= 75) {
        band = "HIGH_RISK";
      } else if (score >= 45) {
        band = "MEDIUM_RISK";
      }

      let drivers = [];
      if (p.name === "Aaron Burr") {
        drivers = [
          "Multiple chronic conditions",
          "Senior patient profile",
          "Recent utilization risk",
          "Open care gaps"
        ];
      } else if (p.name === "Sofia Rodriguez") {
        drivers = [
          "Very high claims activity",
          "Chronic pain and diabetes profile",
          "Claims review priority"
        ];
      } else if (p.name === "Daniel Kim") {
        drivers = [
          "Preventive care profile",
          "No open care gaps",
          "Low claims activity"
        ];
      } else if (p.name === "Maya Patel") {
        drivers = [
          "Chronic asthma and hypertension profile",
          "Moderate claims activity",
          "Open care gaps"
        ];
      } else if (p.name === "Evelyn Carter") {
        drivers = [
          "Multiple chronic conditions",
          "4 open care gaps",
          "Moderate claims activity"
        ];
      }

      let action = "";
      if (p.name === "Aaron Burr") action = "Immediate care manager follow-up";
      else if (p.name === "Sofia Rodriguez") action = "Claims review and care plan validation";
      else if (p.name === "Daniel Kim") action = "Continue preventive care schedule";
      else if (p.name === "Maya Patel") action = "Care plan review and health coaching outreach";
      else if (p.name === "Evelyn Carter") action = "Care gap closure and clinical screening outreach";

      return {
        score: score,
        band: band,
        drivers: drivers,
        recommendedAction: action,
        carePriority: p.carePriority
      };
    }

    function getClaimReviewForScenario(p) {
      if (!p) return null;
      
      let status = "STANDARD_REVIEW";
      let type = "Preventive care claim";
      let reason = "Routine preventive service";
      let queue = "Standard Claims Review";
      let prov = "No";
      let id = "CLM-" + Math.floor(10000 + Math.random() * 90000);

      if (p.claimsActivity === "Very High" || p.name === "Sofia Rodriguez") {
        status = "PRIORITY_REVIEW";
        type = "Multi-visit utilization review";
        reason = "Very high claims activity";
        queue = "Claims Review Team";
        prov = "Yes (Required)";
      } else if (p.riskLevel === "High" || p.name === "Aaron Burr") {
        status = "CLINICAL_REVIEW";
        type = "Chronic care claim";
        reason = "High clinical risk and chronic conditions";
        queue = "Clinical Claims Review";
        prov = "Yes (Required)";
      } else if (p.name === "Maya Patel") {
        status = "STANDARD_REVIEW";
        type = "Chronic care claim";
        reason = "Routine chronic management check";
        queue = "Standard Claims Review";
        prov = "No (Auto-Approvable)";
      } else if (p.name === "Evelyn Carter") {
        status = "STANDARD_REVIEW";
        type = "Care gap screening claim";
        reason = "Out-of-network screening check";
        queue = "Standard Claims Review";
        prov = "No";
      }

      return {
        claimId: id,
        status: status,
        type: type,
        reason: reason,
        queue: queue,
        providerReviewRequired: prov,
        auditStatus: "Written to Django Audit Ledger"
      };
    }

    function getAnalyticsForScenario(p) {
      if (!p) return null;
      
      let flag = "Preventive Care Stable";
      let score = "95%";

      if (p.riskLevel === "High" || p.name === "Aaron Burr") {
        flag = "High Risk Care Management";
        score = p.name === "Aaron Burr" ? "60%" : "65%";
      } else if (p.claimsActivity === "Very High" || p.name === "Sofia Rodriguez") {
        flag = "Claims Utilization Watch";
        score = "74%";
      } else if (p.riskLevel === "Medium") {
        flag = "Claims Utilization Watch";
        score = "75%";
      }

      return {
        riskCategory: p.riskLevel,
        careGaps: p.openCareGaps,
        claimsActivity: p.claimsActivity,
        carePriority: p.carePriority,
        dashboardFlag: flag,
        healthScore: score
      };
    }

    function getNotificationForScenario(p) {
      if (!p) return null;

      let type = "Preventive Care Reminder";
      let msg = "Patient remains stable. Continue preventive care schedule.";
      let queue = "Automated Preventive Portal";
      let template = "Preventive Reminder Template";

      if (p.riskLevel === "High" || p.name === "Aaron Burr") {
        type = "Urgent Care Manager Alert";
        if (p.name === "Aaron Burr") {
          msg = "High-risk patient Aaron Burr requires immediate care manager follow-up.";
        } else if (p.name === "Evelyn Carter") {
          msg = "High-risk patient Evelyn Carter has open care gaps requiring outreach.";
        } else {
          msg = "High-risk patient requires immediate follow-up.";
        }
        queue = "Urgent Case Management Team";
        template = "Urgent Risk Escalation Template";
      } else if (p.claimsActivity === "Very High" || p.name === "Sofia Rodriguez") {
        type = "Claims Review Alert";
        msg = "Claims-heavy patient requires utilization review.";
        queue = "Claims Administration Queue";
        template = "Claims Utilization Escalation Template";
      } else if (p.riskLevel === "Medium" || p.name === "Maya Patel") {
        type = "Care Plan Review Alert";
        msg = "Patient " + p.name + " has moderate chronic risk. Schedule care plan review.";
        queue = "Primary Care Coordination Team";
        template = "Care Plan Review Template";
      }

      let id = "NTF-" + Math.floor(1000 + Math.random() * 9000);

      return {
        notificationId: id,
        type: type,
        message: msg,
        recipientGroup: queue,
        deliveryStatus: "Queued (SMS + Email)",
        templateUsed: template,
        auditStatus: "Written to Laravel Preference Ledger"
      };
    }

    function buildTechnologyTrace(workflowType, p) {
      if (!p) return null;

      const mapping = {
        onboarding: {
          action: "PATIENT_ONBOARDING",
          service: "Patient Management Service",
          technologyStack: "Java, Spring Boot, Spring MVC, Spring Security, Hibernate",
          selectedPatient: p.name,
          resultStatus: "ONBOARDED"
        },
        risk: {
          action: "CALCULATE_CLINICAL_RISK",
          service: "Clinical Risk Scoring Service",
          technologyStack: "Scala",
          riskScore: calculateRiskForScenario(p).score,
          riskBand: calculateRiskForScenario(p).band,
          selectedPatient: p.name
        },
        claims: {
          action: "SUBMIT_CLAIMS_REVIEW",
          service: "Claims Workflow Service",
          technologyStack: "Django",
          claimStatus: getClaimReviewForScenario(p).status,
          selectedPatient: p.name
        },
        analytics: {
          action: "GENERATE_ANALYTICS_SUMMARY",
          service: "Healthcare Analytics Service",
          technologyStack: "Flask",
          analyticsFlag: getAnalyticsForScenario(p).dashboardFlag,
          selectedPatient: p.name
        },
        notification: {
          action: "TRIGGER_CARE_TEAM_NOTIFICATION",
          service: "Notification Service",
          technologyStack: "PHP, Laravel",
          notificationType: getNotificationForScenario(p).type,
          selectedPatient: p.name
        },
        fullJourney: {
          action: "RUN_FULL_PATIENT_JOURNEY",
          service: "PolyMed Engine Multi-Service Flow",
          technologyStack: "Node.js, Express.js, Java, Spring Boot, Spring MVC, Spring Security, Hibernate, Scala, Django, Flask, PHP, Laravel",
          journeyStatus: "COMPLETED",
          selectedPatient: p.name,
          riskScore: calculateRiskForScenario(p).score,
          claimStatus: getClaimReviewForScenario(p).status,
          notificationStatus: "SENT"
        }
      };

      return mapping[workflowType] || null;
    }

    function renderTraceSteps(workflowType) {
      const steps = {
        onboarding: [
          "Express.js Gateway receives onboarding request",
          "Spring MVC routes request to PatientController",
          "Spring Security checks healthcare role access",
          "Hibernate-style Patient and MemberProfile entities are mapped",
          "Patient onboarding response is returned with technology trace"
        ],
        risk: [
          "Express.js Gateway receives risk scoring request",
          "Request is routed to Clinical Risk Scoring Service",
          "Scala rule engine evaluates patient scenario",
          "Risk score and risk band are calculated",
          "Care recommendation is returned with technology trace"
        ],
        claims: [
          "Express.js Gateway receives claim request",
          "Request is routed to Django Claims Workflow Service",
          "Django claim workflow validates member and provider context",
          "Claim review status is assigned",
          "Claim response is returned with technology trace"
        ],
        analytics: [
          "Express.js Gateway receives analytics request",
          "Request is routed to Flask Healthcare Analytics Service",
          "Flask analytics logic summarizes patient scenario KPIs",
          "Dashboard indicators are generated",
          "Analytics response is returned with technology trace"
        ],
        notification: [
          "Express.js Gateway receives notification request",
          "Request is routed to Laravel Notification Service",
          "Laravel selects notification template",
          "PHP service logic prepares notification payload",
          "Notification response is returned with technology trace"
        ],
        fullJourney: [
          "Node.js Express Gateway receives full journey request",
          "Java Spring Boot Patient Service handles onboarding",
          "Spring MVC routes patient workflow",
          "Spring Security applies role-based access concept",
          "Hibernate models patient and member entities",
          "Scala calculates clinical risk score",
          "Django processes claims review workflow",
          "Flask generates analytics summary",
          "PHP Laravel prepares care team notification",
          "Final multi-service technology trace is returned"
        ]
      };

      const stepsList = document.getElementById('traceStepsList');
      const items = steps[workflowType] || [];
      stepsList.innerHTML = items.map(function(s) { return '<li>' + s + '</li>'; }).join('');
    }

    function renderTechnologyTraceJson(trace) {
      const jsonPreview = document.getElementById('jsonPreview');
      const fullPayload = {
        success: true,
        message: "Workflow trace executed successfully",
        correlationId: "corr-" + Date.now() + "-" + Math.floor(Math.random() * 10000000).toString(16),
        technologyTrace: trace
      };
      jsonPreview.innerText = JSON.stringify(fullPayload, null, 2);
    }

    function renderWorkflowResult(workflowType) {
      const p = getSelectedScenario();
      if (!p) {
        alert('Please select a patient scenario first.');
        return;
      }

      // Track active workflow type globally
      activeWorkflowType = workflowType;

      // Button highlight animation
      const btnIdMap = {
        onboarding: 'btn-onboard',
        risk: 'btn-score',
        claims: 'btn-claim',
        analytics: 'btn-analytics',
        notification: 'btn-notification',
        fullJourney: 'btn-full'
      };
      const activeBtnId = btnIdMap[workflowType];
      if (activeBtnId) {
        const btn = document.getElementById(activeBtnId);
        if (btn) {
          const originalBackground = btn.style.background;
          btn.style.background = '#3b82f6';
          setTimeout(function() {
            btn.style.background = originalBackground;
          }, 300);
        }
      }

      // Service card glow helper
      const serviceKeyMap = {
        onboarding: 'patient-service-java-springboot',
        risk: 'risk-scoring-service-scala',
        claims: 'claims-service-django',
        analytics: 'analytics-service-flask',
        notification: 'notification-service-laravel'
      };
      const allCards = document.querySelectorAll('.card');
      allCards.forEach(function(card) {
        card.style.boxShadow = 'none';
        card.style.borderColor = 'var(--border-color)';
      });
      const activeServiceKey = serviceKeyMap[workflowType];
      if (activeServiceKey) {
        const cardEl = document.getElementById('service-card-' + activeServiceKey);
        if (cardEl) {
          cardEl.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4)';
          cardEl.style.borderColor = 'var(--accent-blue)';
          setTimeout(function() {
            cardEl.style.transition = 'all 1s ease';
            cardEl.style.boxShadow = 'none';
            cardEl.style.borderColor = 'var(--border-color)';
          }, 2000);
        }
      }

      // Toggle views
      document.getElementById('activeTraceStandby').style.display = 'none';
      document.getElementById('activeTraceDetails').style.display = 'flex';

      // Update execution status
      document.getElementById('executionBadge').style.display = 'inline-block';
      const timeEl = document.getElementById('executionTime');
      timeEl.style.display = 'block';
      timeEl.innerText = 'Last Executed: ' + new Date().toLocaleTimeString();

      // Titles & descriptions mapping
      const mapping = {
        onboarding: {
          workflow: "Patient Onboarding",
          service: "Patient Management Service",
          route: "POST /api/patients",
          stack: "Java, Spring Boot, Spring MVC, Spring Security, Hibernate",
          why: "Used for structured patient workflows, role-based access concepts, layered service design, and healthcare entity modeling."
        },
        risk: {
          workflow: "Clinical Risk Scoring",
          service: "Clinical Risk Scoring Service",
          route: "POST /api/risk/score",
          stack: "Scala",
          why: "Used for functional-style clinical rule evaluation and predictable risk scoring logic."
        },
        claims: {
          workflow: "Claims Review",
          service: "Claims Workflow Service",
          route: "POST /api/claims",
          stack: "Django",
          why: "Used for structured claims workflow, member records, provider review, and claim status handling."
        },
        analytics: {
          workflow: "Healthcare Analytics",
          service: "Healthcare Analytics Service",
          route: "GET /api/analytics/summary",
          stack: "Flask",
          why: "Used for lightweight healthcare KPI endpoints and dashboard summary responses."
        },
        notification: {
          workflow: "Care Team Notification",
          service: "Notification Service",
          route: "POST /api/notifications",
          stack: "PHP, Laravel",
          why: "Used for notification templates, patient preferences, care team alerts, and audit-style notification tracking."
        },
        fullJourney: {
          workflow: "Full Patient Journey",
          service: "PolyMed Engine Multi-Service Flow",
          route: "/api/full-patient-journey",
          stack: "Node.js, Express.js, Java, Spring Boot, Spring MVC, Spring Security, Hibernate, Scala, Django, Flask, PHP, Laravel",
          why: "Demonstrates how all backend technologies participate in one healthcare journey."
        }
      };

      const meta = mapping[workflowType];
      document.getElementById('traceWorkflow').innerText = meta.workflow;
      document.getElementById('traceService').innerText = meta.service;
      document.getElementById('traceRoute').innerText = meta.route;
      document.getElementById('traceWhy').innerText = meta.why;

      // Render stack badges
      const badgesContainer = document.getElementById('traceStackBadges');
      badgesContainer.innerHTML = meta.stack.split(',').map(function(t) {
        return '<span class="tech-tag" style="background: rgba(59,130,246,0.1); border-color: rgba(59,130,246,0.25); color: #60a5fa; font-size: 0.6rem; padding: 0.1rem 0.35rem; margin-right: 0.25rem;">' + t.trim() + '</span>';
      }).join('');

      let resultText = "";
      let extraHtml = "";

      if (workflowType === "onboarding") {
        let suffix = "";
        if (p.name === "Aaron Burr") suffix = "High-risk care management workflow was assigned.";
        else if (p.name === "Sofia Rodriguez") suffix = "Member profile created with claims review priority.";
        else if (p.name === "Daniel Kim") suffix = "Preventive care workflow was assigned.";
        else if (p.name === "Maya Patel") suffix = "Care plan review workflow was assigned.";
        else if (p.name === "Evelyn Carter") suffix = "Care gap closure workflow was assigned.";

        resultText = "Patient " + p.name + " was onboarded successfully. " + suffix;

        const onboardDetails = {
          highRiskSenior: { id: 'PAT-47540' },
          mediumRiskChronic: { id: 'PAT-22091' },
          lowRiskPreventive: { id: 'PAT-88192' },
          claimsHeavy: { id: 'PAT-55610' },
          openCareGaps: { id: 'PAT-90342' }
        };
        const key = document.getElementById('patientSelect').value;
        const onboardDet = onboardDetails[key] || { id: 'PAT-99012' };

        extraHtml = 
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Patient ID:</span> <strong>' + onboardDet.id + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Member Status:</span> <strong>Active</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Care Team:</span> <strong>Assigned</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Care Priority:</span> <strong>' + p.carePriority + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Audit Record:</span> <strong>Created</strong></div>';

      } else if (workflowType === "risk") {
        const risk = calculateRiskForScenario(p);
        resultText = "Clinical Risk evaluation completed.";
        extraHtml = 
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Risk Score:</span> <strong style="color:#ef4444;">' + risk.score + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Risk Band:</span> <strong class="tier-badge ' + (risk.band === 'HIGH_RISK' ? 'tier-high' : (risk.band === 'MEDIUM_RISK' ? 'tier-med' : 'tier-low')) + '">' + risk.band + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Risk Drivers:</span> <strong>' + risk.drivers.join(', ') + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Recommended Action:</span> <strong>' + risk.recommendedAction + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Care Priority:</span> <strong>' + risk.carePriority + '</strong></div>';

      } else if (workflowType === "claims") {
        const claim = getClaimReviewForScenario(p);
        resultText = "Claim submitted for review and linked to selected patient profile.";
        extraHtml = 
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Claim ID:</span> <strong>' + claim.claimId + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Claim Status:</span> <strong>' + claim.status + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Review Queue:</span> <strong>' + claim.queue + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Provider Review Required:</span> <strong>' + claim.providerReviewRequired + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Audit Status:</span> <strong>' + claim.auditStatus + '</strong></div>';

      } else if (workflowType === "analytics") {
        const analytics = getAnalyticsForScenario(p);
        resultText = "Healthcare analytics summary generated for selected patient scenario.";
        extraHtml = 
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Patient Risk Category:</span> <strong>' + analytics.riskCategory + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Care Gap Count:</span> <strong>' + analytics.careGaps + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Claims Activity Level:</span> <strong>' + analytics.claimsActivity + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Care Priority:</span> <strong>' + analytics.carePriority + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Recommended Dashboard Flag:</span> <strong>' + analytics.dashboardFlag + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Workflow Health Score:</span> <strong style="color:#10b981;">' + analytics.healthScore + '</strong></div>';

      } else if (workflowType === "notification") {
        const notif = getNotificationForScenario(p);
        resultText = "Care team notification created for selected patient scenario.";
        extraHtml = 
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Notification ID:</span> <strong>' + notif.notificationId + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Notification Type:</span> <strong>' + notif.type + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Recipient Group:</span> <strong>' + notif.recipientGroup + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Delivery Status:</span> <strong>' + notif.deliveryStatus + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Template Used:</span> <strong>' + notif.templateUsed + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Audit Status:</span> <strong>' + notif.auditStatus + '</strong></div>';

      } else if (workflowType === "fullJourney") {
        const risk = calculateRiskForScenario(p);
        const claim = getClaimReviewForScenario(p);
        const analytics = getAnalyticsForScenario(p);
        const notif = getNotificationForScenario(p);

        resultText = "Complete healthcare workflow executed for selected patient scenario.";
        extraHtml = 
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Patient onboarding:</span> <strong>Member profile active</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Clinical risk score:</span> <strong>' + risk.score + ' (' + risk.band + ')</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Claims review:</span> <strong>' + claim.status + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Analytics flag:</span> <strong>' + analytics.dashboardFlag + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Notification:</span> <strong>' + notif.type + ' sent</strong></div>' +
          '<div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Final care recommendation:</span> <strong style="color:#ef4444;">' + risk.recommendedAction + '</strong></div>';
      }

      document.getElementById('traceResponse').innerText = resultText;
      document.getElementById('extraResultsContainer').innerHTML = extraHtml;

      // Render steps
      renderTraceSteps(workflowType);

      // Render JSON trace preview
      const trace = buildTechnologyTrace(workflowType, p);
      renderTechnologyTraceJson(trace);
    }

    function updateSelectedPatient() {
      const select = document.getElementById('patientSelect');
      const val = select.value;
      if (!val) return;
      const p = patientScenarios[val];
      if (!p) return;

      document.getElementById('sumName').innerText = p.name;
      document.getElementById('sumAge').innerText = p.age;
      
      const rBadge = document.getElementById('sumRisk');
      rBadge.innerText = p.riskLevel;
      rBadge.className = 'tier-badge ' + (p.riskLevel === 'High' ? 'tier-high' : (p.riskLevel === 'Medium' ? 'tier-med' : 'tier-low'));

      document.getElementById('sumConditions').innerText = p.conditions.join(', ');
      document.getElementById('sumGaps').innerText = p.openCareGaps;
      document.getElementById('sumClaims').innerText = p.claimsActivity;
      document.getElementById('sumPriority').innerText = p.carePriority;

      // Update standby card details
      const standbyName = document.getElementById('standbyPatientName');
      const standbyRisk = document.getElementById('standbyPatientRisk');
      if (standbyName) standbyName.innerText = p.name;
      if (standbyRisk) {
        standbyRisk.innerText = p.riskLevel;
        standbyRisk.className = 'tier-badge ' + (p.riskLevel === 'High' ? 'tier-high' : (p.riskLevel === 'Medium' ? 'tier-med' : 'tier-low'));
      }

      // If a workflow is already active, recalculate it immediately
      if (activeWorkflowType) {
        renderWorkflowResult(activeWorkflowType);
      }
    }

    function resetSandboxProfile() {
      activeWorkflowType = null;
      const select = document.getElementById('patientSelect');
      select.value = 'highRiskSenior';
      updateSelectedPatient();

      // Ensure standby state is reset and visible on load
      document.getElementById('activeTraceStandby').style.display = 'block';
      document.getElementById('activeTraceDetails').style.display = 'none';
      document.getElementById('executionBadge').style.display = 'none';
      document.getElementById('executionTime').style.display = 'none';
      document.getElementById('jsonPreview').innerText = '';
    }

    window.addEventListener('DOMContentLoaded', function() {
      resetSandboxProfile();
    });
  </script>

</body>
</html>`;
}

module.exports = {
  getConsolePageHtml
};
