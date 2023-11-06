let cards = document.querySelector(".cards");

let singerUrl = "http://localhost:3000/singers";
let searchSingerInp = document.querySelector(".search-singer");
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
searchSingerInp.addEventListener("click", function (e) {
  e.preventDefault();
});
axios(singerUrl).then((res) => {
  let data = res.data;
  //   console.log(data);
  data.forEach((singer) => {
    cards.innerHTML += `
          <div class="col-3 mb-5">
            <div class="card card-main" style="width: 18rem">
              <div class="card-image">
                <img
                  src="${singer.imageLink}"
                  class="card-img-top"
                  alt="..."
                />
              </div>
              <div class="card-body">
                <h5 class="card-title">${singer.name}</h5>
                <p class="card-text">
                  ${singer.name} is
                  <b>${singer.nationality} </b>
                </p>
                <a href="./detail.html?id=${singer.id}" class="btn btn-outline-primary"
                  >Detail</a
                >
                <button type="button" class="btn btn-outline-danger">
                  <i class="fa-solid fa-trash"></i>
                </button>
                <button type="button" name="${singer.id}" class="favourite-btn btn btn-outline-danger">
                  <i  name="${singer.id}" class="fav-icon fa-regular fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
    `;
  });
  searchSingerInp.addEventListener("input", function () {
    // console.log(searchSingerInp.value);
    cards.innerHTML = "";

    data.forEach((singer) => {
      if (
        singer.name.toUpperCase().includes(searchSingerInp.value.toUpperCase())
      ) {
        // console.log("var");
        cards.innerHTML += `
        <div class="col-3 mb-5">
          <div class="card" style="width: 18rem">
            <div class="card-image">
              <img src="${singer.imageLink}" class="card-img-top" alt="..." />
            </div>
            <div class="card-body">
              <h5 class="card-title">${singer.name}</h5>
              <p class="card-text">${singer.name} is
              <b>${singer.nationality} </b>
              
              
              </p>
              <a href="#" class="btn btn-outline-primary">Detail</a>
              <button type="button" class="btn btn-outline-danger">
              <i class="fa-solid fa-trash" text-warning"></i>
              
              </button>
              <button type="button" class="btn btn-outline-danger">
              <i class="fa-regular fa-heart" text-warning"></i>
              
              </button>


            </div>
          </div>
        </div>
    
        `;
      }
    });
  });
  let favBtns = document.querySelectorAll(".favourite-btn");
  let favIcons = document.querySelectorAll(".fav-icon");
  let favArr = [];
  let localFavArr = JSON.parse(localStorage.getItem("fav"));
  if (localFavArr) {
    favArr = [...localFavArr];
  }
  for (let faviconn of favIcons) {
    for (let item of favArr) {
      if (faviconn.getAttribute("name") == item.id) {
        faviconn.classList.replace("fa-regular", "fa-solid");
      }
    }
  }

  // console.log(favIcons);
  for (let favBtn of favBtns) {
    for (let favicon of favIcons) {
      if (favBtn.name == favicon.getAttribute("name")) {
        console.log(favicon);
        favBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          e.preventDefault();

          // let result = data.find((elem) => elem.id == favicon.getAttribute("name"));
          // favArr.push(result);
          // localStorage.setItem("fav", JSON.stringify(favArr));
          // favicon.classList.replace("fa-regular", "fa-solid");

          if (favicon.classList.contains("fa-solid")) {
            favicon.classList.replace("fa-solid", "fa-regular");
            wishlistCount.innerHTML--;
            favArr = favArr.filter(
              (elem) => elem.id != this.getAttribute("name")
            );
            localStorage.setItem("fav", JSON.stringify(favArr));
          } else {
            let result = data.find(
              (elem) => elem.id == favicon.getAttribute("name")
            );
            wishlistCount.innerHTML++;

            favArr.push(result);
            // wishlistCount.textContent++;
            localStorage.setItem("fav", JSON.stringify(favArr));
            favicon.classList.replace("fa-regular", "fa-solid");
          }
        });
      }
    }
  }
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

if (localLoginArr)
  logOutIcon.addEventListener("click", function () {
    localStorage.removeItem("login");
  });
