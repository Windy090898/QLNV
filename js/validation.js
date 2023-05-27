function isExist(itemName, objectKey) {
    var value = itemName.value
    console.log(value)
    for (var item of employeeList) {
        console.log(item[objectKey])
        if (item[objectKey] == value) {
            return true
        }
    }
    return false
}

function isAllInput(newEmployee) {
    var keys = Object.keys(newEmployee)
    for (var key of keys) {
        if (newEmployee[key] == "") {
            return false
        }
    }
    return true
}

function checkItemInput(item, errorNotiID) {
    item.oninput = function(e) {
        if (e.target.value == "") {
            domId(errorNotiID).innerHTML = "Please input"
            domId(errorNotiID).style.display = "block"
        } else {
            domId(errorNotiID).style.display = "none"
        }
    }
}

function checkAccount() {
    if (account.value.length < 4 || account.value.length > 6) {
        domId("tbTKNV").innerHTML = "Account must have 4 - 6 characters"
        domId("tbTKNV").style.display = "block"
        return false
    } else {
        domId("tbTKNV").style.display = "none"
        return true
    }
}

function checkName() {
    let res = /^[a-zA-Z ]+$/

    if (!res.test(eName.value)) {
        domId("tbTen").innerHTML = "Name must include letter only"
        domId("tbTen").style.display = "block"
        return false
    } else {
        domId("tbTen").style.display = "none"
        return true
    }
}

function checkEmail() {
    
    let res = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!res.test(email.value)) {
        domId("tbEmail").innerHTML = "Please input right email format"
        domId("tbEmail").style.display = "block"
        return false
    } else {
        domId("tbEmail").style.display = "none"
        return true
    }
}

function checkPassword() {
    let res = /^(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,10}$/

    if (!res.test(pass.value)) {
        domId("tbMatKhau").innerHTML = "Password must contain 6 - 10 characters (include at least 1 number, 1 uppercase, 1 special character)"
        domId("tbMatKhau").style.display = "block"
        return false
    } else {
        domId("tbMatKhau").style.display = "none"
        return true
    }
}

function checkRange(item, errorNotiID, min, max) {
    item.oninput = function(e) {
        var value = Number(e.target.value)
        console.log(value)
        if (isNaN(value)) {
            domId(errorNotiID).innerHTML = "Please input number only"
            domId(errorNotiID).style.display = "block"
        } else if (value < min || value > max) {
            domId(errorNotiID).innerHTML = `Please input in range from ${min.toLocaleString()} to ${max.toLocaleString()}`
            domId(errorNotiID).style.display = "block"
        } else {
            domId(errorNotiID).style.display = "none"
    }
    }
}

function checkInputRange(item, errorNotiID, min, max) {
    var value = item.value * 1
    if (isNaN(value)) return false
    else if (value < min || value > max) return false
    else return true
}
    

function checkInput() {
    checkItemInput(account, "tbTKNV")
    checkItemInput(eName, "tbTen")
    checkItemInput(email, "tbEmail")
    checkItemInput(pass, "tbMatKhau")
    checkItemInput(workingDay, "tbNgay")
    checkItemInput(basicSalary, "tbLuongCB")
    checkItemInput(title, "tbChucVu")
    checkItemInput(workingTime, "tbGiolam")
    account.oninput = checkAccount
    eName.oninput = checkName
    email.oninput = checkEmail
    pass.oninput = checkPassword
    checkRange(basicSalary,"tbLuongCB", 1000000, 20000000)
    checkRange(workingTime,"tbGiolam", 80, 200)
}

