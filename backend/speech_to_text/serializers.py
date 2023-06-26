from rest_framework import serializers

class AudioSerializer(serializers.Serializer):
    audioFile = serializers.FileField(required=True)
    #
    def update(self, instance, validated_data):
        pass
    #
    def create(self, validated_data):
        pass

