function myFunction() {
  Logger.log("hello")
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
var range = sheet.getRange('A2:W2');
  console.log(range.toString())
  for(item in range) {
    console.log(item)
  }
}
