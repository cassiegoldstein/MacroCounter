from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json
import hashlib
import random
from .models import macros
from django.http import JsonResponse

# Create your views here.
def index(request):
    return render(request, 'index.html')

def generate_salt():
    return str(random.randint(10000000,99999999))

@csrf_exempt
def sign_up(request):
    if request.method == 'GET':
        return render(request, 'signup.html')

    elif request.method == 'POST':
        body = json.loads(request.body)
        raw_password = body['password']

        salt = generate_salt()

        salted_hashed_password = hashlib.sha256((salt + raw_password).encode()).hexdigest()
        new_user = macros(name=body['name'], email=body['email'], weight=body['weight'], gender=body['gender'], lifestyle=body['lifestyle'], password=f"{salt}${salted_hashed_password}")
        new_user.save()

        return JsonResponse({
            'success':True,
        })

@csrf_exempt
def login(request):
    if request.method == 'GET':
        return render(request, 'home.html')
    elif request.method == 'POST':
        body = json.loads(request.body)
        user = macros.objects.get(email=body['email'])
        
        split_password = user.password.split('$')
        salt = split_password[0]
        hashed_password = split_password[1]

        challenge_hash = hashlib.sha256((salt + body['password']).encode()).hexdigest()
    
    if challenge_hash == hashed_password:
        response = JsonResponse({'success': True})
        response.set_cookie('user_id', user.id)
        return response
  #if username/password are not in database, error will occur


def home(request):
    return render(request, 'home.html')