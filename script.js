function doGet(e) {
  // Open your sheet by active context
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  // Assuming Column 1 is ID, Column 2 is Name, Column 3 is Status ('Ongoing', 'Completed', etc.)
  // Change column indices below according to your exact spreadsheet layout!
  var totalProjects = data.length - 1; // Subtract 1 for the Header row
  var ongoingCount = 0;
  var completedCount = 0;
  
  for (var i = 1; i < data.length; i++) {
    var status = data[i][2]; // 2 means Column C (0-indexed: A=0, B=1, C=2)
    if (status === "Ongoing") {
      ongoingCount++;
    } else if (status === "Completed") {
      completedCount++;
    }
  }
  
  var result = {
    total: totalProjects,
    ongoing: ongoingCount,
    completed: completedCount
  };
  
  // Return stringified JSON with appropriate Content Service flags to bypass CORS barriers
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
