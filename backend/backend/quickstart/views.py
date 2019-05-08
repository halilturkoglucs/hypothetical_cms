from django.shortcuts import render

# Create your views here.
class PostsView(ListAPIView):
    authentication_class = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)