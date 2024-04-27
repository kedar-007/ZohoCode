TicketRecord = zoho.desk.getRecordById(60026932485,"tickets",TicketId);
// info TicketRecord;
TicketStatus = TicketRecord.get("status");
if(TicketStatus == "Closed")
{
	_createdDateTime = TicketRecord.get("createdTime");
	info _createdDateTime;
	_closedDateTime = TicketRecord.get("closedTime");
	info _closedDateTime;
	// 	TAT = timeBetween(createDateTime,closedDateTime);
	// 	info TAT;
	// 	_createdDateTime = '2024-03-07T17:01:01';
	// _closedDateTime = '2024-03-09T19:00:00';
	startDateTime = _createdDateTime.toTime("yyyy-MM-dd'T'HH:mm:ss");
	EndDateTime = _closedDateTime.toTime("yyyy-MM-dd'T'HH:mm:ss");
	createdDate = _createdDateTime.toDate("yyyy-MM-dd'T'HH:mm:ss");
	closedDate = _closedDateTime.toDate("yyyy-MM-dd'T'HH:mm:ss");
	startTime = (createdDate + ' 09:00:00');
	endTime = (closedDate + ' 18:00:00');
	holidayList = {'02-Jan-2024','03-Jan-2024','15-Mar-2024','08-Mar-2024'};
	businessDays = createdDate.workDaysBetween(closedDate.subDay(1),{"Saturday","Sunday"},holidayList);
	createdFlag = false;
	closedFlag = false;
	tat = '';
	if(createdDate.getDayOfWeek() == 1 || createdDate.getDayOfWeek() == 7 || holidayList.contains(createdDate))
	{
		createdFlag = true;
		day1tat = "00:00:00";
	}
	if(closedDate.getDayOfWeek() == 1 || closedDate.getDayOfWeek() == 7 || holidayList.contains(closedDate))
	{
		closedFlag = true;
		lastdayTat = createdDate + " 00:00:00";
	}
	if(createdDate == closedDate)
	{
		if(createdFlag == true)
		{
			info "its a holiday";
		}
		else
		{
			if(startDateTime.getHour() < startTime.getHour())
			{
				startDateTime = startTime;
			}
			if(EndDateTime.getHour() >= endTime.getHour())
			{
				EndDateTime = endTime;
			}
			tat = startDateTime.timeBetween(EndDateTime);
			tatList = tat.toList(":");
			if(startDateTime.getSeconds() == EndDateTime.getSeconds() && startDateTime.getMinutes() != EndDateTime.getMinutes() && startDateTime.getHour() != EndDateTime.getHour())
			{
				if(startDateTime.hoursBetween(EndDateTime) == 0)
				{
					tat = "00:" + tat + "00";
				}
				else
				{
					tat = tat + "00";
				}
			}
			if(startDateTime.getMinutes() == EndDateTime.getMinutes() && startDateTime.getHour() != EndDateTime.getHour() && startDateTime.getSeconds() != EndDateTime.getSeconds())
			{
				tat = tatList.get(0) + ":00:" + tatList.get(1);
			}
			if(startDateTime.getMinutes() == EndDateTime.getMinutes() && startDateTime.getSeconds() == EndDateTime.getSeconds())
			{
				tat = tat + "00:00";
			}
			if(startDateTime.getHour() == EndDateTime.getHour() && startDateTime.getSeconds() == EndDateTime.getSeconds())
			{
				tat = "00:" + tat + "00";
			}
			if(startDateTime.getHour() == EndDateTime.getHour() && startDateTime.getMinutes() == EndDateTime.getMinutes())
			{
				tat = "00:00:" + tat;
			}
			info tat + " same day tat";
		}
	}
	else
	{
		if(createdFlag && closedFlag == true)
		{
			tat = businessDays * 8 + ":00:00";
		}
		day1tat = "00:00:00";
		lastDayTat = "00:00:00";
		if(createdFlag == false)
		{
			day1endTime = createdDate + " 18:00:00";
			if(startDateTime.getHour() < startTime.getHour())
			{
				startDateTime = startTime;
			}
			if(startDateTime.getHour() > day1endTime.getHour())
			{
				startDateTime = day1endTime;
			}
			day1tat = startDateTime.timeBetween(day1endTime);
			if(!day1tat.contains(":"))
			{
				day1tat = "00:00:" + day1tat;
			}
			day1tatList = day1tat.toList(":");
			if(startDateTime.hoursBetween(day1endTime) == 0)
			{
				day1tat = "00:" + day1tat;
			}
			if(startDateTime.getSeconds() == day1endTime.getSeconds() && startDateTime.getMinutes() != day1endTime.getMinutes() && startDateTime.getHour() != day1endTime.getHour())
			{
				if(startDateTime.hoursBetween(day1endTime) == 0)
				{
					day1tat = "00:" + day1tat + "00";
				}
				else
				{
					day1tat = day1tat + "00";
				}
			}
			if(startDateTime.getMinutes() == day1endTime.getMinutes() && startDateTime.getHour() != day1endTime.getHour() && startDateTime.getSeconds() != day1endTime.getSeconds())
			{
				if(startDateTime.hoursBetween(day1endTime) == 0)
				{
					day1tat = day1tat;
				}
				else
				{
					day1tat = day1tatList.get(0) + ":00:" + day1tatList.get(1);
				}
			}
			if(startDateTime.getMinutes() == day1endTime.getMinutes() && startDateTime.getSeconds() == day1endTime.getSeconds())
			{
				day1tat = day1tat + "00:00";
			}
			if(startDateTime.getHour() == day1endTime.getHour() && startDateTime.getSeconds() == day1endTime.getSeconds())
			{
				day1tat = "00:" + day1tat + "00";
			}
			if(startDateTime.getHour() == day1endTime.getHour() && startDateTime.getMinutes() == day1endTime.getMinutes())
			{
				day1tat = "00:00:" + day1tat;
			}
			info day1tat + "hello";
		}
		if(closedFlag == false)
		{
			lastdayStartTime = closedDate + " 09:00:00";
			closedDateTime = _closedDateTime.toTime("yyyy-MM-dd'T'HH:mm:ss");
			if(EndDateTime.getHour() > endTime.getHour())
			{
				EndDateTime = endTime;
			}
			if(EndDateTime.getHour() < lastdayStartTime.getHour())
			{
				EndDateTime = lastdayStartTime;
			}
			// 		info EndDateTime+" end day" ;
			lastDayTat = lastdayStartTime.timeBetween(EndDateTime);
			info lastDayTat;
			lastDayTatList = lastDayTat.toList(":");
			if(lastdayStartTime.getHour() == EndDateTime.getHour() && lastdayStartTime.getMinutes() != EndDateTime.getMinutes() && lastdayStartTime.getSeconds() != EndDateTime.getSeconds())
			{
				lastDayTat = "00:" + lastDayTat;
			}
			if(lastdayStartTime.getSeconds() == EndDateTime.getSeconds() && lastdayStartTime.getMinutes() != EndDateTime.getMinutes() && lastdayStartTime.getHour() != EndDateTime.getHour())
			{
				lastDayTat = lastDayTat + "00";
			}
			if(lastdayStartTime.getMinutes() == EndDateTime.getMinutes() && lastdayStartTime.getHour() != EndDateTime.getHour() && lastdayStartTime.getSeconds() != EndDateTime.getSeconds())
			{
				lastDayTat = lastDayTatList.get(0) + ":00:" + lastDayTatList.get(1);
			}
			if(lastdayStartTime.getMinutes() == EndDateTime.getMinutes() && lastdayStartTime.getSeconds() == EndDateTime.getSeconds())
			{
				lastDayTat = lastDayTat + "00:00";
			}
			if(lastdayStartTime.getHour() == EndDateTime.getHour() && lastdayStartTime.getSeconds() == EndDateTime.getSeconds())
			{
				lastDayTat = "00:" + lastDayTat + "00";
			}
			if(lastdayStartTime.getHour() == EndDateTime.getHour() && lastdayStartTime.getMinutes() == EndDateTime.getMinutes())
			{
				lastDayTat = "00:00:" + lastDayTat;
			}
		}
		day1tatParts = day1tat.toList(":");
		businessHours = businessDays * 9;
		lastDayTatParts = lastDayTat.toList(":");
		//Total Seconds;
		totalSeconds = day1tatParts.get(2).toNumber() + lastDayTatParts.get(2).toNumber();
		carryMinutes = floor(totalSeconds / 60);
		totalSeconds = totalSeconds % 60;
		//Total Minutes
		totalMinutes = day1tatParts.get(1).toNumber() + lastDayTatParts.get(1).toNumber();
		carryHours = floor(totalMinutes / 60);
		totalMinutes = totalMinutes % 60;
		//Total Hours
		totalHours = businessHours + day1tatParts.get(0).toNumber() + lastDayTatParts.get(0).toNumber() + carryHours;
		tat = totalHours + ":" + totalMinutes + ":" + totalSeconds;
		info tat + " Different day tat";
	}
	TicketMap = Map();
	customField = Map();
	customField.put("TAT",tat);
	TicketMap.put("customFields",customField);
	updateJson = zoho.desk.update(60026932485,"tickets",TicketId,TicketMap);
	info updateJson;
}