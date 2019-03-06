const menu = document.getElementById('menu');
const toggleView = document.getElementById('toggleView');

function addActive(){
    toggleView.className += " active";
    this.className += " active";
    this.removeEventListener("click", addActive);
    this.addEventListener("click", removeActive);
}

function removeActive(){
    toggleView.className = "";
    this.className = this.className.replace(/ active/, "");
    this.removeEventListener("click", removeActive);
    this.addEventListener("click", addActive);
}

menu.addEventListener("click", addActive);