// 웹소켓 연결
var ws = new WebSocket(`ws://${window.location.host}/waiting`);

ws.onopen = function() {
    console.log("WebSocket 연결됨");
};

ws.onmessage = function(event) {
    var message = event.data;
    if (message.startsWith("검사 완료")) {
        location.reload();
    }
};

// 음성 호출 함수
function speak(plateNo) {
    var model = $('#vehicleModel').text();  // 차종 정보 가져오기
    var utterance = new SpeechSynthesisUtterance(plateNo + " " + model + " 차주님 판정실로 와주시기 바랍니다.");
    utterance.lang = 'ko-KR';
    utterance.rate = 0.9;  // 말하기 속도 (0.1 ~ 10)
    utterance.pitch = 1.0; // 음성 피치 (0 ~ 2)
    speechSynthesis.speak(utterance);
}

// 모달 표시 및 완료 처리 함수
function showModal(id, model, plateNo) {
    $('#vehicleId').val(id);
    $('#vehiclePlateNo').text(plateNo);
    $('#vehicleModel').text(model);
    $('#confirmationModal').modal('show');
}

// 검사 완료 처리 함수
function completeCheck() {
    var plateNo = $('#vehiclePlateNo').text();
    speak(plateNo);  // 음성 호출
    $('#confirmationModal').modal('hide');
}

// 시간 표시 함수
function updateCurrentTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString().padStart(2, '0');
    var day = now.getDate().toString().padStart(2, '0');
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    
    var currentTime = year + '년 ' + month + '월 ' + day + '일 ' + hours + ':' + minutes;
    $('#current-time').text(currentTime);
}

$(document).ready(function() {
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000);
}); 