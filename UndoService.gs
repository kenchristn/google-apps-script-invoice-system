class UndoService {

  static save(invoice) {

    PropertiesService
      .getDocumentProperties()
      .setProperty("LAST_INVOICE", invoice);

  }

  static getLastInvoice() {

    return PropertiesService
      .getDocumentProperties()
      .getProperty("LAST_INVOICE");

  }

  static clear() {

    PropertiesService
      .getDocumentProperties()
      .deleteProperty("LAST_INVOICE");

  }

  static undo() {

    const invoice = this.getLastInvoice();

    if (!invoice) {
      throw new Error("Tidak ada transaksi terakhir yang dapat dibatalkan.");
    }

    const ui = SpreadsheetApp.getUi();

    const result = ui.alert(
      "Undo Last Save",
      `Batalkan invoice ${invoice}?`,
      ui.ButtonSet.YES_NO
    );

    if (result !== ui.Button.YES) {
      return;
    }

    DetailRepository.delete(invoice);

    RevenueRepository.delete(invoice);

    this.clear();

    ui.alert(`✅ Invoice ${invoice} berhasil dibatalkan.`);

  }

}