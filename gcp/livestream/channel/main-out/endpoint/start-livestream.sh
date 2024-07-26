#/bin/sh
curl -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json; charset=utf-8" \
    -d @request.json \
    "https://livestream.googleapis.com/v1/projects/$LIVESTREAM_PROJECT/locations/europe-west2/inputs?inputId=purizu-live"