from django.shortcuts import render,redirect
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
import pyrebase
import random
from .credentials import *
from requests import Request,post
from rest_framework import status
#we are using util.py just to minimize the code to be written in views.py
from .util import *
from django.views.decorators.csrf import ensure_csrf_cookie
# Create your views here.
#// For Firebase JS SDK v7.20.0 and later, measurementId is optional
config = {
  'apiKey': "AIzaSyC237ZXZ2pc7TPPLUezPp4CTpYA3ezdrPk",
  'authDomain': "musichall-3fde6.firebaseapp.com",
  'databaseURL': "https://musichall-3fde6-default-rtdb.firebaseio.com",
  'projectId': "musichall-3fde6",
  'storageBucket': "musichall-3fde6.appspot.com",
  'messagingSenderId': "416608653361",
  'appId': "1:416608653361:web:8da89fd481de0b88b38510",
  'measurementId': "G-YCZC98WZ3B"
}
firebase=pyrebase.initialize_app(config)
auth1 = firebase.auth()
database=firebase.database()

class ReactView(APIView):
    
    serializer_class = ReactSerializer

    def get(self, request):
        #detail = [ {"host": detail.host,"Name": detail.Name,"No_of_Users":detail.No_of_Users,"No_change_music":detail.No_change_music}for detail in HallDetails.objects.all()]
        detail=database.child("users").child(5454).get().val()
        return Response(detail[1])
   
 
    
    def post(self, request):
            if not self.request.session.exists(request.session.session_key):
                self.request.session.create()
        #print(request.data) 
            serializer = ReactSerializer(data=request.data)
            print(serializer)
            data={
                'host':request.data['host'],
                'Name':request.data['Name'],
                'No_of_Users':request.data['No_of_Users'],
                'No_change_music':request.data['No_change_music'],
                'HallName':request.data['HallName'],
                'session':self.request.session.session_key
            }

            #print("post")
            #print(data)
            timestamps={}    
            number=request.data['number']
            print(number)
            if data['host'] == 'true':
              
               timestamps=database.child("users").child(number).child(1).set(data)
               self.request.session['room_code']=number
               print(len(timestamps))
            else:
               host_allowed_max=database.child("users").child(number).child(1).get().val()
               
               dlic=database.child("users").child(number).get().val()
               9
               length=len(dlic)-1
               if int(host_allowed_max['No_of_Users']) > length:
                    timestamps=database.child("users").child(number).child(length+1).set(data)
                    self.request.session['room_code']=number
                    print("inserted")
               else:
                    print("not inserted")
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            
            return redirect("/room/"+number)

class AuthURL(APIView):
    def get(self,request):
        #scopes needed by this application from spotify
        scopes='user-modify-playback-state user-read-playback-state  user-read-currently-playing'
        #returns the string 
        url=Request('GET','https://accounts.spotify.com/authorize',params={
              'scope':scopes,
              'response_type':'code',
               'redirect_uri':REDIRECT_URI,
               'client_id':CLIENT_ID    
          
        }).prepare().url
        u={"url":url}
        print(scopes)
        print(u)
        return Response(u,status=status.HTTP_200_OK)


class getRoom(APIView):
    lookup_url_kwarg = 'code' 

    def get(self,request):
            code= request.GET.get(self.lookup_url_kwarg)
            #print(code)
            if code !=None:
                room=database.child("users").child(code).child(1).get().val()
                print(room)
                if room != None:
                      return Response(room,status=status.HTTP_200_OK)

                return Response({},status=status.HTTP_404_NOT_FOUND)
                     



def spotify_callback(request,format=None):
    #information that is passed by 'spotify' after Logged in it include accesstokens and RefreshTokens
    code=request.GET.get('code')
    err=request.GET.get('error')
    response=post('https://accounts.spotify.com/api/token',data={
        'grant_type':'authorization_code',
        'code':code,
        'redirect_uri':REDIRECT_URI,
        'client_id':CLIENT_ID,
        'client_secret':CLIENT_SECRET
    }).json()
    
    access_token =response.get('access_token')
    token_type=response.get('token_type')
    refresh_token=response.get('refresh_token')
    expires_in =response.get('expires_in')
    error =response.get('error')
    #creating a session after 1.logged in 2.after the tokens issued for them by spotify
    #3.we are here to create session
    if not request.session.exists(request.session.session_key):
        request.session.create()

    update_or_create_user_tokens(request.session.session_key,access_token,expires_in,refresh_token)
    
    return redirect("frontend")

class IsAutheticated(APIView):
    def get(self,request):
        is_autheticated=is_spotify_authenticated(self.request.session.session_key)
        return Response({'Status':is_autheticated},status=status.HTTP_200_OK)


