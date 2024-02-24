<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title> 접수실 </title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
<style>


.container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
}

.button-container {
    margin-bottom: 20px;
}

table {
    width: 100%;
    margin-bottom: 20px;
}

.modal-content {
    border-radius: 10px;
}

.modal-header {
    background-color: #007bff;
    color: white;
    border-radius: 10px 10px 0 0;
}

.modal-body, .modal-footer {
    border-radius: 0 0 10px 10px;
}

.custom-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
}

</style>
</head>
<body>
<div class="container">
    <div class="button-container">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#checkInModal">
            출근
        </button>

        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#confirmationModal">
            퇴근
        </button>
        <form action="carList.do" style="display: inline-block;">
        <input type="submit" class="btn btn-warning" value="새로고침" >
         </form>
    </div>

    <form id="carListForm" action="carListOk.do" method="post">
        <table class="table table-bordered">
            <tr>
                <td>차번호</td>
                <td><input type="text" name="carnum"></td>

                <td>차종류</td>
                <td><input type="text" name="carname"></td>
                <td colspan="2"><input type="submit" class="btn btn-primary" value="새글 등록" /></td>
            </tr>
        </table>
    </form>

    <table class="table table-bordered">
        <thead class="thead-dark">
            <tr>
                <th colspan="5">접수완료</th>
            </tr>
            <tr>
                <th>NO.</th>
                <th >차번호</th>
                <th colspan="3">차 종류</th>
                
            </tr>
        </thead>
        <tbody>
       
   <c:forEach items="${carList}" var="car">
  <form method="post" action="update.do">
    <tr>
        <td>${car.seq}</td>
        <td><input type="text" name="carnum" value="${car.carnum}"></td>
        <td><input type="text" name="carname" value="${car.carname}"></td>
        <td>
            <input type="hidden" name="seq" value="${car.seq}">
            <input type="submit" value="수정" class="btn btn-primary">
        </td>
        <td>
            <button type="button" class="btn btn-danger" onclick="showDeleteModal(${car.seq})">삭제</button>
        </td>
    </tr>
</form>

</c:forEach>
 





            
        </tbody>
    </table>

    <table class="table table-bordered">
        <thead class="thead-dark">
            <tr>
                <th colspan="5">검사완료</th>
            </tr>
            <tr>
                <th>NO.</th>
                <th>차번호</th>
                <th colspan="3">차 종류</th>
            </tr>
        </thead>
        <tbody>
            <c:forEach items="${carcomList}" var="carcom">
                <tr>
                    <td>${carcom.seq}</td>
                    <td>${carcom.carnum}</td>
                    <td>${carcom.carname}</td>
                </tr>
            </c:forEach>
        </tbody>
    </table>
</div>

<div class="modal fade" id="checkInModal" tabindex="-1" role="dialog" aria-labelledby="checkInModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="checkInModalLabel">출근하시겠습니까?</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form action="createTable.do" method="get">
                    <input type="submit" value="출근" class="btn btn-primary">
                </form>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="confirmationModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">퇴근하시겠습니까?</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form action="dropTable.do" method="get">
                    <input type="submit" value="퇴근" class="btn btn-danger">
                </form>
            </div>
        </div>
    </div>
</div>
<!-- 삭제 모달 -->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteModalLabel">삭제 확인</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
             <c:forEach items="${carList}" var="car">
            <input type="hidden" name="seq" value="${car.seq }">
            </c:forEach>
                정말 삭제하시겠습니까?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
                <button type="button" class="btn btn-danger" onclick="confirmDelete()">확인</button>
            </div>
        </div>
    </div>
</div>
<script>
function showDeleteModal(seq) {
    // 삭제 확인 모달을 보여줍니다.
    $('#deleteModal').modal('show');
    // 모달 내부의 hidden input에 삭제할 차량의 seq를 설정합니다.
    $('#deleteModal input[name="seq"]').val(seq);
}

// 확인 버튼을 클릭하여 삭제를 실행합니다.
function confirmDelete() {
    // 삭제할 차량의 seq를 가져옵니다.
    var seq = $('#deleteModal input[name="seq"]').val();
    // 삭제 액션을 수행하는 URL로 이동합니다.
    window.location.href = 'delete.do?seq=' + seq;
}
</script>
</body>
</html>
