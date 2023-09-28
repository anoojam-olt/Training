document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#mainForm');
    const clearButton = document.querySelector('#cancelButton');
    const employeeIdInput = form.querySelector('#employeeId')
    employeeIdInput.value = generateRandomEmployeeId();

    //To generate the random number
    function generateRandomEmployeeId() {
        const randomFloat = Math.random() * 10; // Generate a random floating-point number between 0 and 10
        const randomInteger = Math.floor(randomFloat); // Round it down to the nearest integer
        return randomInteger + 1;
    }

    //To clear all error messages on span
    function clearAllErrorMessages() {
        const errorElements = form.querySelectorAll('.text-danger');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }

    clearButton.addEventListener('click', function () {
        form.reset();
        clearAllErrorMessages();
    });

    form.addEventListener('submit', function (event) {
        let valid = true;

        function showError(elementId, errorMessage) {
            const errorElement = form.querySelector(`#${elementId}`);
            errorElement.textContent = errorMessage;
        }

        function clearError(elementId) {
            const errorElement = form.querySelector(`#${elementId}`);
            errorElement.textContent = '';
        }

        function validateText(element, minLength, maxLength, regexPattern, errorElementId, errorMessage) {
            const value = element.value.trim();
            if (value === '' || value.length < minLength || value.length > maxLength || !regexPattern.test(value)) {
                showError(errorElementId, errorMessage);
                valid = false;
            } else {
                clearError(errorElementId);
            }
        }

        function validateDob(element, errorElementId) {
            const dob = element.value.trim();
            if (dob === '' || !isValidDateFormat(dob)) {
                showError(errorElementId, 'Invalid date of birth (yyyy-mm-dd)');
                valid = false;
            } else {
                const [year, month, day] = dob.split('-').map(Number);
                if (month < 1 || month > 12 || day < 1 || day > 31) {
                    showError(errorElementId, 'Invalid date of birth (mm and dd must be valid)');
                    valid = false;
                } else {
                    const age = calculateAge(dob);
                    if (age < 18 || age > 100) {
                        showError(errorElementId, 'Age must be between 18 and 100');
                        valid = false;
                    } else {
                        clearError(errorElementId);
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

        function clearError(elementId) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = '';
        }

        function validateText(element, minLength, maxLength, regexPattern, errorElementId, errorMessage) {
            const value = element.value.trim();
            if (value === '' || value.length < minLength || value.length > maxLength || !regexPattern.test(value)) {
                showError(errorElementId, errorMessage);
                valid = false;
            } else {
                clearError(errorElementId);
            }
        }

        function validateRadio(elementName, errorElementId, errorMessage) {
            const radios = form.elements[elementName];
            if (!Array.from(radios).some(radio => radio.checked)) {
                showError(errorElementId, errorMessage);
                valid = false;
            } else {
                clearError(errorElementId);
            }
        }

        function validateCheckbox(elementName, errorElementId, errorMessage) {
            const checkboxes = form.elements[elementName];
            if (!Array.from(checkboxes).some(checkbox => checkbox.checked)) {
                showError(errorElementId, errorMessage);
                valid = false;
            } else {
                clearError(errorElementId);
            }
        }

        function validateSelect(element, errorElementId, errorMessage) {
            if (element.value === '') {
                showError(errorElementId, errorMessage);
                valid = false;
            } else {
                clearError(errorElementId);
            }
        }

        function validateNumber(element, minLength, maxLength, errorElementId, errorMessage) {
            const value = element.value.trim();
            if (value === '' || value.length < minLength || value.length > maxLength || isNaN(value)) {
                showError(errorElementId, errorMessage);
                valid = false;
            } else {
                clearError(errorElementId);
                element.value = parseFloat(value).toFixed(2);
            }
        }

        const notesPattern = /^[a-zA-Z0-9]+(?:[,.][a-zA-Z0-9]+)*$/;

        function validateAdditionalNotes(element, regexPattern, errorElementId, errorMessage) {
            const value = element.value.trim();
            if (value !== '' && !regexPattern.test(value)) {
                showError(errorElementId, errorMessage);
                valid = false;
            } else {
                clearError(errorElementId);
            }
        }
        //validation function values

        validateAdditionalNotes(form.elements.notes, notesPattern, 'addNotesError', 'Alphanumeric characters with spaces, commas and dots are only allowed');
        validateText(form.elements.fullname, 3, 20, /^[A-Za-z\s]+$/, 'firstName', 'Max.Length-20, Min.Length-3, Only alphabets and spaces are allowed.');
        validateRadio('gender', 'genderSelectError', 'Gender is mandatory');
        validateDob(form.elements.dob, 'dobError', 'Age should be between 18 and 100, Date Format: yyyy-mm-dd');
        validateText(form.elements.ssn, 7, 9, /^[0-9-]+$/, 'ssnError', 'Max.Length-9, Min.Length-7, Numbers and hyphens are only allowed.');
        validateText(form.elements.address, 1, 100, /^[a-zA-Z0-9]+(?:[ ,-][a-zA-Z0-9]+)*$/, 'addressError', 'Alphanumeric, spaces, commas and hyphens are only allowed');
        validateText(form.elements.phone, 7, 10, /^[0-9]+$/, 'phoneError', 'Max.Length-10, Min.Length-7, Only numbers are allowed.');
        validateText(form.elements.email, 1, 50, /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@(gmail\.com|yahoo\.com)$/, 'emailError', 'Max.Length-50,  gmail.com and yahoo.com are only allowed');
        validateCheckbox('communication', 'communicationError', 'Select at least one communication method');
        validateText(form.elements.jobTitle, 3, 50, /^[A-Za-z\s]+$/, 'jobError', 'Max.Length-50, Min.Length-3, Only alphabets and spaces are allowed');
        validateSelect(form.elements.department, 'departmentValueError', 'Select a department');
        validateNumber(form.elements.salary, 3, 10, 'salaryError', 'Max.Length-10, Min.Length-3, Only numbers are allowed');
        validateText(form.elements.hobbies, 3, 25, /^[a-zA-Z]+(?:,[a-zA-Z]+|-?[a-zA-Z]+)*$/, 'hobbiesError', 'Max.Length-25, Min.Length-3, Alphabets , commas and hyphens are  only allowed');

        if (!valid) {
            const firstError = form.querySelector('.text-danger');
            firstError.scrollIntoView({
                behavior: 'smooth'
            });
            event.preventDefault();
        }
    });
});