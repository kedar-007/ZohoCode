contacts = zoho.crm.getRecordById("Contacts",contactId);
rating = contacts.get("Rating");
contactMap = Map();
if(rating <= 6)
{
	contactMap.put("NPS_Type","Detractor");
	zoho.crm.updateRecord("Contacts",contactId,contactMap);
}
else if(rating > 6 && rating <= 8)
{
	contactMap.put("NPS_Type","Passive");
	zoho.crm.updateRecord("Contacts",contactId,contactMap);
}
else if(rating > 8 && rating <= 10)
{
	contactMap.put("NPS_Type","Promoter");
	zoho.crm.updateRecord("Contacts",contactId,contactMap);
}
else
{
	response = Map();
	response.put("message","Please enter the appropriate rating");
	info response;
}