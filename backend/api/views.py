from django.http import JsonResponse

def index(request):
    return JsonResponse({"message": "Crop Advisory System API is up and running!"})