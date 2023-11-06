let localLoginArr = JSON.parse(localStorage.getItem("login"));
let userDetailsName = document.querySelector(".userDetailsName");
let userDetailsEmail = document.querySelector(".userDetailsEmail");
let userDetailsPass = document.querySelector(".userDetailsPass");
let userDetailsBalance = document.querySelector(".userDetailsBalance");
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
console.log(localLoginArr.email);
userDetailsName.textContent = localLoginArr.username;
userDetailsEmail.textContent = localLoginArr.email;
userDetailsPass.textContent = localLoginArr.password;
userDetailsBalance.textContent = localLoginArr.balance;

let toBeLogin = document.querySelector(".to-be-login");
let doneLogin = document.querySelector(".done-login");
let dontRegister = document.querySelector(".dont-register");
let logOutIcon = document.querySelector(".logOutIcon");
let loginProfileChange = document.querySelector(".login-profile");

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
  toBeLogin.classList.replace("d-none", "d-block");
  doneLogin.classList.replace("d-block", "d-none");
  dontRegister.classList.replace("d-none", "d-block");
  logOutIcon.classList.remove("d-block", "d-none");
  doneLogin.textContent = localLoginArr.username;
});
let userURL = "http://localhost:3000/users/";

let orderBox = document.querySelector(".orders-box");
axios(userURL).then((res) => {
  let data = res.data;
  data.forEach((elem) => {
    if (elem.id == localLoginArr.id) {
      for (let order of elem.orders) {
        console.log(order);
        orderBox.innerHTML += `
        <tr>
        <th scope="row">${order.id}</th>
        <td>${order.orderDate}</td>
        <td>${order.totalPrice}</td>
      </tr>
        `;
      }
    }
  });
});
