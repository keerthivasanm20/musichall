from rest_framework import serializers
from . models import *
  #Serializers are basically used to
  #  convert complex data to native
  #  Python datatypes that can then
  #  be easily rendered into 
  # JSON(Which we are going to use in React i.e. Client side). 

class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = HallDetails
        fields = ['host', 'Name','No_of_Users','No_change_music','HallName','number']