class JoinRoom(APIView):
     
    def post(self,request):
         if not self.request.session.exists(request.session.session_key):
                self.request.session.create()
         
         room_code=request.data.get('code')
         data={
             "host":"false",
             "session_id":self.request.session.session_key
         }
         print(room_code)
         if room_code != None:
              timespace=database.child("users").child(room_code).child(1).get().val()    
              if timespace !=None:
                  host_allowed_max=database.child("users").child(room_code).child(1).get().val()
               
                  dlic=database.child("users").child(room_code).get().val()
                  print("the value")
                  print(dlic)
                  length=len(dlic)-1
                  if int(host_allowed_max['No_of_Users']) > length:
                      timestamps=database.child("users").child(room_code).child(length+1).set(data)
                      self.request.session['room_code']=room_code
                      print("inserted")
                  else:
                    print("not inserted")
                    #self.request.session['room_code']=room_code
                    
                  return redirect('/room/'+room_code)



class CurrentSong(APIView):
    lookup_url_kwarg = 'code' 
    def get(self,request):
        room_code= request.GET.get(self.lookup_url_kwarg)
        
        #code=self.request.session['room_code']
        ts={}
        print("room_code"+room_code)
        

        timespace=database.child("users").child(room_code).child(1).get().val()
        #print(timespace)
        if timespace!=None:
            ts=timespace
        else:
            return Response({"rip":"rip"},status=status.HTTP_404_NOT_FOUND)
        endpoint="player/currently-playing"
        response=execute_spotify_api_request(timespace['session'],endpoint)
        if 'error' in response or 'item' not in response:
            return Response({"guess":"error"},status=status.HTTP_200_OK)

        item=response.get('item')
        duration=item.get('duration_ms')
        progress=response.get('progress_ms')
        album_cover=item.get('album').get('images')[0].get('url')
        is_playing=response.get('is_playing')
        song_id=item.get('id')
        #to handle multiple artists

        artist_string=""
        for i,artist in enumerate(item.get('artists')):
            if i > 0:
                artist_string +=", " 
            name= artist.get('name')
            artist_string += name
        song={
            'title':item.get('name'),
            'artist':artist_string,
            'duration':duration,
            'time':progress,
            'image_url':album_cover,
            'is_playing':is_playing,
             'votes':0,
             'id':song_id
        }
        
        # print(request.session.session_key)
        # print(song)
        return Response(song,status=status.HTTP_200_OK)
        
     
class PauseSong(APIView):
    def put(self,response):
        room_code=self.request.session.get('room_code')
        print(room_code)
        room=database.child("users").child(room_code).child(1).get().val()
        print(room)
        print(room['session'])
        print(self.request.session.session_key)
        print(type(self.request.session.session_key))
        print(type(room['session']))
        a={}
        if room['session'] == self.request.session.session_key:
              a=pause_song(room['session'])
              print("kee")
              print(a)
              return   Response({"a":a},status=status.HTTP_200_OK)
        else:
             if room['No_change_music'] > 0:
                 print(room['session'])
                 a=pause_song(room['session'])
                 print(a)
                 return Response({"a":a},status=status.HTTP_200_OK)
        
             return Response({},status=status.HTTP_404_NOT_FOUND)

class PlaySong(APIView):
    def put(self,response):
        room_code=self.request.session.get('room_code')
        room=database.child("users").child(room_code).child(1).get().val()
        if room['session'] == self.request.session.session_key:
              a=plays_song(room['session'])
              return   Response({"a":a},status=status.HTTP_200_OK)
        else:
             if room['No_change_music'] > 0:
                 a= plays_song(room['session'])
                 return Response({"a":a},status=status.HTTP_200_OK)

             return Response({},status=status.HTTP_404_NOT_FOUND)

class leaveroom(APIView):
    
    def post(self,request):
             room_code=request.data.get('code')
             sid=self.request.session.session_key
             print("session id")
             print(sid)
             room=database.child("users").child(room_code).child(1).get().val()
             if room['session'] == sid:
                 database.child("users").child(room_code).remove()
                  
             else:
                for i in range(2,int(room['No_of_Users'])+1):
                   cmp_sid=database.child("users").child(room_code).child(i).get().val()
                #    print(cmp_sid)
                #    print(i)
                   if cmp_sid['session_id'] == sid:
                        timestamp=database.child("users").child(room_code).child(i).remove()
                        # print(timestamp)
                        break
                   
             
             return redirect("/join")

class SkipSong(APIView):
    def post(self,request,format=None):
        room_code=self.request.session.get('room_code')
        room=database.child("users").child(room_code).child(1).get().val()
        sid= self.request.session.session_key
        if room != None:
            if sid == room['session']:
                ti=skipsong(room['session'])
                print("host")
                print(ti)
                
            else:
                if int(room['No_change_music']) > 0: 
                    for i in range(2,int(room['No_of_Users'])+1):
                        cmp_sid=database.child("users").child(room_code).child(i).get().val()
                #    print(cmp_sid)
                #    print(i)
                        if cmp_sid['session_id'] == sid:
                            ti=skipsong(cmp_sid['session_id'])
                            print("ser---------------------------------")
                            print(ti)
                        
                            return Response({"succes":"succes"},status=status.HTTP_200_OK)
                        
            

        return Response({},status=status.HTTP_404_NOT_FOUND)