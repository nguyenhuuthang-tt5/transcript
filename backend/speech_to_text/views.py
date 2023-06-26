import string
from tokenize import String
from urllib.request import Request
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render
import requests
from rest_framework import generics, status
from rest_framework.response import Response
from speech_to_text.serializers import AudioSerializer
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import urllib.parse
import os
import mimetypes
mimetypes.init()

# config error type 
RS_OK = (0, 'OK')
RS_TYPEFILE_INVALID = (400, 'error.invalid_typefile')
RS_REQUEST_ERROR_EXECUTE = (500, 'error.error_execute')

def create_response(rs_code=RS_OK, data=None):
    return Response(status=status.HTTP_200_OK, data={
        'code': rs_code[0],
        'message': rs_code[1]
})

class UploadAudio(generics.CreateAPIView):
    serializer_class = AudioSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data= request.FILES)
        if not serializer.is_valid():
            return Response(data={
                'result': 'bad'
            })
        req_data = serializer.validated_data
        audioFile = (req_data['audioFile'])
        path_audio_file = f'./file_input/{audioFile}'
        audioPath = default_storage.save(path_audio_file, ContentFile(audioFile.read()))
        name, extension = os.path.splitext(audioPath)
        file = {'file': open(audioPath,'rb')}
        headers = {
            'Authorization': 'Bearer '+ 'trcKYEMznROYP2rQhIXn7Att'
        }
        mimestart = mimetypes.guess_type(audioPath)[0]

        if mimestart != None:
            mimestart = mimestart.split('/')[0]
            is_video_file = True if mimestart == 'video' else False
            
        values = {
            'name': name,
            'language': 'vi-VN',
            'video': is_video_file,
        }
        r = requests.post('https://api.sonix.ai/v1/media', files= file, data= values, headers=headers)
        return Response(r.json())




class Download(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        id = request.GET['id']
        headers = {
            'Authorization': 'Bearer '+ 'trcKYEMznROYP2rQhIXn7Att'
        }
        r = requests.get('https://api.sonix.ai/v1/media/'+id+'/transcript.json', headers=headers)
        return Response(r.json())
