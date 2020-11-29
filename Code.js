// // 
// //Grab data from row 2 where the new entries will show up
// function myFunction() {
// //  getRow();
// //  getSpreadsheetRange('B1', 'F1');
//   createNewPage("newpage");
// }

// function putIntoNewSheet() {
//   getRow();
// }

// function createNewPage(name) {
//   var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
// //  var newSheet = activeSpreadsheet.getSheetByName(name);
// //
// //    if (newSheet != null) {
// //        activeSpreadsheet.deleteSheet(newSheet);
// //    }
  
//     yourNewSheet = activeSpreadsheet.insertSheet();
//     yourNewSheet.setName(name);

// }

// function getRow() {
//   // Get Reference to Sheet
//   Logger.log("testing");
//   //var sheet = SpreadsheetApp.getActiveSpreadsheet();
//   // Get a given row
//   //var lastRow = sheet.getLastRow();
  
//   //logs data of one specified row. I think a forEach would be useful to iterate over rows and log it
//   var rows = SpreadsheetApp.getActiveSheet().getRange(2,1,1,23).getValues() 
//   Logger.log("row: ");
//   Logger.log(rows);
  
//  // rows.forEach(function(row) {
// // var newRow = row[1];
//     //Logger.log(newRow);
    
//   //});
  
//   // Get row data from row index
// //  return lastRow;
//  //return sheet.getRange(column+startIndex+':'+column+lastRow).getValue();
// };

// function getSpreadsheetRange(start, end) {
//  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//  var range = sheet.getRange(start + ':' + end);
//  Logger.log('range:' + range);
//  sheet.setActiveRange(range);

//  var selection = sheet.getSelection();
//  // Current cell: A1
//  var currentCell = selection.getCurrentCell();
//  // Active Range: A1:D4
//  var activeRange = selection.getActiveRange();
// }




// // Trying to figure out how to select data from row 2

// // var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
// // var range = sheet.getRange('A2:W2');
// // sheet.setActiveRange(range);
// // //let rowData = range.getRow();
// //  var selection = sheet.getSelection();
// // Logger.log(selection);