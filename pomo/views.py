from django.shortcuts import render
from .models import User, Tag, POMO
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
import json

WORK_DURATION = 2
BREAK_DURATION = 1


def login(request):
    # load the login page
    return render(request, 'pomo/login.html')


def signup_only(request):
    return render(request, 'pomo/signup.html')


def login_validation(request):
    response = {}

    username = request.GET['username']
    password = request.GET['password']

    if is_existed(username):
        response['existed'] = True

        user = User.objects.get(user_name=username)
        # check whether the password is right
        # password right
        if user.password == password:
            print "Correct!"
            response['valid'] = True
        # password wrong
        else:
            print "Wrong Password!"
            response['valid'] = False
    else:
        response['existed'] = False

    return JsonResponse(response)


def is_existed(username):
    try:
        user = User.objects.get(user_name=username)
        print("check it does exist!!! in <--is existed-->!")
        if user:
            return True
    except(KeyError, User.DoesNotExist):
        print KeyError
        return False

@csrf_protect
def signup(request):

    print "signup"
    response = {}

    str_name = request.POST['username']
    str_paswd = request.POST['password']

    print str_name
    print str_paswd

    if is_existed(str_name):
        response['existed'] = True
    else:
        response['existed'] = False
        new_user = User(user_name=str_name, password=str_paswd, work_time=WORK_DURATION, break_time=BREAK_DURATION)
        new_user.save()

    print(response['existed'])
    return JsonResponse(response)


def home(request):
    return render(request, 'pomo/home.html')


def get_user_info(request):
    response = {}

    username = request.GET['username']
    print "username in get_user_info: " + username

    if is_existed(username):
        user = User.objects.get(user_name=username)
        response['worktime'] = user.work_time
        response['breaktime'] = user.break_time
    else:
        response['worktime'] = None
        response['breaktime'] = None
    print(response)

    return JsonResponse(response)


def logout(request):
    return

@csrf_protect
def create_tag(request):
    print "create_tag hello world"
    response = {}

    tag_content = request.POST['content']
    plan = request.POST['plan']
    username = request.POST['username']
    user = User.objects.get(user_name=username)
    print user
    print tag_content + " " + str(plan) + " " + username

    new_tag = Tag(tag_content=tag_content, plan=plan, tag_related_user=user)
    new_tag.save()

    print "new_tag id: " + str(new_tag.id)
    response['tag_id'] = new_tag.id
    return JsonResponse(response)

@csrf_protect
def create_pomo(request):

    print "hello"
    response = {}

    pomo_date = request.POST['pomodate']
    pomo_time = request.POST['pomotime']
    pomo_memo = request.POST['memo']
    print pomo_date, pomo_time, pomo_memo
    pomo_tag = Tag.objects.get(id=request.POST['tagid'])
    pomo_user = User.objects.get(user_name=request.POST['username'])

    print pomo_date, pomo_time, pomo_memo, pomo_tag, pomo_user
    # TODO: need a check of availability of tag and user

    new_pomo = POMO(pomo_date=pomo_date,
                    pomo_time=pomo_time,
                    memo=pomo_memo,
                    pomo_related_tag=pomo_tag,
                    pomo_related_user=pomo_user)
    new_pomo.save()

    response['pomoid'] = new_pomo.id
    return JsonResponse(response)


def plan_view(request):
    return render(request, "pomo/plan.html")


def plan(request):
    response = {}

    username = request.GET['username']
    tags = Tag.objects.filter(tag_related_user__user_name=username)

    response['tags'] = [{
        "content": tag.tag_content,
        "plan": tag.plan
    } for tag in tags]
    return JsonResponse(response)