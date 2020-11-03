<%--
  Created by IntelliJ IDEA.
  User: x
  Date: 2019/11/22
  Time: 21:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"      prefix="c"%>
<html>
<head>
    <title>用户列表</title>
</head>
<body>

    <table border="1" align="center">
        <tr>
            <th>id </th>
            <th>name </th>
            <th>网点 </th>
        </tr>

            <tr>
                <td>${ViewGddhDebt.id}</td>
                <td>${ViewGddhDebt.name}</td>
                <td>${ViewGddhDebt.exid}</td>
            </tr>


    </table>



</body>
</html>
