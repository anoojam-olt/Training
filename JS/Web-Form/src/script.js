document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mainForm');
    const submitButton = document.getElementById('submitButton');
    const clearButton = document.getElementById('cancelButton');


    const nameValue = document.getElementById('fullname');
    const nameError = document.getElementById('firstName');

    var genderInputs = document.getElementsByName("gender");
    const errorGender = document.getElementById('genderSelectError');

    const dobInput = document.getElementById("dob");
    const dobError = document.getElementById('dobValue');

    const ssnInput = document.getElementById('ssn');
    const sscValue = document.getElementById('sscValue');

    const addressField = document.getElementById('address');
    const addressError = document.getElementById('addressValue');

    const phoneDetails = document.getElementById('phone');
    const phoneSpan = document.getElementById('phoneNumber');

    const emailInput = document.getElementById('email');
    const emailSpan = document.getElementById('emailValue');

    const communicationInputs = document.getElementsByName("communication");
    const communicationError = document.getElementById('communicationValue');

    const empInput = document.getElementById('employeeId');
    const employeeIdSpan = document.getElementById('employeeIdValue');

    const jobTitle = document.getElementById('jobTitle');
    const jobTitleSpan = document.getElementById('jobTitleSpan');

    const departmentOption = document.getElementById('department');
    const departmentError = document.getElementById('departmentValue');

    const salaryInput = document.getElementById('salary');
    const salaryError = document.getElementById('salaryValue');

    const hobbiesInput = document.getElementById('hobbies');
    const hobbySpan = document.getElementById('hobbiesValue');

    const additionalNotes = document.getElementById('notes');
    const notesError = document.getElementById('addNotesValue');

    submitButton.addEventListener('click', (event) => {

        const name = nameValue.value;
        const dob = dobInput.value;
        const ssn = ssnInput.value;
        const address = addressField.value;
        const number = phoneDetails.value;
        const email = emailInput.value;
        const emp = empInput.value;
        const job = jobTitle.value;
        const department = departmentOption.value;
        const salary = salaryInput.value.trim();
        const hobbies = hobbiesInput.value;
        const notesAdditional = additionalNotes.value;
        employeeId.value = generateRandomNumber();

        //Mandatory field validation

        if (name == "" || genderInputs == "" || dob == "" || ssn == "" || communicationInputs == "" || address == "" || number == "" || email == "" || department == "" || job == "" || salary == "" || hobbies == "") {
     
            alert('All fields are required');
            event.preventDefault();
        }

        //Name validation

        if (!/^[a-zA-Z\s]+$/.test(name) && name.length != 0) {
            nameError.style.display = "block";
            nameError.textContent = 'Name should contain alphabets and spaces only';
            event.preventDefault();
        } else if (name.length < 3 && name.length != 0 || name.length > 20) {
            nameError.style.display = "block";
            nameError.textContent = 'Name must be between 3 and 20 characters.';
            event.preventDefault();
        } else {
            nameError.textContent = '';
        }

        //Date of birth validation

        // Regular expression to match "yyyy-mm-dd" format
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        const [year, month, day] = dob.split('-').map(Number);
        const dobDate = new Date(year, month - 1, day);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - dobDate.getFullYear();

        // Check if the input matches the expected format
       
        if (dob!=0){
           if (!datePattern.test(dob) ) {
            dobError.style.display = 'block';
            dobError.textContent = "Date must be in yyyy-mm-dd format";
            event.preventDefault();
            }
            // Check if the date is valid
            else if( dobDate.getDate() !== day  ||
            dobDate.getMonth() !== month - 1 ||
            dobDate.getFullYear() !== year ){
                console.log("hello");
                dobError.style.display = 'block';
                dobError.textContent = "Please Enter Correct Date  ";
                event.preventDefault();
                
            }else if (dob!=0 && isNaN(age) || age < 18 || age > 100) {
            dobError.style.display = 'block';
            dobError.textContent = "Age must be between 18 and 100 years old";
            event.preventDefault();
        }
    }
        // Gender validation

        var genderChecked = false;

        for (var i = 0; i < genderInputs.length; i++) {
            if (genderInputs[i].checked) {
                genderChecked = true;
                break;
            }
        }
        if (!genderChecked) {
            errorGender.textContent = 'Please select a Gender.';
            event.preventDefault();
        } else {
            errorGender.textContent = '';
        }

        //Social Security Number Validation

        if (!/^[0-9\-]+$/.test(ssn) && ssn.length != 0) {
            sscValue.style.display = "block";
            sscValue.textContent = 'Should accept only numbers and hyphens only';
            event.preventDefault();
        } else if (ssn.length < 7 && ssn.length != 0 || ssn.length > 9) {
            sscValue.style.display = "block";
            sscValue.textContent = 'Social Security Number must be between 7 and 9 characters.';
            event.preventDefault();
        } else {
            sscValue.textContent = '';
        }

        //Address validation

        if (!/^[a-zA-Z0-9\s, -]+$/.test(address) && address.length != 0) {
            addressError.style.display = "block"
            addressError.textContent = 'Address should contain only alphanumeric, spaces, commas and hyphens only'
            event.preventDefault();
        } else {
            addressError.textContent = '';
        }

        //Phone Number validation

        if (number.length < 7 && number.length != 0 || number.length > 10) {
            phoneSpan.style.display = "block"
            phoneSpan.textContent = 'Phone number must be between 7 and 10 characters.';
            event.preventDefault();
        } else if (!(/^[0-9]+$/).test(number) && number.length != 0) {
            phoneSpan.style.display = "block"
            phoneSpan.textContent = 'Phone number must be in numbers.';
            event.preventDefault();
        } else {
            phoneSpan.textContent = '';
        }

        //Email  validation

        if (email.length > 50 && email.length != 0) {
            emailSpan.style.display = "block"
            emailSpan.textContent = 'The maximum length of email is 50 characters';
            event.preventDefault();
        } else if (!(/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/).test(email) &&
            email.length != 0) {
            emailSpan.style.display = "block"
            emailSpan.textContent = 'Entered email id not valid';
            event.preventDefault();
        } else {
            emailSpan.textContent = '';
        }
        
        // Preferred communication validation

        var communicationChecked = false;
        for (var i = 0; i < communicationInputs.length; i++) {
            if (communicationInputs[i].checked) {
                communicationChecked = true;
                break;
            }
        }
        if (!communicationChecked) {
            communicationError.textContent = 'Please select at least one Preferred Method of Communication.';
            event.preventDefault();
        } else {
            communicationError.textContent = '';
        }

        //Employee Id validation

        let employeeCodeCounter = 1;

        function generateRandomNumber() {
            return Math.floor(Math.random() * 10) + 1; //Automatic number generation 
        }

        emp.disabled = true;
        if (emp.length > 2 || emp.length < 0) {
            employeeIdSpan.style.display = "block";
            employeeIdSpan.textContent = 'The maximum length of employee Id is 2 characters';
            event.preventDefault();
        } else if (!/^\d+$/.test(emp)) {
            employeeIdSpan.textContent = 'Employee Id must be in numbers';

        } else {
            employeeIdSpan.textContent = '';
        }

        //Job title validation

        if (job.length < 3 && job.length != 0 || job.length > 50) {
            jobTitleSpan.display.style = 'block';
            jobTitleSpan.textContent = 'Job title must be between 3 and 50 characters.';
            event.preventDefault();
        } else if (!/^[a-zA-Z\s]+$/.test(job) && job.length != 0) {
            jobTitleSpan.display.style = 'block';
            jobTitleSpan.textContent = 'Job title should contain  alphabets and spaces only';
            event.preventDefault();
        } else {
            jobTitleSpan.textContent = '';
        }

        //Department validation

        if (department === "") {
            departmentError.textContent = "Please select an option.";
            event.preventDefault();
        } else {
            departmentError.textContent = "";

        }

        // Salary validation

        var formattedSalary = parseFloat(salary).toFixed(2); // Format to two decimal places

        if (!isNaN(formattedSalary)) {
            salaryInput.value = formattedSalary;
            salaryError.style.display = 'block'
            salaryError.textContent = ""; 
        } else {
            salaryError.style.display = 'block'
            salaryError.textContent = "Please enter a valid salary.";
            event.preventDefault();
        }

        if (salary.length < 3 && salary.length > 0 || salary.length > 10) {
            salaryError.style.display = 'block'
            salaryError.textContent = 'Salary must be 3 to 10 digits';
            event.preventDefault();
        } else if (!/^-?\d+(\.\d+)?$/.test(salary) && salary.length > 0) {
            salaryError.style.display = "block"
            salaryError.textContent = 'Salary number must be in numbers.';
            event.preventDefault();
        } else {
            salaryError.textContent = '';
        }


        //Hobbies validation

        if (!/^[a-zA-Z,-]+$/.test(hobbies) && hobbies.length != 0) {
            hobbySpan.style.display = 'block'
            hobbySpan.textContent = 'Hobbies should contain alphabets with commas and hyphens only.';
            event.preventDefault();
        } else if (hobbies.length < 3 && hobbies.length != 0 || hobbies.length > 25) {
            hobbySpan.style.display = 'block'
            hobbySpan.textContent = 'Hobbies must be between 3 and 25 characters.';
            event.preventDefault();
        } else {
            hobbySpan.textContent = '';
        }


        // Additional notes validation

        if (!/^[a-zA-Z0-9\s,\.]+$/.test(notesAdditional) && notesAdditional.length > 0) {
            notesError.style.display = 'block'
            notesError.textContent = 'Additional note should contain  alphanumeric characters with spaces,commas and dots only';
            event.preventDefault();
        } else {
            notesError.textContent = '';
        }


    });
    clearButton.addEventListener('click', () => {
        form.reset();
        nameValue.textContent = '';
        sscValue.textContent = '';
        phoneSpan.textContent = '';
        emailSpan.textContent = '';
        employeeIdSpan.textContent = '';
        jobTitleSpan.textContent = '';
        salaryError.textContent = '';

    });
});
