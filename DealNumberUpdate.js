dealRecord = zoho.crm.getRecordById("Deals",dealID);
dealsize = zoho.crm.getRecords("Deals");
dealList = {};
for each  deal in dealsize
{
	dealList.add(deal);
}
lastDeal = dealList.get(1);
info lastDeal;
createdTime = lastDeal.get("Created_Time");
dealDate = today;
lastDealDate = createdTime.toDate();
noOfTime = lastDeal.get("Times_Edited");
if(lastDealDate < dealDate)
{
	final = 1;
}
else
{
	final = noOfTime.toNumber() + 1;
}
dealNumber = "DL-" + dealDate + "-0" + final;
dealMap = Map();
dealMap.put("Times_Edited",final);
dealMap.put("Deal_Number",dealNumber);
updateJson = zoho.crm.updateRecord("Deals",dealID,dealMap);
info updateJson;