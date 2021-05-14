$(document).ready(function () {
    if ($("#alertSuccess").text().trim() == "") {
        $("#alertSuccess").hide();
    }
    $("#alertError").hide();
});

///CLIENT-MODEL================================================================
function validateOrderForm() {
	
    // CODE-------------------------------------
    if ($("#orderName").val().trim() == "") {
        return "Insert Order Name.";
    }

	// CODE-------------------------------------
    if ($("#orderCategory").val().trim() == "") {
        return "Insert Order Category.";
    }
	
	// CODE-------------------------------------
    if ($("#orderPrice").val().trim() == "") {
        return "Insert Order Price.";
    }
	
	// CODE-------------------------------------
    if ($("#orderDate").val().trim() == "") {
        return "Insert Order Date.";
    }
    
    return true;
}

///SAVE-BUTTON================================================================
$(document).on("click", "#btnSave", function (event) 
{
    // Clear alerts
    $("#alertSuccess").text("");
    $("#alertSuccess").hide();
    $("#alertError").text("");
    $("#alertError").hide();
    
    // Form validation
    var status = validateOrderForm();
    if (status != true) 
    {
        $("#alertError").text(status);
        $("#alertError").show();
        
        return;
    }
    
    // If valid
    var type = ($("#hidOrderIDSave").val() == "") ? "POST" : "PUT";
    $.ajax(
        {
            url: "OrdersAPI",
            type: type,
            data: $("#formOrder").serialize(),
            dataType: "text",
            complete: function (response, status) {
            	onOrderSaveComplete(response.responseText, status);
            }
        });
});


function onOrderSaveComplete(response, status) 
{
    	if (status == "success") 
    	{
    			var resultSet = JSON.parse(response);
    			
    			if (resultSet.status.trim() == "success") 
    			{
    					$("#alertSuccess").text("Successfully saved.");
	    				$("#alertSuccess").show();
	    				
	    				$("#divOrdersGrid").html(resultSet.data);
    			} 
    			else if (resultSet.status.trim() == "error") 
    			{
    					$("#alertError").text(resultSet.data);
    					$("#alertError").show();
    			}
    	}
    	
    	else if (status == "error") 
    	{
    			$("#alertError").text("Error while saving.");
    			$("#alertError").show();
    	}	 
    	
    	else 
    	{
    			$("#alertError").text("Unknown error while saving..");
    			$("#alertError").show();
    	}
    	
    	$("#hidOrderIDSave").val("");
    	$("#formOrder")[0].reset();
}

///UPDATE-BUTTON================================================================
$(document).on("click", ".btnUpdate", function (event) 
{
    	$("#hidOrderIDSave").val($(this).data("orderid"));
    	$("#orderName").val($(this).closest("tr").find('td:eq(0)').text());
    	$("#orderCategory").val($(this).closest("tr").find('td:eq(1)').text());
    	$("#orderPrice").val($(this).closest("tr").find('td:eq(2)').text());
    	$("#orderDate").val($(this).closest("tr").find('td:eq(3)').text());
});

///DELETE-BUTTON================================================================
$(document).on("click", ".btnRemove", function (event) 
{
    $.ajax(
        {
            url: "OrdersAPI",
            type: "DELETE",
            data: "OrderID=" + $(this).data("orderid"),
            dataType: "text",
            complete: function (response, status) 
            {
            	onOrderDeleteComplete(response.responseText, status);
            }
        });
});

function onOrderDeleteComplete(response, status) 
{
    	if (status == "success") 
    	{
    			var resultSet = JSON.parse(response);
    			
    			if (resultSet.status.trim() == "success") 
    			{
    					$("#alertSuccess").text("Successfully deleted.");
    					$("#alertSuccess").show();
    					
    					$("#divOrdersGrid").html(resultSet.data);
    			}
    			
    			else if (resultSet.status.trim() == "error")
    			{
    					$("#alertError").text(resultSet.data);
    					$("#alertError").show();
    			}
    	} 
    	
    	else if (status == "error") 
    	{
    			$("#alertError").text("Error while deleting.");
    			$("#alertError").show();
    	} 
    	
    	else 
    	{
    			$("#alertError").text("Unknown error while deleting..");
    			$("#alertError").show();
    	}
}