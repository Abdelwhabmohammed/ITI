from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),
    path('patient/dashboard/', views.patient_dashboard, name='patient_dashboard'),
    path('doctor/dashboard/', views.doctor_dashboard, name='doctor_dashboard'),
    path('admin/dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('book-appointment/', views.book_appointment, name='book_appointment'),
    path('api/doctors-by-specialization/', views.get_doctors_by_specialization, name='doctors_by_specialization'),
    path('api/approve-appointment/<int:appointment_id>/', views.approve_appointment, name='approve_appointment'),
    path('api/disapprove-appointment/<int:appointment_id>/', views.disapprove_appointment, name='disapprove_appointment'),
    path('edit-profile/', views.edit_profile, name='edit_profile'),
    path('doctor/patients/', views.view_all_patients, name='view_all_patients'),
    path('doctor/patient/<int:patient_id>/', views.patient_detail, name='patient_detail'),
    path('doctor/schedule/', views.manage_schedule, name='manage_schedule'),
    path('api/delete-schedule/<int:schedule_id>/', views.delete_schedule, name='delete_schedule'),
    path('api/toggle-schedule/<int:schedule_id>/', views.toggle_schedule_availability, name='toggle_schedule'),
    path('patient/reschedule/<int:appointment_id>/', views.reschedule_appointment, name='reschedule_appointment'),
    path('api/available-times/', views.get_available_times, name='get_available_times'),
    path('patient/medical-records/', views.medical_records, name='medical_records'),
]

