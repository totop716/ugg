# from hashlib import blake2b
# from rest_framework import exceptions


def get_created_at_str(obj):
    return obj.created_at.strftime("%m/%d/%Y %H:%M %p")