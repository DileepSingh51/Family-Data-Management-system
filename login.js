let form = document.getElementById("loginForm");

form.addEventListener("submit", function(e){
    e.preventDefault();
    let username = document.getElementById("username").value.trim();
    if(username.length === 0) return;
    localStorage.setItem("currentUser", username);
    window.location.href = "dashboard.html";
});