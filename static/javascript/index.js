
function getWindowHeight() {
    return $(window).height()
}

function getWindowWidth() {
    return $(window).width()
}

// 控制透明的div
function controlDivHover() {
    if (getWindowWidth() > 540) {
        var img = $('#img-hover')
        var div_height = img.height() - 56
        $('#div-hover').height(div_height)
        $('#div-hover').css('top', '56px')
    } else {
        var img = $('#img-hover')
        var div_height = img.height()
        $('#div-hover').height(div_height)
        $('#div-hover').css('top', '0px')
    }
}

// 控制标题
function controlTitle() {
    var div_title = $('#div-title')
    if (getWindowWidth() > 540) {
        div_title.css('top', '23%')
        div_title.css('font-size', '40px')

    } else {
        div_title.css('top', '30%')
        div_title.css('font-size', '30px')
    }


    var window_width = getWindowWidth()

    var left = (window_width - div_title.width()) / 2
    div_title.css('left', left)

}

// 控制背景的动画
function controlImage() {
    $('#left-button').hover(function () {
        $('#img-hover').attr('style', 'transition: transform 1s;transform: scale(1.2);')
    }, function () {
        $('#img-hover').attr('style', 'transition: transform 1s;transform: scale(1);')

    })

    $('#right-button').hover(function () {
        $('#img-hover').attr('style', 'transition: transform 1s;transform: scale(1.2);')
    }, function () {
        $('#img-hover').attr('style', 'transition: transform 1s;transform: scale(1);')

    })
}

// 控制上面的navbar因为手机和电脑的显示效果不同
function controlNavbar() {
    if (getWindowWidth() <= 540) {
        $('#my-navbar').removeClass('fixed-top')
        $('#my-navbar').removeClass('navbar-dark')
        $('#my-navbar').addClass('navbar-light')
        $('#my-navbar').addClass('bg-light')
    } else {
        $('#my-navbar').addClass('fixed-top')
        $('#my-navbar').addClass('navbar-dark')
        $('#my-navbar').removeClass('navbar-light')
        $('#my-navbar').removeClass('bg-light')
    }
}

// login 按钮 modal
function loginModal() {
    $('#login-button').click(function () {
        $('#login-modal').modal('show')
    })
}

// 注销
function logoutButton() {
    $('#logout-button').click(function () {
        $.ajax({
            type: 'post',
            url: 'http://74.120.174.165:5000/logout/',
            async: true,
            success: function (data) {
                if (data['success'] == 1) {
                    window.location.reload()
                }else {
                    alert('注销失败')
                }
            },
        })
    })
}


// register 按钮 modal
function registerModal() {
    $('#register-button').click(function () {
        $('#register-modal').modal('show')
    })

}

// loginMedal 的表单验证
function loginCheck() {
    $('#loginCheck').click(function (event) {
        var LoginForm = document.getElementById('LoginForm')
        if (LoginForm.checkValidity() === false) {
            event.preventDefault();            // 让提交事件失效
            event.stopPropagation();
            $(LoginForm).addClass('was-validated')
        } else {
            var EmailLogin = $('#EmailLogin').val()
            var PasswordLogin = $('#PasswordLogin').val()
            login(EmailLogin, PasswordLogin)
        }

    })
}

// 注册表单验证
function registerCheck() {
    checkEmail()
    $('#registerCheck').click(function (event) {
        var RegisterForm = document.getElementById('registerForm')
        if (RegisterForm.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            $(RegisterForm).addClass('was-validated')
        } else {
            register()
        }
    })
}

// 登录
function login(email, password) {
    // 下面的两个监听是用于，之前如果提示密码错误，可以即时清除提示.
    $('#PasswordLogin').bind('input', function () {
        $('#passwordError').text('')
    })
    $('#EmailLogin').bind('input', function () {
        $('#passwordError').text('')
    })
    $.ajax({
        type: 'post',
        url: 'http://74.120.174.165:5000/login/',
        async: true,
        success: function (data) {
            if (data['success'] == 1) {
                $('#login-modal').modal('hide')
                username = data['username']
                alert('欢迎你'+username)
                window.location.reload()
            } else {
                $('#passwordError').text('邮箱地址或密码错误')
            }
        },
        data: {
            'email': email,
            'password': password
        }
    })
}


// 注册账号
function register() {
    var email = $('#EmailRegister').val()
    var exam_id = $('#examNumber').val()
    var name = $('#username').val()
    var password = $('#PasswordRegister').val()

    $.ajax({
        type: 'post',
        url: 'http://74.120.174.165:5000/register/',
        async: true,
        success: function (data) {
            if (data['success'] == 1) {
                $('#register-modal').modal('hide')
                alert('注册成功')
            } else {
                alert('注册失败')
            }
        },
        data: {
            'email': email,
            'password': password,
            'exam_id': exam_id,
            'name': name
        }
    })
}


// 检查邮箱是否存在
function checkEmail() {
    $('#EmailRegister').bind('change', function () {
        $.ajax({
            type: 'post',
            url: 'http://74.120.174.165:5000/checkemail/',
            async: true,
            data: {
                email: $('#EmailRegister').val()
            },
            success: function (data) {
                if (data['has'] == 1) {
                    $('#emailHas').text('邮箱已注册,请直接登录或更换邮箱')
                    $('#registerCheck').addClass('disabled')
                } else {
                    $('#emailHas').text('')
                    $('#registerCheck').removeClass('disabled')
                }
            }

        });
    });
}




// 检查session判断是否登录了，然后来渲染页面
// function checkSession() {
//     $.ajax({
//         'url':'http://74.120.174.165:5000/checkSession/',
//         type:'post',
//         async:true,
//         success:function (data) {
//             if (data['success']==1){
//                 changeLoginOrLogout(data)
//             }else {
//
//             }
//         }
//     })
// }


// 监听开始考试
function startExam() {
    $('#left-button').click(function () {
        $.ajax({
            url:'http://74.120.174.165:5000/checkSession/',
            type:'post',
            async: true,
            success:function (data) {
                if (data['success']==1) {
                    window.location.href = "http://74.120.174.165:5000/exam/"
                }else {
                    $('#login-modal').modal('show')
                }
            }
        })
    })
}




// 切换登录前和登录后 navbar上的按钮
// function changeLoginOrLogout(data) {
//         $('#login-button').remove()
//         $('#register-button').remove()
//         $('#unLogin').prepend('                    ')
//         $('#personalcenter').text(data['username'])
//         $('#unLogin').append('<button type="button" class="btn btn-secondary form-control my-2 my-sm-0" id="logout-button">注销</button>')
//         $('#login-button').text('注销')
//         $('#logout-button').click(function () {
//             logout()
//         })
// }

// 加载后执行 所有想要执行的内容 都要写成一个函数 放到这里面来执行
$(document).ready(function () {
    controlDivHover()
    controlTitle()
    controlImage()
    controlNavbar()
    loginModal()
    registerModal()
    loginCheck()
    registerCheck()
    logoutButton()
    startExam()
})


// 改变窗口大小监听
$(window).resize(function () {
    controlDivHover()
    controlTitle()
    controlDivHover()
    controlNavbar()
})
