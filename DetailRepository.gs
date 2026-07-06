class DetailRepository {

  static insert(invoice, details) {

    const sheet = SheetHelper.detail();

    const rows = details.map(item => [

      invoice,

      item.rincian,

      item.dibayarClient,

      item.tglBayarExternal,

      item.bayarExternal,

      item.refund,

      item.jumlahRefund,

      "",

      item.keterangan

    ]);

    const lastRow = sheet.getLastRow();

    sheet.insertRowsAfter(lastRow, rows.length);

    SpreadsheetApp.flush();

    const firstRow = sheet.getLastRow() - rows.length + 1;

    sheet.getRange(
      firstRow,
      1,
      rows.length,
      rows[0].length
    ).setValues(rows);

    return firstRow;

  }

  static copyFormula(startRow, totalRow) {

    const sheet = SheetHelper.detail();

    for (let i = 0; i < totalRow; i++) {

      sheet
        .getRange(startRow - 1, 7, 1, 2)
        .copyTo(
          sheet.getRange(startRow + i, 7, 1, 2),
          SpreadsheetApp.CopyPasteType.PASTE_FORMULA,
          false
        );

    }

  }

  static delete(invoice) {

    const sheet = SheetHelper.detail();

    const lastRow = sheet.getLastRow();

    if (lastRow <= 1) return;

    const invoices = sheet
      .getRange(2, 1, lastRow - 1, 1)
      .getValues();

    for (let i = invoices.length - 1; i >= 0; i--) {

      if (invoices[i][0] === invoice) {

        sheet.deleteRow(i + 2);

      }

    }

  }

  static findByInvoice(invoice) {

    const sheet = SheetHelper.detail();

    const lastRow = sheet.getLastRow();

    if (lastRow <= 1) {
      return [];
    }

    const values = sheet.getRange(
      2,
      1,
      lastRow - 1,
      9
    ).getValues();

    return values
      .filter(row => row[0] === invoice)
      .map(row => ({
        rincian: row[1],
        dibayarClient: row[2],
        tglBayarExternal: row[3],
        bayarExternal: row[4],
        refund: row[5],
        jumlahRefund: row[6],
        keterangan: row[8]
      }));

  }

}