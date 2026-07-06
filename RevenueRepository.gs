class RevenueRepository {

  static insert(header) {

    const sheet = SheetHelper.revenue();

    const lastRow = sheet.getLastRow();

    sheet.insertRowsAfter(lastRow, 1);

    SpreadsheetApp.flush();

    const newRow = sheet.getLastRow();

    sheet.getRange(newRow, 1, 1, 12).setValues([[
      header.invoice,
      header.invoiceDate,
      header.noBerkas,
      header.pic,
      header.client,
      header.service,
      "", // Total Invoice
      "", // Bayar External
      "", // Total Refund
      "", // Pendapatan
      header.status,
      header.notes
    ]]);

    return newRow;

  }

  static copyFormula(row) {

    const sheet = SheetHelper.revenue();

    sheet
      .getRange(row - 1, 7, 1, 4)
      .copyTo(
        sheet.getRange(row, 7, 1, 4),
        SpreadsheetApp.CopyPasteType.PASTE_FORMULA,
        false
      );

  }

  static delete(invoice) {

    const sheet = SheetHelper.revenue();

    const lastRow = sheet.getLastRow();

    if (lastRow <= 1) return;

    const invoices = sheet
      .getRange(2, 1, lastRow - 1, 1)
      .getValues();

    for (let i = invoices.length - 1; i >= 0; i--) {

      if (invoices[i][0] === invoice) {

        sheet.deleteRow(i + 2);
        return;

      }

    }

  }

  static find(invoice) {

    const sheet = SheetHelper.revenue();

    const lastRow = sheet.getLastRow();

    if (lastRow <= 1) return null;

    const values = sheet.getRange(
      2,
      1,
      lastRow - 1,
      12
    ).getValues();

    for (let i = 0; i < values.length; i++) {

      if (values[i][0] === invoice) {

        return {
          row: i + 2,
          invoice: values[i][0],
          invoiceDate: values[i][1],
          noBerkas: values[i][2],
          pic: values[i][3],
          client: values[i][4],
          service: values[i][5],
          status: values[i][10],
          notes: values[i][11]
        };

      }

    }

    return null;

  }

}