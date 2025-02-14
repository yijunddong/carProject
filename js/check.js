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

// 음성 출력 함수
function speak(text) {
    var utterance = new SpeechSynthesisUtterance(text + " 차주님 검사가 완료되었습니다. 판정실로 와주시기 바랍니다.");
    utterance.lang = 'ko-KR';
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
}

// 모달 관련 함수들
function showModal(id, model, plateNo) {
    $('#vehicleId').val(id);
    $('#vehiclePlateNo').text(plateNo);
    $('#vehicleModel').text(model);
    $('#confirmationModal').modal('show');
}

// 자동 새로고침
function autoRefresh() {
    setTimeout(function() {
        location.reload(true);
    }, 27 * 60 * 1000);
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

window.onload = function() {
    autoRefresh();
}; 