#/bin/sh
curl -X GET \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json; charset=utf-8" \
    "https://livestream.googleapis.com/v1/projects/$LIVESTREAM_PROJECT/locations/europe-west2/inputs/lowquality"