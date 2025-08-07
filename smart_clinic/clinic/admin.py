from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Patient, Doctor, Appointment, DoctorSchedule

class CustomUserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Role Information', {'fields': ('role',)}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Role Information', {'fields': ('role',)}),
    )

class PatientAdmin(admin.ModelAdmin):
    list_display = ('name', 'age', 'gender', 'blood_type')
    list_filter = ('gender', 'blood_type')
    search_fields = ('name', 'user__username')

class DoctorAdmin(admin.ModelAdmin):
    list_display = ('name', 'specialization', 'clinic', 'license_no')
    list_filter = ('specialization',)
    search_fields = ('name', 'user__username', 'license_no')

class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('patient', 'doctor', 'date', 'time', 'status', 'created_at')
    list_filter = ('status', 'date', 'doctor__specialization')
    search_fields = ('patient__name', 'doctor__name', 'reason')
    date_hierarchy = 'date'

class DoctorScheduleAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'date', 'start_time', 'end_time', 'is_available')
    list_filter = ('is_available', 'date')
    search_fields = ('doctor__name',)
    date_hierarchy = 'date'

admin.site.register(User, CustomUserAdmin)
admin.site.register(Patient, PatientAdmin)
admin.site.register(Doctor, DoctorAdmin)
admin.site.register(Appointment, AppointmentAdmin)
admin.site.register(DoctorSchedule, DoctorScheduleAdmin)

admin.site.site_header = "Smart Clinic Administration"
admin.site.site_title = "Smart Clinic Admin"
admin.site.index_title = "Welcome to Smart Clinic Administration"

