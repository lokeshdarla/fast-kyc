from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.getRoutes),
    path('verifyImage/',views.VerifyImage),
    path('getAadhaarInfo/',views.AadhaarOcr),
    
    
   
]
