let favTableBox = document.querySelector(".FavTable");
let urlMeals = "http://localhost:3000/meals";
let localMealFavArr = JSON.parse(localStorage.getItem("favMeal"));
let favArr = [];
let localFavArr = JSON.parse(localStorage.getItem("fav"));
if (localFavArr) {
  favArr = [...localFavArr];
}
console.log(favArr);
let wishlistCount = document.querySelector(".wishlist-count");
if (localFavArr || localMealFavArr) {
  wishlistCount.innerHTML = localFavArr.length + localMealFavArr.length;
}
let localBasketArr = JSON.parse(localStorage.getItem("basket"));
let basketCount = document.querySelector(".basket-count");
console.log(basketCount);
if (localBasketArr) {
  basketCount.innerHTML = localBasketArr.length;
}
favArr.forEach((elem) => {
  favTableBox.innerHTML += `
    <tr>
            <th scope="row">${elem.id}</th>
            <td>${elem.name}</td>
            
            <td>
              <div class="fav-image">
                <img
                  src="${elem.imageLink}"
                  alt=""
                />
              </div>
            </td>
            <td>${elem.age}</td>
            <td>${elem.genre}</td>
            <td>
              <button type="button" class="btn btn-outline-danger">
                <i name="${elem.id}" class="fav-delete-button fa-solid fa-trash"></i>
              </button>
              
            </td>
            
          </tr>
    `;

  let favDeleteBtn = document.querySelectorAll(".fav-delete-button");
  for (let deletebtn of favDeleteBtn) {
    // console.log(deletebtn);
    deletebtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      wishlistCount.textContent--;
      this.parentElement.parentElement.parentElement.remove();
      favArr = favArr.filter((item) => item.id != this.getAttribute("name"));
      localStorage.setItem("fav", JSON.stringify(favArr));
    });
  }
});
let favMealTableBox = document.querySelector(".FavMealTable");
let favMealArr = [];

if (localMealFavArr) {
  favMealArr = [...localMealFavArr];
}

console.log(favMealArr);
favMealArr.forEach((elem) => {
  favMealTableBox.innerHTML += `
  <tr>
            <th scope="row">${elem.id}</th>
            <td>${elem.name}</td>
            
            <td>
              <div class="fav-image">
                <img
                  src="${elem.imageLink}"
                  alt=""
                />
              </div>
            </td>
            <td>${elem.price}</td>
            <td>
              <button type="button" class="btn btn-outline-danger">
                <i name="${elem.id}" class="fav-delete-button fa-solid fa-trash"></i>
              </button>
              
            </td>
            <td><button name=${elem.id} type="button" class="basket-btn btn btn-outline-primary">
            <i class="fa-solid fa-basket-shopping"></i>
          </button>
            </td>
          </tr>
  `;

  let basketBtns = document.querySelectorAll(".basket-btn");
  //   console.log(basketBtns);
  let basketArr = [];
  let localBasket = JSON.parse(localStorage.getItem("basket"));

  if (localBasket) {
    basketArr = [...localBasket];
  }

  axios(urlMeals).then((res) => {
    let data = res.data;
    for (let basketbtn of basketBtns) {
      basketbtn.addEventListener("click", function () {
        if (basketArr.find((elem) => elem.id == this.name)) {
          let x = basketArr.find((y) => y.id == this.name);
          console.log(x);
          x.quantity++;
          localStorage.setItem("basket", JSON.stringify(basketArr));
        } else {
          data.forEach((elem) => {
            if (elem.id == this.name) {
              elem.quantity = 1;
              basketArr.push(elem);
              basketCount.innerHTML++;
              localStorage.setItem("basket", JSON.stringify(basketArr));
            }
          });
        }
      });
    }
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
