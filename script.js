<script>
  // Execute metrics update automatically when UI finishes loading
  window.addEventListener('DOMContentLoaded', () => {
    updateDashboardMetrics();
  });

  /**
   * Asynchronously polls Google Sheets backend for latest live metrics
   */
  function updateDashboardMetrics() {
    if (typeof google !== "undefined" && google.script) {
      google.script.run
        .withSuccessHandler(function(stats) {
          document.getElementById('count-total').innerText = stats.total;
          document.getElementById('count-ongoing').innerText = stats.ongoing;
          document.getElementById('count-completed').innerText = stats.completed;
        })
        .withFailureHandler(function(err) {
          console.error("Failed to read database metrics: ", err);
        })
        .getDashboardStats();
    }
  }

  /**
   * Dummy function placeholder for card navigation
   */
  function navigateTo(moduleName) {
    alert("🚀 Navigating to Module: " + moduleName.toUpperCase() + "\nThis placeholder is ready to launch sub-forms or layout switches!");
    // Later integration example:
    // google.script.run.loadModulePage(moduleName);
  }

  /**
   * Dummy function placeholder for Search bar functionality
   */
  function executeSearch() {
    const query = document.getElementById('projectSearch').value;
    if(!query) {
      alert("Please enter a project ID or Keyword first!");
      return;
    }
    alert("🔍 Searching Database for query: '" + query + "'");
  }

  /**
   * Dummy login button placeholder action
   */
  function handleLogin() {
    alert("🔑 User authentication logic trigger standard placeholder.");
  }
</script>
