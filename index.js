let container = document.querySelector(".container");
let showAll = document.querySelector("#showAll");
let showFive = document.querySelector("#showFive");
let h1 = document.querySelector("h1");
let cart_container = document.querySelector(".scrollable");
let total_view = document.querySelector("#total");
let cart = [];

showAll.onclick = () => {
  reload(arr);
};
showFive.onclick = () => {
  reload(arr.slice(0, 5));
};

reload(arr);

function reload(massiv) {
  container.innerHTML = "";

  for (let elem of massiv) {
    let item = document.createElement("div");
    let preview = document.createElement("div");
    let previewImage = document.createElement("img");
    let info = document.createElement("div");
    let itemText = document.createElement("h2");
    let itemDescription = document.createElement("p");
    let miniInfo = document.createElement("div");
    let priceWrap = document.createElement("div");
    let priceImage = document.createElement("img");
    let price = document.createElement("span");
    let rateWrap = document.createElement("div");
    let rateImage = document.createElement("img");
    let rate = document.createElement("span");
    let countWrap = document.createElement("div");
    let countImage = document.createElement("img");
    let count = document.createElement("span");
    let buttonAdd = document.createElement("button");

    item.classList.add("item", "fade");
    preview.classList.add("preview");
    previewImage.src = elem.image;
    previewImage.alt = elem.title;

    info.classList.add("info");
    itemText.textContent =
      elem.title.length > 20 ? elem.title.slice(0, 17) + "..." : elem.title;
    itemDescription.innerHTML =
      elem.description.length > 100
        ? elem.description.slice(0, 100) + " <b>read</b>"
        : elem.description;

    miniInfo.classList.add("mini-info");

    priceWrap.classList.add("price");
    priceImage.src = "./icons/dollar.svg";
    priceImage.alt = "dollar";
    price.textContent = elem.price;

    rateWrap.classList.add("rate");
    rateImage.src = "./icons/rate.svg";
    rateImage.alt = "rate";
    rate.textContent = elem.rating.rate;

    countWrap.classList.add("count");
    countImage.src = "./icons/count.svg";
    countImage.alt = "count";
    count.textContent = elem.rating.count;

    buttonAdd.classList.add("add");
    buttonAdd.textContent = "В Избранное";

    container.append(item);
    item.append(preview, info);
    preview.append(previewImage);
    info.append(itemText, itemDescription, miniInfo, buttonAdd);
    miniInfo.append(priceWrap, rateWrap, countWrap);
    priceWrap.append(priceImage, price);
    rateWrap.append(rateImage, rate);
    countWrap.append(countImage, count);

    // d
    buttonAdd.onclick = () => {
      if (cart.includes(elem.id)) {
        let idx = cart.indexOf(elem.id);
        cart.splice(idx, 1);

        buttonAdd.classList.remove("active");
        buttonAdd.innerHTML = "В избранное";
      } else {
        cart.push(elem.id);
        buttonAdd.classList.add("active");
        buttonAdd.innerHTML = "Добавлено";
      }

      cart_realod(cart);
      h1.innerHTML = `Cart: ${cart.length}`;
    };
  }
}

cart_realod(cart);

