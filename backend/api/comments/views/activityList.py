from itertools import chain
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.users.models import User
from api.posts.models import Post, UpvotePost, DownvotePost, SavePost
from api.posts.serializers import ListPostSerializer
from ..models import Comment, UpvoteComment, DownvoteComment
from ..serializers import ListCommentSerializer
from api.convert import from_10_to_36_post, from_10_to_36_comment


@api_view(['GET'])
def activityList(request, username):
    activity_user = get_object_or_404(User, username=username)
    comments = Comment.objects.filter(user=activity_user)
    posts = Post.objects.filter(user=activity_user)
    
    activity_raw = list(chain(comments, posts))

    sort_by = request.GET.get('sort', '')
    
    if sort_by == 'top':
        activity = sorted(activity_raw, key=lambda x: (x.votes, x.created_at), reverse=True)
    elif sort_by == 'best':
        activity = sorted(activity_raw, key=lambda x: (x.ratio, x.created_at), reverse=True)
    else:
        activity = sorted(activity_raw, key=lambda x: x.created_at, reverse=True)
    
    user = request.GET.get('user')
    data = []
    
    for item in activity:
        if hasattr(item, 'title'):
            serialized = ListPostSerializer(item, many=False).data
            if user != 'undefined':
                upvote = UpvotePost.objects.filter(post=item, user=user)
                serialized['upvoted'] = upvote.exists()
                downvote = DownvotePost.objects.filter(post=item, user=user)
                serialized['downvoted'] = downvote.exists()
                save = SavePost.objects.filter(post=item, user=user)
                serialized['saved'] = save.exists()
            post_id = from_10_to_36_post(serialized['id'])
            serialized['id'] = post_id
        else:
            serialized = ListCommentSerializer(item, many=False).data
            if user != 'undefined':
                upvote = UpvoteComment.objects.filter(comment=item, user=user)
                serialized['upvoted'] = upvote.exists()
                downvote = DownvoteComment.objects.filter(comment=item, user=user)
                serialized['downvoted'] = downvote.exists()
            comment_id = from_10_to_36_comment(serialized['id'])
            serialized['id'] = comment_id
            post_id = from_10_to_36_post(serialized['post'])
            serialized['post'] = post_id
        data.append(serialized)
        
    return Response(data)
