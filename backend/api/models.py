from django.db import models

class Farmer(models.Model):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15, unique=True)
    location = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.location})"


class CropData(models.Model):
    farmer = models.ForeignKey(Farmer, on_delete=models.CASCADE, related_name='crops')
    crop_name = models.CharField(max_length=100)
    soil_type = models.CharField(max_length=100)
    field_area_acres = models.FloatField()
    planted_date = models.DateField()

    def __str__(self):
        return f"{self.crop_name} - {self.farmer.name}"


class Advisory(models.Model):
    crop_data = models.ForeignKey(CropData, on_delete=models.CASCADE, related_name='advisories')
    advisory_text = models.TextField()
    temperature_celsius = models.FloatField(null=True, blank=True)
    humidity_percent = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Advisory for {self.crop_data.crop_name} ({self.created_at.strftime('%Y-%m-%d')})"