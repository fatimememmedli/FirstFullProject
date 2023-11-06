let usernameInp = document.querySelector(".login-username");
let passInp = document.querySelector(".login-password");
let userURL = "http://localhost:3000/users";
let loginBtn = document.querySelector(".login-btn");
// document.location.href= "loginhtml"
let wishlistCount = document.querySelector(".wishlist-count");
let localFavMealArr = JSON.parse(localStorage.getItem("favMeal"));
let localFavArr = JSON.parse(localStorage.getItem("fav"));
if (localFavArr) {
  wishlistCount.innerHTML = localFavArr.length + localFavMealArr.length;
}
let localBasketArr = JSON.parse(localStorage.getItem("basket"));
let basketCount = document.querySelector(".basket-count");
console.log(basketCount);
if (localBasketArr) {
  basketCount.innerHTML = localBasketArr.length;
}
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  axios(userURL).then((res) => {
    let data = res.data;
    console.log(data);
    // console.log(usernameInp.value);
    data.forEach((elem) => {
      //   console.log(elem.email);
      if (
        elem.username == usernameInp.value &&
        elem.password == passInp.value
      ) {
        let obj = {};
        obj.username = usernameInp.value;
        obj.password = passInp.value;
        obj.balance = elem.balance;
        obj.email = elem.email;
        obj.id = elem.id;
        console.log(obj);
        document.location.href = "basket.html";
        localStorage.setItem("login", JSON.stringify(obj));
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Username or password is wrong!",
          footer: '<a href="register.html">Register</a>',
        });
      }
    });
  });
});
let toBeLogin = document.querySelector(".to-be-login");
let doneLogin = document.querySelector(".done-login");
let dontRegister = document.querySelector(".dont-register");
let logOutIcon = document.querySelector(".logOutIcon");
let loginProfileChange = document.querySelector(".login-profile");
let localLoginArr = JSON.parse(localStorage.getItem("login"));
console.log(localLoginArr);
if (localLoginArr) {
  console.log("hello");
  toBeLogin.classList.replace("d-block", "d-none");
  doneLogin.classList.replace("d-none", "d-block");
  dontRegister.classList.replace("d-block", "d-none");
  logOutIcon.classList.remove("d-none", "d-block");
  doneLogin.textContent = localLoginArr.username;
  loginProfileChange.removeAttribute("href");
  loginProfileChange.setAttribute("href", "profile.html");
}
logOutIcon.addEventListener("click", function () {
  localStorage.removeItem("login");
});
