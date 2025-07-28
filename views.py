from django.shortcuts import render
from .models import Post

def home(request):
    posts = Post.objects.all().order_by('-create_date')
    return render(request, 'home.html', {'posts': posts})
