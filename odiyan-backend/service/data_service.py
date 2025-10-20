import uuid
import hashlib

class DataService:
    user = {}

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
    
    def add_new_user(user_data):
        user_uuid = str(uuid.uuid4())
        user_password = DataService.encode_password(user_data.password)
        username = user_data.username

        DataService.user[username]={'password':user_password,'uuid':user_uuid}
        print(DataService.user)