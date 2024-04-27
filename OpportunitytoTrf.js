//uPDATING DATA FROM OPPRTUNITY TO TRF
trfRecord = zoho.crm.getRecordById("TRF",RecordId);
// info trfRecord;
trfMap = Map();
opportunityId = trfRecord.get("Opportunity").get("id");
// info opportunityId;
opportunityRecord = zoho.crm.getRecordById("Deals",opportunityId);
// info opportunityRecord;
operationUser = opportunityRecord.get("Operation_User").get("id");
businessType = opportunityRecord.get("Business_Type");
Requirement_Type = opportunityRecord.get("Requirement_Type");
Account_Name = opportunityRecord.get("Account_Name").get("id");
Client_Requirement_Type = opportunityRecord.get("Client_Requirement_Type");
Contact_name = opportunityRecord.get("Contact_Name");
currentDate = zoho.currentdate;
trfMap.put("TRF_Assigned_To",operationUser);
trfMap.put("Business_Type",businessType);
trfMap.put("Requirement_Type",Requirement_Type);
trfMap.put("TRF_Request_Date",currentDate);
trfMap.put("Account_Name",Account_Name);
trfMap.put("Client_Requirement_Type",Client_Requirement_Type);
trfMap.put("Client_SPOC",Contact_name);
updateJson = zoho.crm.updateRecord("TRF",RecordId,trfMap);
info updateJson;