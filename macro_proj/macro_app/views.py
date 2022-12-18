from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json
import hashlib
import random
from .models import macros
from django.http import JsonResponse
from django.contrib.auth import logout
from datetime import date
from .models import Food
import json
from django.db.models import Sum



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
        return render(request, 'index.html')
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

@csrf_exempt
def log_out(request):
    logout(request)
    return render(request, 'index.html')

#We will only be getting the data for me for demo purposes. 
#This is just to simulate what the app would look like with full functionality
def home(request):
    cassie_data = macros.objects.get(pk=1)
    carbData = list(Food.objects.aggregate(Sum('carbs')).values())[0]
    proteinData = list(Food.objects.aggregate(Sum('protein')).values())[0]
    fatData = list(Food.objects.aggregate(Sum('fat')).values())[0]
    data = {
        'weight': cassie_data.weight,
        'activity_level': cassie_data.lifestyle.lower(),
        'protein_active': 0.8 * cassie_data.weight,
        'protein_sedentary': 0.36 * cassie_data.weight,
        'carbs_active': 1.5 * cassie_data.weight,
        'carbs_sedentary': 0.5 * cassie_data.weight,
        'fat_active': 0.5 * cassie_data.weight,
        'fat_sedentary': 0.4 * cassie_data.weight,
        'carbs': carbData,
        'protein': proteinData,
        'fat': fatData
    }
    return render(request, 'home.html', data)

todaysDate = date.today()
def foodAdder(request):
    date = todaysDate
    data = {
        'date': date
    }
    return render(request, 'foodAdder.html', data)

@csrf_exempt
def addFood(request):
    if request.method == 'POST':
        print('received')

        body = json.loads(request.body)
        new_food = Food(protein = body['protein'], carbs = body['carbs'], fat = body['fat'])
        new_food.save()

    return JsonResponse('success', safe=False)