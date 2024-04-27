dealRecord = zoho.crm.getRecordById("Deals",dealId);
dealStage = dealRecord.get("Stage");
amount = dealRecord.get("Amount");
type = dealRecord.get("Type");
probability = dealRecord.get("Probability");
expected_revenue = dealRecord.get("Expected_Revenue");
lead_source = dealRecord.get("Lead_Source");
sales_cycle_Duration = dealRecord.get("Sales_Cycle_Duration");
// info dealRecord;
paramMap = Map();
paramMap.put("Amount",amount);
paramMap.put("Type",type);
paramMap.put("Probability (%)",probability);
paramMap.put("Expected Revenue",expected_revenue);
paramMap.put("Lead Source",lead_source);
paramMap.put("Sales Cycle Duration",sales_cycle_Duration);
// info paramMap;
testData = Map();
testData.put("data",paramMap);
response = invokeurl
[
	url :"https://api.catalyst.zoho.in/quickml/v1/project/6149000000005071/endpoints/predict"
	type :POST
	parameters:testData.toString()
	headers:{'X-QUICKML-ENDPOINT-KEY':'16db4cf44203fc66cc7403b05ca87f6f8957d1c94f657387291399be61e81b7b26b5e96cdaec35f8be763703e920b0cb','CATALYST-ORG':60027588282,'Environment':'Development'}
	connection:"catalyst"
];
dealPredict = response.get("result").toString();
if(dealPredict == "Closed Won")
{
	dealPredict = "Congratulations, As per the prediction the deal is likely to be closed won.";
}
else if(dealPredict == "Closed Lost")
{
	dealPredict = "As per the prediction the deal is likely to be closed lost.";
}
if(dealStage == "Needs Analysis" || dealStage == "Qualification" || dealStage == "Value Proposition")
{
	dealMap = Map();
	dealMap.put("Deal_Prediction","");
	dealResponse = zoho.crm.updateRecord("Deals",dealId,dealMap);
	info dealResponse;
}
else
{
	dealMap = Map();
	dealMap.put("Deal_Prediction",dealPredict);
	dealResponse = zoho.crm.updateRecord("Deals",dealId,dealMap);
	info dealResponse;
}