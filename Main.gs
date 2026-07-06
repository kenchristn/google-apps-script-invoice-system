function simpanInvoice() {

  const ui = SpreadsheetApp.getUi();

  const confirm = ui.alert(
    "Konfirmasi",
    "Yakin ingin menyimpan invoice ini?",
    ui.ButtonSet.YES_NO
  );

  if (confirm !== ui.Button.YES) {
    return;
  }

  try {

    const result = InvoiceService.save();

    ui.alert(result);

  } catch (err) {

    ui.alert(err.message);

  }

}

function resetForm() {

  const ui = SpreadsheetApp.getUi();

  const result = ui.alert(
    "Reset Form",
    "Yakin ingin mengosongkan seluruh form?",
    ui.ButtonSet.YES_NO
  );

  if (result !== ui.Button.YES) {
    return;
  }

  FormService.clear();

  ui.alert("✅ Form berhasil dikosongkan.");

}

function undoLastSave() {

  UndoService.undo();

}

function cariInvoice() {

  const ui = SpreadsheetApp.getUi();

  const result = ui.prompt(
    "🔍 Cari Invoice",
    "Masukkan Nomor Invoice",
    ui.ButtonSet.OK_CANCEL
  );

  if (result.getSelectedButton() !== ui.Button.OK) {
    return;
  }

  const invoice = result.getResponseText().trim();

  if (!invoice) {
    ui.alert("Nomor invoice tidak boleh kosong.");
    return;
  }

  try {

    const data = SearchService.search(invoice);

    FormService.loadHeader(data);

    const details = SearchService.searchDetails(invoice);

    FormService.loadDetails(details);

  } catch(err){

    ui.alert(err.message);

  }

}