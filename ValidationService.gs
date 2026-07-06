class ValidationService {

  static validateHeader(header) {

    const required = {
      invoice: "No Invoice",
      invoiceDate: "Tanggal Invoice",
      noBerkas: "No Berkas",
      pic: "PIC",
      client: "Nama Klien",
      service: "Jenis Layanan",
      status: "Status"
    };

    for (const key in required) {
      if (!header[key]) {
        throw new Error(required[key] + " wajib diisi.");
      }
    }

  }

  static invoiceExists(invoice) {

    const sheet = SheetHelper.revenue();

    if (sheet.getLastRow() <= 1) return false;

    const invoices = sheet
      .getRange(2, 1, sheet.getLastRow() - 1, 1)
      .getValues()
      .flat();

    return invoices.includes(invoice);

  }

}