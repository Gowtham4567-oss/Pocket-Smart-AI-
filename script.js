/**
 * PocketSmart AI - Complete Architecture & Frontend Routing Engine
 */

const API_BASE_URL = "http://127.0.0.1:8000";

// Tab Navigation Control
function showTab(tabId) {
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(content => content.classList.remove('active'));
  
  const activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.classList.add('active');
  }

  if (tabId === 'history') {
    loadHistory();
  }
}

// Planner Selector Switcher
function selectPlanner(plannerType) {
  const formsContainer = document.getElementById('plannerForms');
  const forms = document.querySelectorAll('.planner-form');
  
  formsContainer.classList.remove('hidden');
  forms.forEach(f => f.classList.add('hidden'));

  if (plannerType === 'homeDecor') {
    document.getElementById('homeDecorForm').classList.remove('hidden');
  } else if (plannerType === 'party') {
    document.getElementById('partyForm').classList.remove('hidden');
  } else if (plannerType === 'jewelry') {
    document.getElementById('jewelryForm').classList.remove('hidden');
  }
  
  document.getElementById('recommendationOutput').classList.add('hidden');
}

// Handle Home Decor Submission
async function handleHomeDecorSubmit(event) {
  event.preventDefault();
  const payload = {
    total_budget: parseFloat(document.getElementById('homeBudget').value),
    num_lights: parseInt(document.getElementById('numLights').value),
    num_fans: parseInt(document.getElementById('numFans').value),
    num_furniture: parseInt(document.getElementById('numFurniture').value),
    additional_requirements: document.getElementById('homeNotes').value
  };

  displayLoading();
  try {
    const response = await fetch(`${API_BASE_URL}/generate-home`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    renderOutput(result);
  } catch (err) {
    renderError("Failed to communicate with Home Interior API");
  }
}

// Handle Party Planner Submission
async function handlePartySubmit(event) {
  event.preventDefault();
  const payload = {
    event_type: document.getElementById('eventType').value,
    total_budget: parseFloat(document.getElementById('partyBudget').value),
    guest_count: parseInt(document.getElementById('guestCount').value),
    additional_requirements: document.getElementById('partyNotes').value
  };

  displayLoading();
  try {
    const response = await fetch(`${API_BASE_URL}/generate-party`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    renderOutput(result);
  } catch (err) {
    renderError("Failed to communicate with Party Planner API");
  }
}

// Handle Jewelry Stylist Submission
async function handleJewelrySubmit(event) {
  event.preventDefault();
  const formData = new FormData();
  formData.append('budget', document.getElementById('jewelryBudget').value);
  formData.append('requirements', document.getElementById('jewelryNotes').value);

  displayLoading();
  try {
    const response = await fetch(`${API_BASE_URL}/generate-jewelry`, {
      method: 'POST',
      body: formData
    });
    const result = await response.json();
    renderOutput(result);
  } catch (err) {
    renderError("Failed to communicate with Jewelry Stylist API");
  }
}

// History Loader
async function loadHistory() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = "<p>Fetching query history...</p>";

  try {
    const response = await fetch(`${API_BASE_URL}/history/api`);
    const result = await response.json();
    
    if (result.history && result.history.length > 0) {
      historyList.innerHTML = result.history.map(item => `
        <div class="planner-card">
          <h4>${item.domain} Query</h4>
          <p><strong>Budget:</strong> ₹${item.budget || 'N/A'}</p>
          <p><strong>Details:</strong> ${item.details || 'Standard Setup'}</p>
        </div>
      `).join('');
    } else {
      historyList.innerHTML = "<p>No previous searches recorded yet.</p>";
    }
  } catch (e) {
    historyList.innerHTML = "<p>Unable to load history.</p>";
  }
}

// Display UI Render Helpers
function displayLoading() {
  const output = document.getElementById('recommendationOutput');
  const content = document.getElementById('outputContent');
  output.classList.remove('hidden');
  content.innerHTML = "<p><i class='fa-solid fa-spinner fa-spin'></i> AI is computing optimal budget allocation...</p>";
}

function renderOutput(data) {
  const content = document.getElementById('outputContent');
  content.innerHTML = `<pre style="white-space: pre-wrap; font-family: inherit;">${JSON.stringify(data, null, 2)}</pre>`;
}

function renderError(msg) {
  const content = document.getElementById('outputContent');
  content.innerHTML = `<p style="color: red;"><i class="fa-solid fa-triangle-exclamation"></i> ${msg}</p>`;
}

// Authentication Modals
function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

function handleLogin(e) {
  e.preventDefault();
  alert("Login successful!");
  closeModal('loginModal');
}

function handleRegister(e) {
  e.preventDefault();
  alert("Account registered successfully!");
  closeModal('registerModal');
}
