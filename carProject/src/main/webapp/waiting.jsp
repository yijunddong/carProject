<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"  %>    
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>대기실</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>

<style>
    /* Container 스타일 */
    .container {
        margin-top: 20px;
    }

    /* 각 이미지의 스타일 */
    img {
        width: 100%;
        height: auto;
    }

    /* 각 테이블의 스타일 */
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    }

    th {
        background-color: #f2f2f2;
    }

    /* 모달 스타일 */
    .modal {
        display: flex;
        align-items: center;
        justify-content: center;
    }
  .modal-dialog {
       
    
        max-height: 500px; /* 모달 창의 최대 높이를 500px로 지정 */
    }

    .modal-content {
        background-color: #f8f9fa;
        height: 100%; /* 모달 창 내용이 길어도 내용이 잘리지 않도록 내용에 따라 높이가 유동적으로 조정되도록 설정 */
    }

    .modal-body {
        padding: 20px;
        overflow-y: auto; /* 모달 창의 내용이 내부에 넘칠 경우 스크롤 표시 */
    }

    .modal-header {
        background-color: #007bff;
        color: white;
    }

  

    .modal-footer {
        background-color: #f2f2f2;
    }
     #upper, #down {
            
            position: relative;
            z-index: 1;
        }

        #table1, #table2 {
            width: 300px;
            height: 200px;
        }

        .car-row {
            display: table-row;
        }

        /* Add your additional styling here */

        /* Modal styling */
        .modal-header {
            background-color: #007bff;
            color: white;
        }

        .modal-body, .modal-footer {
            background-color: #f8f9fa;
        }
         body {
           
            min-height: 100vh; /* 뷰포트의 최소 높이 만큼 body를 채움 */
            justify-content: center; /* 수평 가운데 정렬 */
            align-items: center; /* 수직 가운데 정렬 */
           
    margin-left: 0; /* 좌측 마진 제거 */
    margin-right: 0; /* 우측 마진 제거 */

            
        }  footer {
        text-align: right; /* 텍스트를 오른쪽 정렬 */
    }

    footer div {
        overflow: hidden;
        white-space: nowrap; /* 텍스트가 한 줄로 나오도록 설정 */
    }

    footer div h1 {
        display: inline-block;
        animation: moveRightToLeft 56s linear infinite; /* 50초 동안 오른쪽에서 왼쪽으로 이동하도록 애니메이션 설정 */
    }

    @keyframes moveRightToLeft {
        from {
            transform: translateX(150%); /* 오른쪽 끝에서 시작 */
        }
        to {
            transform: translateX(-100%); /* 왼쪽 끝까지 이동 */
        }
    }
    #upper {
   
    margin-bottom: 20px;
}
</style>
<script>
function showModal() {
    $('#myModal').modal('show'); // 모달창을 띄우는 코드, jQuery 사용

  /*   var modalContent = document.querySelector('.modal-body').textContent;
    speak(modalContent); */
}

/* function speak(text) {
    var utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
} */

// 페이지 로딩 후 모달창 띄우기
$(document).ready(function () {
    showModal();

    // 4초 후에 모달창 자동으로 닫기
    setTimeout(hideModal, 7000);
});

function hideModal() {
    $('#myModal').modal('hide'); // 모달창을 닫는 코드, jQuery 사용
}

function autoRefreshPage() {
    location.reload();
}

// 60초(60,000 밀리초)마다 autoRefreshPage 함수를 호출
setInterval(autoRefreshPage, 60000);

$(document).ready(function () {
    var images = ["resources/1.jpg", "resources/2.jpg", "resources/3.jpg", "resources/4.jpg", "resources/5.jpg", "resources/6.jpg", "resources/7.jpg", "resources/8.jpg", "resources/9.jpg", "resources/10.jpg"]; // 이미지 경로들
    var currentImageIndex = 0; // 현재 이미지 인덱스

    // 이미지 변경 함수
    function changeImage() {
        $('#time1').attr('src', images[currentImageIndex]); // 현재 이미지 인덱스에 해당하는 이미지 경로 설정
        currentImageIndex = (currentImageIndex + 1) % images.length; // 다음 이미지 인덱스로 이동, 배열 범위를 벗어나면 다시 처음으로 이동
    }

    // 페이지 로딩 후 이미지 변경 시작
    setInterval(changeImage, 3000); // 3초마다 이미지 변경
});


