var siteName = document.querySelector("#siteName");
var siteLink = document.querySelector("#siteLink");
var submitButton = document.querySelector(".submit");
var tBody = document.querySelector("tbody");
var deleteButton = document.querySelector(".delete");
var visitButton = document.querySelector(".visit");
var updateButton = document.querySelector(".update");
var bookMarkArr = [];
var updateIndex;
//---------------------------------------------
if (localStorage.getItem("bookMark") == null) {
  bookMarkArr = [];
} else {
  bookMarkArr = JSON.parse(localStorage.getItem("bookMark"));
  displayBookMark(bookMarkArr);
}
//add bookmark--------------------------------
submitButton.addEventListener("click", function () {
  addBookMark();
});
function addBookMark() {
  var bookMark = {
    name: siteName.value,
    link: siteLink.value,
  };
  bookMarkArr.push(bookMark);
  localStorage.setItem("bookMark", JSON.stringify(bookMarkArr));
  clear();
  displayBookMark(bookMarkArr);
}
//clear----------------------------------------
function clear() {
  siteName.value = null;
  siteLink.value = null;
}
//display-----------------------------------------
function displayBookMark(arr) {
  var container = "";
  for (var i = 0; i < arr.length; i++) {
    container += `
          <tr>
            <td>${i + 1}</td>
            <td>${arr[i].name}</td>
            <td>
              <a href="${arr[i].link}" target="_blank">
                <button onclick="visitBookMark()" type="button" class="visit btn btn-outline-success">
                  <i class="fa-solid fa-eye"></i>
                  Visit
                </button>
              </a>
            </td>
            <td>
              <button onclick="setUpdate(${i})" type="button" class="update btn btn-outline-warning">
                <i class="fa-solid fa-pen"></i>
                Update
              </button>
            </td>
            <td>  
              <button onclick="deleteBookMark(${i})" type="button" class="delete btn btn-outline-danger">
                <i class="fa-solid fa-trash"></i>
                Delete
              </button>
            </td>
          </tr>`;
  }
  tBody.innerHTML = container;
}
//delete-----------------------------------------
function deleteBookMark(index) {
  bookMarkArr.splice(index, 1);
  displayBookMark(bookMarkArr);
  localStorage.setItem("bookMark", JSON.stringify(bookMarkArr));
}
//visit----------------------------------------------------
//update---------------------------------------------
function setUpdate(index) {
  siteName.value = bookMarkArr[index].name;
  siteLink.value = bookMarkArr[index].link;
  updateButton.classList.remove("d-none");
  submitButton.classList.add("d-none");
  updateIndex = index;
}
updateButton.addEventListener("click", function () {
  var bookMark = {
    name: siteName.value,
    link: siteLink.value,
  };
  bookMarkArr.splice(updateIndex, 1, bookMark);
  localStorage.setItem("bookMark", JSON.stringify(bookMarkArr));
  clear();
  displayBookMark(bookMarkArr);
  updateButton.classList.add("d-none");
  submitButton.classList.remove("d-none");
  localStorage.setItem("bookMark", JSON.stringify(bookMarkArr));
});
