from django.shortcuts import render

# Create your views here.
def index(request,room=1000):
    return render(request,"frontend/index.html")