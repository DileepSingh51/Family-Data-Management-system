let currentUser = localStorage.getItem("currentUser");
if(!currentUser){
    window.location.href = "login.html";
}

let form = document.getElementById("familyForm");
let list = document.getElementById("memberList");

let allData = JSON.parse(localStorage.getItem("allUsers")) || {};
let members = allData[currentUser] || [];

let editIndex = -1; // store index when editing

showMembers();

form.addEventListener("submit", function(e){
    e.preventDefault();
    let name = document.getElementById("name").value.trim();
    let relation = document.getElementById("relation").value.trim();
    let phone = document.getElementById("phone").value.trim();
    if(name.length===0) return;

    if(editIndex === -1){
        // Adding new member
        members.push({name, relation, phone});
    } else {
        // Updating existing member
        members[editIndex] = {name, relation, phone};
        editIndex = -1; // reset edit index
        form.querySelector("button").textContent = "Save"; // reset button text
    }

    allData[currentUser] = members;
    localStorage.setItem("allUsers", JSON.stringify(allData));
    showMembers();
    form.reset();
});

function showMembers(){
    list.innerHTML = "";
    members.forEach((m, index)=>{
        let li = document.createElement("li");
        li.textContent = `${m.name} - ${m.relation} - ${m.phone} `;

        // Edit button
        let edit = document.createElement("button");
        edit.textContent = "Edit";
        edit.addEventListener("click", function(){
            document.getElementById("name").value = m.name;
            document.getElementById("relation").value = m.relation;
            document.getElementById("phone").value = m.phone;
            editIndex = index;
            form.querySelector("button").textContent = "Update";
        });

        // Delete button
        let del = document.createElement("button");
        del.textContent = "Delete";
        del.addEventListener("click", function(){
            members.splice(index, 1);
            allData[currentUser] = members;
            localStorage.setItem("allUsers", JSON.stringify(allData));
            showMembers();
        });

        li.appendChild(edit);
        li.appendChild(del);
        list.appendChild(li);
    });
}