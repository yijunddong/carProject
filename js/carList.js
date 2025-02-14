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

// 모달 관련 함수들
function showRegisterModal() {
    $('#registerModal').modal('show');
}

function showEditModal(id, plateNo, model) {
    $('#editId').val(id);
    $('#editPlateNo').val(plateNo);
    $('#editModel').val(model);
    $('#editModal').modal('show');
}

function showDeleteModal(id) {
    $('#deleteModal').modal('show');
    $('#deleteModal input[name="seq"]').val(id);
}

function handleRegister(event) {
    event.preventDefault();
    var plateNo = $('input[name="plateNo"]').val();
    var model = $('input[name="model"]').val();
    
    // 여기에서 데이터를 처리하는 로직을 추가할 수 있습니다
    console.log('차량 등록:', plateNo, model);
    
    // 모달 닫기 및 폼 초기화
    $('#registerModal').modal('hide');
    $('#carListForm')[0].reset();
}

function confirmDelete() {
    var id = $('#deleteModal input[name="seq"]').val();
    console.log('차량 삭제:', id);
    
    // 여기에서 삭제 처리 로직을 추가할 수 있습니다
    
    $('#deleteModal').modal('hide');
}

// 페이지 로드 시 실행
$(document).ready(function() {
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000);
}); 