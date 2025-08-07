document.addEventListener('DOMContentLoaded', function() {
    initializeRegistrationForm();
    initializeBookingForm();
    initializeDashboardFunctions();
});

// Registration Form Functionality
function initializeRegistrationForm() {
    const roleSelect = document.getElementById('role');
    const patientFields = document.getElementById('patientFields');
    const doctorFields = document.getElementById('doctorFields');
    
    if (roleSelect) {
        roleSelect.addEventListener('change', function() {
            const selectedRole = this.value;
            
            // Hide all role-specific fields
            if (patientFields) patientFields.classList.add('hidden');
            if (doctorFields) doctorFields.classList.add('hidden');
            
            // Show relevant fields based on role
            if (selectedRole === 'patient' && patientFields) {
                patientFields.classList.remove('hidden');
                // Make patient fields required
                makeFieldsRequired(patientFields, true);
                makeFieldsRequired(doctorFields, false);
            } else if (selectedRole === 'doctor' && doctorFields) {
                doctorFields.classList.remove('hidden');
                // Make doctor fields required
                makeFieldsRequired(doctorFields, true);
                makeFieldsRequired(patientFields, false);
            } else {
                // Admin role
                makeFieldsRequired(patientFields, false);
                makeFieldsRequired(doctorFields, false);
            }
        });
    }
}

function makeFieldsRequired(container, required) {
    if (!container) return;
    
    const inputs = container.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (required) {
            input.setAttribute('required', 'required');
        } else {
            input.removeAttribute('required');
        }
    });
}

// Booking Form
function initializeBookingForm() {
    const specializationButtons = document.querySelectorAll('.specialization-btn');
    const doctorList = document.getElementById('doctorList');
    const selectedDoctorInput = document.getElementById('selectedDoctorId');
    
    // Handle specialization selection
    specializationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            specializationButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const specialization = this.getAttribute('data-specialization');
            loadDoctorsBySpecialization(specialization);
        });
    });
    
    // Set minimum date to today
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

function loadDoctorsBySpecialization(specialization) {
    const doctorList = document.getElementById('doctorList');
    if (!doctorList) return;
    
    doctorList.innerHTML = '<div class="text-center"><p>Loading doctors...</p></div>';
    
    // Fetch doctors by specialization
    fetch(`/api/doctors-by-specialization/?specialization=${specialization}`)
        .then(response => response.json())
        .then(data => {
            displayDoctors(data.doctors);
        })
        .catch(error => {
            console.error('Error loading doctors:', error);
            doctorList.innerHTML = '<div class="text-center"><p>Error loading doctors. Please try again.</p></div>';
        });
}

function displayDoctors(doctors) {
    const doctorList = document.getElementById('doctorList');
    const template = document.getElementById('doctorTemplate');
    
    if (!doctorList || !template) return;
    
    if (doctors.length === 0) {
        doctorList.innerHTML = '<div class="text-center"><p>No doctors found for this specialization.</p></div>';
        return;
    }
    
    doctorList.innerHTML = '';
    
    doctors.forEach(doctor => {
        const doctorElement = template.content.cloneNode(true);
        const doctorItem = doctorElement.querySelector('.doctor-item');
        
        doctorItem.setAttribute('data-doctor-id', doctor.id);
        doctorElement.querySelector('.doctor-avatar').textContent = doctor.name.charAt(0).toUpperCase();
        doctorElement.querySelector('.doctor-name').textContent = `Dr. ${doctor.name}`;
        doctorElement.querySelector('.doctor-specialization').textContent = doctor.specialization.charAt(0).toUpperCase() + doctor.specialization.slice(1);
        doctorElement.querySelector('.doctor-clinic').textContent = `📍 ${doctor.clinic}`;
        
        doctorItem.addEventListener('click', function() {
            selectDoctor(doctor.id, this);
        });
        
        doctorList.appendChild(doctorElement);
    });
}

function selectDoctor(doctorId, element) {
    // Remove selected class from all doctor items
    document.querySelectorAll('.doctor-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Add selected class to clicked item
    element.classList.add('selected');
    
    // Set selected doctor ID
    const selectedDoctorInput = document.getElementById('selectedDoctorId');
    if (selectedDoctorInput) {
        selectedDoctorInput.value = doctorId;
    }
}

// Dashboard Functions
function initializeDashboardFunctions() {
    console.log('Dashboard functions initialized');
}

// Patient Dashboard Functions
function viewMedicalRecords() {
    alert('Medical records functionality will be implemented soon.');
}

function rescheduleAppointment(appointmentId) {
    if (confirm('Are you sure you want to reschedule this appointment?')) {
        alert(`Rescheduling appointment ${appointmentId}. This functionality will be implemented soon.`);
    }
}

function cancelAppointment(appointmentId) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
        alert(`Cancelling appointment ${appointmentId}. This functionality will be implemented soon.`);
    }
}

