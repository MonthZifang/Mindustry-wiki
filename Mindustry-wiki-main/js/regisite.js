document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector("form");
  var captchaButton = document.querySelector(
    'input[type="button"][value="获取验证码"]'
  );
  var submitButton = document.querySelector(
    'input[type="submit"][value="注册"]'
  );

  // 表单提交事件
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var captcha = document.getElementById("captcha").value;
    var agreement = document.getElementById("xieyi").checked;

    if (!username || !password || !email || !captcha || !agreement) {
      error_reg.showModal()
      document.getElementById("error_reg_h2").textContent = "错误";
      document.getElementById("error_reg_info").textContent = "请填写所有字段并同意用户协议。";

      //error!

      //alert("请填写所有字段并同意用户协议。");
      return;
    }

    // 这里可以添加发送验证码的逻辑
    // ...

    // 如果所有验证都通过，可以提交表单
    // form.submit(); // 如果需要的话
  });

  // 获取验证码按钮点击事件
  captchaButton.addEventListener("click", function () {
    var email = document.getElementById("email").value;
    if (email) {
      // 发送验证码到邮箱的逻辑
      error_reg.showModal()
      document.getElementById("error_reg_h2").textContent = "提示";
      document.getElementById("error_reg_info").textContent = "邮件已发送，请注意查收。";
    } else {
      error_reg.showModal()
      document.getElementById("error_reg_h2").textContent = "提示";
      document.getElementById("error_reg_info").textContent = "请填写邮箱。";
    }
  });
});
