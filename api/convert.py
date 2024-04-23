import numpy

# DO NOT CHANGE THE NUMBERS OR THE PERMALINKS WILL NOT WORK!

post_diff = 1000 * 1000 * 10
comment_diff = 1000 * 1000 * 100


def encode_post_id(x):
    return numpy.base_repr(x + post_diff, 36).lower()

def decode_post_id(x):
    return int(str(x), 36) - post_diff

def encode_comment_id(x):
    return numpy.base_repr(x + comment_diff, 36).lower()

def decode_comment_id(x):
    return int(str(x), 36) - comment_diff