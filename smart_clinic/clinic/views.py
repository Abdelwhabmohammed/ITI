from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from django.utils import timezone
from datetime import datetime, timedelta
from .models import User, Patient, Doctor, Appointment, DoctorSchedule
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from django.db.models import Q
from datetime import datetime, date
import json

from .models import User, Patient, Doctor, Appointment, DoctorSchedule

def home(request):
    """Home page"""
    return render(request, 'home.html')

def login_view(request):
    """Login view"""
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            if user.role == 'patient':
                return redirect('patient_dashboard')
            elif user.role == 'doctor':
                return redirect('doctor_dashboard')
            elif user.role == 'admin':
                return redirect('/admin/')
        else:
            messages.error(request, 'Invalid username or password')
    
    return render(request, 'login.html')

def register_view(request):
    """Registration view"""
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        role = request.POST.get('role')
        
        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists')
            return render(request, 'register.html')
        
        user = User.objects.create_user(username=username, password=password, role=role)
        
        if role == 'patient':
            Patient.objects.create(
                user=user,
                name=request.POST.get('name'),
                age=request.POST.get('age'),
                gender=request.POST.get('gender'),
                blood_type=request.POST.get('blood_type'),
                medical_history=request.POST.get('medical_history', '')
            )
        elif role == 'doctor':
            Doctor.objects.create(
                user=user,
                name=request.POST.get('name'),
                specialization=request.POST.get('specialization'),
                clinic=request.POST.get('clinic'),
                license_no=request.POST.get('license_no')
            )        
        messages.success(request, 'Registration successful! Please login.')
        return redirect('login')
    
    return render(request, 'register.html')

def create_default_schedule(doctor):
    """Create default available schedule for new doctors"""
    from datetime import timedelta
    today = date.today()
    for i in range(30):  # Create schedule for next 30 days
        schedule_date = today + timedelta(days=i)
        DoctorSchedule.objects.create(
            doctor=doctor,
            date=schedule_date,
            start_time='09:00',
            end_time='17:00',
            is_available=True
        )

@login_required
def patient_dashboard(request):
    """Patient dashboard"""
    if request.user.role != 'patient':
        return redirect('home')
    
    patient = request.user.patient
    appointments = patient.appointments.all().order_by('-created_at')
    return render(request, 'patient_dashboard.html', {
        'patient': patient,
        'appointments': appointments
    })

@login_required
def doctor_dashboard(request):
    """Doctor dashboard"""
    if request.user.role != 'doctor':
        return redirect('home')
    
    doctor = request.user.doctor
    today = timezone.now().date()
    
    days_since_monday = today.weekday()
    week_start = today - timedelta(days=days_since_monday)
    week_end = week_start + timedelta(days=6)
    
    week_appointments = Appointment.objects.filter(
        doctor=doctor,
        date__range=[week_start, week_end]
    ).order_by('date', 'time')
    
    appointments_by_date = {}
    for appointment in week_appointments:
        date_str = appointment.date.strftime('%Y-%m-%d')
        if date_str not in appointments_by_date:
            appointments_by_date[date_str] = []
        appointments_by_date[date_str].append(appointment)
    
    week_schedule = []
    for i in range(7):
        current_date = week_start + timedelta(days=i)
        date_str = current_date.strftime('%Y-%m-%d')
        day_appointments = appointments_by_date.get(date_str, [])
        
        week_schedule.append({
            'date': current_date,
            'day_name': current_date.strftime('%A'),
            'date_display': current_date.strftime('%B %d'),
            'is_today': current_date == today,
            'appointments': day_appointments
        })
    
    # Get statistics
    total_patients = Appointment.objects.filter(doctor=doctor).values('patient').distinct().count()
    completed_appointments = Appointment.objects.filter(doctor=doctor, status='approved').count()
    pending_appointments = Appointment.objects.filter(doctor=doctor, status='pending').count()
    
    context = {
        'doctor': doctor,
        'week_schedule': week_schedule,
        'week_range': f"{week_start.strftime('%B %d')} - {week_end.strftime('%B %d, %Y')}",
        'total_patients': total_patients,
        'completed_appointments': completed_appointments,
        'pending_appointments': pending_appointments,
    }
    
    return render(request, 'doctor_dashboard.html', context)

@login_required
def admin_dashboard(request):
    """Admin dashboard"""
    if request.user.role != 'admin':
        return redirect('home')
    
    patients = Patient.objects.all()
    doctors = Doctor.objects.all()
    appointments = Appointment.objects.all().order_by('-created_at')
    
    return render(request, 'admin_dashboard.html', {
        'patients': patients,
        'doctors': doctors,
        'appointments': appointments
    })

