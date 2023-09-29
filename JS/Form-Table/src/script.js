const form = document.querySelector('#mainForm');
const formDataArray = [];
const employeeIdInput = form.querySelector('[name="employeeId"]');
const clearButton = document.querySelector('#cancelButton');
const tableBody = document.querySelector('#dataTableBody');
const errorElements = form.querySelectorAll('.text-danger');
const successMessageElement = document.querySelector('#successMessage');
const employeeTableContainer = document.querySelector('#employeeTableContainer');
const firstError = form.querySelector('.text-danger');

employeeIdInput.value = generateRandomEmployeeId();

// Create rows and cells in table
function addFormDataToTable(formData) {
    const newRow = tableBody.insertRow();

    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            const cell = newRow.insertCell();

            if (key === 'additionalNotes') {
                const chunks = notesBreak(formData[key], 20);
                cell.innerHTML = chunks.join('<br>'); // created <br> tag
            } else {
                cell.innerHTML = formData[key];
            }
        }
    }
}

// Push data to an array
function saveFormData(formData, formDataArray) {
    formDataArray.push(formData);
}

// Generate a random number between 0 to 10
function generateRandomEmployeeId() {
    const randomFloat = Math.random() * 10;
    const randomInteger = Math.floor(randomFloat); // Round it down to the nearest integer
    return randomInteger + 1;
}

// To show table data of additional notes in rows
function notesBreak(text, chunkLength) {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkLength) {
        const store = text.slice(i, i + chunkLength);
        chunks.push(store);
    }
    return chunks;
}

function clearAllErrorMessages(form) {
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

function clearSuccessMessage() {
    successMessageElement.textContent = '';
}

function showError(elementId, errorMessage) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = errorMessage;
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = '';
}

//validation functions
function validateText(element, minLength, maxLength, regexPattern, errorElementId, errorMessage) {
    const value = element.value.trim();
    if (value === '' || value.length < minLength || value.length > maxLength || !regexPattern.test(value)) {
        showError(errorElementId, errorMessage);
        return false;
    } else {
        clearError(errorElementId);
        return true;
    }
}

function validateRadio(elementName, errorElementId, errorMessage, form) {
    const radios = form.elements[elementName];
    if (!Array.from(radios).some(radio => radio.checked)) {
        showError(errorElementId, errorMessage);
        return false;
    } else {
        clearError(errorElementId);
        return true;
    }
}

function validateDob(element, errorElementId) {
    const dob = element.value.trim();
    if (dob === '' || !isValidDateFormat(dob)) {
        showError(errorElementId, 'Invalid date of birth (yyyy-mm-dd)');
        return false;
    } else {
        const [year, month, day] = dob.split('-').map(Number);
        if (month < 1 || month > 12 || day < 1 || day > 31) {
            showError(errorElementId, 'Invalid date of birth (mm and dd must be valid)');
            return false;
        } else {
            const age = calculateAge(dob);
            if (age < 18 || age > 100) {
                showError(errorElementId, 'Age must be between 18 and 100');
                return false;
            } else {
                clearError(errorElementId);
                return true;
            }
        }
    }
}

function isValidDateFormat(date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
}

function calculateAge(dob) {
    const dobDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dobDate.getFullYear();
    if (currentDate.getMonth() < dobDate.getMonth() || (currentDate.getMonth() === dobDate.getMonth() && currentDate.getDate() < dobDate.getDate())) {
        return age - 1;
    }
    return age;
}

function validateCheckbox(elementName, errorElementId, errorMessage) {
    const checkboxes = form.elements[elementName];
    if (!Array.from(checkboxes).some(checkbox => checkbox.checked)) {
        showError(errorElementId, errorMessage);
        return false;
    } else {
        clearError(errorElementId);
        return true;
    }
}

function validateSelect(element, errorElementId, errorMessage) {
    if (element.value === '') {
        showError(errorElementId, errorMessage);
        return false;
    } else {
        clearError(errorElementId);
        return true;
    }
}

function validateNumber(element, minLength, maxLength, errorElementId, errorMessage) {
    const value = element.value.trim();
    if (value === '' || value.length < minLength || value.length > maxLength || isNaN(value)) {
        showError(errorElementId, errorMessage);
        return false;
    } else {
        clearError(errorElementId);
        element.value = parseFloat(value).toFixed(2);
        return true;
    }
}

