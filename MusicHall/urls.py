from django.contrib import admin
from django.urls import path, include,re_path
from django.conf.urls import url
from core.views import *
from frontend.views import *

urlpatterns = [
	path('',include('frontend.urls')),
	path('api/',include('core.urls')),
	path('demo',index,name='frontend'),
	path('admin/', admin.site.urls),
	
    path('auth/',AuthURL.as_view()),
	path('redirect/',spotify_callback),
	path('isautheticated/',IsAutheticated.as_view()),
	path('currentsong',CurrentSong.as_view()),
	# re_path(r'^([0-9]+)/$',CurrentSong.as_view()),
	
	
	]
