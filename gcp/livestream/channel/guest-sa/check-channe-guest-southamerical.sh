curl -X GET \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json; charset=utf-8" \
    -d "" \
    "https://livestream.googleapis.com/v1/projects/$LIVESTREAM_PROJECT/locations/southamerica-east1/channels/guest-southamericas"