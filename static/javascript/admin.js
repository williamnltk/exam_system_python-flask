function testbutton() {
    $('#test').click(function () {
        $.ajax({
            url: 'http://74.120.174.165:5000/analyze/',
            type: 'post',
            success: function (data) {
                for (var i in data) {
                    if (i < 24) {
                        $('#one').append(data[i]['question'])
                        $('#one').append('<br>')
                        if (data[i]['items'] != null) {
                            var radioA = $('<input type="radio" name="' + i + '" value="A">')
                            $('#one').append(radioA)
                            $('#one').append(data[i]['items'][0])
                            $('#one').append('<br>')


                            var radioB = $('<input type="radio" name="' + i + '" value="B">')
                            $('#one').append(radioB)
                            $('#one').append(data[i]['items'][1])
                            $('#one').append('<br>')


                            var radioC = $('<input type="radio" name="' + i + '" value="C">')
                            $('#one').append(radioC)
                            $('#one').append(data[i]['items'][2])
                            $('#one').append('<br>')


                            var radioD = $('<input type="radio" name="' + i + '" value="D">')
                            $('#one').append(radioD)
                            $('#one').append(data[i]['items'][3])
                            $('#one').append('<br>')
                        }
                        $('#one').append('<br>')
                    } else if (i >= 24 && i <= 35) {
                        $('#two').append(data[i]['question'])
                        $('#two').append('<br>')
                        if (data[i]['items'] != null) {

                            var checkA = $('<input type="checkbox" name="' + i + '" value="A">')
                            $('#two').append(checkA)
                            $('#two').append(data[i]['items'][0])
                            $('#two').append('<br>')

                            var checkB = $('<input type="checkbox" name="' + i + '" value="B">')
                            $('#two').append(checkB)
                            $('#two').append(data[i]['items'][1])
                            $('#two').append('<br>')

                            var checkC = $('<input type="checkbox" name="' + i + '" value="C">')
                            $('#two').append(checkC)
                            $('#two').append(data[i]['items'][2])
                            $('#two').append('<br>')

                            var checkD = $('<input type="checkbox" name="' + i + '" value="D">')
                            $('#two').append(checkD)
                            $('#two').append(data[i]['items'][3])
                            $('#two').append('<br>')
                        }
                        $('#two').append('<br>')
                    }
                    else if (i > 35 && i <= 45) {
                        $('#three').append(data[i]['question'])
                        $('#three').append('<br>')
                        if (data[i]['items'] != null) {
                            $('#three').append(data[i]['items'][0])
                            $('#three').append('<br>')
                            $('#three').append(data[i]['items'][1])
                            $('#three').append('<br>')
                            $('#three').append(data[i]['items'][2])
                            $('#three').append('<br>')
                            $('#three').append(data[i]['items'][3])
                            $('#three').append('<br>')
                        }
                        else {
                            var t = $('<input type="radio" name="' + i + '" value="1">')
                            $('#three').append(t)
                            $('#three').append('正确')

                            var f = $('<input type="radio" name="' + i + '" value="0">')
                            $('#three').append(f)
                            $('#three').append('错误')
                        }
                        $('#three').append('<br>')
                    }
                }
            }
        })
    })
}

// 提交试卷按钮
function submit_button() {
    var answer = {}
    $('#submit').click(function () {

        $('input[type=radio]:checked').each(function () {
            answer[$(this).attr('name')] = $(this).val()
        })

        $('input[type=checkbox]:checked').each(function () {
            getCheckbox(this, answer)
        })
        //console.log(answer)
    })
}


// 获取多选框选中的值
function getCheckbox(checkbox, answer){
    var temp = ''
    $(checkbox).each(function () {
        temp = temp + $(this).val()
    })
    answer[$(this)]
}

$(document).ready(function () {
    testbutton()
    submit_button()
})