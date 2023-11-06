let mealsBox = document.querySelector(".cards");
let urlMeals = "http://localhost:3000/meals";
let wishlistCount = document.querySelector(".wishlist-count");
let localFavMealArr = JSON.parse(localStorage.getItem("favMeal"));
let localFavArr = JSON.parse(localStorage.getItem("fav"));
if (localFavArr && localFavMealArr) {
  wishlistCount.innerHTML = localFavArr.length + localFavMealArr.length;
} else if (localFavArr && !localFavMealArr) {
  wishlistCount.innerHTML = localFavArr.length;
} else if (!localFavArr && localFavMealArr) {
  wishlistCount.innerHTML = localFavMealArr.length;
}
let localBasketArr = JSON.parse(localStorage.getItem("basket"));
let basketCount = document.querySelector(".basket-count");
console.log(basketCount);
if (localBasketArr) {
  basketCount.innerHTML = localBasketArr.length;
}
axios(urlMeals).then((res) => {
  let data = res.data;
  data.forEach((meal) => {
    mealsBox.innerHTML += `
    <div class="col-3 mb-5">
          <div class="card card-main" style="width: 18rem">
            <div class="card-image">
              <img
                src="${meal.imageLink}"
                class="card-img-top"
                alt="..."
              />
            </div>
            <div class="card-body">
              <h5 class="card-title">${meal.name}</h5>
              <p class="card-text">
                Price: <b> ${meal.price}</b>
              </p>
              <a
                href="./detailMail.html?id=${meal.id}"
                class="btn btn-outline-primary"
                >Detail</a
              >
              <button type="button" class="meal-delete-btn btn btn-outline-danger">
                <i class="fa-solid fa-trash"></i>
              </button>
              <button name=${meal.id} type="button" class="basket-btn btn btn-outline-primary">
                <i class="fa-solid fa-basket-shopping"></i>
              </button>
              <button name="${meal.id}" type="button" class="favourite-btn btn btn-outline-danger">
                  <i  name="${meal.id}" class="fav-icon fa-regular fa-heart"></i>
                </button>
            </div>
          </div>
        </div>
    `;
  });
  let favMealArr = [];
  let localFavArr = JSON.parse(localStorage.getItem("favMeal"));
  if (localFavArr) {
    favMealArr = [...localFavArr];
  }
  let favBtns = document.querySelectorAll(".favourite-btn");
  let favIcons = document.querySelectorAll(".fav-icon");

  console.log(favBtns);
  for (let favBtn of favBtns) {
    for (let favicon of favIcons) {
      if (favBtn.name == favicon.getAttribute("name")) {
        console.log(favicon);
        favBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          e.preventDefault();

          if (favicon.classList.contains("fa-solid")) {
            favicon.classList.replace("fa-solid", "fa-regular");
            wishlistCount.textContent--;
            favMealArr = favMealArr.filter(
              (elem) => elem.id != this.getAttribute("name")
            );
            localStorage.setItem("favMeal", JSON.stringify(favMealArr));
            // wishlistCount.textContent--;
          } else {
            let result = data.find(
              (elem) => elem.id == favicon.getAttribute("name")
            );
            wishlistCount.textContent++;
            // wishlistCount.textContent++;
            favMealArr.push(result);
            // wishlistCount.textContent++;
            localStorage.setItem("favMeal", JSON.stringify(favMealArr));
            favicon.classList.replace("fa-regular", "fa-solid");
          }

          // let result = data.find((elem) => elem.id == favicon.getAttribute("name"));
          // favArr.push(result);
          // localStorage.setItem("fav", JSON.stringify(favArr));
          // favicon.classList.replace("fa-regular", "fa-solid");
        });
      }
    }
  }

  let basketBtns = document.querySelectorAll(".basket-btn");
  //   console.log(basketBtns);
  let basketArr = [];
  let localBasket = JSON.parse(localStorage.getItem("basket"));
  if (localBasket) {
    basketArr = [...localBasket];
  }

  for (let basketbtn of basketBtns) {
    basketbtn.addEventListener("click", function () {
      console.log("salam");
      if (basketArr.find((elem) => elem.id == this.name)) {
        basketArr[basketbtn.name - 1].quantity++;
        localStorage.setItem("basket", JSON.stringify(basketArr));
      } else {
        data.forEach((elem) => {
          if (elem.id == this.name) {
            elem.quantity = 1;
            basketArr.push(elem);
            localStorage.setItem("basket", JSON.stringify(basketArr));
            basketCount.innerHTML++;
          }
        });
      }
    });

    for (let faviconn of favIcons) {
      for (let item of favMealArr) {
        if (faviconn.getAttribute("name") == item.id) {
          faviconn.classList.replace("fa-regular", "fa-solid");
        }
      }
    }

    // console.log(favIcons);
  }

  // for (let favicon of favIcons) {
  //   console.log(favicon);
  //   favicon.addEventListener("click", function (e) {
  //     e.stopPropagation();
  //     e.preventDefault();
  //     console.log("salam");

  //     // let result = data.find((elem) => elem.id == favicon.getAttribute("name"));
  //     // favArr.push(result);
  //     // localStorage.setItem("fav", JSON.stringify(favArr));
  //     // favicon.classList.replace("fa-regular", "fa-solid");

  //
  //   });
  // }
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
