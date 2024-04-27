entityMap = crmAPIRequest.get("record");
response = Map();
GSTIN = entityMap.get("GSTIN");
size = GSTIN.length();
if(size < 15)
{
	response.put('status','failed');
	response.put('message','GSTIN not valid');
	return response;
}
firstTwoChar = GSTIN.subString(0,2);
fourteenthChar = GSTIN.subString(13,14);
if(size == 15 && firstTwoChar.isNumber() && fourteenthChar == "Z")
{
	response.put('status','success');
}
else
{
	response.put('status','failed');
	response.put('message','GSTIN not valid');
}
return response;