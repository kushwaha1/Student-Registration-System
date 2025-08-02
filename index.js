
// ======= DOM ELEMENT REFERENCES =======
const studentModal = document.getElementById('studentModal');
const studentForm = document.getElementById('studentForm');
const studentName = document.getElementById('studentName');
const studentId = document.getElementById('studentId');
const studentEmail = document.getElementById('studentEmail');
const contactNumber = document.getElementById('contactNumber');
const studentsTableBody = document.getElementById('studentsTableBody');
const totalStudents = document.getElementById('totalStudents');
const nameError = document.getElementById('nameError');
const idError = document.getElementById('idError');
const emailError = document.getElementById('emailError');
const contactError = document.getElementById('contactError');
const submitTextSpan = submitBtn.querySelector('.text');

// ======= STATE VARIABLES =======
let isEditMode = false; // true when editing existing student
let editIndex = -1; // index of student being edited

// ======= MODAL HANDLERS =======
// Show modal (used for Register or Edit)
function openModal() {
    studentModal.style.display = 'flex';
}

// Closes the modal and resets form state
function closeModal() {
    studentModal.style.display = 'none';
    studentForm.reset();
    nameError.textContent = '';
    idError.textContent = '';
    emailError.textContent = '';
    contactError.textContent = '';
}

// ======= STORAGE HELPERS =======
// Get student list from localStorage or empty array
function getStudents() {
    return JSON.parse(localStorage.getItem('students') || '[]');
}

// Saves student data to localStorage
function saveStudents(students) {
    localStorage.setItem('students', JSON.stringify(students));
}

// ======= VALIDATION FUNCTION =======
function validateForm(name, id, email, contact) {
    let valid = true;

    // Name: only letters and spaces
    if (!/^[A-Za-z ]+$/.test(name)) {
        nameError.textContent = 'Only letters allowed';
        valid = false;
    } else nameError.textContent = '';

    // Student ID: digits only
    if (!/^\d+$/.test(id)) {
        idError.textContent = 'Invalid ID';
        valid = false;
    } else idError.textContent = '';

    // Email: basic format check
    if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        emailError.textContent = 'Invalid email';
        valid = false;
    } else emailError.textContent = '';

    // Contact: must be 10 digits
    if (!/^\d{10}$/.test(contact)) {
        contactError.textContent = '10 digits required';
        valid = false;
    } else contactError.textContent = '';

    return valid;
}

// ======= DYNAMIC SCROLL BEHAVIOR =======
function handleVerticalScroll() {
    const tbodyWrapper = document.getElementById("scrollableBodyWrapper");
    const students = getStudents();
    const rowHeight = 70; // approx height of each row in px (adjust if needed)
    const maxVisibleRows = 4; // max rows to show before scrolling

    // If student count exceeds 4, limit height & allow scroll
    if (students.length > maxVisibleRows) {
        tbodyWrapper.style.maxHeight = `${rowHeight * maxVisibleRows}px`;
        tbodyWrapper.style.overflowY = "auto";
    } else {
        tbodyWrapper.style.maxHeight = "unset";
        tbodyWrapper.style.overflowY = "unset";
    }
}

// ======= TABLE RENDERING FUNCTION =======
function renderStudents() {
    const students = getStudents();
    studentsTableBody.innerHTML = ''; // Clear old content
    totalStudents.textContent = students.length; // Update count
    students.forEach((student, i) => {
        const row = document.createElement('tr');
        row.innerHTML = `
                        <td class="px-4 py-3 font-semibold whitespace-nowrap">${student.name}</td>
                        <td class="px-4 py-3 font-semibold whitespace-nowrap">${student.studentId}</td>
                        <td class="px-4 py-3 font-semibold whitespace-nowrap">${student.email}</td>
                        <td class="px-4 py-3 font-semibold whitespace-nowrap">${student.contact}</td>
                        <td class="px-4 py-3 font-semibold whitespace-nowrap">
                        <button class="text-yellow-500 action-btn" onclick="editStudent(${i})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="text-red-500 action-btn" onclick="deleteStudent(${i})">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                        </td>`;
        studentsTableBody.appendChild(row);
    });

    // Show or hide the "No records found" message based on student count
    const noRecordsMessage = document.getElementById('noRecordsMessage');
    if (students.length === 0) {
        noRecordsMessage.classList.remove('hidden');
    } else {
        noRecordsMessage.classList.add('hidden');
    }


    //call function to handle vertical scroll
    handleVerticalScroll(); // Update scroll behavior
}

// ======= EDIT HANDLER =======
window.editStudent = function (i) {
    const students = getStudents();
    const student = students[i];

    // Pre-fill form values
    studentName.value = student.name;
    studentId.value = student.studentId;
    studentEmail.value = student.email;
    contactNumber.value = student.contact;

    // Enable edit mode
    isEditMode = true;
    editIndex = i;
    submitTextSpan.textContent = 'Update'; // Button text
    openModal();
};

// ======= DELETE HANDLER =======
window.deleteStudent = function (i) {
    if (confirm('Delete this record?')) {
        const students = getStudents();
        students.splice(i, 1); // Remove by index
        saveStudents(students);
        renderStudents();
    }
};


// ======= FORM SUBMIT HANDLER =======
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = studentName.value.trim();
    const id = studentId.value.trim();
    const email = studentEmail.value.trim();
    const contact = contactNumber.value.trim();

    // If validation fails, stop
    if (!validateForm(name, id, email, contact)) return;

    const students = getStudents();

    // Check if ID is already taken by another student
    const duplicate = students.some((s, idx) => s.studentId === id && (!isEditMode || idx !== editIndex));
    if (duplicate) {
        idError.textContent = 'Student ID must be unique.';
        return;
    }

    // Update existing student
    if (isEditMode) {
        students[editIndex] = { name, studentId: id, email, contact };
        isEditMode = false;
        editIndex = -1;
        submitTextSpan.textContent = 'Register';
    } else {
        // Add new student
        students.push({ name, studentId: id, email, contact });
    }

    // Save changes
    saveStudents(students);
    renderStudents();
    closeModal(); // Reset form and hide modal
});

// ======= INITIAL RENDER ON PAGE LOAD =======
window.addEventListener('DOMContentLoaded', renderStudents);