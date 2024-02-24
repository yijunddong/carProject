<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>검사실</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>

<div class="container">
    <div style="display: flex; justify-content: flex-end;">
        <form action="check.do">
            <input type="submit" value="새로고침" class="btn btn-primary">
        </form>
    </div>
</div>

<div class="container mt-5">
    <table class="table table-bordered">
        <thead class="thead-dark">
            <tr>
                <th colspan="4">접수완료</th>
            </tr>
            <tr>
                <th>NO.</th>
                <th>차번호</th>
                <th colspan="2">차 종류</th>
            </tr>
        </thead>
        <tbody>
            <c:forEach items="${carList}" var="car">
                <tr>
                    <td>${car.seq}</td>
                    <td>${car.carnum}</td>
                    <td>${car.carname}</td>
                    <td>
                        <form method="post" action="checkOk.do">
                            <input type="hidden" name="seq" value="${car.seq}">
                            <input type="button" class="btn btn-primary" value="speak" onclick="speak('${car.carnum} ${car.carname}')">
                            <input type="button" class="btn btn-warning" value="보완필요" onclick="speakWrong('${car.carnum} ${car.carname}')"  style="display:none">
                            <button type="button" class="btn btn-danger" onclick="showModal('${car.carnum}')">검사완료</button>
                            <div id="confirmationModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">검사 완료</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            speak 버튼을 눌러야 음성이 출력됩니다. 검사완료전 꼭 눌러주세요.
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
                                            <input type="submit" class="btn btn-danger" value="검사완료">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </td>
                </tr>
            </c:forEach> 
              
            <tr>
                <td colspan="5">검사완료</td>
            </tr>
            <tr>
                <td>NO.</td>
                <td>차번호</td>
                <td>차 종류</td>
            </tr>
            <c:forEach items="${carcomList}" var="carcom">
                <tr>
                    <td>${carcom.seq}</td>
                    <td>${carcom.carnum}</td>
                    <td>${carcom.carname}</td>
                    <td>
                        <form method="post" action="checkOk.do">
                            <input type="hidden" name="seq" value="${car.seq}">
                            <input type="button" class="btn btn-primary" value="speak" onclick="speak('${carcom.carnum} ${carcom.carname}')">
                            <input type="button" class="btn btn-warning" value="보완필요" onclick="speakWrong('${carcom.carnum} ${carcom.carname}')" style="display: none">
                        </form>
                    </td>
                </tr>
            </c:forEach>
        </tbody>
    </table>
</div>

<script>
function speak(text) {
    var characters = text.split('');
    var spacedCharacters = characters.map(function(char) {
        return char + ' ';
    });
    var spacedText = spacedCharacters.join('');
    var utterance = new SpeechSynthesisUtterance(spacedText + "차주님 차량의 검사가 완료되었습니다. 판정실로 와주시기 바랍니다.");
    speechSynthesis.speak(utterance);
}

function speakWrong(text) {
    var characters = text.split('');
    var spacedCharacters = characters.map(function(char) {
        return char + ' ';
    });
    var spacedText = spacedCharacters.join('');
    var utterance = new SpeechSynthesisUtterance(spacedText + "차주님 보완이 필요한 관계로. 판정실로 와주시기 바랍니다.");
    speechSynthesis.speak(utterance);
}

function showModal(carName) {
    $('#confirmationModal').modal('show');
    socket.send(carName);
}

function autoRefreshPage() {
    location.reload();
}

setInterval(autoRefreshPage, 30000);


</script>

</body>
</html>
