function main() {
    //Creates mainsheet variable. Used getSheetByName because getActiveSpreadsheet() will change after a new tab is added
    let mainSheet = SpreadsheetApp.getActive().getSheetByName("mainSheet");
    
    // Get a list of all exisitingAgencies (ie agencies with their own tab)
    let existingAgencies = getExistingAgencies();
    
    // Get all agency names in the main sheet
    let allNames = mainSheetNames(mainSheet);
    
    // Get a list names which are on the main sheet but aren't tabs
    let newAgencies = newAdditions(allNames, existingAgencies);
    
    // Create new tabs/pages for newly added agencies
    createAgencyTabs(newAgencies, mainSheet)
  }
  
  
  
  function createAgencyTabs(newAgencies, mainSheet){
    var rowLevel = 2; // we want to start at row 2 (first row after the row headings)
    var range = mainSheet.getRange(rowLevel, 1, 1, 23); // defines dimensions of row
    var values = range.getValues();
    // While loop will continute to execute until there are no more entries
    while(values[0][2] != ""){
      range = mainSheet.getRange(rowLevel, 1, 1, 23);
      values = range.getValues();
      // if this row is one of this new agencies (values[0][2] is agency name) create a new tab and add the data
      if(newAgencies.indexOf(values[0][2]) > -1){
        createNewPage(values[0][2])
        var newPage = SpreadsheetApp.getActive().getSheetByName(values[0][2])
        // Set current range to the top 23 cells
        var pageRange = newPage.getRange(1,1,1,23); 
        // Add column titles to the new page
        pageRange.setValues(getColumnTitles(mainSheet));
        // Change range to the next row down
        pageRange = newPage.getRange(2,1,1,23);
        // now add that agencies information in the row
        pageRange.setValues(values);
      }
      rowLevel++; // moves row level down to the next row
    }
  }
  
  
  
  // Returns names of every agency on the main sheet
  function mainSheetNames(mainSheet){
    var mainSheetNames = [];
    var rowLevel = 2;
    // values is currently undefined so we enter the loop
    while(values != ""){
      var range = mainSheet.getRange(rowLevel, 3, 1, 1);  
      var values = range.getValues();
      if(values[0][0] != ""){
        mainSheetNames.push(values[0][0]) // is values[0][0] so that we are adding just the name and not the nested list
      }
      rowLevel++;
    }
    return mainSheetNames;
  }
  
  
  // Get a list of all newly added agencies (agencies that are on the main sheet but don't have tabs made)
  function newAdditions(allAgencies, existingAgencies){
    let newAgencies = [];
     allAgencies.forEach(function(agency) {
      // If the agency is not in existingAgencies list, add it to the newAgencies list
      if(existingAgencies.indexOf(agency) == -1){
         newAgencies.push(agency);
      }
    })
    return newAgencies;
  }
                                    
  
  function createNewPage(name) {
    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    yourNewSheet = activeSpreadsheet.insertSheet();
    yourNewSheet.setName(name);
  
  }
  
  
  
  // Gets column titles from the main page.
  function getColumnTitles(mainSheet) {
    var range = mainSheet.getRange(1, 1, 1, 23);
    var titles = range.getValues();
    
    return titles;
  }
  
  
  // Gets a list of Agency names for all agencies that already have their own tab
  function getExistingAgencies(){
    // Reference to all current sheets
    var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
    var existingAgencies = [];
    // iterate through each sheet name and add it to the list
    sheets.forEach(function(sheet,index) {
      var agencyName = sheet.getName();
      //ignore the name of the mainsheet (which is at index 0.0)
      if(index != 0.0){
        existingAgencies.push(agencyName)
      }
    })
    
    return existingAgencies;
  }