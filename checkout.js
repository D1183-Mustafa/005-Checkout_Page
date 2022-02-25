const texRate = 0.18;
const shippingPrice = 15.0;

window.addEventListener("load", () => {
  localStorage.setItem("taxRate", texRate);
  localStorage.setItem("shippingPrice", shippingPrice);

  sessionStorage.setItem("tax", texRate);
  sessionStorage.setItem("shippingPrice", shippingPrice);
  calculateCartTotal();
});

let productsDiv = document.querySelector(".products");

productsDiv.addEventListener("click", (e) => {
  let quantityP =
    e.target.parentElement.parentElement.querySelector("#product-quantity");

  //minus buttons
  if (
    e.target.classList.contains("fa-minus") ||
    e.target == quantityP.parentElement.firstElementChild
  ) {
    if (quantityP.innerText > 1) {
      quantityP.innerText--;
      //calculate Product and Cart Total
      calculateProductTotal(quantityP);
    } else {
      if (confirm("Product will be removed!")) {
        quantityP.parentElement.parentElement.parentElement.remove();
        //calculateCartTotal
        calculateCartTotal();
      }
    }
    // console.log("minusBtn clicked");
  }
  // plus button
  else if (
    e.target.className == "fas fa-plus" ||
    e.target == quantityP.parentElement.lastElementChild
  ) {
    quantityP.innerText++;
    //calculate Product and Cart Total
    calculateProductTotal(quantityP);

    // console.log("plusBtn clicked");
  } else if (e.target.className == "remove-product") {
    if (confirm("Product will be removed")) {
      quantityP.parentElement.parentElement.parentElement.remove();
      calculateCartTotal();
    }
    //calculateCartTotal

    // e.target.parentElement.parentElement.remove();
    // console.log("removeBtn clicked");
  }

  //other
  else {
    console.log("other elements clicked");
  }
});

const calculateProductTotal = (quantityP) => {
  console.log(quantityP.innerText);
  let productPrice =
    quantityP.parentElement.parentElement.querySelector("strong");
  let productTotalPriceDiv =
    quantityP.parentElement.parentElement.querySelector(".product-line-price");

  productTotalPriceDiv.innerText = (
    quantityP.innerText * productPrice.innerText
  ).toFixed(2);

  calculateCartTotal();
};

const calculateCartTotal = () => {
  let productTotalPriceDivs = document.querySelectorAll(".product-line-price");
  // console.log(productTotalPriceDivs);
  let subtotal = 0;
  productTotalPriceDivs.forEach((eachProductTotalPriceDiv) => {
    subtotal += parseFloat(eachProductTotalPriceDiv.innerText);
  });
  console.log(subtotal);
  let taxPrice = subtotal * localStorage.getItem("taxRate");
  console.log(taxPrice);
  let shipping =
    subtotal > 0 ? parseFloat(localStorage.getItem("shippingPrice")) : 0;
  console.log(shipping);
  let cartTotal = subtotal + taxPrice + shipping;
  console.log(cartTotal);

  document.querySelector("#cart-subtotal p:nth-child(2)").innerText =
    subtotal.toFixed(2);
  document.querySelector("#cart-tax p:nth-child(2)").innerText =
    taxPrice.toFixed(2);
  document.querySelector("#cart-shipping p:nth-child(2)").innerText =
    shipping.toFixed(2);
  document.querySelector("#cart-total").lastElementChild.innerText =
    cartTotal.toFixed(2);
};