function validateAdditionalNotes(element, regexPattern, errorElementId, errorMessage) {
    const value = element.value.trim();
    if (value !== '' && !regexPattern.test(value)) {
        showError(errorElementId, errorMessage);
        return false;
    } else {
        clearError(errorElementId);
        return true;
    }
}

// clear button
clearButton.addEventListener('click', function () {
    form.reset();
    clearAllErrorMessages(form);
    clearSuccessMessage();
});

// Submit button
form.addEventListener('submit', function (event) {
    clearSuccessMessage();
    let valid = true;

    // Validation function values
    valid = validateText(form.elements.fullname, 3, 20, /^[a-zA-Z\s]+$/, 'nameError', 'Max.Length - 20, Min.Length - 3, Only alphabets and spaces are allowed.') && valid;
    valid = validateRadio('gender', 'genderSelectError', 'Gender is mandatory', form) && valid;
    valid = validateDob(form.elements.dob, 'dobValue', form) && valid;
    valid = validateText(form.elements.ssn, 7, 9, /^[0-9]+(-[0-9]+)*$/, 'ssnError', 'Max.Length-9, Min.Length-7, Numbers and hyphens are only allowed.') && valid;
    valid = validateText(form.elements.address, 1, 100, /^[a-zA-Z0-9]+(?:\s*[ ,-]\s*[a-zA-Z0-9]+)*$/, 'addressError', 'Alphanumeric, spaces, commas and hyphens are only allowed') && valid;
    valid = validateText(form.elements.phone, 7, 10, /^[0-9]+$/, 'phoneError', 'Max.Length-10, Min.Length-7, Only numbers are allowed.') && valid;
    valid = validateText(form.elements.email, 1, 50, /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@(gmail\.com|yahoo\.com)$/, 'emailError', 'Max.Length-50, gmail.com and yahoo.com are only allowed') && valid;
    valid = validateCheckbox('communication', 'communicationError', 'Select at least one communication method') && valid;
    valid = validateText(form.elements.jobTitle, 3, 50, /^[A-Za-z\s]+$/, 'jobTitleSpan', 'Max.Length-50, Min.Length-3, Only alphabets and spaces are allowed') && valid;
    valid = validateSelect(form.elements.department, 'departmentError', 'Select a department') && valid;
    valid = validateNumber(form.elements.salary, 3, 10, 'salaryError', 'Max.Length-10, Min.Length-3, Only numbers are allowed') && valid;
    valid = validateText(form.elements.hobbies, 3, 25, /^[A-Za-z\s]+(?:,[A-Za-z\s]+|-?[A-Za-z\s]+)*$/, 'hobbiesError', ' Max.Length-25, Min.Length-3 , Alphabets , commas and hyphens are only allowed') && valid;
    valid = validateAdditionalNotes(form.elements.notes, /^[a-zA-Z0-9\s]+(?:[.,][a-zA-Z0-9\s]+)*[.,]?$/, 'notesError', 'Alphanumeric characters with spaces, commas and dots are only allowed') && valid;

    if (valid) {
        const formData = {
            'fullName': form.querySelector('[name="fullname"]').value.trim(),
            'gender': form.querySelector('[name="gender"]:checked').value,
            'dateOfBirth': form.querySelector('[name="dob"]').value.trim(),
            'socialSecurityNumber': form.querySelector('[name="ssn"]').value.trim(),
            'address': form.querySelector('[name="address"]').value.trim(),
            'phoneNumber': form.querySelector('[name="phone"]').value.trim(),
            'email': form.querySelector('[name="email"]').value.trim(),
            'preferredCommunication': Array.from(form.querySelectorAll('[name="communication"]:checked')).map(cb => cb.value).join(', '),
            'employeeID': generateRandomEmployeeId(),
            'jobTitle': form.querySelector('[name="jobTitle"]').value.trim(),
            'department': form.querySelector('[name="department"]').value.trim(),
            'salary': form.querySelector('[name="salary"]').value.trim(),
            'hobbies': form.querySelector('[name="hobbies"]').value.trim(),
            'additionalNotes': form.querySelector('[name="notes"]').value.trim(),
        };

        saveFormData(formData, formDataArray);
        form.reset();
        addFormDataToTable(formData);
        employeeTableContainer.style.display = 'block';
        event.preventDefault();
        successMessageElement.textContent = 'All information entered successfully!';
        employeeIdInput.value = generateRandomEmployeeId();
    }

    if (!valid) {
        firstError.scrollIntoView({
            behavior: 'smooth'
        });
        event.preventDefault();
    }
});
