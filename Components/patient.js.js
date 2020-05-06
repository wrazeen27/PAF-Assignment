$(document).ready(function()
{
if ($("#alertSuccess").text().trim() == "")
 {
 $("#alertSuccess").hide();
 }
 $("#alertError").hide();
}); 

// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
// Clear alerts---------------------
 $("#alertSuccess").text("");
 $("#alertSuccess").hide();
 $("#alertError").text("");
 $("#alertError").hide();
// Form validation-------------------
var status = validatePatientRegister();
if (status != true)
 {
 $("#alertError").text(status);
 $("#alertError").show();
 return;
 }
// If valid------------------------
 $("#patientRegister").submit();
}); 

// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
 $("#hidpatientidSave").val($(this).closest("tr").find('#hidIPatientidUpdate').val());
 $("#firstName").val($(this).closest("tr").find('td:eq(0)').text());
 $("#lastName").val($(this).closest("tr").find('td:eq(1)').text());
 $("#age").val($(this).closest("tr").find('td:eq(2)').text());
 $("#gender").val($(this).closest("tr").find('td:eq(2)').text());
 $("#email").val($(this).closest("tr").find('td:eq(2)').text());
 $("#phone").val($(this).closest("tr").find('td:eq(2)').text());
 $("#address").val($(this).closest("tr").find('td:eq(2)').text());
 $("#password").val($(this).closest("tr").find('td:eq(2)').text());
 $("#cpassword").val($(this).closest("tr").find('td:eq(3)').text());
}); 

// CLIENTMODEL=========================================================================
function validatepatirntRegister()
{
// FIRST NAME
if ($("#firstName").val().trim() == "")
 {
 return "Insert First NAme.";
 }
//LAST NAME
if ($("#lastName").val().trim() == "")
 {
 return "Insert Last Name.";
 } 
// AGE-------------------------------
if ($("#age").val().trim() == "")
 {
 return "Insert age.";
 }
// is numerical value
var tmpAge = $("#age").val().trim();
if (!$.isNumeric(tmpAge))
 {
 return "Insert a numerical value for Age.";
 }
// GENDER------------------------
if ($("#gender").val().trim() == "")
 {
 return "Insert gender.";
 }
// EMAIL ADDRESS------------------------
if ($("#email").val().trim() == "")
 {
 return "Insert Email Address.";
 }
// PHONE------------------------
if ($("#phone").val().trim() == "")
 {
 return "Insert Phone Number.";
 }
// is numerical value
var tmpPhone = $("#phone").val().trim();
if (!$.isNumeric(tmpPhone))
 {
 return "Insert a numerical value for Phone.";
 }
// ADDRESS------------------------
if ($("#address").val().trim() == "")
 {
 return "Insert address.";
 }
// PASSWORD------------------------
if ($("#password").val().trim() == "")
 {
 return "Insert Password.";
 }
// CONFIRM PASSWORD------------------------
if ($("#cpassword").val().trim() == "")
 {
 return "Insert Confirm Password.";
 }
return true; 

var type = ($("#hidpatientidSave").val() == "") ? "POST" : "PUT";

$.ajax(
		{
		 url : "patientAPI",
		 type : type,
		 data : $("#patientRegister").serialize(),
		 dataType : "text",
		 complete : function(response, status)
		 {
		 onpatientSaveComplete(response.responseText, status);
		 }
		});

function onpatientSaveComplete(response, status)
{
if (status == "success")
 {
 var resultSet = JSON.parse(response);
 if (resultSet.status.trim() == "success")
 {
 $("#alertSuccess").text("Successfully saved.");
 $("#alertSuccess").show();
 $("#divpatientGrid").html(resultSet.data);
 } else if (resultSet.status.trim() == "error")
 {
 $("#alertError").text(resultSet.data);
 $("#alertError").show();
 }
 } else if (status == "error")
 {
 $("#alertError").text("Error while saving.");
 $("#alertError").show();
 } else
 {
 $("#alertError").text("Unknown error while saving..");
 $("#alertError").show();
 }
 $("#hidpatientidSave").val("");
 $("#patientRegister")[0].reset();
}

$(document).on("click", ".btnRemove", function(event)
		{
		 $.ajax(
		 {
		 url : "PatientAPI",
		 type : "DELETE",
		 data : "patientid=" + $(this).data("patientid"),
		 dataType : "text",
		 complete : function(response, status)
		 {
		 onpatientDeleteComplete(response.responseText, status);
		 }
		 });
		});

function onpatientDeleteComplete(response, status)
{
if (status == "success")
 {
 var resultSet = JSON.parse(response);
 if (resultSet.status.trim() == "success")
 {
 $("#alertSuccess").text("Successfully deleted.");
 $("#alertSuccess").show();
 $("#divpatientGrid").html(resultSet.data);
 } else if (resultSet.status.trim() == "error")
 {
 $("#alertError").text(resultSet.data);
 $("#alertError").show();
 }
 } else if (status == "error")
 {
 $("#alertError").text("Error while deleting.");
 $("#alertError").show();
 } else
 {
 $("#alertError").text("Unknown error while deleting..");
 $("#alertError").show();
 }
}