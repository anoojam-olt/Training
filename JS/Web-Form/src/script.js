const form = document.querySelector('#mainForm');
const errorElements = form.querySelectorAll('.text-danger');
const successMessageElement = document.querySelector('#successMessage');
const clearButton = document.querySelector('#cancelButton');
const employeeIdInput = form.querySelector('[name="employeeId"]');
const genderOptions = document.querySelectorAll('[name="gender"]');
const communicationOptions = form.querySelectorAll('[name="communication"]');


employeeIdInput.value = generateRandomEmployeeId();

// Clear all error messages
function clearAllErrorMessages() {
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

// Show an error message
function showError(elementId, errorMessage) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = errorMessage;
}

// Clear an error message
function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = '';
}

function validateDOB(element, errorElementId) {
    const dob = element.value.trim();
    const errorElement = document.getElementById(errorElementId);
    errorElement.textContent = ''; // Clear any previous error message

    // Check if the DOB is not empty
    if (dob === '') {
        errorElement.textContent = 'DOB is mandatory.';
        return false;
    }

    // Check if the DOB is in the correct format (yyyy-mm-dd)
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(dob)) {
        errorElement.textContent = 'Invalid date format, please enter in yyyy-mm-dd format.';
        return false;
    }

    // Parse the DOB into a Date object
    const dobDate = new Date(dob);

    // Check if the parsed date is a valid date
    if (isNaN(dobDate) || dobDate.toISOString().slice(0, 10) !== dob) {
        errorElement.textContent = 'Invalid date or month.';
        return false;
    }

    // Calculate the age based on the DOB
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();

    // Check if the age is within the valid range (between 18 and 100)
    if (age < 18 || age > 100) {
        errorElement.textContent = 'Age should be between 18 and 100 years old.';
        return false;
    }

    return true;
}
// Generate a random employee ID
function generateRandomEmployeeId() {
    return Math.floor(Math.random() * 10) + 1;
}

// Clear form and error messages
function clearForm() {
    form.reset();
    clearAllErrorMessages();
    successMessageElement.textContent = '';
    employeeIdInput.value = generateRandomEmployeeId();
}


// Validation function for the salary field
function validateSalary(element, minLength, maxLength, regexPattern, errorElementId, errorMessage) {
    const value = element.value.trim();
    if (value === '' || value.length < minLength || value.length > maxLength || !regexPattern.test(value)) {
        showError(errorElementId, errorMessage);
        return false;
    }
    // Format the salary as an amount with two decimal places
    element.value = parseFloat(value).toFixed(2);
    return true;
}

function validateAdditionalNotes(element, regexPattern, errorElementId, errorMessage) {
    const value = element.value.trim();
    if (value !== '' && !regexPattern.test(value)) {
        showError(errorElementId, errorMessage);
        return false;
    }
    return true;
}
// Validation functions
function validateText(element, minLength, maxLength, regexPattern, errorElementId, errorMessage) {
    const value = element.value.trim();
    if (value === '' || value.length < minLength || value.length > maxLength || !regexPattern.test(value)) {
        showError(errorElementId, errorMessage);
        return false;
    }
    return true;
}
// Event listener for the clear button
clearButton.addEventListener('click', clearForm);

// Event listener for form submission
form.addEventListener('submit', function (event) {
    event.preventDefault();
    clearAllErrorMessages();


    // Validation functions for specific fields
    const fullnameValid = validateText(form.elements.fullname, 3, 20, /^[a-zA-Z\s]+$/, 'nameError', 'Max.Length - 20, Min.Length - 3, Only alphabets and spaces are allowed.');

    const checkedGenderOptions = Array.from(genderOptions).filter(option => option.checked);

    const dobValid = validateDOB(form.elements.dob, 'dobValue');
    const ssnValid = validateText(form.elements.ssn, 7, 9, /^[0-9]+(-[0-9]+)*$/, 'ssnError', 'Max.Length-9, Min.Length-7, Numbers and hyphens are only allowed.');
    const addressValid = validateText(form.elements.address, 1, 100, /^[a-zA-Z0-9]+(?:\s*[ ,-]\s*[a-zA-Z0-9]+)*$/, 'addressError', 'Alphanumeric, spaces, commas and hyphens are only allowed');
    const phoneValid = validateText(form.elements.phone, 7, 10, /^[0-9]+$/, 'phoneError', 'Max.Length-10, Min.Length-7, Only numbers are allowed.');
    const emailValid = validateText(form.elements.email, 1, 50, /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@(gmail\.com|yahoo\.com)$/, 'emailError', 'Max.Length-50, gmail.com and yahoo.com are only allowed');
    const checkedCommunicationOptions = Array.from(communicationOptions).filter(option => option.checked);

    const jobTitleValid = validateText(form.elements.jobTitle, 3, 50, /^[A-Za-z\s]+$/, 'jobTitleSpan', 'Max.Length-50, Min.Length-3, Only alphabets and spaces are allowed');
    const departmentValid = validateText(form.elements.department, 1, 50, /^[A-Za-z\s]+$/, 'departmentError', 'Select a department');
    const salaryValid = validateSalary(form.elements.salary, 3, 10, /^[0-9.]+$/, 'salaryError', 'Max.Length-10, Min.Length-3, Only numbers are allowed');
    const hobbiesValid = validateText(form.elements.hobbies, 3, 25, /^[A-Za-z\s,|-]+$/, 'hobbiesError', ' Max.Length-25, Min.Length-3 , Alphabets , commas and hyphens are only allowed');
    const additionalNotesValid = validateAdditionalNotes(form.elements.notes, /^[a-zA-Z0-9\s]+(?:[.,][a-zA-Z0-9\s]+)*[.,]?$/, 'notesError', 'Alphanumeric characters with spaces, commas, and dots are only allowed');

    if (checkedGenderOptions.length === 0) {
        showError('genderSelectError', 'Please select a gender.');
    }

    if (checkedCommunicationOptions.length === 0) {
        showError('communicationError', 'Select at least one preferred method of communication.');
    }
    // Check if all validations pass
    if (fullnameValid && checkedGenderOptions.length > 0 && dobValid && ssnValid && addressValid && phoneValid && emailValid && jobTitleValid && departmentValid && salaryValid && hobbiesValid && additionalNotesValid && checkedCommunicationOptions.length > 0) {
        // Process the form data (you can collect and use it as needed)
        const formData = {
            'fullName': form.elements.fullname.value.trim(),
            'gender': form.querySelector('[name="gender"]:checked').value,
            'dateOfBirth': form.elements.dob.value.trim(),
            'socialSecurityNumber': form.elements.ssn.value.trim(),
            'address': form.elements.address.value.trim(),
            'phoneNumber': form.elements.phone.value.trim(),
            'email': form.elements.email.value.trim(),
            'preferredCommunication': Array.from(form.querySelectorAll('[name="communication"]:checked')).map(cb => cb.value).join(', '),
            'employeeID': generateRandomEmployeeId(),
            'jobTitle': form.elements.jobTitle.value.trim(),
            'department': form.elements.department.value.trim(),
            'salary': form.elements.salary.value.trim(),
            'hobbies': form.elements.hobbies.value.trim(),
            'additionalNotes': form.elements.notes.value.trim(),
        };

        // Reset the form and show a success message
        clearForm();
        successMessageElement.textContent = 'All information entered successfully!';
        form.submit();
    } else {
        // Scroll to the first error message
        errorElements[0].scrollIntoView({
            behavior: 'smooth'
        });
    }
});
