from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="login"),
    path('log-in/', views.login),
    path('sign-up/', views.sign_up, name="signup"),
    path('log-out/', views.log_out, name="logout"),
    path('success/', views.home, name="success"),
]