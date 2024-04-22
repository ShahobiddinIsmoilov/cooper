import numpy

# DO NOT CHANGE THE NUMBERS OR THE PERMALINKS WILL NOT WORK!

post_diff = 1000 * 1000 * 10
comment_diff = 1000 * 1000 * 100


def from_10_to_36_post(x):
    return numpy.base_repr(x + post_diff, 36).lower()

def from_36_to_10_post(x):
    return int(str(x), 36) - post_diff

def from_10_to_36_comment(x):
    return numpy.base_repr(x + comment_diff, 36).lower()

def from_36_to_10_comment(x):
    return int(str(x), 36) - comment_diff