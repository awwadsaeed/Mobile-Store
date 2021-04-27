'use strict'

let table=document.getElementById('table');
let phonsArr=[];

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


function Mobile(user,type,price=random(100,500)){
this.user=user;
this.type=type;
this.price=price;
this.condition='Undecided';
phonsArr.push(this);
}
Mobile.prototype.setCondition=function(){
    if(this.price<200){
        this.condition='Used';
    }else{
        this.condition='New'
    }
}
Mobile.prototype.render=function(){
    let row=document.createElement('tr');
    table.appendChild(row);
    let cell= document.createElement('td');
    row.appendChild(cell);
    cell.textContent=this.user;   
    cell= document.createElement('td');
    row.appendChild(cell);
    cell.textContent=this.type;
    cell= document.createElement('td');
    row.appendChild(cell);
    cell.textContent=this.price;
    cell= document.createElement('td');
    row.appendChild(cell);
    cell.textContent=this.condition;
}

let form=document.getElementById('form');
form.addEventListener('submit',submitter);
function submitter(event){
    event.preventDefault();
    let userName=event.target.user.value;
    let phonType=event.target.type.value;
    let newPhone= new Mobile(userName,phonType);
    newPhone.setCondition();
    newPhone.render();
    setStorage();
}
function setStorage(){
    let storeArr=JSON.stringify(phonsArr);
    localStorage.setItem('phonesData',storeArr);
}

function getData(){
    phonsArr=[];
    if(localStorage.getItem('phonesData')!== null){
        let data=localStorage.getItem('phonesData');
        let newData=JSON.parse(data);
       
        for(let i=0;i<newData.length;i++){
            let newPhonObj=new Mobile(newData[i].user, newData[i].type,newData[i].price);
            phonsArr[i]=newPhonObj;
            phonsArr[i].setCondition();
            phonsArr[i].render();
        }
    }
}
getData();
//strech goal
let button=document.getElementById('button');
button.addEventListener('click',clearStorage);
function clearStorage(){
    table.textContent='';
    localStorage.removeItem('phonesData');
    let row=document.createElement('tr');
    table.appendChild(row);
    let cell= document.createElement('th');
    row.appendChild(cell);
    cell.textContent='User';   
    cell= document.createElement('th');
    row.appendChild(cell);
    cell.textContent="Type";
    cell= document.createElement('th');
    row.appendChild(cell);
    cell.textContent="Price";
    cell= document.createElement('th');
    row.appendChild(cell);
    cell.textContent='Condition';
    phonsArr=[];
}
// let testObj=new Mobile('saeed','samsung');
// testObj.setCondition();
// testObj.render();
// console.log(phonsArr);
