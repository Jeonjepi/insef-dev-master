//캔버스용 변수
var canvas_1, context_1;
var canvas_1_da = false;

//캔버스 마우스 그리기
function mouseDrawDown(e) {
    if (e.srcElement.id == 'canvas_1') {
        canvas_1_da = true;
        context_1.beginPath();
    }
}

function mouseDrawMove(e) {
    if (canvas_1_da) {
        context_1.lineTo(e.layerX, e.layerY);
        context_1.stroke();
    }
}

function mouseDrawEnd(e) {
    canvas_1_da = false;
    context_1.closePath();
}

//캔버스 터치 그리기
function tounchDrawDown(e) {
    if (e.srcElement.id == 'canvas_1') {
        canvas_1_da = true;
        context_1.beginPath();
    }
}

function tounchDrawMove(e) {
    var body = document.body;
    var main = document.getElementById('mainBox');
    var signBox = document.getElementsByClassName('sign-box')[0];
    if (canvas_1_da) {
        var penX = e.changedTouches[0].clientX - canvas_1.offsetLeft;
        var penY = e.changedTouches[0].clientY - canvas_1.offsetTop;
        context_1.lineTo(penX, penY);
        context_1.stroke();
    }
}

function tounchDrawEnd(e) {
    canvas_1_da = false;
    context_1.closePath();
}

//캔버스 크기조절
function canvasSize() {
    canvas_1.width = canvas_1.parentElement.offsetWidth;
    canvas_1.height = canvas_1.parentElement.offsetHeight;
}
//서명용 캔버스
function canvasDraw() {
    canvas_1 = document.getElementById('canvas_1');

    if (!canvas_1) {
        alert('canvas 객체 확인불가');
        return false;
    }

    context_1 = canvas_1.getContext('2d');

    if (!context_1) {
        alert('context 함수 호출불가');
        return false;
    }
    //context_1.lineWidth = 1;
    //캔버스 그리기
    canvas_1.addEventListener('mousedown', mouseDrawDown, false);
    canvas_1.addEventListener('mousemove', mouseDrawMove, false);
    canvas_1.addEventListener('mouseup', mouseDrawEnd, false);
    canvas_1.addEventListener('mouseout', mouseDrawEnd, false);
    canvas_1.addEventListener('touchstart', tounchDrawDown, false);
    canvas_1.addEventListener('touchmove', tounchDrawMove, false);
    canvas_1.addEventListener('touchend', tounchDrawEnd, false);
    canvas_1.addEventListener('touchcancel', tounchDrawEnd, false);
}

function canvas_to_file(cs_id, su_round) {
    canvas_1.toBlob((blob) => {
        let file = new File([blob], "fileName.png", {
            type: "image/png"
        });
        sign_manager(cs_id, su_round, file);
    }, 'image/png');
}

//현장 책임자 서명 API
function sign_manager(cs_id, su_round, file) {
    var tmpForm = new FormData();
    tmpForm.append('r8_manager_sign_image', file);

    $.ajax({
        url: `http://api.insafed.com:3000/v1/cons/${cs_id}/report/8/sign/manager?round=${su_round}`,
        type: 'POST',
        enctype: 'multipart/form-data',
        mimeType: 'multipart/form-data',
        processData: false,
        contentType: false,
        data: tmpForm
    }).done(function (data) {
        // console.log(data);
        alert('완료되었습니다.');
        $('#mainBox').hide();
        setTimeout("window.close();", 500);
    }).fail(function (data) {
        // console.log(data);
        alert('서명 전송중 오류가 발생했습니다.');
    });
}

function frameReload(cs_id, su_round) {
    // console.log(cs_id, su_round);
    $('#pdfBox > iframe').attr('src', 'http://api.insafed.com:3000/v1/cons/' + cs_id + '/' + su_round + '/report/pdf');
}

$(document).ready(function () {
    var url = location.href;
    // url = 'http://localhost:3000/v1/cons/50/report/1/sign/manager?round=1'; //임시 테스트용 url
    var url_1 = url.split('cons/');
    var url_1_i = url_1[1].indexOf('/');
    var cs_id = url_1[1].substring(0, url_1_i);
    var url_2 = url_1[1].split('report/');
    var url = url_2[0].substring(url_2[0].indexOf('/')+1)
    var su_round = url.substring(0, url.length-1);

    frameReload(cs_id, su_round);

    canvasDraw();
    canvasSize();

    $('#r8_manager_btn').click(function () {
        canvas_to_file(cs_id, su_round);
    });

    $('#test').change(function () {
        // console.log($('#test').val());
    });
});
