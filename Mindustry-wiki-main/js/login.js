document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const captchaInput = document.getElementById("captcha");

    // 添加验证码发送按钮
    const captchaDiv = captchaInput.parentElement;
    const sendBtn = document.createElement("button");
    sendBtn.type = "button";
    sendBtn.textContent = "发送验证码";
    sendBtn.style.marginLeft = "10px";
    captchaDiv.appendChild(sendBtn);

    // 表单验证函数
    function validateForm() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (username.length < 3) {
            alert("用户名至少为3个字符");
            return false;
        }

        if (password.length < 8 || !/[a-z]/i.test(password)) {
            alert("密码必须不少于8位，并包含至少一个字母");
            return false;
        }

        return true;
    }

    // 绑定表单提交事件
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (e) {
            if (!validateForm()) {
                e.preventDefault();
            }
        });
    }

    // 验证码冷却逻辑
    let cooldown = 0;
    let timer = null;

    sendBtn.addEventListener("click", function () {
        if (cooldown > 0) return;

        alert("验证码已发送");

        cooldown = 60;
        sendBtn.disabled = true;
        sendBtn.textContent = `${cooldown}秒后可重新发送`;

        timer = setInterval(() => {
            cooldown--;
            if (cooldown <= 0) {
                clearInterval(timer);
                sendBtn.disabled = false;
                sendBtn.textContent = "发送验证码";
            } else {
                sendBtn.textContent = `${cooldown}秒后可重新发送`;
            }
        }, 1000);
    });
});
