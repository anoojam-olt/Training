$(document).ready(function() {
    // Generate a random number between 0 and 10
    function generateRandomEmployeeId() {
        const randomInteger = Math.floor(Math.random() * 10) + 1;
        return randomInteger;
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

    // Create rows and cells in table
    function addFormDataToTable(formData) {
        const newRow = $('<tr>');

        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                const cell = $('<td>');

                if (key === 'additionalNotes') {
                    const chunks = notesBreak(formData[key], 20);
                    cell.html(chunks.join('<br>'));
                } else {
                    cell.html(formData[key]);
                }

                newRow.append(cell);
            }
        }

        $('#dataTableBody').append(newRow);
    }

    // Push data to an array
    function saveFormData(formData, formDataArray) {
        formDataArray.push(formData);
    }

    function clearAllErrorMessages(form) {
        const errorElements = form.find('.text-danger');
        errorElements.each(function() {
            $(this).text('');
        });
    }

    function clearSuccessMessage() {
        $('#successMessage').text('');
    }

    function showError(elementId, errorMessage) {
        $('#' + elementId).text(errorMessage);
    }

    function clearError(elementId) {
        $('#' + elementId).text('');
    }

    function validateText(element, minLength, maxLength, regexPattern, errorElementId, errorMessage) {
        const value = element.val().trim();
        if (value === '' || value.length < minLength || value.length > maxLength || !regexPattern.test(value)) {
            showError(errorElementId, errorMessage);
            return false;
        } else {
            clearError(errorElementId);
            return true;
        }
    }

    function validateDob(element, errorElementId) {
        const dob = element.val().trim();
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
    
    function validateRadio(elementName, errorElementId, errorMessage, form) {
        const radios = form.find('[name="' + elementName + '"]');
        if (!radios.is(':checked')) {
            showError(errorElementId, errorMessage);
            return false;
        } else {
            clearError(errorElementId);
            return true;
        }
    }
    
    function validateCheckbox(elementName, errorElementId, errorMessage, form) {
        const checkboxes = form.find('[name="' + elementName + '"]');
        if (!checkboxes.is(':checked')) {
            showError(errorElementId, errorMessage);
            return false;
        } else {
            clearError(errorElementId);
            return true;
        }
    }
    
    function validateSelect(element, errorElementId, errorMessage) {
        if (element.val() === '') {
            showError(errorElementId, errorMessage);
            return false;
        } else {
            clearError(errorElementId);
            return true;
        }
    }
    
    function validateNumber(element, minLength, maxLength, errorElementId, errorMessage) {
        const value = element.val().trim();
        if (value === '' || value.length < minLength || value.length > maxLength || isNaN(value)) {
            showError(errorElementId, errorMessage);
            return false;
        } else {
            clearError(errorElementId);
            element.val(parseFloat(value).toFixed(2));
            return true;
        }
    }
    
    function validateAdditionalNotes(element, regexPattern, errorElementId, errorMessage) {
        const value = element.val().trim();
        if (value !== '' && !regexPattern.test(value)) {
            showError(errorElementId, errorMessage);
            return false;
        } else {
            clearError(errorElementId);
            return true;
        }
    }
    
    $('#mainForm').on('submit', function(event) {
        clearSuccessMessage();
        let valid = true;
    
        valid = validateText($('#fullname'), 3, 20, /^[A-Za-z\s]+$/, 'nameError', 'Max.Length - 20, Min.Length - 3, Only alphabets and spaces are allowed.') && valid;
        valid = validateRadio('gender', 'genderSelectError', 'Gender is mandatory', $(this)) && valid;
        valid = validateDob($('#dob'), 'dobValue') && valid;
        valid = validateText($('#ssn'), 7, 9, /^[0-9]+(-[0-9]+)*$/, 'ssnError', 'Max.Length-9, Min.Length-7, Numbers and hyphens are only allowed.') && valid;
        valid = validateText($('#address'), 1, 100, /^[a-zA-Z0-9]+(?:[ ,-][a-zA-Z0-9]+)*$/, 'addressError', 'Alphanumeric, spaces, commas and hyphens are only allowed') && valid;
        valid = validateText($('#phone'), 7, 10, /^[0-9]+$/, 'phoneError', 'Max.Length-10, Min.Length-7, Only numbers are allowed.') && valid;
    
        valid = validateText($('#email'), 1, 50, /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@(gmail\.com|yahoo\.com)$/, 'emailError', 'Max.Length-50, gmail.com and yahoo.com are only allowed') && valid;
        valid = validateCheckbox('communication', 'communicationError', 'Select at least one communication method', $(this)) && valid;
        valid = validateText($('#jobTitle'), 3, 50, /^[A-Za-z\s]+$/, 'jobTitleSpan', 'Max.Length-50, Min.Length-3, Only alphabets and spaces are allowed') && valid;
        valid = validateSelect($('#department'), 'departmentError', 'Select a department') && valid;
        valid = validateNumber($('#salary'), 3, 10, 'salaryError', 'Max.Length-10, Min.Length-3, Only numbers are allowed') && valid;
        valid = validateText($('#hobbies'), 3, 25, /^[a-zA-Z]+(?:,[a-zA-Z]+|-?[a-zA-Z]+)*$/, 'hobbiesError', ' Max.Length-25, Min.Length-3 , Alphabets , commas and hyphens are only allowed') && valid;
        valid = validateAdditionalNotes($('#notes'), /^[a-zA-Z0-9]+(?:[,.][a-zA-Z0-9]+)*$/, 'notesError', 'Alphanumeric characters with spaces, commas and dots are only allowed') && valid;
    
        if (valid) {
            const formData = {
                'fullName': $('#fullname').val().trim(),
                'gender': $('[name="gender"]:checked').val(),
                'dateOfBirth': $('#dob').val().trim(),
                'socialSecurityNumber': $('#ssn').val().trim(),
                'address': $('#address').val().trim(),
                'phoneNumber': $('#phone').val().trim(),
                'email': $('#email').val().trim(),
                'preferredCommunication': $('[name="communication"]:checked').map(function() { return $(this).val(); }).get().join(', '),
                'employeeID': generateRandomEmployeeId(),
                'jobTitle': $('#jobTitle').val().trim(),
                'department': $('#department').val().trim(),
                'salary': $('#salary').val().trim(),
                'hobbies': $('#hobbies').val().trim(),
                'additionalNotes': $('#notes').val().trim(),
            };
    
            saveFormData(formData, formDataArray);
            $(this).trigger('reset');
            addFormDataToTable(formData);
            const employeeTableContainer = $('#employeeTableContainer');
            employeeTableContainer.show();
            event.preventDefault();
            const successMessageElement = $('#successMessage');
            successMessageElement.text('All informations are entered successfully!');
            $('#employeeId').val(generateRandomEmployeeId());
        }
    
        if (!valid) {
            const firstError = $(this).find('.text-danger').first();
            $('html, body').animate({
                scrollTop: firstError.offset().top
            }, 800);
            event.preventDefault();
        }
    });
});













  














//     // Convert to jQuery
//     $('#mainForm').on('submit', function(event) {
//         // Rest of the code remains the same...
//     });

//     $('#cancelButton').on('click', function() {
//         // Rest of the code remains the same...
//     });
// });
