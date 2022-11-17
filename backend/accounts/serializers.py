from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomRegisterSerializer(RegisterSerializer):
    nickname = serializers.CharField(max_length=100)
    
    # followers = followersSerializers

    # class Meta:
    #     model = User
    #     fields = [
    #         'id', 
    #         'username', 
    #     ]

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['nickname'] = self.validated_data.get('nickname','')
        return data



# class UserSerializer(serializers.ModelSerializer):

#     password = serializers.CharField(write_only=True)
    
#     class Meta:
#         model = User
#         fields = ('id', 'username', 'like_movies', 'password', 'email', 'followings', 'reviews', 'followers',)
#         read_only_fields = ('followings', 'reviews', 'like_movies', 'followers',)
