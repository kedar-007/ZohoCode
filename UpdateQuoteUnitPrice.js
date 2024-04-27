// 1. Get quoteRecord from Quote Id.
quoteRecord = zoho.crm.getRecordById("Quotes",quoteId);
contactOfQuote = quoteRecord.get("Contact_Name");
if(contactOfQuote == null)
{
	info "There is no Contact associated with the quote. No price value from Price Book will be applied.";
	return;
}
// If contact info is present in Quote, then get Contact Id.
contactId = contactOfQuote.get("id");
// 3. Get Associated Contact Record by ContactId.
contactRecord = zoho.crm.getRecordById("Contacts",contactId);
// 3.1 Getting Zone and State field from Contact Record.
zone = contactRecord.get("Zone");
state = contactRecord.get("State");
if(zone == null || state == null)
{
	info "Contact has no specific zone or state. No unit price will be applied from the price book.";
	info "Standard unit price will be applied.";
	return;
}
else
{
	// Create quote map to update product price based on zone and state.
	quoteUpdateMap = Map();
	// New product list to update product prices.
	newProductItemList = List();
	// Get all records from PriceBook to assign prices for products in the quote.
	allPriceBookRecord = zoho.crm.getRecords("PriceBook");
	// PriceBook record IDs.
	priceBookRecordIds = List();
	for each  priceBookRecord in allPriceBookRecord
	{
		priceBookRecordIds.add(priceBookRecord.get("id"));
	}
	info priceBookRecordIds;
	// 4. Getting Product List from quote for which we have to get prices from PriceBook.
	productList = quoteRecord.get("Product_Details");
	// 	info productList ;
	for each  product in productList
	{
		// Creating a new product map to store each product's info.
		newProductMap = Map();
		// Getting product name and ID for lookup in the price book for a particular zone and state.
		quoteProductName = product.get("product").get("name");
		quoteProductId = product.get("product").get("id");
		quoteProductItemId = product.get("id");
		// 		info quoteProductName ;
		// Very important during updation.
		for each  priceBookId in priceBookRecordIds
		{
			priceBookRecord = zoho.crm.getRecordById("PriceBook",priceBookId);
			// 			info priceBookRecord
			getPriceBookInfo = priceBookRecord.get("Product_Details");
			// Now finding product price with zone and state.
			for each  priceBookInfo in getPriceBookInfo
			{
				proNamePriceBook = priceBookInfo.get("Product_Name").get("name");
				proZonePriceBook = priceBookRecord.get("Zone");
				proStatePriceBook = priceBookRecord.get("State");
				newProductPrice = "";
				// Now match with our given product, zone, and state.
				if(quoteProductName == proNamePriceBook && zone == proZonePriceBook && state == proStatePriceBook)
				{
					// Get new price from the price book.
					newProductPrice = priceBookInfo.get("List_Price");
					break;
				}
			}
			// We did not get any product price.
			if(newProductPrice != "")
			{
				break;
			}
		}
		newProductMap.put("id",quoteProductItemId);
		if(newProductPrice != "")
		{
			newProductMap.put("list_price",newProductPrice);
		}
		newProductItemList.add(newProductMap);
	}
	quoteUpdateMap.put("Product_Details",newProductItemList);
	updateJson = zoho.crm.updateRecord("Quotes",quoteId,quoteUpdateMap);
	info updateJson;
}