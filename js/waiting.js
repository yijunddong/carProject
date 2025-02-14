$(document).ready(function() {
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

    updateCurrentTime();
    setInterval(updateCurrentTime, 60000);
});

function showModal() {
    $('#myModal').modal('show');
}

function hideModal() {
    $('#messageContainer').empty();
    $('#myModal').modal('hide');
}

$(document).ready(function() {
    $('#myModal').on('hidden.bs.modal', function() {
        $.ajax({
            url: "getAllData.do",
            type: "get",
            dataType: "json",
            success: function(data) {
                var table = '<table border="1"><tr><th colspan="3">대기중 </th></tr><tr><td class="subTitleWait">NO.</td><td class="subTitleWait">차량번호</td><td class="subTitleWait">차량종류</td></tr>';
                for (var i = 0; i < data.length; i++) {
                    var newRowNumber = i + 1;
                    table += '<tr><td class="tableContentWait">' + newRowNumber + '</td><td class="tableContentWait">' + data[i]["차량번호"] + '</td><td class="tableContentWait">' + data[i]["차량종류 "] + '</td></tr>';
                }
                table += '</table>';
                $(".waitTable").html(table);
            },
            error: function() {
                location.reload();
            }
        });

        $.ajax({
            url: "getAllDataCom.do",
            type: "get",
            dataType: "json",
            success: function(data) {
                var table = '<table border="1"><tr><th colspan="3">검사 완료 </th></tr><tr><td class="subTitle">NO.</td><td class="subTitle">차량번호</td><td class="subTitle">차량종류</td></tr>';
                for (var i = 0; i < data.length; i++) {
                    table += '<tr><td class="tableContent">' + data[i]["no"] + '</td><td class="tableContent">' + data[i]["차량번호"] + '</td><td class="tableContent">' + data[i]["차량종류 "] + '</td></tr>';
                }
                table += '</table>';
                $(".comTable").html(table);
            },
            error: function() {
                location.reload();
            }
        });
    });
});

var ws = new WebSocket(`ws://${window.location.host}/waiting`);

ws.onopen = function() {
    console.log("WebSocket 연결됨");
    setInterval(function() {
        ws.send("keepalive");
    }, 100000);
};

ws.onmessage = function(event) {
    if (event.data.startsWith("검사 완료 ")) {
        var message = event.data.replace("검사 완료 ", "");
        showCompletionModal(message);
    }

    if (event.data.startsWith("접수 완료 ")) {
        var message = event.data.replace("접수 완료 ", "");
        var data = message.split(" ");
        var carnum = data[0];
        var carname = data[1];
        var tbody = document.querySelector('.waitTable tbody');
        var lastRow = tbody.lastElementChild;
        var newRow = document.createElement('tr');
        newRow.innerHTML = '<td class="tableContentWait">' + (document.querySelectorAll('.waitTable tbody tr').length - 1) + '</td><td class="tableContentWait">' + carnum + '</td><td class="tableContentWait">' + carname + '</td>';
        tbody.insertBefore(newRow, lastRow.nextSibling);
    }
};

function showCompletionModal(message) {
    var messageContainer = document.getElementById("messageContainer");
    messageContainer.textContent = message + " 차주님";
    $('#myModal').modal('show');
    
    setTimeout(function() {
        $('#myModal').modal('hide');
        location.reload();
    }, 10000);
}

$(document).ready(function() {
    var images = [
        "images/main/main1.jpg",
        "images/main/main2.jpg",
        "images/main/main3.jpg",
        "images/main/main4.jpg"
    ];

    var currentIndex = 0;

    function updateImage() {
        $('.mainImg').attr('src', images[currentIndex]);
        currentIndex = (currentIndex + 1) % images.length;
    }

    setInterval(updateImage, 15000);
});

function setupAutoRefresh() {
    setTimeout(function() {
        location.reload(true);
    }, 27 * 60 * 1000);
}

$(document).ready(function() {
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000);
    setupImageSlideshow();
    setupAutoRefresh();
}); 