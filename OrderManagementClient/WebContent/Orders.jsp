<%@page import="model.Order"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Order Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/orders.js"></script>
</head>
<body>

	<div class="container">
		<div class="row">
			<div class="col-6"> 
				<h1>Orders Management V10.1</h1>
				<form id="formOrder" name="formOrder">
	 				Order Name: 
	 				<input id="orderName" name="orderName" type="text" class="form-control form-control-sm"> <br> 
	 				
	 				Order Category: 
	 				<input id="orderCategory" name="orderCategory" type="text" class="form-control form-control-sm"> <br> 
	 				
	 				Order price: 
	 				<input id="orderPrice" name="orderPrice" type="text" class="form-control form-control-sm"> <br> 
	 				
	 				Order Date: 
	 				<input id="orderDate" name="orderDate" type="text" class="form-control form-control-sm"> <br>
	 				
	 				<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">
	 				<input type="hidden" id="hidOrderIDSave" name="hidOrderIDSave" value="">
				
				</form>
				
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				
				<br>
				
				<div id="divOrdersGrid">
	 			<%
	 				Order orderObj = new Order(); 
	 				out.print(orderObj.readItems()); 
	 			%>
				</div>
			</div>
		</div>
	</div>

</body>
</html>