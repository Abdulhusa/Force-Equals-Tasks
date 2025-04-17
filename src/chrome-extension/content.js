
// Sample account data (in a real application, this would come from the API)
const sampleAccounts = [
  {
    id: 1,
    name: "Microsoft",
    matchScore: 85,
    status: "Target",
    linkedinUrl: "https://www.linkedin.com/company/microsoft/"
  },
  {
    id: 2,
    name: "Google",
    matchScore: 92,
    status: "Target",
    linkedinUrl: "https://www.linkedin.com/company/google/"
  },
  {
    id: 3,
    name: "Amazon",
    matchScore: 78,
    status: "Not Target",
    linkedinUrl: "https://www.linkedin.com/company/amazon/"
  },
  {
    id: 4,
    name: "Apple",
    matchScore: 88,
    status: "Target",
    linkedinUrl: "https://www.linkedin.com/company/apple/"
  },
  {
    id: 5,
    name: "Facebook",
    matchScore: 75,
    status: "Not Target",
    linkedinUrl: "https://www.linkedin.com/company/facebook/"
  },
  {
    id: 6,
    name: "Netflix",
    matchScore: 82,
    status: "Target",
    linkedinUrl: "https://www.linkedin.com/company/netflix/"
  },
  {
    id: 7,
    name: "Tesla",
    matchScore: 90,
    status: "Target",
    linkedinUrl: "https://www.linkedin.com/company/tesla-motors/"
  },
  {
    id: 8,
    name: "IBM",
    matchScore: 65,
    status: "Not Target",
    linkedinUrl: "https://www.linkedin.com/company/ibm/"
  }
];

// Function to extract company name from LinkedIn URL
function extractCompanyNameFromLinkedIn() {
  const path = window.location.pathname;
  const companyMatch = path.match(/\/company\/([^/]+)/);
  if (companyMatch && companyMatch[1]) {
    return companyMatch[1].replace(/-/g, ' ').toLowerCase();
  }
  return null;
}

// Find matching company in our sample data
function findMatchingCompany() {
  const currentCompanyPath = extractCompanyNameFromLinkedIn();
  if (!currentCompanyPath) return null;
  
  return sampleAccounts.find(account => {
    const accountPath = account.name.toLowerCase();
    return accountPath.includes(currentCompanyPath) || currentCompanyPath.includes(accountPath);
  });
}

// Create widget element
function createWidget(company) {
  const widget = document.createElement('div');
  widget.className = 'fe-widget';
  widget.innerHTML = `
    <div class="fe-widget-header">
      <h3>Force Equals Insights</h3>
      <button class="fe-toggle-btn">×</button>
    </div>
    <div class="fe-widget-content">
      <div class="fe-company-name">${company.name}</div>
      <div class="fe-match-container">
        <div class="fe-match-label">Match Score: ${company.matchScore}%</div>
        <div class="fe-progress-container">
          <div class="fe-progress-bar" style="width: ${company.matchScore}%"></div>
        </div>
      </div>
      <div class="fe-status-container">
        <span class="fe-status-tag ${company.status === 'Target' ? 'fe-target' : 'fe-not-target'}">
          ${company.status}
        </span>
      </div>
    </div>
  `;
  
  // Add event listener to toggle button
  widget.querySelector('.fe-toggle-btn').addEventListener('click', function() {
    widget.classList.toggle('fe-widget-collapsed');
    chrome.storage.local.set({ 'widgetCollapsed': widget.classList.contains('fe-widget-collapsed') });
  });
  
  return widget;
}

// Initialize widget
function initWidget() {
  // Check widget visibility preference
  chrome.storage.local.get(['widgetCollapsed'], function(result) {
    const company = findMatchingCompany();
    if (!company) return;
    
    const widget = createWidget(company);
    
    // Apply collapsed state if set
    if (result.widgetCollapsed) {
      widget.classList.add('fe-widget-collapsed');
    }
    
    // Inject widget into the page
    document.body.appendChild(widget);
  });
}

// Start the widget injection process
window.addEventListener('load', initWidget);

// For quicker development/debugging, also run initWidget after a short delay
setTimeout(initWidget, 1500);
