document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#mainForm');
    const clearButton = document.querySelector('#cancelButton');
    // Generate and set an initial Employee ID
    const employeeIdInput = form.elements.employeeId;
    employeeIdInput.value = generateRandomEmployeeId();
   
    // Function to generate a random Employee ID between 1 and 9
    function generateRandomEmployeeId() {
        return Math.floor(Math.random() * 9) + 1;
    }
      
    clearButton.addEventListener('click', function () {
        form.reset();
        clearErrorMessages(); // Clear any error messages
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
          const age = calculateAge(dob);
          if (age < 18 || age > 100) {
            showError(errorElementId, 'Age must be between 18 and 100');
            valid = false;
          } else {
            clearError(errorElementId);
          }
        }
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
  
  // Function to validate the "Additional Notes" field only if there is input
  function validateAdditionalNotes(element, minLength, maxLength, regexPattern, errorElementId, errorMessage) {
  const value = element.value.trim();
  if (value !== '' && (value.length < minLength || value.length > maxLength || !regexPattern.test(value))) {
      showError(errorElementId, errorMessage);
      valid = false;
  } else {
      clearError(errorElementId);
  }
  }// Regular expression to allow alphanumeric characters with spaces, commas, and dots
  const alphanumericWithSpacesCommasDotsRegex = /^[A-Za-z0-9\s,.]*$/;
  
  // Function to validate the "Additional Notes" field with the regex
  function validateAdditionalNotes(element, regexPattern, errorElementId, errorMessage) {
    const value = element.value.trim();
    if (value !== '' && !regexPattern.test(value)) {
        showError(errorElementId, errorMessage);
        valid = false;
    } else {
        clearError(errorElementId);
    }
  }
  
  // Validate the "Additional Notes" field if there is input
  validateAdditionalNotes(
    form.elements.notes,
    alphanumericWithSpacesCommasDotsRegex,
    'addNotesValue', // Error element ID
    'Invalid additional notes'
  );
      validateText(form.elements.fullname, 3, 20, /^[A-Za-z\s]+$/, 'firstName', 'Invalid full name');
      validateRadio('gender', 'genderSelectError', 'Gender is mandatory');
      validateDob(form.elements.dob, 'dobValue'); // Validate DOB field
      validateText(form.elements.ssn, 7, 9, /^[0-9-]+$/, 'sscValue', 'Invalid social security number');
      validateText(form.elements.address, 1, 100, /^[A-Za-z0-9\s,.-]+$/, 'addressValue', 'Invalid address');
      validateText(form.elements.phone, 7, 10, /^[0-9]+$/, 'phoneNumber', 'Invalid phone number');
      validateText(form.elements.email, 1, 50, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'emailValue', 'Invalid email address');
      validateCheckbox('communication', 'communicationValue', 'Select at least one communication method');
      form.elements.employeeId.value = Math.floor(Math.random() * 9) + 1;
      validateText(form.elements.jobTitle, 3, 50, /^[A-Za-z\s]+$/, 'jobTitleSpan', 'Invalid job title');
      validateSelect(form.elements.department, 'departmentValue', 'Select a department');
      validateNumber(form.elements.salary, 3, 10, 'salaryValue', 'Invalid salary');
      validateText(form.elements.hobbies, 3, 25, /^[A-Za-z,\s-]+$/, 'hobbiesValue', 'Invalid hobbies');
      
      if (!valid) {
        event.preventDefault(); // Prevent form submission if there are validation errors
      }
     
    });
    
  });