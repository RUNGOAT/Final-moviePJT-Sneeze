from rest_framework import serializers
from .models import Community, Comment


class CommunityListSerializer(serializers.ModelSerializer):
  userName = serializers.SerializerMethodField()
  
  def get_userName(self,obj):
    return obj.user.username

  class Meta:
    model = Community
    fields = ('id', 'userName', 'user', 'title', 'content', 'created_at', 'updated_at',)
    read_only_fields = ('user',)


class CommentSerializer(serializers.ModelSerializer):
  userName = serializers.SerializerMethodField()
  
  def get_userName(self,obj):
    return obj.user.username

  class Meta:
    model = Comment
    fields = ('id', 'userName', 'user', 'content', 'created_at', 'updated_at', 'community',)
    read_only_fields = ('user','community',)

