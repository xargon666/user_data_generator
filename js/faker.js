const { faker } = require('@faker-js/faker');
let output = document.querySelector('.output')
let num = document.querySelector('#num')
let btn = document.querySelector('#gen')
class Record {
    constructor(firstName,lastName,email,userName,age,password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.userName = userName;
        this.age = age;
        this.password = password;
    }
}



btn.addEventListener("click",()=>{
    let int = parseInt(num.value);
    for (let i = 0; i < int; i++) {
        generate()
    }
})

function createTable(){
    const tbl = document.createElement('table');
    tbl.style = '1px solid black'
    const tbl1 = document.createElement('tr');
    for (let key in Record){
        let tblh = document.createElement('th')
        tblh.textContent = Record[key]
        console.log("tblh")
        tbl1.appendChild(tblh)
    }
    tbl.appendChild(tbl1)
    output.appendChild(tbl)
}

function generate(){
    try{
        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let jobTitle = faker.name.jobTitle();
        let prefix = faker.name.prefix(); 
        let suffix = faker.name.suffix();
        let fullName = `${prefix} ${firstName} ${lastName} ${suffix}`
        let jobArea = faker.name.jobArea();
        let phone = faker.phone.phoneNumber();
        let email = faker.internet.email(firstName,lastName)
        let userName = faker.internet.userName(firstName,lastName)
        let password = faker.internet.password(10,true)
        // let age = faker.date.birthdate() not available in current faker ver
        
        let record = new Record(firstName,lastName,email,userName,password)
        if (!output.textContent) {createTable()}
        
        output.innerHTML = record
    } catch(err){
        throw new Error(err)
    }


}
