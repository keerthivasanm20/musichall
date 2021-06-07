from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from .credentials import *
from requests import post,put,get

BASE_URL = "https://api.spotify.com/v1/me/"
#getting the session id from the models for fetchinng the current accestoke for current user
def get_user_tokens(session_id):
     user_tokens=SpotifyToken.objects.filter(user=session_id)
     if user_tokens.exists(): 
         return user_tokens[0]
     else:
         return None
     
def update_or_create_user_tokens(session_id,access_token,expires_in,refresh_token):
    tokens=get_user_tokens(session_id)
    #is a numeric valu this runs upto 1 hour
    #converts the expires in to the current time 
    expires_in=timezone.now() + timedelta(seconds=3600)
    #if tokes that exists ran out of time then updateing the token using the refresh token
    print(tokens)
    print(type(tokens))
    
    
    if tokens:
        tokens.access_token=access_token
        tokens.refresh_token=refresh_token
        tokens.expires_in=expires_in
    
        tokens.save(update_fields=['access_token','refresh_token','expires_in'])
    #if no tokens is isssued already then we create new tokens
    else:
        tokens=SpotifyToken(user=session_id,access_token=access_token,refresh_token=refresh_token,expires_in=expires_in)
        tokens.save()
#checking whether we are authenticated and if autheticate so if outr token is expired then refresh the token
def is_spotify_authenticated(session_id):
    tokens=get_user_tokens(session_id)
    if tokens:
        expire=tokens.expires_in
        if expire <= timezone.now():
             refresh_spotify_token(session_id)
             return True
    return False

def refresh_spotify_token(session):
    refresh_token=get_user_tokens(session_id).refresh_token

    response=post('https://account.spotify.com/api/token',data={
        'grant_type':'refresh_token',
        'redirect_uri':refresh_token,
        'client_id':CLIENT_ID,
        'client_secret':CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type=response.get('token_type')
    expires_in=response.get('expires_in')
    

    update_or_create_user_tokens(session_id,access_token,expires_in,refresh_token)
    
def execute_spotify_api_request(session_id,endpoint,post_=False,put_=False):
   
    tokens=get_user_tokens(session_id)
    
    
   
    headers={'Content-Type': 'application/json', 'Authorization':"Bearer "+ tokens.access_token}
    if post_:
        print(post_)
        post(BASE_URL + endpoint,headers=headers)
    if put_:
        print(put_)
        print(session_id)
        print(tokens.access_token)
        a=put(BASE_URL + endpoint, headers=headers)
        print(a)

    response = get(BASE_URL + endpoint, {},headers=headers)
    try:
        return response.json()
    except:
        return{"error":"Issue with Request"}

def plays_song(session_id):
       return execute_spotify_api_request(session_id,"player/play",put_=True)
    

def pause_song(session_id):
       print("pause")
       return execute_spotify_api_request(session_id,"player/pause",put_=True)


def skipsong(session_id):
       print("skip")
       return execute_spotify_api_request(session_id,"player/next",post_=True)