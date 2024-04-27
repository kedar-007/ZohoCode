//Dynamic deal number
dealrecord = zoho.crm.getRecordById("Deals",dealId);
allDeals = zoho.crm.getRecords("Deals");
dealList = {};
for each  deal in allDeals
{
	dealList.add(deal);
}
dealDate = today;
lastDeal = dealList.get(0);
dealCount = lastDeal.get("Times_Edited").toNumber() + 1;
dealNumber = "DL-" + dealDate + "-0" + dealCount;
deal_record_number = dealrecord.get("Deal_Number");
dealMap = Map();
dealMap.put("Deal_Number",dealNumber);
response = zoho.crm.updateRecord("Deals",dealId,dealMap);
info response;