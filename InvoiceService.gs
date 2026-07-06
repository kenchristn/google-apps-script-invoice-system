class InvoiceService {

  static save() {

    const header = FormService.getHeader();

    ValidationService.validateHeader(header);

    if (ValidationService.invoiceExists(header.invoice)) {
      throw new Error("No Invoice sudah digunakan.");
    }

    const details = FormService.getDetails();

    if (details.length === 0) {
      throw new Error("Minimal harus ada 1 rincian.");
    }

    const revenueRow = RevenueRepository.insert(header);

    RevenueRepository.copyFormula(revenueRow);

    const detailStart = DetailRepository.insert(
      header.invoice,
      details
    );

    DetailRepository.copyFormula(
      detailStart,
      details.length
    );

    UndoService.save(header.invoice);

    FormService.clear();

    return "✅ Invoice berhasil disimpan.";

  }

}
