leadData = zoho.crm.getRecordById("Leads",leadId);
zip_code = leadData.get("Zip_Code");
partner_db = zoho.crm.getRecords("Partner");
for each  partner in partner_db
{
	partner_pin = partner.get("Pin_Code1").get("name");
	partner_name = partner.get("Name");
	if(zip_code == partner_pin)
	{
		leadMap = Map();
		leadMap.put("Assigned_Partner",partner_name);
		response = zoho.crm.updateRecord("Leads",leadId,leadMap);
		info response;
	}
}