function onSubmit() {
  //Get all the sheet names
  var allSheets = getExistingAgencies();
  //Get newly added agency name from main sheet
  var currentAgency = getNewAgencyName();

  //If newly added agency doesnot have a sheet existing, then create one
  if (allSheets.indexOf(currentAgency[0]) == -1) {
    createNewSheet(currentAgency[0]);
  }
  //Copy data from main sheet to agency sheet
  copyRowToColumn(currentAgency[0]);
}


function getExistingAgencies(){
  //Get all sheets in Response Google Sheet
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

function getNewAgencyName(){
  //Set the Name column index
  //NOTE: PLEASE SET THIS INDEX TO MATCH THE AGENCY COLUMN NAME INDEX
  var agencyColumnIndex = 2;
  //Get the Main Sheet
  var mainSheet = getMainSheet();
  //Read all agency names
  var agencyName = mainSheet
    .getRange(1, agencyColumnIndex, mainSheet.getLastRow(), 1)
    .getValues();

  //Get the last row index
  var lastRow = mainSheet.getLastRow();
  //Return the last added agency name
  return agencyName[lastRow-1]; // returning an array
}

function getMainSheet(){
  //Function to get main sheet
  var allSheets = SpreadsheetApp.getActiveSpreadsheet();
  //NOTE: PLEASE MAKE SURE THE FIRST SHEET IS ALWAYS THE MAIN SHEET
  var mainSheet = allSheets.getSheets()[0];
  return mainSheet;
}

function createNewSheet(sheetName) {
  //Function to create a new sheet and change the name of that sheet
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  newSheet = activeSpreadsheet.insertSheet();
  newSheet.setName(sheetName);
}

function copyRowToColumn(sheetName){
  //Get the Main Sheet
  var mainSheet = getMainSheet();
  //Get the Agency Sheet
  var agencySheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  //Get data in main sheet
  // getRange(row, column, numRows, numColumns)
  var data = mainSheet.getRange(1,1, mainSheet.getLastRow(), mainSheet.getLastColumn()).getValues();

  // This reverses the first two and last two parameters of the getRange() function
  var newData = mainSheet
    .getRange(mainSheet.getLastRow(), mainSheet.getLastColumn(), 1, 1)
    .getValues();
  
  //Get last row index of main sheet
  var lastRow = mainSheet.getLastRow();
  //Put header values in main sheet to header variable
  var header = data[0];
  //Put last agency entries in main sheet to agencyEntry variable
  var agencyEntry = data[lastRow-1];
  //Copy header vaules to first column of agency sheet
  for (var index = 0; index < header.length; index++ ) {
    agencySheet.getRange(index+1,1,1,1).setValue(header[index]);
  }
  //Get last column index of agency sheet
  var agencyLastColumn = agencySheet.getLastColumn();
  //Copy agency entries to last column of agency sheet
  for (var index = 0; index < agencyEntry.length; index++ ) {
    agencySheet.getRange(index+1,agencyLastColumn+1,1,1).setValue(agencyEntry[index]);
  }
}