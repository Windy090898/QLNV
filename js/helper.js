function domId(id) {
    return document.getElementById(id)
}

function setStorage() {
    localStorage.setItem("employeeList", JSON.stringify(employeeList))
}

function getStorage() {
    var storageList = JSON.parse(localStorage.getItem("employeeList"))
    if (storageList != null) {
        for (var storageItem of storageList) {
            var temp = new Employee()
            Object.assign(temp, storageItem)
            employeeList.push(temp)
        }
    }
}

function renderDisplay() {
    tableList.innerHTML = ""
    for (var employeeItem of employeeList) {
        tableList.innerHTML += employeeItem.tableText
    }
}

function findIndex(eAccount) {
    var index = -1
    for (var i in employeeList) {
        if (employeeList[i].account == eAccount) {
            index = i
        }
    }
    return index
}

function updateInput(acc, name, mail, password, wDay, bSalary, eTitle, wTime) {
    account.value = acc
    eName.value = name
    email.value = mail
    pass.value = password
    workingDay.value = wDay
    basicSalary.value = bSalary
    title.value = eTitle
    workingTime.value = wTime
}