/* $(document).ready(function () {
    var images = ["resources/5.jpg", "resources/6.jpg", "resources/7.jpg", "resources/8.jpg", "resources/9.jpg", "resources/10.jpg"]; // 이미지 경로들
    var currentImageIndex = 0; // 현재 이미지 인덱스

    // 이미지 변경 함수
    function changeImage() {
        $('#time2').attr('src', images[currentImageIndex]); // 현재 이미지 인덱스에 해당하는 이미지 경로 설정
        currentImageIndex = (currentImageIndex + 1) % images.length; // 다음 이미지 인덱스로 이동, 배열 범위를 벗어나면 다시 처음으로 이동
    }

    // 페이지 로딩 후 이미지 변경 시작
    setInterval(changeImage, 3000); // 3초마다 이미지 변경
}); */

</script>
</head>
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">

<body>

	<div class="container1" id="upper">
		<div class="row">
		<div class="col-sm-8 ">
		
				<img src="resources/1.jpg" id="time1"
					style="width: 1000px; height: 600px;">
					 <footer>
    <div>
<h1>일급 신분당 검사정비사업소 입니다. 자동차검사, 자동차정비, 자동차판금, 자동차도색을 전문으로 하며
자동차에 문제발생시 당사 정직원이 직접 방문하여 픽업 수리 후 인도하여
차량의 모든 문제점에 대한 상담 후 바른정비를 통한 안전성을 강조하는 수리업체입니다.

친절,신속,정확 3대 서비스로 고객을 섬기겠습니다.

자동차검사 접수마감
평일 5시30분 / 토요일 12시~12시30분
(오시는 순서대로 하기 때문에 방문 차량이 많은 날엔
더 일찍 마감되는 경우도 있습니다.)</h1>
    </div>
    </footer>
			</div>
		
			 <div class="col-sm-2">
				<table style="width: 350px; height: 300px;" id="table1">

					<tr>
						<td colspan="3">접수완료</td>
					</tr>
					<tr>
						<td>NO.</td>
						<td>차번호</td>
						<td>차 종류</td>
					</tr>
	<!--  검색 종료 -->
	
	
		
		<c:forEach items="${carList}" var="car" >		
			<tr>
							<td>${car.seq}</td>
				<td><a href="getCar.do?seq=${car.seq}">${car.carnum}</a></td>
				<td>${car.carname}</td>
				
				
			</tr>
		</c:forEach>
		  <tr>
                    <td colspan="3">검사완료</td>
                </tr>
                <tr>
                    <td>NO.</td>
                    <td>차번호</td>
                    <td>차 종류</td>
                </tr>
                <c:forEach items="${carcomList}" var="carcom" varStatus="loop">
                    <tr class="car-row">
                        <td>${carcom.seq}</td>
                        <td><a href="getCar.do?seq=${carcom.seq}">${carcom.carnum}</a></td>
                        <td>${carcom.carname}</td>
                    </tr>
                </c:forEach>
		
	</table>
</div>
		</div>
	</div>
	

	<div class="modal" id="myModal" tabindex="-1" role="dialog">
	<div class="modal-dialog modal-lg" role="document" style=" margin-top: 250px; ">
    <div class="modal-content">
       
                <div class="modal-header">
                    <h5 class="modal-title">검사 완료 </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- 모달창의 내용 -->
      <c:if test="${not empty carcomList}">
    <h3>${carcomList[0].carnum} ${carcomList[0].carname} 차주님  </h3>
    <h3> 검사가 완료 되었습니다.    판정실로 와주시기 바랍니다.</h3>
</c:if>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
                </div>
            </div>
        </div>
    </div>
   
    	
</body>

</html>