/* The snippet below shows you how to get a list of fields, their values from a MAP object. The fields’ values can be obtained from the same MAP object.                                                  */
entityMap = crmAPIRequest.toMap().get("record");
/* The example below demonstrates how a field’s value (email) can be obtained from a MAP object. Here, entityMap - Map Object, Email - Field's API name
Sample entityMap= {'Email': 'xxx@xxx.com', 'Last_Name': 'xxx'};                                   */
closerDate = entityMap.get("Order_Closer_Date").toDate();
deliveryDate = entityMap.get("Order_Delivery_Date").toDate();
response = Map();
if(closerDate < deliveryDate)
{
	response.put('status','success');
}
else
{
	response.put('status','failed');
	response.put('message','Order closer date should not be greater that order delivery date');
}
/* ---------------------------------------------------------------------------------------------- */
/* Start writing your code here to perform the necessary field validation                         */
/* ---------------------------------------------------------------------------------------------- */
/* If the code identifies a validation error, set the status and alert message as shown below:    */
//response.put('status','error');
//response.put('message', '<your message(100 characters)>');
/* If there are no errors found during validation, set the status as shown below:                 */
/* ---------------------------------------------------------------------------------------------- */
return response;