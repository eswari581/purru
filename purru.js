body{
margin:0;
font-family:Arial;
background-image:url("https://images.unsplash.com/photo-1581595219315-a187dd40c322");
background-size:cover;
background-position:center;
}

.container{
display:flex;
}

/* Sidebar */

.sidebar{
width:220px;
background:#1d3557;
color:white;
height:100vh;
padding:20px;
}

.sidebar ul{
list-style:none;
padding:0;
}

.sidebar li{
padding:12px;
cursor:pointer;
transition:0.3s;
}

.sidebar li:hover{
background:#457b9d;
padding-left:10px;
}

/* Main */

.main{
flex:1;
padding:20px;
background:rgba(255,255,255,0.9);
}

.page{
display:none;
}

/* Cards */

.cards{
display:flex;
gap:20px;
margin-bottom:30px;
}

.card{
background:white;
padding:20px;
width:200px;
border-radius:10px;
text-align:center;
box-shadow:0 5px 10px rgba(0,0,0,0.3);
transition:0.3s;
animation:fadeIn 1s;
}

.card:hover{
transform:translateY(-10px);
}

.card i{
font-size:30px;
color:red;
margin-bottom:10px;
}

/* Table */

table{
width:100%;
border-collapse:collapse;
background:white;
}

th,td{
padding:10px;
border:1px solid #ddd;
text-align:center;
}

th{
background:red;
color:white;
}

tr:hover{
background:#f1f1f1;
}

/* Form */

input,select{
padding:10px;
margin:10px;
width:250px;
}

button{
padding:10px;var donors = JSON.parse(localStorage.getItem("donors")) || [];

function showPage(page){

var pages=document.getElementsByClassName("page");

for(var i=0;i<pages.length;i++)
pages[i].style.display="none";

document.getElementById(page).style.display="block";

updateDashboard();
loadDonors();
updateChart();

}

/* Add donor */

document.getElementById("donorForm").addEventListener("submit",function(e){

e.preventDefault();

var donor={
name:document.getElementById("name").value,
blood:document.getElementById("blood").value,
city:document.getElementById("city").value,
phone:document.getElementById("phone").value
};

donors.push(donor);

localStorage.setItem("donors",JSON.stringify(donors));

alert("Donor Added");

this.reset();

updateDashboard();
loadDonors();
updateChart();

});

/* Dashboard */

function updateDashboard(){

var a=0,b=0,o=0,ab=0;

for(var i=0;i<donors.length;i++){

if(donors[i].blood=="A+") a++;
if(donors[i].blood=="B+") b++;
if(donors[i].blood=="O+") o++;
if(donors[i].blood=="AB+") ab++;

}

document.getElementById("totalDonors").innerHTML=donors.length;
document.getElementById("apos").innerHTML=a;
document.getElementById("bpos").innerHTML=b;
document.getElementById("opos").innerHTML=o;
document.getElementById("abpos").innerHTML=ab;

}

/* Donor list */

function loadDonors(){

var table=document.getElementById("donorTable");

table.innerHTML=
`<tr>
<th>Name</th>
<th>Blood</th>
<th>City</th>
<th>Phone</th>
<th>Action</th>
</tr>`;

for(var i=0;i<donors.length;i++){

var row=table.insertRow();

row.insertCell(0).innerHTML=donors[i].name;
row.insertCell(1).innerHTML=donors[i].blood;
row.insertCell(2).innerHTML=donors[i].city;
row.insertCell(3).innerHTML=donors[i].phone;

row.insertCell(4).innerHTML=
"<button onclick='deleteDonor("+i+")'>Delete</button>";

}

}

/* Delete */

function deleteDonor(i){

donors.splice(i,1);

localStorage.setItem("donors",JSON.stringify(donors));

loadDonors();
updateDashboard();
updateChart();

}

/* Search */

function searchDonor(){

var input=document.getElementById("search").value.toLowerCase();

var rows=document.getElementById("donorTable").rows;

for(var i=1;i<rows.length;i++){

var name=rows[i].cells[0].innerHTML.toLowerCase();

rows[i].style.display=
name.includes(input) ? "" : "none";

}

}

/* Chart */

var chart;

function updateChart(){

var a=0,b=0,o=0,ab=0;

for(var i=0;i<donors.length;i++){

if(donors[i].blood=="A+") a++;
if(donors[i].blood=="B+") b++;
if(donors[i].blood=="O+") o++;
if(donors[i].blood=="AB+") ab++;

}

var ctx=document.getElementById("bloodChart");

if(chart) chart.destroy();

chart=new Chart(ctx,{
type:'pie',
data:{
labels:['A+','B+','O+','AB+'],
datasets:[{
data:[a,b,o,ab]
}]
}
});

}

showPage("dashboard");
border:none;
cursor:pointer;
}

/* Animation */

@keyframes fadeIn{
from{
opacity:0;
transform:translateY(20px);
}
to{
opacity:1;
transform:translateY(0);
}
}