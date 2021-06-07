from django.urls import path
from django.conf.urls import url
from.views import *

urlpatterns = [
    path('',index),
    path('join',index),
    path('login',index),
    path('demo',index),
    path('room/<int:room>/',index),
    path('getroom/<int:room>/',index),
    # path('api/getsong/<int:room>/',index),
   
    
]