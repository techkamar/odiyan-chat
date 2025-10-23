import uuid
import hashlib
import jwt
import os
import datetime
import threading

lock = threading.Lock()

class DataService:
    user = {}

    """
        << message structure >>
        {
            "to": {
                "from": [
                            {
                                "type": "recieved",
                                "message": "Hi",
                                "timestamp": "timestamp"
                            }
                ]
            }
        }
    """
    message = {}
    # Secret key for encoding and decoding
    SECRET_KEY = os.getenv("JWTSECKEY","JWTSECKEY")

    @staticmethod
    def encode_password(password):
        # Encode the string to bytes (e.g., using UTF-8 encoding)
        encoded_string = password.encode('utf-8')

        # Create an MD5 hash object
        md5_hash_object = hashlib.md5()

        # Update the hash object with the encoded string
        md5_hash_object.update(encoded_string)

        # Get the hexadecimal representation of the hash
        md5_hex_digest = md5_hash_object.hexdigest()

        return md5_hex_digest
    
    @staticmethod
    def check_user_exists(username):
        if username in DataService.user:
            return True
        return False
    
    @staticmethod
    def add_new_user(user_data):
        user_uuid = str(uuid.uuid4())
        user_password = DataService.encode_password(user_data.password)
        username = user_data.username

        DataService.user[username]={'password':user_password,'uuid':user_uuid}

    @staticmethod
    def validate_user_credential(user_data):
        if user_data.username not in DataService.user:
            return False, "Username or Password is Invalid"
        
        password = DataService.encode_password(user_data.password)
        if DataService.user[user_data.username]['password']!= password:
            return False, "Username or Password is Invalid"
        
        return True, "Login Success"
    
    @staticmethod
    def encode_user_jwt(user_params):
        payload_json = user_params
        payload_json['exp'] = datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expires in 1 hour

        # Encode the JWT
        token = jwt.encode(payload_json, DataService.SECRET_KEY, algorithm='HS256')
        return token
    
    @staticmethod
    def decode_user_jwt(token):
        # Decode the JWT
        try:
            decoded_token = jwt.decode(token, DataService.SECRET_KEY, algorithms=['HS256'])
            return decoded_token
        except jwt.ExpiredSignatureError:
            raise Exception("JWT Token has expired")
        except jwt.InvalidTokenError:
            raise Exception("JWT Token is Invalid")
        
    
    @staticmethod
    def add_message(recipient_user, sender_user, message_content_json):
        with lock: # Synchronizing thread to avoid data corruption when multi users are accessing this API
            if recipient_user not in DataService.message:
                DataService.message[recipient_user]={}
            
            if sender_user not in DataService.message[recipient_user]:
                DataService.message[recipient_user][sender_user]=[]
            
            DataService.message[recipient_user][sender_user].append(message_content_json)

            print(DataService.message)
