package com;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import model.Order;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/OrdersAPI")
public class OrdersApi extends HttpServlet{
	private static final long serialVersionUID = 1L;
    Order orderObj;
    
    
    public OrdersApi() {
        super();
        orderObj =  new Order();
    }

	
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String output = orderObj.insertItem(request.getParameter("orderName"),
												 request.getParameter("orderCategory"),
												 request.getParameter("orderPrice"),
												 request.getParameter("orderDate"));
		response.getWriter().write(output);
	}

	
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Map<String, String> paras = getParasMap(request);
		String output = orderObj.updateItem(paras.get("hidOrderIDSave").toString(),
												paras.get("orderName"),
												paras.get("orderCategory"),
												paras.get("orderPrice"),
												paras.get("orderDate"));
		response.getWriter().write(output);
	}

	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Map<String, String> paras = getParasMap(request);
		
		String output = orderObj.deleteItem(paras.get("OrderID").toString());
		response.getWriter().write(output);
	}
	
	
	// Convert request parameters to a Map
			private static Map<String,String> getParasMap(HttpServletRequest request)
			{
				Map<String, String> map = new HashMap<String, String>();
				
				try
				{
					Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
					String queryString = scanner.hasNext() ?
										scanner.useDelimiter("\\A").next() : "";
					scanner.close();
					
					String[] params = queryString.split("&");
					for (String param : params)
					{
						String[] p = param.split("=");
						map.put(p[0], java.net.URLDecoder.decode(p[1], StandardCharsets.UTF_8.name()));
					}
				}
				catch (Exception e)
				{
				}
				return map;
			}
}
