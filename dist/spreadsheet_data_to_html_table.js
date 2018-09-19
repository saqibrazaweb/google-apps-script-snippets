/* exported SPREADSHEET_ID, run */

/** @constant SPREADSHEET_ID The spreadsheet id */
var SPREADSHEET_ID = '{{YOUR_SPREADSHEET_ID}}';

/**
 * Runs the example
 */
function run() {
  var data = SpreadsheetApp.openById(SPREADSHEET_ID)
    .getSheets()[0]
    .getDataRange()
    // or .getDisplayValues()
    .getValues();
  Logger.log(dataToHtmltable_(data));
}

/**
 * Create HTML-table from a 2d Array
 * @param {object[][]} data The Spreadsheet data
 * @param {string} email
 * @returns {string} HTML-string
 */
function dataToHtmltable_(data, datesFormat) {
  datesFormat = datesFormat || 'yyyy-MM-dd';
  var tz = Session.getScriptTimeZone();
  var data_ = data.map(function(row) {
    return row.map(function(cell) {
      return cell && cell.getTime
        ? Utilities.formatDate(cell, tz, datesFormat)
        : cell;
    });
  });

  return JSON.stringify(data_, null, '  ')
    .replace(/^\[/g, '<table>')
    .replace(/\]$/g, '</table>')
    .replace(/^\s\s\[$/gm, '<tr>')
    .replace(/^\s\s\],{0,1}$/gm, '</tr>')
    .replace(/^\s{4}"{0,1}(.*?)"{0,1},{0,1}$/gm, '<td>$1</td>');
}