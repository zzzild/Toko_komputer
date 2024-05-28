let popupOverlay = document.getElementById("popup-overlay");
let popup = document.getElementById("popup");
let popupImage = document.getElementById("popup-image");
let popupBrand = document.getElementById("popup-brand");
let popupPrice = document.getElementById("popup-price");
let popupDes = document.getElementById("popup-des");

function popUp(image, brand, price, Des) {
  popupImage.src = image;
  popupBrand.innerHTML = brand;
  popupPrice.innerHTML = price;
  popupDes.innerHTML = ` " `+ Des + ` "`;
  popup.style.display = 'block';
}

popup.addEventListener('click', function(event) {
  this.style.display = 'none';
})