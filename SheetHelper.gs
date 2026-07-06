class SheetHelper {

  static spreadsheet() {
    return SpreadsheetApp.getActiveSpreadsheet();
  }

  static input() {
    return this.spreadsheet().getSheetByName(CONFIG.INPUT_SHEET);
  }

  static revenue() {
    return this.spreadsheet().getSheetByName(CONFIG.REVENUE_SHEET);
  }

  static detail() {
    return this.spreadsheet().getSheetByName(CONFIG.DETAIL_SHEET);
  }

}