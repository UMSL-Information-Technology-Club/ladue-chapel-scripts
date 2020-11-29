/**
 * Considerations:
 * - How to tell if agency is editing, or if it is a duplicate agency name?
 * - What to do if agency edits? Replace data or create another row?
 * - BugFix: "indexOf" will not work for Sheet object. Either get the name value out of the sheet object, or get array of strings that are the sheet names to compare
 * - What data can the trigger functions pass to us?
 * - Look into trigger events, compare pros/cons of using UI trigger vs creating Trigger with code
 * - Test if the new transpose function works correctly
 */


// Global variables
const questionsLength = 34;
const primarySheet = "mainSheet"

function main() {
  //Creates mainsheet variable. Used getSheetByName because getActiveSpreadsheet() will change after a new tab is added
  let mainSheet = SpreadsheetApp.getActive().getSheetByName(primarySheet);
  
  // Get a list of all exisitingAgencies (ie agencies with their own tab)
  // returns array of strings
  let existingTabNames = getExistingAgencies();

  Logger.log(existingTabNames)
  
  // Get all agency names in the main sheet
  // returns array of strings
  let agencyNames = mainSheetNames(mainSheet);

  Logger.log(agencyNames)

  
  // Get a list names which are on the main sheet but aren't tabs
  // returns array of strings
  let newAgencies = newAdditions(agencyNames, existingTabNames);

  Logger.log(newAgencies)

  
  // Create new tabs/pages for newly added agencies
  createAgencyTabs(newAgencies, mainSheet)

  // newAgencies.forEach(agency => {
  //   createAgencyTab(agency, mainSheet)
  // })
}

// Gets a list of Agency names for all agencies that already have their own tab
function getExistingAgencies(){
  // Reference to all current sheets, returns array of all sheets in the spreadsheet
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();

  // return a slice of the sheets that is all but the first sheet
  var existingAgencies = sheets.slice(1);

  // iterate through each sheet name and add it to the list
  var agencyNames = existingAgencies.map(sheet => {
    var agencyName = sheet.getName();
    //ignore the name of the mainsheet (which is at index 0.0). may be better to use main sheet rather than index
    return agencyName
  })
  
  return agencyNames;
}

// Returns names of every agency on the main sheet
function mainSheetNames(mainSheet){
  var mainSheetNames = [];
  var rowLevel = 2;
  var agencyNameColumnIndex = 3;
  // values is currently undefined so we enter the loop
  while(values != ""){
    // getRange(row, column, numRows, numColumns)
    var range = mainSheet.getRange(rowLevel, agencyNameColumnIndex, 1, 1);  
    var values = range.getValues();

    if(values[0][0]){
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
    // If the agency name is not in existingAgencies list, add it to the newAgencies list
    if(existingAgencies.indexOf(agency) == -1) {
      newAgencies.push(agency);
    }
  })
  return newAgencies;
}

function createAgencyTabs(newAgencies, mainSheet) {
  var rowLevel = 2; // we want to start at row 2 (first row after the row headings)
  var range = mainSheet.getRange(rowLevel, 1, 1, questionsLength); // defines dimensions of row
  var values = range.getValues();
  var agencyName = values[0][2]
  // While loop will continute to execute until there are no more entries
  while(agencyName){
    // if this row is one of the new agencies (values[0][2] is agency name) create a new tab and add the data
    if(newAgencies.indexOf(agencyName) > -1 && agencyName) {
      try {
        var newSheet = createNewPage(agencyName)
        Logger.log('new sheet created successfully: ' + agencyName)
      } catch (error) {
        Logger.log('error caught creating new page: ' + error.toString())
      }

      if(!newSheet) {
        newSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(agencyName)
      }

        var pageRange = newSheet.getRange(1,1,1, questionsLength); 
        // Add column titles to the new page
        // var columnTitles = getColumnTitles(mainSheet)
        var columnTitles = getColumnTitles(mainSheet)
  
        Logger.log("Column Titles: " + columnTitles)
        
        pageRange.setValues(columnTitles);
        // Change range to the next row down
        pageRange = newSheet.getRange(2,1,1, questionsLength);
        // now add that agencies information in the row
        pageRange.setValues(values);
  
        // transposeRow(newSheet)
        var horizontalRange = newSheet.getRange(`A1:B${questionsLength}`)
        var rangeValues = horizontalRange.getValues() // 2D array
        Logger.log("range values: " + rangeValues + " length: " + rangeValues.length)
        var transposedValues = rangeValues[0].map(function (_, c) { return rangeValues.map(function (r) { return r[c]; }); });
        for(let i = 0; i < rangeValues[0].length; i++) {
          newSheet.getRange(i+1, 1, 1, 2).setValues([[rangeValues[0][i].toString(), rangeValues[1][i].toString()]])
        }

        Logger.log('transposed values: ' + transposedValues + " length: " + transposedValues.length)

        // var transposedRange = newSheet.getRange(1, 1, questionsLength, 2); 
        // Logger.log('transposed range: ' + transposedRange)
        // transposedRange.setValues(transposedValues)
    }
    rowLevel++; // moves row level down to the next row
    range = mainSheet.getRange(rowLevel, 1, 1, questionsLength);
    values = range.getValues();
    agencyName = values[0][2]
  }
}


// Creates a single tab for the name of the agency
// // agency is the name of the agency
// function createAgencyTab(agency, mainSheet){
//   createNewPage(agency);

//   var newPage = SpreadsheetApp.getActive().getSheetByName(agency)
//   if(!newPage) return;
//   // Set current range to the top 23 cells
//   var pageRange = newPage.getRange(1,1,1, questionsLength); 
  
//   var columnTitles = pageRange.getValues()

//   // Add column titles to the new page
//   pageRange.setValues(columnTitles);
//   // Change range to the next row down
//   pageRange = newPage.getRange(2,1,1, questionsLength);
//   // now add that agencies information in the row
//   pageRange.setValues(values);

// }


// UTILITY FUNCTIONS

/**
 * Objectives:
 * - transpose data in a row so that it appears as a column
 */

function transposeRow(sheet) {
  // var ss = SpreadsheetApp.getActiveSpreadsheet();
  // var sheet = ss.getSheets()[0];
  
  var range = sheet.getRange(`A1:B${questionsLength}`);

  var chart = sheet.newChart()
      .setChartType(Charts.ChartType.BAR)
      .addRange(range)
      .setTransposeRowsAndColumns(true)
      .setPosition(5, 5, 0, 0)
      .build();
  
  sheet.insertChart(chart);
}

// returns new sheet reference
function createNewPage(name) {
  Logger.log("Creating new page: " + name)
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var yourNewSheet = activeSpreadsheet.insertSheet(name);
  yourNewSheet.setName(name)
  return yourNewSheet;
}

// Gets column titles from the main page.
function getColumnTitles(mainSheet) {
  var range = mainSheet.getRange(1, 1, 1, questionsLength);
  var titles = range.getValues();
  
  return titles;
}


// getRange(row, column, numRows, numColumns)
// Returns the range with the top left cell at the given coordinates with the given number of rows and columns.

function deleteAllSheets() {
  // delete all sheets

}