@login_required
def book_appointment(request):
    """Book appointment page"""
    if request.user.role != 'patient':
        return redirect('home')
    
    if request.method == 'POST':
        doctor_id = request.POST.get('doctor_id')
        appointment_date = request.POST.get('date')
        appointment_time = request.POST.get('time')
        reason = request.POST.get('reason')
        
        doctor = get_object_or_404(Doctor, user_id=doctor_id)
        patient = request.user.patient
        
        appointment = Appointment.objects.create(
            patient=patient,
            doctor=doctor,
            date=appointment_date,
            time=appointment_time,
            reason=reason
        )
        
        messages.success(request, 'Appointment booked successfully!')
        return redirect('patient_dashboard')
    
    doctors = Doctor.objects.all()
    return render(request, 'book_appointment.html', {'doctors': doctors})

@login_required
def get_doctors_by_specialization(request):
    """API endpoint to get doctors by specialization"""
    specialization = request.GET.get('specialization')
    doctors = Doctor.objects.filter(specialization=specialization)
    
    doctors_data = []
    for doctor in doctors:
        doctors_data.append({
            'id': doctor.user.id,
            'name': doctor.name,
            'specialization': doctor.specialization,
            'clinic': doctor.clinic
        })
    
    return JsonResponse({'doctors': doctors_data})

@login_required
def approve_appointment(request, appointment_id):
    """Approve appointment"""
    if request.user.role != 'doctor':
        return JsonResponse({'error': 'Unauthorized'}, status=403)
    
    appointment = get_object_or_404(Appointment, id=appointment_id, doctor=request.user.doctor)
    appointment.status = 'approved'
    appointment.save()
    
    return JsonResponse({'success': True, 'message': 'Appointment approved'})

@login_required
def disapprove_appointment(request, appointment_id):
    """Disapprove appointment"""
    if request.user.role != 'doctor':
        return JsonResponse({'error': 'Unauthorized'}, status=403)
    
    appointment = get_object_or_404(Appointment, id=appointment_id, doctor=request.user.doctor)
    appointment.status = 'disapproved'
    appointment.save()
    
    return JsonResponse({'success': True, 'message': 'Appointment disapproved'})

@login_required
def edit_profile(request):
    """Edit user profile"""
    if request.method == 'POST':
        if request.user.role == 'patient':
            patient = request.user.patient
            patient.name = request.POST.get('name')
            patient.age = request.POST.get('age')
            patient.gender = request.POST.get('gender')
            patient.blood_type = request.POST.get('blood_type')
            patient.medical_history = request.POST.get('medical_history')
            patient.save()
        elif request.user.role == 'doctor':
            doctor = request.user.doctor
            doctor.name = request.POST.get('name')
            doctor.specialization = request.POST.get('specialization')
            doctor.clinic = request.POST.get('clinic')
            doctor.license_no = request.POST.get('license_no')
            doctor.save()
        
        messages.success(request, 'Profile updated successfully!')
        if request.user.role == 'patient':
            return redirect('patient_dashboard')
        elif request.user.role == 'doctor':
            return redirect('doctor_dashboard')
    
    return render(request, 'edit_profile.html')

@login_required
def view_all_patients(request):
    """View all patients"""
    if request.user.role != 'doctor':
        return redirect('home')
    
    patients = Patient.objects.all().order_by('name')
    return render(request, 'view_all_patients.html', {
        'patients': patients
    })

@login_required
def patient_detail(request, patient_id):
    """View patient details"""
    if request.user.role != 'doctor':
        return redirect('home')
    
    patient = get_object_or_404(Patient, user_id=patient_id)
    appointments = patient.appointments.filter(doctor=request.user.doctor).order_by('-date')
    
    return render(request, 'patient_detail.html', {
        'patient': patient,
        'appointments': appointments
    })

@login_required
def manage_schedule(request):
    """Manage doctor schedule"""
    if request.user.role != 'doctor':
        return redirect('home')
    
    doctor = request.user.doctor
    schedules = doctor.schedules.all().order_by('date', 'start_time')
    
    if request.method == 'POST':
        date = request.POST.get('date')
        start_time = request.POST.get('start_time')
        end_time = request.POST.get('end_time')
        is_available = request.POST.get('is_available') == 'on'
        
        # Check if schedule already exists for this date and time
        existing_schedule = DoctorSchedule.objects.filter(
            doctor=doctor,
            date=date,
            start_time=start_time
        ).first()
        
        if existing_schedule:
            messages.error(request, 'Schedule already exists for this date and time.')
        else:
            DoctorSchedule.objects.create(
                doctor=doctor,
                date=date,
                start_time=start_time,
                end_time=end_time,
                is_available=is_available
            )
            messages.success(request, 'Schedule added successfully!')
        
        return redirect('manage_schedule')
    
    return render(request, 'manage_schedule.html', {
        'schedules': schedules
    })

