            const formDataArray = [];
            const employeeIdInput = $('#employeeId');
            const clearButton = $('#cancelButton');
            const tableBody = $('#dataTableBody');
            const errorElements = $('.text-danger');
            const successMessageElement = $('#successMessage');
            const employeeTableContainer = $('#employeeTableContainer');
            const firstError = $('.text-danger').first();

            $('#employeeId').val(generateRandomEmployeeId());

             function addFormDataToTable(formData) {
                const newRow = $('<tr></tr>');

                for (const key in formData) {
                    if (formData.hasOwnProperty(key)) {
                        const cell = $('<td></td>');

                        if (key === 'additionalNotes') {
                            const chunks = notesBreak(formData[key], 20);
                            cell.html(chunks.join('<br>'));
                        } else {
                            cell.text(formData[key]);
                        }
                        newRow.append(cell);
                    }
                }

                // Add delete and edit buttons
                const actionCell = $('<td></td>');
                const deleteButton = $('<button>Delete</button>').addClass('btn btn-danger delete-button');
                const editButton = $('<button>Edit</button>').addClass('btn btn-primary edit-button');
                actionCell.append(deleteButton, editButton);
                newRow.append(actionCell);

                // Attach event listeners for delete and edit buttons
                deleteButton.on('click', function () {
                    deleteRow(newRow);
                });

                editButton.on('click', function () {
                    editRow(newRow);
                });

                tableBody.append(newRow);
            }

            // Generate a random number between 0 to 10
            function generateRandomEmployeeId() {
                const randomFloat = Math.random() * 10;
                const randomInteger = Math.floor(randomFloat);
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

            function clearAllErrorMessages(_form) {
                errorElements.text('');
            }

            function clearSuccessMessage() {
                successMessageElement.text('');
            }

            function showError(elementId, errorMessage) {
                $('#' + elementId).text(errorMessage);
            }

            function clearError(elementId) {
                $('#' + elementId).text('');
            }

            //validation functions
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

            function validateDob(element, errorElementId) {
                const dob = element.val().trim();
                const dateParts = dob.split('-').map(Number);
                const [year, month, day] = dateParts;

                const isValidDate = !isNaN(year) && !isNaN(month) && !isNaN(day) &&
                    month >= 1 && month <= 12 &&
                    day >= 1 && day <= new Date(year, month, 0).getDate();

                if (!isValidDate) {
                    showError(errorElementId, 'Invalid date of birth (yyyy-mm-dd)');
                    return false;
                }

                const age = calculateAge(dob);
                if (age < 18 || age > 100) {
                    showError(errorElementId, 'Age must be between 18 and 100');
                    return false;
                }

                clearError(errorElementId);
                return true;
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
                const checkboxes = $('[name="' + elementName + '"]');
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

            function deleteRow(row) {
                const index = tableBody.children().index(row);
                formDataArray.splice(index, 1);
                row.remove();
            }

            function editRow(row) {
                const index = tableBody.children().index(row);
                const formData = formDataArray[index];

                // Populate the form fields with the data from the selected row for editing
                $('#fullname').val(formData.fullName);
                const genderRadio = $('[name="gender"][value="' + formData.gender + '"]');
                if (genderRadio.length > 0) {
                    genderRadio.prop('checked', true);
                }
                $('#dob').val(formData.dateOfBirth);
                $('#ssn').val(formData.socialSecurityNumber);
                $('#address').val(formData.address);
                $('#phone').val(formData.phoneNumber);
                $('#email').val(formData.email);

                const preferredCommunication = formData.preferredCommunication.split(', ');
                preferredCommunication.forEach(method => {
                    const communicationCheckbox = $('[name="communication"][value="' + method + '"]');
                    if (communicationCheckbox.length > 0) {
                        communicationCheckbox.prop('checked', true);
                    }
                });

                $('#jobTitle').val(formData.jobTitle);
                $('#department').val(formData.department);
                $('#salary').val(formData.salary);
                $('#hobbies').val(formData.hobbies);
                $('#notes').val(formData.additionalNotes);

                deleteRow(row);
            }

            // Add formData to the table
            function addFormDataToTable(formData) {
                const newRow = $('<tr></tr>');

                for (const key in formData) {
                    if (formData.hasOwnProperty(key)) {
                        const cell = $('<td></td>');

                        if (key === 'additionalNotes') {
                            const chunks = notesBreak(formData[key], 20);
                            cell.html(chunks.join('<br>'));
                        } else {
                            cell.text(formData[key]);
                        }
                        newRow.append(cell);
                    }
                }

                // Add delete and edit buttons
                const actionCell = $('<td></td>');
                const deleteButton = $('<button>Delete</button>').addClass('btn btn-danger delete-button');
                const editButton = $('<button>Edit</button>').addClass('btn btn-primary edit-button');
                actionCell.append(deleteButton, editButton);
                newRow.append(actionCell);

                // Attach event listeners for delete and edit buttons
                deleteButton.on('click', function () {
                    deleteRow(newRow);
                });

                editButton.on('click', function () {
                    editRow(newRow);
                });

                tableBody.append(newRow);
            }

            // / Helper function: editRow
            function editRow(row) {
                const index = tableBody.children().index(row);
                const formData = formDataArray[index];

                // Populate the form fields with the data from the selected row for editing
                $('#fullname').val(formData.fullName);
                const genderRadio = $('[name="gender"][value="' + formData.gender + '"]');
                if (genderRadio.length > 0) {
                    genderRadio.prop('checked', true);
                }
                        
                $('#dob').val(formData.dateOfBirth);
                $('#ssn').val(formData.socialSecurityNumber);
                $('#address').val(formData.address);
                $('#phone').val(formData.phoneNumber);
                $('#email').val(formData.email);

                const preferredCommunication = formData.preferredCommunication.split(', ');
                preferredCommunication.forEach(method => {
                    const communicationCheckbox = $('[name="communication"][value="' + method + '"]');
                    if (communicationCheckbox.length > 0) {
                        communicationCheckbox.prop('checked', true);
                    }
                });

                $('#jobTitle').val(formData.jobTitle);
                $('#department').val(formData.department);
                $('#salary').val(formData.salary);
                $('#hobbies').val(formData.hobbies);
                $('#notes').val(formData.additionalNotes);

                deleteRow(row);
            }

              // Helper function: deleteRow
              function deleteRow(row) {
                const index = tableBody.children().index(row);
                formDataArray.splice(index, 1);
                row.remove();
            }

            // Clear button
            clearButton.on('click', function () {
                $('#mainForm')[0].reset();
                clearAllErrorMessages($('#mainForm'));
                clearSuccessMessage();
            });

            // Submit button
            $('#mainForm').on('submit', function (event) {
                event.preventDefault();
                clearSuccessMessage();
                let valid = true;

                const validationFunctions = [
                    {func: function () { return validateText($('#fullname'), 3, 20, /^[a-zA-Z\s]+$/, 'nameError', 'Max.Length - 20, Min.Length - 3, Only alphabets and spaces are allowed.'); },},
                    {func: function () {return validateRadio('gender', 'genderSelectError', 'Gender is mandatory', $('#mainForm'));},},
                    {func: function () {return validateDob($('#dob'), 'dobValue');},},
                    {func: function () {return validateText($('#ssn'), 7, 9, /^[0-9]+(-[0-9]+)*$/, 'ssnError', 'Max.Length-9, Min.Length-7, Numbers and hyphens are only allowed.');},},
                    {func: function () { return validateText($('#address'), 1, 100, /^[a-zA-Z0-9]+(?:\s*[ ,-]\s*[a-zA-Z0-9]+)*$/, 'addressError', 'Alphanumeric, spaces, commas and hyphens are only allowed.'); },},
                    {func: function () { return validateText($('#phone'), 7, 10, /^[0-9]+$/, 'phoneError', 'Max.Length-10, Min.Length-7, Only numbers are allowed.');},},
                    {func: function () {return validateText($('#email'), 1, 50, /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@(gmail\.com|yahoo\.com)$/, 'emailError', 'Max.Length-50, gmail.com and yahoo.com are only allowed.'); },},
                    {func: function () {return validateCheckbox('communication', 'communicationError', 'Select at least one communication method');},},
                    {func: function () {return validateText($('#jobTitle'), 3, 50, /^[A-Za-z\s]+$/, 'jobTitleSpan', 'Max.Length-50, Min.Length-3, Only alphabets and spaces are allowed.');},},
                    {func: function () { return validateSelect($('#department'), 'departmentError', 'Select a department');},},
                    {func: function () { return validateNumber($('#salary'), 3, 10, 'salaryError', 'Max.Length-10, Min.Length-3, Only numbers are allowed');},},
                    {func: function () {return validateText($('#hobbies'), 3, 25, /^[A-Za-z\s]+(?:,[A-Za-z\s]+|-?[A-Za-z\s]+)*$/, 'hobbiesError', ' Max.Length-25, Min.Length-3 , Alphabets , commas and hyphens are only allowed');},},
                    {func: function () {return validateAdditionalNotes($('#notes'), /^[a-zA-Z0-9\s]+(?:[.,][a-zA-Z0-9\s]+)*[.,]?$/, 'notesError', 'Alphanumeric characters with spaces, commas and dots are only allowed');},},
                ];

                $.each(validationFunctions, function (_index, validationFunction) {
                    valid = validationFunction.func() && valid;
                });

                if (valid) {
                    const formData = {
                        'fullName': $('#fullname').val().trim(),
                        'gender': $('[name="gender"]:checked').val(),
                        'dateOfBirth': $('#dob').val().trim(),
                        'socialSecurityNumber': $('#ssn').val().trim(),
                        'address': $('#address').val().trim(),
                        'phoneNumber': $('#phone').val().trim(),
                        'email': $('#email').val().trim(),
                        'preferredCommunication': $('[name="communication"]:checked').map(function () { return $(this).val(); }).get().join(', '),
                        'employeeID': generateRandomEmployeeId(),
                        'jobTitle': $('#jobTitle').val().trim(),
                        'department': $('#department').val().trim(),
                        'salary': $('#salary').val().trim(),
                        'hobbies': $('#hobbies').val().trim(),
                        'additionalNotes': $('#notes').val().trim(),
                    };

                    formDataArray.push(formData);
                    $('#mainForm')[0].reset();
                    addFormDataToTable(formData);
                    employeeTableContainer.show();
                    successMessageElement.text('All information entered successfully!');
                    employeeIdInput.val(generateRandomEmployeeId());
                } else {
                    firstError[0].scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });

          
            
           
        
   
