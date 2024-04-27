//Getting deals data
Get_deals_data = zoho.crm.getRecordById("Deals",dealId);
productLists = Get_deals_data.get("Product_and_Pricing");
size = zoho.crm.getRelatedRecords("Quotes","Deals",dealId).size();
if(size >= 1)
{
	return "Multiple quotes can't be created from a single deal";
}
else
{
	QuoteMap = Map();
	ProuductList = List();
	Account_Name = Get_deals_data.get("Account_Name").get("id");
	DealName = Get_deals_data.get("id");
	for each  product in productLists
	{
		productMap = Map();
		// Create a new map for each product
		Product_id = product.get("Product_Name").get("id");
		list_price = product.get("List_Price");
		quantity = product.get("Quantity");
		productMap.put("product",Product_id);
		productMap.put("List_Price",list_price);
		productMap.put("quantity",quantity);
		ProuductList.add(productMap);
	}
	QuoteMap.put("Account_Name",Account_Name);
	QuoteMap.put("Deal_Name",DealName);
	QuoteMap.put("Subject","Quoted by Jinendra Rathod");
	QuoteMap.put("Product_Details",ProuductList);
	createQuotes = zoho.crm.createRecord("Quotes",QuoteMap);
	// 	info createQuotes;
	return "Quote has been created Sucessfully";
}