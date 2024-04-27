ticketRecord = zoho.desk.getRecordById(60026932485,"tickets",TicketId,"zohoauth_connection");
// info tiecketRecord;
subject = ticketRecord.get("subject");
// info subject;
subject = subject.toLowerCase();
teamMap = Map();
teamMap.put("Sales",{"demo","quotation","po","poc","refund"});
teamMap.put("Marketing",{"advertisement","social media","marketing","zoho"});
teamMap.put("Technical",{"bug","issues","system not working"});
teamMap.put("Admin",{"delay","unsatisfactory","escalation"});
teamMap.put("Legal",{"agreement","terms & conditions"});
for each  team in teamMap
{
	for each  keyword in team
	{
		if(subject.contains(keyword))
		{
			assingeeTeamName = teamMap.getKey(team);
			break;
		}
	}
}
// info assingeeTeamName ;
teamsRecord = invokeurl
[
	url :"https://desk.zoho.in/api/v1/teams"
	type :GET
	parameters:""
	connection:"zohoauth_connection"
];
teamdetails = teamsRecord.getJSON("teams");
for each  teamRecord in teamdetails
{
	if(assingeeTeamName == teamRecord.get("name"))
	{
		teamId = teamRecord.get("id");
		break;
	}
}
ticketMap = Map();
ticketMap.put("teamId",teamId);
updateJson = zoho.desk.update(60026932485,"tickets",TicketId,ticketMap);
info updateJson;
// teamsRecord = invokeurl
// [
// 	url :"https://desk.zoho.in/api/v1/teams"
// 	type :GET
// 	parameters:""
// 	connection:"zohoauth_connection"
// ];
// info teamsRecord;