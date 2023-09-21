document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('mainForm');
    const formDataArray = []; // Array to store form data

    // Function to add form data to the table
    function addFormDataToTable(formData) {
        const tableBody = document.getElementById('dataTableBody');
        const newRow = tableBody.insertRow();

        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                const cell = newRow.insertCell();
                cell.innerHTML = formData[key];
            }
        }
    }

    // Function to save form data
    function saveFormData(formData) {
        formDataArray.push(formData);
    }

    form.addEventListener('submit', function (event) {
        let valid = true;

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
            if (value === '') {
                showError(errorElementId, 'This field is required.');
                valid = false;
            } else if (value.length < minLength) {
                showError(errorElementId, `Minimum length is ${minLength}.`);
                valid = false;
            } else if (value.length > maxLength) {
                showError(errorElementId, `Maximum length is ${maxLength}.`);
                valid = false;
            } else if (!regexPattern.test(value)) {
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
                const [year, month, day] = dob.split('-').map(Number); // Split the date into year, month, and day
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
        // Function to get the number of days in a month for a given year and month
        function getDaysInMonth(year, month) {
            return new Date(year, month, 0).getDate();
        }
        // Function to check if the date is in yyyy-mm-dd format
        function isValidDateFormat(date) {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            return dateRegex.test(date);
        }

        // Function to calculate age from date of birth
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
                element.value = parseFloat(value).toFixed(2); // Format as two decimal places
            }
        }

        validateText(form.elements.fullname, 3, 20, /^[A-Za-z\s]+$/, 'firstName', 'Invalid full name. Only letters and spaces are allowed.');
        validateRadio('gender', 'genderSelectError', 'Gender is mandatory');
        validateDob(form.elements.dob, 'dobValue'); // Validate DOB field
        validateText(form.elements.ssn, 7, 9, /^[0-9-]+$/, 'sscValue', ' Use only numbers and dashes. Length min.7 & max.9 ');
        validateText(form.elements.address, 1, 100, /^[A-Za-z0-9\s,.-]+$/, 'addressValue', 'Special characters are not allowed.');
        validateText(form.elements.phone, 7, 10, /^[0-9]+$/, 'phoneNumber', 'Invalid phone number. Use only numbers.');
        validateText(form.elements.email, 1, 50, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'emailValue', 'Invalid email address');
        validateCheckbox('communication', 'communicationValue', 'Select at least one communication method');
        form.elements.employeeId.value = Math.floor(Math.random() * 9) + 1;
        validateText(form.elements.jobTitle, 3, 50, /^[A-Za-z\s]+$/, 'jobTitleSpan', 'Invalid job title');
        validateSelect(form.elements.department, 'departmentValue', 'Select a department');
        validateNumber(form.elements.salary, 3, 10, 'salaryValue', 'Invalid salary');
        validateText(form.elements.hobbies, 3, 25, /^[A-Za-z,\s-]+$/, 'hobbiesValue', 'Invalid hobbies. Only letters, commas, and hyphens are allowed.');
        validateText(form.elements.notes, 0, 100, /^[A-Za-z0-9\s,.]+$/, 'addNotesValue', 'Invalid additional notes');

        // If validation is successful, save the form data
        if (valid) {
            const formData = {
                'Full Name': form.elements.fullname.value.trim(),
                Gender: form.elements.gender.value,
                'Date of Birth': form.elements.dob.value.trim(),
                'Social Security Number': form.elements.ssn.value.trim(),
                Address: form.elements.address.value.trim(),
                'Phone Number': form.elements.phone.value.trim(),
                Email: form.elements.email.value.trim(),
                'Preferred Communication': Array.from(form.querySelectorAll('input[name="communication"]:checked')).map(cb => cb.value).join(', '),
                'Employee ID': form.elements.employeeId.value.trim(),
                'Job Title': form.elements.jobTitle.value.trim(),
                Department: form.elements.department.value.trim(),
                Salary: form.elements.salary.value.trim(),
                Hobbies: form.elements.hobbies.value.trim(),
                'Additional Notes': form.elements.notes.value.trim(),
            };

            saveFormData(formData);
            form.reset();
            addFormDataToTable(formData);
            event.preventDefault(); // Prevent form submission (you can remove this if you want to submit the form to a server)
        }

        if (!valid) {
            event.preventDefault(); // Prevent form submission if there are validation errors
        }
    });
});