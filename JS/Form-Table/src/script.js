document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#mainForm');
    const formDataArray = [];
    const employeeIdInput = form.querySelector('[name="employeeId"]');
    const clearButton = document.querySelector('#cancelButton');
    employeeIdInput.value = generateRandomEmployeeId();

    //To generate random number
    function generateRandomEmployeeId() {
        return Math.floor(Math.random() * 9) + 1;
    }
    
    //Create rows and cells in table
    function addFormDataToTable(formData) {
        const tableBody = document.querySelector('#dataTableBody');
        const newRow = tableBody.insertRow();

        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                const cell = newRow.insertCell();
                cell.innerHTML = formData[key];
            }
        }
    }

    // Push data's to an array
    function saveFormData(formData) {
        formDataArray.push(formData);
    }
    
    //clear button
    clearButton.addEventListener('click', function () {
        form.reset();
    });

    //Submit button
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
                if (month < 1 || month > 12 || day < 1 || day > getDaysInMonth(year, month)) {
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

        function getDaysInMonth(year, month) {
            return new Date(year, month, 0).getDate();
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

        function showError(elementId, errorMessage) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = errorMessage;
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

        function validateAdditionalNotes(element, regexPattern, errorElementId, errorMessage) {
            const value = element.value.trim();
            if (value !== '' && !regexPattern.test(value)) {
                showError(errorElementId, errorMessage);
                valid = false;
            } else {
                clearError(errorElementId);
            }
        }

        validateText(form.elements.fullname, 3, 20, /^[A-Za-z\s]+$/, 'nameError', 'Max.Length - 20, Min.Length - 3, Should accept alphabets and spaces only.');
        validateRadio('gender', 'genderSelectError', 'Gender is mandatory');
        validateDob(form.elements.dob, 'dobValue', 'Age should be between 18 and 100,Date Format: yyyy-mm-dd'); // Validate DOB field
        validateText(form.elements.ssn, 7, 9, /^[0-9-]+$/, 'ssnError', 'Max.Length-9, Min.Length-7, Should accept numbers and hyphens only.');
        validateText(form.elements.address, 1, 100, /^[A-Za-z0-9\s,.-]+$/, 'addressError', 'Should accept alphanumeric, spaces, commas and hyphens only');
        validateText(form.elements.phone, 7, 10, /^[0-9]+$/, 'phoneError', 'Max.Length-10, Min.Length-7, Should accept numbers only.');
        validateText(form.elements.email, 1, 50, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'emailError', 'Max.Length-50, Should accept gmail.com and yahoo.com only');
        validateCheckbox('communication', 'communicationError', 'Select at least one communication method');
        form.elements.employeeId.value = Math.floor(Math.random() * 10) + 1;
        validateText(form.elements.jobTitle, 3, 50, /^[A-Za-z\s]+$/, 'jobTitleSpan', 'Max.Length-50, Min.Length-3, Should accept alphabets and spaces only');
        validateSelect(form.elements.department, 'departmentError', 'Select a department');
        validateNumber(form.elements.salary, 3, 10, 'salaryError', 'Max.Length-10, Min.Length-3, Should accept only numbers');
        validateText(form.elements.hobbies, 3, 25, /^[A-Za-z,\s-]+$/, 'hobbiesError', 'Max.Length-25, Min.Length-3, Should accept alphabets with commas and hyphens only');
        validateAdditionalNotes(form.elements.notes, /^[A-Za-z0-9\s,.]+$/,'notesError','Should accept alphanumeric characters with spaces, commas and dots only');
        if (valid) {
            const formData = {
                'Full Name': form.querySelector('[name="fullname"]').value.trim(),
                Gender: form.querySelector('[name="gender"]:checked').value,
                'Date of Birth': form.querySelector('[name="dob"]').value.trim(),
                'Social Security Number': form.querySelector('[name="ssn"]').value.trim(),
                Address: form.querySelector('[name="address"]').value.trim(),
                'Phone Number': form.querySelector('[name="phone"]').value.trim(),
                Email: form.querySelector('[name="email"]').value.trim(),
                'Preferred Communication': Array.from(form.querySelectorAll('[name="communication"]:checked')).map(cb => cb.value).join(', '),
                'Employee ID': form.querySelector('[name="employeeId"]').value.trim(),
                'Job Title': form.querySelector('[name="jobTitle"]').value.trim(),
                Department: form.querySelector('[name="department"]').value.trim(),
                Salary: form.querySelector('[name="salary"]').value.trim(),
                Hobbies: form.querySelector('[name="hobbies"]').value.trim(),
                AdditionalNotes: form.querySelector('[name="notes"]').value.trim(),
            };

            saveFormData(formData);
            form.reset();
            addFormDataToTable(formData);
            const employeeTableContainer = document.getElementById('employeeTableContainer');
            employeeTableContainer.style.display = 'block';
            event.preventDefault();
        }

        if (!valid) {
            event.preventDefault();
            form.scrollIntoView({ behavior:'smooth' });
            event.preventDefault();
        }
    });
});