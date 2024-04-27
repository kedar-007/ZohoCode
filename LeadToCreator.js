//After creating a lead in zoho crm automatically creates un zoho creator just we have to create zOuth connection
leadRecord = zoho.crm.getRecordById("Leads",leadId);
// info leadRecord;
firstName = leadRecord.get("First_Name");
lastName = leadRecord.get("Last_Name");
company = leadRecord.get("Company");
email = leadRecord.get("Email");
creatorId = leadRecord.get("Creator_ID");
// info firstName;
// info lastName;
// info company ;
// info email ;
// info creatorId.isNull();
if(creatorId.isNull())
{
	creatorMap = Map();
	creatorMap.put("First_Name",firstName);
	creatorMap.put("Last_Name",lastName);
	creatorMap.put("Company",company);
	creatorMap.put("Email1",email);
	creatorMap.put("Lead_ID",leadId);
	othermap = Map();
	createintocreator = zoho.creator.createRecord("jinendrarathod","crm-integration","Leads",creatorMap,othermap,"creator");
	info createintocreator;
	CreatorID = createintocreator.get("data").get("ID");
	Leadmap = Map();
	Leadmap.put("Creator_ID",CreatorID);
	updatecreatorid = zoho.crm.updateRecord("Leads",leadId,Leadmap);
	info updatecreatorid;
}
else
{
	creatorMap = Map();
	creatorMap.put("First_Name",firstName);
	creatorMap.put("Last_Name",lastName);
	creatorMap.put("Email1",email);
	creatorMap.put("Company",company);
	creatorMap.put("Lead_ID",leadId);
	// info mp;
	otherParams = Map();
	update_Value = zoho.creator.updateRecord("jinendrarathod","crm-integration","Leads_Report",creatorId,creatorMap,otherParams,"creator");
	info update_Value;
}