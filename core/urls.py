from django.conf.urls import url
from django.urls import path, include
from .views import *
urlpatterns = [
	
	path('wel/', ReactView.as_view()),
	path('join-room/',JoinRoom.as_view()),
    path('getroom',getRoom.as_view()),
	path('getsong',CurrentSong.as_view()),
    path('pause',PauseSong.as_view()),
	path('play',PlaySong.as_view()),
	path('leaveroom',leaveroom.as_view()),
    path('skip',SkipSong.as_view()),
]