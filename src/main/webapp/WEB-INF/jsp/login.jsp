<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/easyui/jquery-1.8.0.min.js"></script>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
  <form  id="form"  action="v1/viewGddhDebt/searchByInfo" >
   <table>
       <tr>
          <td>ID：</td>  <td><input type="text" name="id" id="id"/></td>
           <td>账号：</td>  <td><input type="text" name="priAccount" id="priAccount"/></td>
           <td><input  type="submit"   value="ok"      /></td>
       </tr>


   </table>

  </form>
  </body>
</html>
