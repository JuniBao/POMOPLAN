__author__ = 'tongtongbao'

from django.conf.urls import url

from . import views

urlpatterns = [
    # ex: /pomo/login
    url(r'^login/$', views.login, name='login'),

    # ex: /pomo/home
    url(r'^home/*$', views.home, name='home'),

    # ex: /pomo/signup_only
    url(r'^signup_only/$', views.signup_only, name='signup_only'),

    # ex: /pomo/signup/username=...
    url(r'^signup*$', views.signup, name='signup'),

    # ex: /pomo/login_validation
    url(r'^login_validation*$', views.login_validation, name='login_validation'),

    # ex: /pomo/get_user_info?username = ...
    url(r'^get_user_info*$', views.get_user_info, name='get_user_info'),

    # ex: /pomo/create_tag?tag_content=...
    url(r'^create_tag*$', views.create_tag, name='create_tag'),

    # ex: /pomo/create_pomo?date=...
    url(r'^create_pomo*$', views.create_pomo, name='create_pomo'),

    # ex: /pomo/plan
    url(r'^plan/?$', views.plan_view, name='plan_view'),
    url(r'^plan_data*$', views.plan, name='plan')
]