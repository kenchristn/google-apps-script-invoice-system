class SearchService {

  static search(invoice) {

    const data = RevenueRepository.find(invoice);

    if (!data) {
      throw new Error("Invoice tidak ditemukan.");
    }

    return data;

  }

  static searchDetails(invoice){

    return DetailRepository.findByInvoice(invoice);

  }

}