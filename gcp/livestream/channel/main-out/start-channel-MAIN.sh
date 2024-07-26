curl -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json; charset=utf-8" \
    -d "" \
    "https://livestream.googleapis.com/v1/projects/$LIVESTREAM_PROJECT/locations/europe-west2/channels/purizu-live:start"

    gcloud storage cp status-start.json gs://purizu-live/status.json
gcloud compute url-maps invalidate-cdn-cache purizu-live-lb --path "/status.json"