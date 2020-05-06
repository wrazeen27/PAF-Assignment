package com;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class patientAPI
 */
@WebServlet("/patientAPI")
public class patientAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public patientAPI() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	// Convert request parameters to a Map
		private static Map getParasMap(HttpServletRequest request)
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
		12
		String[] p = param.split("=");
		 map.put(p[0], p[1]);
		 }
		 }
		catch (Exception e)
		 {
		 }
		return map;
		}


	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String output = PatientObject.insert(request.getParameter("patientid"),
				 request.getParameter("firstname"),
				request.getParameter("lastname"),
				request.getParameter("age"),
				request.getParameter("gender"),
				request.getParameter("email"),
				request.getParameter("phone"),
				request.getParameter("address"),
				request.getParameter("password"),
				request.getParameter("cpassword"));
				response.getWriter().write(output);
	}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Map paras = getParasMap(request);
		 String output = PatientObject.updatePatient(paras.get("hidPatient_idSave").toString(),
		 paras.get("patient_fname").toString(),
		 paras.get("patient_lname").toString(),
		paras.get("patient_age").toString(),
		paras.get("patient_gender").toString(),
		paras.get("patient_email").toString(),
		paras.get("patient_phone").toString(),
		paras.get("patient_address").toString(),
		paras.get("patient_password").toString(),
		paras.get("patient_cpassword").toString());
		
		 response.getWriter().write(output); 
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Map paras = getParasMap(request);
		 String output = PatientObject.deletePatient(paras.get("patientid").toString());
		response.getWriter().write(output); 
	}

}
