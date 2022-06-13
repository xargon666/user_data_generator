const { faker } = require("@faker-js/faker");
let output = document.querySelector(".output");
let num = document.querySelector("#num");
let btn = document.querySelector("#gen");

btn.addEventListener("click", () => {
  let int = parseInt(num.value);
  for (let i = 0; i < int; i++) {
    generate();
  }
});

class Record {
  constructor(firstName, lastName, email, userName, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.userName = userName;
    this.password = password;
  }

  static newTable() {
    let tbl = document.createElement("table");
    let tblr1 = document.createElement("tr");
    let record = new Record();
    for (let key in record) {
      let tblh = document.createElement("th");
      let text;
      if (key.includes("Name")) {
          text = key.split("Name")
          text[1] = "Name"
          console.log("text",text)
          text[0] = text[0].slice(0,1).toUpperCase() + text[0].slice(1).toLowerCase()
          text = text.join(" ")
      } else {
          text = key.slice(0,1).toUpperCase() + key.slice(1).toLowerCase()
      }
      tblh.textContent = text;
      console.log(tblh);
      tblr1.appendChild(tblh);
    }
    tbl.appendChild(tblr1);
    output.appendChild(tbl);
  }

  newRow() {
    console.log("this",this)
    let tbl = document.querySelector("table");
    let row = document.createElement("tr");
    for (const prop in this) {
        let cell = document.createElement("td");
        cell.textContent = this[prop];
        row.appendChild(cell)
    }
    tbl.appendChild(row);
  }
}

function generate() {
  try {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let jobTitle = faker.name.jobTitle();
    let prefix = faker.name.prefix();
    let suffix = faker.name.suffix();
    let fullName = `${prefix} ${firstName} ${lastName} ${suffix}`;
    let jobArea = faker.name.jobArea();
    let phone = faker.phone.phoneNumber();
    let email = faker.internet.email(firstName, lastName);
    let userName = faker.internet.userName(firstName, lastName);
    let password = faker.internet.password(10, true);
    // not available in current faker ver
    // let age = faker.date.birthdate()
    if (!output.textContent) Record.newTable();
    let record = new Record(firstName, lastName, email, userName, password);
    record.newRow()
  } catch (err) {
        throw new Error(err);
  }
}
