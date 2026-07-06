function onOpen() {

  SpreadsheetApp.getUi()
    .createMenu("📑 Revenue Expense")
    .addItem("💾 Tambah Invoice", "simpanInvoice")
    .addSeparator()
    .addItem("↩ Undo Last Save", "undoLastSave")
    .addSeparator()
    .addItem("🧹 Reset Form", "resetForm")
    .addToUi();

}