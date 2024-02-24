<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Insert title here</title>
<script type="text/javascript">
// 3초(3000 밀리초)마다 autoRefreshPage 함수를 호출하여 페이지 새로 고침
setInterval(autoRefreshPage, 3000);

function autoRefreshPage() {
    location.reload();
}
</script>
</head>
<body>
<%
    response.setStatus(HttpServletResponse.SC_OK);
%>
<h1>접수실 error</h1>
<h1>출근 처리되지 않거나 </h1>
<h1>이미 출근or퇴근 처리된 상태입니다. </h1>
<a href="carList.do">출근버튼을 잘못 눌렀을 경우 눌러주세요 </a>
<br>
<a href="carList.jsp">퇴근버튼을 잘못 눌렀을 경우 눌러주세요 </a>
<h1>판정 error</h1>
<h1>판정실에서 이 페이지가 나올 경우 </h1>
<h1>접수실에서 처리를 해야 가능합니다.</h1>
<h1>잠시 뒤 아래의 링크를 눌러주세요.</h1>
<a href="check.do">판정실에서만 눌러주세요.  </a>
</body>
</html>
