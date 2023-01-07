const updatePrice = function () {
  let cartP = [];
  let finalCartP;
  $("tbody tr").each(function (i, ele) {
    let price = parseFloat($(ele).children(".price").text());
    let qty = parseFloat($(ele).find(".quantity input").val());

    let rowTotal = price * qty;
    $(ele).children(".total-price").html(rowTotal);

    $(rowTotal).each(function (i, e) {
      cartP.push(e);
    });
    finalCartP = cartP.reduce(function (result, i) {
      return result + i;
    }, 0);
    $(".cart-total").html("Your Total is: $" + finalCartP);
  });
};

updatePrice();

//   remove button
$(".btn.remove").on("click", function (e) {
  $(this).closest("tr").remove();
});

//   update price
let timeout;
$(document).on("input", "tr input", function () {
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    updatePrice();
  }, 100);
});

$("form").on("submit", function (e) {
  e.preventDefault();
  let name = $(this).children("[name=item]").val();
  let price = $(this).children("[name=price]").val();
  let qty = $(this).children("[name=quantity]").val();
  let total =
    $(this).children("[name=price]").val() *
    $(this).children("[name=quantity]").val();

  $("tbody").append(
    "<tr>" +
      '<td class="item">' +
      name +
      "</td>" +
      '<td class="price">' +
      price +
      "</td>" +
      '<td class="quantity"><input type="number" value="' +
      qty +
      '"min="0" max="15"></td>' +
      '<td class="total-price">' +
      total +
      "</td>" +
      '<td><button class="btn btn-danger btn-sm rounded-5 remove">remove</button></td>' +
      "</tr>"
  );
  updatePrice();
  $(this).children("[name=item]").val("");
  $(this).children("[name=price]").val("");
  $(this).children("[name=quantity]").val("");
  $(this).children("[name=total-price]").val("");
});