@login_required
def delete_schedule(request, schedule_id):
    """Delete a schedule slot"""
    if request.user.role != 'doctor':
        return JsonResponse({'error': 'Unauthorized'}, status=403)
    
    schedule = get_object_or_404(DoctorSchedule, id=schedule_id, doctor=request.user.doctor)
    schedule.delete()
    
    return JsonResponse({'success': True, 'message': 'Schedule deleted successfully'})

@login_required
def toggle_schedule_availability(request, schedule_id):
    """Change schedule availability"""
    if request.user.role != 'doctor':
        return JsonResponse({'error': 'Unauthorized'}, status=403)
    
    schedule = get_object_or_404(DoctorSchedule, id=schedule_id, doctor=request.user.doctor)
    schedule.is_available = not schedule.is_available
    schedule.save()
    
    return JsonResponse({
        'success': True, 
        'message': 'Schedule availability updated',
        'is_available': schedule.is_available
    })

@login_required
def reschedule_appointment(request, appointment_id):
    """Reschedule appointment"""
    if request.user.role != 'patient':
        return redirect('home')
    
    appointment = get_object_or_404(Appointment, id=appointment_id, patient=request.user.patient)
    
    if request.method == 'POST':
        new_date = request.POST.get('date')
        new_time = request.POST.get('time')
        
        # Check if the new slot is available
        doctor_schedule = DoctorSchedule.objects.filter(
            doctor=appointment.doctor,
            date=new_date,
            start_time__lte=new_time,
            end_time__gt=new_time,
            is_available=True
        ).first()
        
        if not doctor_schedule:
            messages.error(request, 'Selected time slot is not available.')
            return redirect('reschedule_appointment', appointment_id=appointment_id)
        
        # Check if there's already an appointment at this time
        existing_appointment = Appointment.objects.filter(
            doctor=appointment.doctor,
            date=new_date,
            time=new_time
        ).exclude(id=appointment_id).first()
        
        if existing_appointment:
            messages.error(request, 'This time slot is already booked.')
            return redirect('reschedule_appointment', appointment_id=appointment_id)
        
        # Update appointment
        appointment.date = new_date
        appointment.time = new_time
        appointment.status = 'pending'  # Reset status to pending
        appointment.save()
        
        messages.success(request, 'Appointment rescheduled successfully!')
        return redirect('patient_dashboard')
    
    # Get available schedules for the doctor
    available_schedules = DoctorSchedule.objects.filter(
        doctor=appointment.doctor,
        date__gte=timezone.now().date(),
        is_available=True
    ).order_by('date', 'start_time')
    
    return render(request, 'reschedule_appointment.html', {
        'appointment': appointment,
        'available_schedules': available_schedules
    })

@login_required
def get_available_times(request):
    """Get available times for a specific doctor and date"""
    doctor_id = request.GET.get('doctor_id')
    date = request.GET.get('date')
    
    if not doctor_id or not date:
        return JsonResponse({'error': 'Missing parameters'}, status=400)
    
    try:
        doctor = Doctor.objects.get(user_id=doctor_id)
        
        # Get available schedules for the date
        schedules = DoctorSchedule.objects.filter(
            doctor=doctor,
            date=date,
            is_available=True
        ).order_by('start_time')
        
        # Get existing appointments for the date
        existing_appointments = Appointment.objects.filter(
            doctor=doctor,
            date=date
        ).values_list('time', flat=True)
        
        available_times = []
        for schedule in schedules:
            # Generate time slots
            current_time = schedule.start_time
            end_time = schedule.end_time
            
            while current_time < end_time:
                time_str = current_time.strftime('%H:%M')
                if current_time not in existing_appointments:
                    available_times.append({
                        'time': time_str,
                        'display': current_time.strftime('%I:%M %p')
                    })
                
                # Add 30 minutes
                current_time = (datetime.combine(datetime.today(), current_time) + 
                              timedelta(minutes=30)).time()
        
        return JsonResponse({'times': available_times})
        
    except Doctor.DoesNotExist:
        return JsonResponse({'error': 'Doctor not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@login_required
def medical_records(request):
    """View medical records (patient only)"""
    if request.user.role != 'patient':
        return redirect('home')
    
    patient = request.user.patient
    appointments = patient.appointments.filter(status='approved').order_by('-date')
    
    return render(request, 'medical_records.html', {
        'patient': patient,
        'appointments': appointments
    })

def logout_view(request):
    """Logout view"""
    logout(request)
    return redirect('home')

