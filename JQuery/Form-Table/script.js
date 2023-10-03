const formDataArray = [];
const tableBody = $('#dataTableBody');
const clearButton = $('#cancelButton');
const successMessageElement = $('#successMessage');

$('#employeeId').val(generateRandomEmployeeId());
// Initialize form validation using jQuery Validation Plugin
$('#mainForm').validate({
    rules: {
        fullname: {
            required: true,
            minlength: 3,
            maxlength: 20,
            pattern: /^[a-zA-Z\s]+$/,
        },
        gender: {
            required: true,
        },
        dob: {
            required: true,
            dateISO: true,
            validDOB: true
        },
        ssn: {
            required: true,
            minlength: 7,
            maxlength: 9,
            pattern: /^[0-9]+(-[0-9]+)*$/,
        },
        address: {
            required: true,
            minlength: 1,
            maxlength: 100,
            pattern: /^[a-zA-Z0-9]+(?:[,-][a-zA-Z0-9]+)*(\s[a-zA-Z0-9]+(?:[,-][a-zA-Z0-9]+)*)*$/,
        
        },
        phone: {
            required: true,
            minlength: 7,
            maxlength: 10,
            pattern: /^[0-9]+$/,
        },
        email: {
            required: true,
            maxlength: 50,
            email: true,
            pattern: /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@(gmail\.com|yahoo\.com)$/,
        },
        communication: {
            required: true,
            minlength: 1,
        },
        jobTitle: {
            required: true,
            minlength: 3,
            maxlength: 50,
            pattern: /^[A-Za-z\s]+$/,
        },
        department: {
            required: true,
        },
        salary: {
            required: true,
            minlength: 3,
            maxlength: 10,
            number: true,
        },
        hobbies: {
            required: true,
            minlength: 3,
            maxlength: 25,
            pattern: /^[A-Za-z\s]+(?:,[A-Za-z\s]+|-?[A-Za-z\s]+)*$/,
        },
        notes: {
            required: false,
            pattern: /^[a-zA-Z0-9\s]+(?:[.,][a-zA-Z0-9\s]+)*[.,]?$/,
        },
    },
    messages: {
        fullname: {
            required: 'Full name is required.',
            minlength: 'Full name should be at least 3 characters long.',
            maxlength: 'Full name should not exceed 20 characters.',
            pattern: 'Only alphabets and spaces are allowed.',
        },
        gender: 'Gender is mandatory.',
        dob: {
            required: 'Date of birth is required.',
            dateISO: 'Invalid date format',

        },
        ssn: {
            required: 'Social Security Number is required.',
            minlength: 'SSN should be at least 7 characters long.',
            maxlength: 'SSN should not exceed 9 characters.',
            pattern: 'Numbers and hyphens are only allowed.',
        },
        address: {
            required: 'Address is required.',
            minlength: 'Address should not be empty.',
            maxlength: 'Address should not exceed 100 characters.',
            pattern: 'Alphanumeric, spaces, commas, and hyphens are allowed.',
        },
        phone: {
            required: 'Phone number is required.',
            minlength: 'Phone number should be at least 7 characters long.',
            maxlength: 'Phone number should not exceed 10 characters.',
            pattern: 'Only numbers are allowed.',
        },
        email: {
            required: 'Email is required.',
            maxlength: 'Email should not exceed 50 characters.',
            email: 'Invalid email format.',
            pattern: 'Only gmail.com and yahoo.com are allowed.',
        },
        communication: 'Select at least one communication method.',
        jobTitle: {
            required: 'Job title is required.',
            minlength: 'Job title should be at least 3 characters long.',
            maxlength: 'Job title should not exceed 50 characters.',
            pattern: 'Only alphabets and spaces are allowed.',
        },
        department: 'Select a department.',
        salary: {
            required: 'Salary is required.',
            minlength: 'Salary should be at least 3 characters long.',
            maxlength: 'Salary should not exceed 10 characters.',
            number: 'Only numbers are allowed.',
        },
        hobbies: {
            required: 'Hobbies are required.',
            minlength: 'Hobbies should be at least 3 characters long.',
            maxlength: 'Hobbies should not exceed 25 characters.',
            pattern: 'Alphabets, commas, and hyphens are allowed.',
        },
        notes: 'Alphanumeric characters with spaces, commas, and dots are allowed.',
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
        error.addClass('text-danger');
        error.insertAfter(element);
    },

    errorPlacement: function (error, element) {
        error.addClass('text-danger');

        // Check if the element is a radio input with the name "communication"
        if (element.attr('name') === 'communication') {
            error.insertAfter(element.closest('.communication'));
        } else {
            error.insertAfter(element);
        }
    },
});
// Function to add form data to the table
function addFormDataToTable(formData) {
    const newRow = $('<tr></tr>'); // Assign newRow here

    // Iterate through the formData object and create table cells for each field
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            const cell = $('<td></td>');

            // Check if the field is "additionalNotes" and format it with line breaks if necessary
            if (key === 'additionalNotes') {
                const chunks = notesBreak(formData[key], 20);
                cell.html(chunks.join('<br>'));
            } else {
                cell.text(formData[key]);
            }

            newRow.append(cell);
        }
    }
    // Create action cell with delete and edit buttons
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

    // Append the new row to the table body
    tableBody.append(newRow);
    // Show the table
    $('#employeeTableContainer').show();
}

// Clear button 
clearButton.on('click', function () {
    $('#mainForm')[0].reset();
    $('#mainForm').validate().resetForm();
    clearSuccessMessage();
});

