// 提交试卷提示框
function submit() {
    $('#submit').click(function () {
        $('#submit_modal').modal('show')
    })
}


// 放弃考试提示框
function giveup() {
    $('#give_up').click(function () {
        $('#giveup_modal').modal('show')
    })
}

function giveupbutton() {
    $('#giveup_button').click(function () {
        window.location.href = "http://74.120.174.165:5000"
    })
}



// 获取选择的答案
function submit_paper() {
    answers = {}
    $("#submit_paper").click(function () {
        $('input[type=radio]:checked').each(function () {
            answers[$(this).attr('name')] = $(this).val()
        })
        $('input[type=checkbox]:checked').each(function () {
            var name = $(this).attr('name')
            if (answers[name]){
                answers[name] = answers[name]+$(this).val()
            }else {
                answers[name] = $(this).val()
            }
        })
        $.ajax({
            url:'http://74.120.174.165:5000/submit_paper/',
            type:'post',
            async: false,
            data:{
              answers:JSON.stringify(answers)
            },
            success:function (data) {
                console.log(data)
                window.location.href = "http://74.120.174.165:5000/result/"
            }
        })
    })
}

$(document).ready(function () {
    submit()
    giveup()
    giveupbutton()
    submit_paper()
})