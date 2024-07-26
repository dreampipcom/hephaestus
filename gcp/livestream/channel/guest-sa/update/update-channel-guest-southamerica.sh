curl -X PATCH \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json; charset=utf-8" \
    -d @update.json \
    "https://livestream.googleapis.com/v1/projects/$LIVESTREAM_PROJECT/locations/southamerica-east1/channels/guest-southamericas?updateMask=elementaryStreams&requestId=ed2f3f20-71f6-4b74-a3a6-cfa4f7b91eec"