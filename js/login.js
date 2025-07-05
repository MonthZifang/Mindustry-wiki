// script.js
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");
  const successMessage = document.getElementById("successMessage");
  const sendCodeBtn = document.getElementById("sendCodeBtn");
  const strengthMeter = document.getElementById("strengthMeter");
  const strengthText = document.getElementById("strengthText");

  // 密码强度检测
  document.getElementById("password").addEventListener("input", function () {
    const password = this.value;
    let strength = 0;

    if (password.length >= 6) strength += 25;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;

    strengthMeter.style.width = strength + "%";

    if (strength < 50) {
      strengthMeter.style.background = "#f5222d";
      strengthText.textContent = "密码强度：弱";
      strengthText.style.color = "#f5222d";
    } else if (strength < 75) {
      strengthMeter.style.background = "#faad14";
      strengthText.textContent = "密码强度：中";
      strengthText.style.color = "#faad14";
    } else {
      strengthMeter.style.background = "#52c41a";
      strengthText.textContent = "密码强度：强";
      strengthText.style.color = "#52c41a";
    }

    if (password.length < 6 || password.length > 22) {
      document.getElementById("password").classList.add("input-error");
      document.getElementById("passwordError").style.display = "block";
    } else {
      document.getElementById("password").classList.remove("input-error");
      document.getElementById("passwordError").style.display = "none";
    }

    if (
      document.getElementById("password").value ==
      document.getElementById("confirmPassword").value
    ) {
      document.getElementById("confirmPasswordError").style.display = "none";
      document
        .getElementById("confirmPasswordError")
        .classList.remove("input-error");
    } else {
      document.getElementById("confirmPasswordError").style.display = "block";
      document
        .getElementById("confirmPasswordError")
        .classList.add("input-error");
    }
  });

  document.getElementById("username").addEventListener("input", function () {
    const username = this.value;
    if (username.length >= 2 && username.length <= 22) {
      document.getElementById("username").classList.remove("input-error");
      document.getElementById("usernameError").style.display = "none";
    } else {
      document.getElementById("username").classList.add("input-error");
      document.getElementById("usernameError").style.display = "block";
    }
  });

  document.getElementById("email").addEventListener("input", function () {
    const email = this.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById("email").classList.add("input-error");
      emailError.style.display = "block";
    } else {
      document.getElementById("email").classList.remove("input-error");
      emailError.style.display = "none";
    }
  });

  document
    .getElementById("confirmPassword")
    .addEventListener("input", function () {
      if (this.value == document.getElementById("password").value) {
        document.getElementById("confirmPasswordError").style.display = "none";
        document
          .getElementById("confirmPasswordError")
          .classList.remove("input-error");
      } else {
        document.getElementById("confirmPasswordError").style.display = "block";
        document
          .getElementById("confirmPasswordError")
          .classList.add("input-error");
      }
    });

  document
    .getElementById("verificationCode")
    .addEventListener("input", function () {
      if (this.value.length == 6 || /^\d+$/.test(this.value)) {
        document.getElementById("verificationError").style.display = "none";
        document
          .getElementById("verificationError")
          .classList.add("input-error");
      } else {
        document.getElementById("verificationError").style.display = "block";
        document
          .getElementById("verificationError")
          .classList.remove("input-error");
      }
    });

  // 发送验证码
  sendCodeBtn.addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const emailError = document.getElementById("emailError");

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById("email").classList.add("input-error");
      emailError.style.display = "block";
      return;
    }

    // 禁用按钮并开始倒计时
    sendCodeBtn.disabled = true;
    let countdown = 60;

    const timer = setInterval(() => {
      sendCodeBtn.textContent = `重新发送(${countdown}s)`;
      countdown--;

      if (countdown < 0) {
        clearInterval(timer);
        sendCodeBtn.disabled = false;
        sendCodeBtn.textContent = "发送验证码";
      }
    }, 1000);

    // 模拟发送验证码
    successMessage.textContent = "验证码已发送到您的邮箱，请查收！";
    successMessage.style.display = "block";
    successMessage.style.background = "#f0faff";
    successMessage.style.borderColor = "#91d5ff";
    successMessage.style.color = "#1890ff";

    // 3秒后隐藏消息
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 3000);
  });

  // 表单提交
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const verificationCode = document.getElementById("verificationCode");

    const usernameError = document.getElementById("usernameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById(
      "confirmPasswordError"
    );
    const verificationError = document.getElementById("verificationError");
    const termsError = document.getElementById("termsError");

    // 重置错误状态
    username.classList.remove("input-error");
    email.classList.remove("input-error");
    password.classList.remove("input-error");
    confirmPassword.classList.remove("input-error");
    verificationCode.classList.remove("input-error");

    usernameError.style.display = "none";
    emailError.style.display = "none";
    passwordError.style.display = "none";
    confirmPasswordError.style.display = "none";
    verificationError.style.display = "none";
    successMessage.style.display = "none";
    termsError.style.display = "none";

    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 验证用户名
    if (username.value.length < 2 || username.value.length > 22) {
      username.classList.add("input-error");
      usernameError.style.display = "block";
      isValid = false;
    }

    // 验证邮箱
    if (!emailRegex.test(email.value)) {
      email.classList.add("input-error");
      emailError.style.display = "block";
      isValid = false;
    }

    // 验证密码
    if (password.value.length < 6 || password.value.length > 22) {
      password.classList.add("input-error");
      passwordError.style.display = "block";
      isValid = false;
    }

    // 验证密码一致性
    if (password.value !== confirmPassword.value) {
      confirmPassword.classList.add("input-error");
      confirmPasswordError.style.display = "block";
      isValid = false;
    }

    // 验证验证码
    if (
      verificationCode.value.length !== 6 ||
      !/^\d+$/.test(verificationCode.value)
    ) {
      verificationCode.classList.add("input-error");
      verificationError.style.display = "block";
      isValid = false;
    }

    // 验证服务条款
    if (!document.getElementById("terms").checked) {
      termsError.style.display = "block";
      isValid = false;
    }

    if (isValid) {
      // 显示成功消息
      successMessage.textContent = "注册成功！欢迎加入Mindustry Wiki站！";
      successMessage.style.background = "#f6ffed";
      successMessage.style.borderColor = "#b7eb8f";
      successMessage.style.color = "#52c41a";
      successMessage.style.display = "block";
    }
  });
});