function cart_realod(cart_ids) {
  cart_container.innerHTML = "";
  let temp = [];
  let total = 0;
  total_view.innerHTML = total;

  for (let product of arr) {
    for (let id of cart_ids) {
      if (id === product.id) {
        temp.push(product);
      }
    }
  }
  //   console.log(cart_ids);
  // console.log(product.id);

  for (let item of temp) {
    total += item.price;
    total_view.innerHTML = total;

    let cart_item = document.createElement("div");
    let div_left = document.createElement("div");
    let left_inp = document.createElement("input");
    let left_img = document.createElement("img");
    let div_mid = document.createElement("div");
    let mid_title = document.createElement("span");
    let mid_details = document.createElement("div");
    let details_div = document.createElement("div");
    let details_p_one = document.createElement("p");
    let details_p_two = document.createElement("p");
    let counter = document.createElement("div");
    let counter_plus = document.createElement("button");
    let counter_minus = document.createElement("button");
    let counter_input = document.createElement("input");
    let div_right = document.createElement("div");
    let right_button = document.createElement("button");
    let right_button_img = document.createElement("img");
    let right_price = document.createElement("span");
    let right_sale_price = document.createElement("span");

    cart_item.classList.add("cart-item");
    div_left.classList.add("left");
    div_mid.classList.add("mid");
    div_right.classList.add("right");
    mid_title.classList.add("title");
    mid_details.classList.add("details");
    counter.classList.add("counter");
    right_price.classList.add("price");
    right_sale_price.classList.add("sale-price");

    left_inp.type = "checkbox";
    left_img.src = item.image;
    counter_input.type = "number";
    counter_input.value = 1;
    right_button_img.src = "./icons/trash.svg";

    mid_title.innerHTML =
      item.title.length > 20 ? item.title.slice(0, 17) + "..." : item.title;
    details_p_one.innerHTML = `Категория: ${item.category}`;
    details_p_two.innerHTML = `В наличии: ${item.rating.count}`;
    counter_plus.innerHTML = "+";
    counter_minus.innerHTML = "-";
    right_button.innerHTML = "delete";
    right_price.innerHTML = `${item.price * counter_input.value} usd`;
    let salePrice = item.price - (10 * item.price) / 100;
    right_sale_price.innerHTML = `${salePrice}`;

    cart_item.append(div_left, div_mid, div_right);
    div_left.append(left_inp, left_img);
    div_mid.append(mid_title, mid_details);
    mid_details.append(details_div, counter);
    details_div.append(details_p_one, details_p_two);
    counter.append(counter_plus, counter_input, counter_minus);
    div_right.append(right_button, right_price, right_sale_price);
    right_button.prepend(right_button_img);
    cart_container.append(cart_item);

    right_button.onclick = () => {
      let idx = cart.indexOf(item.id);
      cart.splice(idx, 1);
      cart_item.remove();
    };

    function calcucate(isPlus, price) {
      right_price.innerHTML = `${price * counter_input.value} usd`;

      if (isPlus) total += price;
      else total -= price;

      total = +total.toFixed(2);
      total_view.innerHTML = total;
    }

    counter_plus.onclick = () => {
      if (counter_input.value < item.rating.count) {
        counter_input.value = ++counter_input.value;

        calcucate(true, item.price);
      }
    };
    counter_minus.onclick = () => {
      if (counter_input.value > 0) {
        counter_input.value = --counter_input.value;
        calcucate(false, item.price);
      }
    };
    let curr = 0;
    counter_input.oninput = () => {
      if (counter_input.value.length !== 0) {
        let local_total = item.price * (counter_input.value - 1);
        total -= curr;
        total += local_total;
        total_view.innerHTML = total.toFixed(2);
        curr = local_total;
      }
    };

    function cartDel() {
      for (let product of arr) {
        let buttonAdd = document.createElement("button");
        buttonAdd.classList.add("add");
        buttonAdd.textContent = "В Избранное";

        right_button.onclick = () => {
          let idx2 = cart.indexOf(product.id);
          console.log( cart);

          cart.splice(idx2, 1);

          // let idx = cart.indexOf(elem.id);

          buttonAdd.classList.remove("active");
          buttonAdd.innerHTML = "В избранное";
        };

        // right_button.onclick = () => {
        //   // let idx = cart.indexOf(elem.id);

        //   if (cart.includes(product.id)) {
        //     let idx2 = cart.indexOf(product.id);
        //     console.log(idx2, cart);

        //     cart.splice(idx2, 1);

        //     buttonAdd.classList.remove("active");
        //     buttonAdd.innerHTML = "В избранное";
        //   } else {
        //     cart.splice(idx2, 1);
        //     buttonAdd.classList.add("active");
        //     buttonAdd.innerHTML = "Добавлено";
        //   }
        // };
      }
    }
    cartDel();
  }
}

// MODAL WINDOW
let modalka = document.querySelector(".modalka");
let close_img = document.querySelector(".close_img");

menu.onclick = () => {
  modalka.style.display = "flex";
};
close_img.onclick = () => {
  modalka.style.display = "none";
};