// Doctor Dashboard Functions
function viewPatient(patientId) {
    alert(`Viewing patient ${patientId}. This functionality will be implemented soon.`);
}

function startConsultation(appointmentId) {
    alert(`Starting consultation for appointment ${appointmentId}. This functionality will be implemented soon.`);
}

function approveAppointment(appointmentId) {
    if (confirm('Are you sure you want to approve this appointment?')) {
        fetch(`/api/approve-appointment/${appointmentId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Appointment approved successfully!');
                location.reload();
            } else {
                alert('Error approving appointment: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error approving appointment. Please try again.');
        });
    }
}

function disapproveAppointment(appointmentId) {
    if (confirm('Are you sure you want to disapprove this appointment?')) {
        fetch(`/api/disapprove-appointment/${appointmentId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Appointment disapproved successfully!');
                location.reload();
            } else {
                alert('Error disapproving appointment: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error disapproving appointment. Please try again.');
        });
    }
}

function manageSchedule() {
    alert('Schedule management functionality will be implemented soon.');
}

function viewPatientRecords() {
    alert('Patient records functionality will be implemented soon.');
}

function viewAllPatients() {
    alert('View all patients functionality will be implemented soon.');
}

// Admin Dashboard Functions
function viewPatientDetails(patientId) {
    alert(`Viewing patient details for ID ${patientId}. This functionality will be implemented soon.`);
}

function editPatient(patientId) {
    alert(`Editing patient ID ${patientId}. This functionality will be implemented soon.`);
}

function viewDoctorDetails(doctorId) {
    alert(`Viewing doctor details for ID ${doctorId}. This functionality will be implemented soon.`);
}

function editDoctor(doctorId) {
    alert(`Editing doctor ID ${doctorId}. This functionality will be implemented soon.`);
}

function viewAllDoctors() {
    alert('View all doctors functionality will be implemented soon.');
}

function viewAppointmentDetails(appointmentId) {
    alert(`Viewing appointment details for ID ${appointmentId}. This functionality will be implemented soon.`);
}

function viewAllAppointments() {
    alert('View all appointments functionality will be implemented soon.');
}

// Utility Functions
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

// Search for specializations
function initializeSearch() {
    const searchInput = document.getElementById('searchSpecialization');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const specializationButtons = document.querySelectorAll('.specialization-btn');
            
            specializationButtons.forEach(button => {
                const specialization = button.getAttribute('data-specialization').toLowerCase();
                if (specialization.includes(searchTerm)) {
                    button.style.display = 'block';
                } else {
                    button.style.display = 'none';
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', initializeSearch);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    
    return function removeLoadingState() {
        button.textContent = originalText;
        button.disabled = false;
    };
}

document.addEventListener('submit', function(e) {
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (submitButton) {
        const removeLoading = addLoadingState(submitButton);
        
        setTimeout(removeLoading, 3000);
    }
});

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('mobile-active');
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.textContent = message;
    
    // Insert at the top of the main content
    const main = document.querySelector('main');
    if (main) {
        main.insertBefore(notification, main.firstChild);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            // Position tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}


// Doctor dashboard functions
function viewPatient(patientId) {
    window.location.href = `/doctor/patient/${patientId}/`;
}

function manageSchedule() {
    window.location.href = '/doctor/schedule/';
}

function viewAllPatients() {
    window.location.href = '/doctor/patients/';
}

function viewPatientRecords() {
    window.location.href = '/doctor/patients/';
}

function startConsultation(appointmentId) {
    alert('Starting consultation for appointment ' + appointmentId);
}

// Patient dashboard functions
function rescheduleAppointment(appointmentId) {
    window.location.href = `/patient/reschedule/${appointmentId}/`;
}

function cancelAppointment(appointmentId) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
        alert('Appointment cancellation functionality would be implemented here');
    }
}

function viewMedicalRecords() {
    window.location.href = '/patient/medical-records/';
}


document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeTooltips();
    
    const dashboardButtons = document.querySelectorAll('.dashboard-actions .btn');
    dashboardButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
});