// Event listener to format salary input
$('#salary').on('blur', function () {
    const currentValue = $(this).val();

    // Check if it's a valid number
    if (!isNaN(currentValue)) {
        // Format the value with exactly three digits before the decimal point
        const formattedValue = parseFloat(currentValue).toFixed(2);
        const parts = formattedValue.split('.');
        
        if (parts[0].length === 1) {
            parts[0] = '00' + parts[0];
        } else if (parts[0].length === 2) {
            parts[0] = '0' + parts[0];
        }
        
        $(this).val(parts.join('.'));
    }
});

$.validator.addMethod("validDOB", function (value, element) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
    }

    // Parse the date components
    var parts = value.split("-");
    var year = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var day = parseInt(parts[2], 10);

    // Calculate the current date
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    var currentDay = currentDate.getDate();

    // Calculate the minimum and maximum allowed birth years
    var minYear = currentYear - 100;
    var maxYear = currentYear - 18;

    // Create a Date object for the entered DOB
    var dobDate = new Date(year, month - 1, day); // Subtract 1 from month to make it zero-based

    // Check if the year is within the allowed range
    if (dobDate.getFullYear() < minYear || dobDate.getFullYear() > maxYear) {
        return false;
    }

    // Check if the entered month and day are valid for the given year
    if (
        month !== dobDate.getMonth() + 1 || // Add 1 to the month since it's zero-based
        day !== dobDate.getDate()
    ) {
        return false;
    }

    return true;
}, "Please enter a valid date of birth between 18 and 100 years old.");

// Function to generate a random employee ID
function generateRandomEmployeeId() {
    const randomFloat = Math.random() * 10;
    const randomInteger = Math.floor(randomFloat);
    return randomInteger + 1;
}

// Clear success message
function clearSuccessMessage() {
    successMessageElement.text('');
}

// Helper function to format additional notes
function notesBreak(text, chunkLength) {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkLength) {
        const store = text.slice(i, i + chunkLength);
        chunks.push(store);
    }
    return chunks;
}

// Function to delete a row
function deleteRow(row) {
    // Remove the row from the table and the formDataArray
    const index = tableBody.children().index(row);
    formDataArray.splice(index, 1);
    row.remove();
}

function editRow(row) {
    const index = tableBody.children().index(row);
    const formData = formDataArray[index];
    // Check the radio button corresponding to the "gender" value
    $('[name="gender"]').each(function () {
        if ($(this).val() === formData.gender) {
            $(this).prop('checked', true);
        } else {
            $(this).prop('checked', false);
        }
    });

    // Split the comma-separated values in preferredCommunication and check the corresponding checkboxes
    const preferredCommunicationValues = formData.preferredCommunication.split(', ');
    $('[name="communication"]').each(function () {
        const checkboxValue = $(this).val();
        $(this).prop('checked', preferredCommunicationValues.includes(checkboxValue));
    });

    // Populate the form fields with the data from the selected row for editing
    $('#fullname').val(formData.fullName);
    $('#gender').val(formData.gender);
    $('#dob').val(formData.dateOfBirth);
    $('#ssn').val(formData.socialSecurityNumber);
    $('#address').val(formData.address);
    $('#phone').val(formData.phoneNumber);
    $('#email').val(formData.email);
    $('#communication').val(formData.preferredCommunication); // Assuming it's a checkbox group
    $('#jobTitle').val(formData.jobTitle);
    $('#department').val(formData.department);
    $('#salary').val(formData.salary);
    $('#hobbies').val(formData.hobbies);
    $('#notes').val(formData.additionalNotes);

    // Update the formDataArray with edited data
    formDataArray[index] = {
        'fullName': $('#fullname').val().trim(),
        'gender': $('[name="gender"]:checked').val(),
        'dateOfBirth': $('#dob').val().trim(),
        'socialSecurityNumber': $('#ssn').val().trim(),
        'address': $('#address').val().trim(),
        'phoneNumber': $('#phone').val().trim(),
        'email': $('#email').val().trim(),
        'preferredCommunication': $('[name="communication"]:checked').map(function () {
            return $(this).val();
        }).get().join(', '),
        'jobTitle': $('#jobTitle').val().trim(),
        'department': $('#department').val().trim(),
        'salary': $('#salary').val().trim(),
        'hobbies': $('#hobbies').val().trim(),
        'additionalNotes': $('#notes').val().trim(),
    };

    deleteRow(row);
}

// Inside the submit handler for the form (typically triggered when the form is successfully validated)
$('#mainForm').submit(function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate the form
    if ($('#mainForm').valid()) {

        const formData = {
            'fullName': $('#fullname').val().trim(),
            'gender': $('[name="gender"]:checked').val(),
            'dateOfBirth': $('#dob').val().trim(),
            'socialSecurityNumber': $('#ssn').val().trim(),
            'address': $('#address').val().trim(),
            'phoneNumber': $('#phone').val().trim(),
            'email': $('#email').val().trim(),
            'preferredCommunication': $('[name="communication"]:checked').map(function () {
                return $(this).val();
            }).get().join(', '),
            'employeeID': generateRandomEmployeeId(),
            'jobTitle': $('#jobTitle').val().trim(),
            'department': $('#department').val().trim(),
            'salary': $('#salary').val().trim(),
            'hobbies': $('#hobbies').val().trim(),
            'additionalNotes': $('#notes').val().trim(),
        };
        formDataArray.push(formData);
        console.log(formData);
        addFormDataToTable(formData); // Call the function to add data to the table
        $('#mainForm').find('.error').remove(); // Clear form errors
        // You can also reset the form and show a success message here if needed
        $('#mainForm')[0].reset();
        clearSuccessMessage();
        successMessageElement.text('Data added successfully.');
    }
});