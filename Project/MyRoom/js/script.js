// 회원가입 처리
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("signup-id").value;
    const pw = document.getElementById("signup-password").value;
    const name = document.getElementById("signup-name").value;
    const msg = document.getElementById("signup-message");

    msg.textContent = "회원가입 처리 중입니다...";
    msg.style.color = "black";

    if (!id || !pw || !name) {
      msg.textContent = "모든 필드를 입력해주세요.";
      msg.style.color = "red";
      return;
    }

    if (localStorage.getItem(`user_${id}`)) {
      msg.textContent = "이미 존재하는 아이디입니다.";
      msg.style.color = "red";
      return;
    }

    const user = { id, pw, name };
    localStorage.setItem(`user_${id}`, JSON.stringify(user));

    msg.textContent = "회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.";
    msg.style.color = "green";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  });
}

// 로그인 처리
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("login-id").value;
    const pw = document.getElementById("login-password").value;
    const msg = document.getElementById("login-message");

    msg.textContent = "로그인 시도 중...";
    msg.style.color = "black";

    const saved = localStorage.getItem(`user_${id}`);

    if (!saved) {
      msg.textContent = "존재하지 않는 아이디입니다.";
      msg.style.color = "red";
      return;
    }

    const user = JSON.parse(saved);
    if (user.pw === pw) {
      msg.textContent = "로그인 성공! 이동 중...";
      msg.style.color = "green";
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setTimeout(() => {
        window.location.href = "home.html";
      }, 800);
    } else {
      msg.textContent = "비밀번호가 틀렸습니다.";
      msg.style.color = "red";
    }
  });
}
