function Employee(account, name, email, pass, workingDay, basicSalary, title, workingTime) {
    this.account = account,
    this.name = name,
    this.email = email,
    this.pass = pass,
    this.workingDay = workingDay,
    this.basicSalary = basicSalary,
    this.title = title,
    this.workingTime = workingTime,
    this.totalSalary = function() {

        if (this.title == "Sếp") return (this.basicSalary * 3)
        else if (this.title == "Trưởng phòng") return (this.basicSalary * 2)
        else return this.basicSalary
    }
    this.rank = function() {
        if (this.workingTime >= 192) return "Xuất sắc"
        else if (this.workingTime >= 176) return "Giỏi"
        else if (this.workingTime >= 160) return "Khá"
        else return "Trung Bình"
    }
    this.tableText = 
    `
    <tr>
        <td>${this.account}</td>
        <td>${this.name}</td>
        <td>${this.email}</td>
        <td>${this.workingDay}</td>
        <td>${this.title}</td>
        <td>${this.totalSalary()}</td>
        <td>${this.rank()}</td>
        <td>
        <button class="btn btn-danger" onclick="editEmployee('${this.account}')">
            <i class="fa-sharp fa-regular fa-pen-to-square"></i>
        </button>
        <button class="btn btn-warning" onclick="deleteEmployee('${this.account}')">
            <i class="fa-solid fa-trash"></i>
        </button>
        </td>
    </tr>`
}

var account = domId('tknv')
var eName = domId('name')
var email = domId('email')
var pass = domId('password')
var workingDay = domId('datepicker')
var basicSalary = domId('luongCB')
var title = domId('chucvu')
var workingTime = domId('gioLam')
var tableList = domId('tableDanhSach')

var employeeList = []
getStorage() 
renderDisplay()
checkInput()

// btn add Employee onlick
domId('btnThemNV').onclick = function() {

    // create new employee object with user input value & update into employee list
    var newEmployee = new Employee(account.value, eName.value, email.value, pass.value, workingDay.value, 
        basicSalary.value, title.value, workingTime.value)

    if (!isAllInput(newEmployee)) {
        alert('Please fill all the infor')
    } else if (!checkAccount() || !checkName() || !checkEmail() || !checkPassword() ||
    !checkInputRange(basicSalary,"tbLuongCB", 1000000, 20000000) || 
    !checkInputRange(workingTime,"tbGiolam", 80, 200)) {
        alert('Check the alert box to fill infor')
    } else if (isExist(account, "account") || isExist(email, "email")) {
        alert("User exist")
    } else {    
        employeeList.push(newEmployee)
    
        // move to local storage
        setStorage()
        renderDisplay()

        // reset input field
        updateInput("", "", "", "", "", "", "Chọn chức vụ", "")

        // Close the modal after input & add employee
        domId('btnThemNV').setAttribute("data-toggle", "modal");
        domId('btnThemNV').setAttribute("data-target", "#myModal");
    }  
}

function editEmployee(eAccount) {

    
    // Find index of the update account in employee list to reach all the info & update into input field
    var updatingEmployee = employeeList[findIndex(eAccount)]
    updateInput(eAccount, updatingEmployee.name, updatingEmployee.email, updatingEmployee.pass,
        updatingEmployee.workingDay, updatingEmployee.basicSalary, updatingEmployee.title, updatingEmployee.workingTime)

    // Prevent user from change account, disable add new button
    account.readOnly = true
    domId('btnThemNV').disabled = true

    // update value
    domId('btnCapNhat').onclick = function() {
        // get the updated value from input to an object => replace the old one
        var updatedEmployee = new Employee(account.value, eName.value, email.value, pass.value, workingDay.value, 
            basicSalary.value, title.value, workingTime.value)

        if (!isAllInput(updatedEmployee)) {
            alert('Please fill all the infor')
        } else if (!checkAccount() || !checkName() || !checkEmail() || !checkPassword() ||
        !checkInputRange(basicSalary,"tbLuongCB", 1000000, 20000000) || 
        !checkInputRange(workingTime,"tbGiolam", 80, 200)) {
            alert('Check the alert box to fill infor')
        } else {
        employeeList[findIndex(eAccount)] = updatedEmployee

        // update local storage
        setStorage()
        renderDisplay()

        // reset input & button
        updateInput("", "", "", "", "", "", "Chọn chức vụ", "")
        account.readOnly = false
        domId('btnThemNV').disabled = false

        // Close the modal after input & add employee
        domId('btnCapNhat').setAttribute("data-toggle", "modal");
        domId('btnCapNhat').setAttribute("data-target", "#myModal");
        }
    }
}

function deleteEmployee(eAccount) {
    // delete in employee list
    employeeList.splice(findIndex(eAccount), 1)

    // upate local storage & render display
    setStorage()
    renderDisplay()
}

domId('btnTimNV').onclick = function() {

    // Reset table if there is no input in searchbox
    domId('searchName').oninput = function(e) {
        if (e.target.value == "") {
            renderDisplay()
        }
    }

    var searchRank = domId('searchName').value

    tableList.innerHTML = ""
    for (var employeeItem of employeeList) {
        if (searchRank == employeeItem.rank()) {
            tableList.innerHTML += employeeItem.tableText
        }
    }  
}



















