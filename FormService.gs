class FormService {

  static getHeader() {

    const sheet = SheetHelper.input();

    return {
      invoice: sheet.getRange(CONFIG.HEADER.invoice).getValue(),
      invoiceDate: sheet.getRange(CONFIG.HEADER.invoiceDate).getValue(),
      noBerkas: sheet.getRange(CONFIG.HEADER.noBerkas).getValue(),
      pic: sheet.getRange(CONFIG.HEADER.pic).getValue(),
      client: sheet.getRange(CONFIG.HEADER.client).getValue(),
      service: sheet.getRange(CONFIG.HEADER.service).getValue(),
      status: sheet.getRange(CONFIG.HEADER.status).getValue(),
      notes: sheet.getRange(CONFIG.HEADER.notes).getValue()
    };

  }

  static getDetails() {

    const sheet = SheetHelper.input();

    const values = sheet.getRange(
      CONFIG.DETAIL.startRow,
      2,
      CONFIG.DETAIL.maxRow,
      8
    ).getValues();

    return values
      .filter(row => row[1] !== "")
      .map(row => ({
        rincian: row[1],
        dibayarClient: row[2],
        tglBayarExternal: row[3],
        bayarExternal: row[4],
        refund: row[5],
        jumlahRefund: row[6],
        keterangan: row[7]
      }));

  }

  static clear() {

    const sheet = SheetHelper.input();

    sheet.getRange("C2:C9").clearContent();

    sheet.getRange(
      CONFIG.DETAIL.startRow,
      2,
      CONFIG.DETAIL.maxRow,
      8
    ).clearContent();

  }

  static loadHeader(header) {

    const sheet = SheetHelper.input();

    sheet.getRange(CONFIG.HEADER.invoice).setValue(header.invoice);
    sheet.getRange(CONFIG.HEADER.invoiceDate).setValue(header.invoiceDate);
    sheet.getRange(CONFIG.HEADER.noBerkas).setValue(header.noBerkas);
    sheet.getRange(CONFIG.HEADER.pic).setValue(header.pic);
    sheet.getRange(CONFIG.HEADER.client).setValue(header.client);
    sheet.getRange(CONFIG.HEADER.service).setValue(header.service);
    sheet.getRange(CONFIG.HEADER.status).setValue(header.status);
    sheet.getRange(CONFIG.HEADER.notes).setValue(header.notes);

  }

  static loadDetails(details) {

    const sheet = SheetHelper.input();

    const startRow = CONFIG.DETAIL.startRow;

    const totalRow = CONFIG.DETAIL.maxRow;

    sheet.getRange(
      startRow,
      2,
      totalRow,
      8
    ).clearContent();

    // Isi nomor urut
    const nomor = details.map((_, i) => [i + 1]);

    if (nomor.length > 0) {

      sheet.getRange(
        startRow,
        2,
        nomor.length,
        1
      ).setValues(nomor);

    }

    // Siapkan data untuk kolom C:I
    const values = details.map(item => [
      item.rincian,
      item.dibayarClient,
      item.tglBayarExternal,
      item.bayarExternal,
      item.refund,
      item.jumlahRefund,
      item.keterangan
    ]);

    if (values.length > 0) {

      sheet.getRange(
        startRow,
        3,
        values.length,
        7
      ).setValues(values);

    }

  }

}

