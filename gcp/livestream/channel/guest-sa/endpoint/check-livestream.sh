curl -X GET \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    "https://livestream.googleapis.com/v1/projects/$LIVESTREAM_PROJECT/locations/southamerica-east1/operations/operation-1687272739549-5fe90cc47b1e2-ea96ea82-fe35df98"