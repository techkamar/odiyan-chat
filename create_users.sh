curl -X 'POST' \
  'http://127.0.0.1:8080/api/user' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "kamar",
  "password": "kamar",
  "confirm_password": "kamar"
}'

curl -X 'POST' \
  'http://127.0.0.1:8080/api/user' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "john",
  "password": "john",
  "confirm_password": "john"
}'