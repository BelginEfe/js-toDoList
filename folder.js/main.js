let inputDOM = document.querySelector("#task");
let btnDOM = document.querySelector("#liveToastBtn");
let listDOM = document.querySelector("#list");

//eğer bir değişkene diğer fonksiyonların içerisinde de erişmek istiyorsanız, diğer fonksiyonların o değişkeni alabileceği bir yere tanımlamalısınız.
//sizin farklı farklı tanımladığınız taskList ler her seferinde yeniden oluşuyor ve birbirinden bağımsız oluyordu. Bu şekilde yukarıya tanımlayarak tüm kod bloğunun
//aynı taskList değişkenine erişmesini sağladık.
let taskList;

btnDOM.addEventListener("click", () => {
  if (inputDOM.value.trim().length > 0) {
    let localItems = JSON.parse(localStorage.getItem("localItem"));
    if (localItems === null) {
      taskList = [];
    } else {
      taskList = localItems;
    }
    taskList.push(inputDOM.value);
    localStorage.setItem("localItem", JSON.stringify(taskList));
    showList();
  } else {
    $(document).ready(function () {
      $("#nonliveToast").toast("show");
    });
  }
});

function showList() {
  //yukarıdaki taskListi burada da erişip kullanacağımız için burada tekrar localStorageden bir şey alıp vermemize gerek kalmıyor.
  let liDOM = document.createElement("li");
  //burada liDOM'un içerisine koyacağım değeri bir div içerisine koydum ki erişmesi kolay olsun
  liDOM.innerHTML = `<div>${inputDOM.value}</div>`;
  listDOM.appendChild(liDOM);
  liDOM.addEventListener("click", function doneLi(e) {
    e.target.className = "checked";
  });
  liDOM.addEventListener("dblclick", function notdoneLi(e) {
    e.target.classList.remove("checked");
  });

  inputDOM.value = "";
  $(document).ready(function () {
    $("#liveToast").toast("show");
  });

  let spnDOM = document.createElement("span");
  liDOM.appendChild(spnDOM);
  spnDOM.className = "close";
  spnDOM.innerHTML = "×";
  spnDOM.addEventListener("click", function deleteLi(e) {
    e.target.parentNode.remove();
    //filtreleme işlemini liDOM un içerisindeki ilk elementin içerisindeki texte göre yaptık. tastkListe filtrelenmiş arrayi tekrar atadık ki, tüm kod bloğu güncellenmeiş olsun.
    taskList = taskList.filter((task) => task !== liDOM.children[0].innerText);
    //localStorageden eski arrayi sildik daha sonra yeni arrayi atadık
    localStorage.removeItem("localItem");
    localStorage.setItem("localItem", JSON.stringify(taskList));
    
  });
}


















