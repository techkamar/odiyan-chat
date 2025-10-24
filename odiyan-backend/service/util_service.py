import random
import string

class UtilService:
    @staticmethod
    def generate_random_string(length):
        """
        Generates a random alphanumeric string of a specified length.
        """
        characters = string.ascii_letters + string.digits
        random_string = ''.join(random.choice(characters) for i in range(length))
        return random_string