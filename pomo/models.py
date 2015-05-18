from django.db import models


class User(models.Model):

    user_name = models.CharField(max_length=200, primary_key=True)
    password = models.CharField(max_length=100)
    work_time = models.IntegerField()
    break_time = models.IntegerField()

    def __unicode__(self):
        return self.user_name + '  ' \
               + self.password + ' ' \
               + str(self.work_time) + ' ' \
               + str(self.break_time)


class Tag(models.Model):
    # auto_increment PK tag_id
    # Contents
    tag_content = models.CharField(max_length=200)
    plan = models.IntegerField()
    # FK
    tag_related_user = models.ForeignKey(User)

    def __unicode__(self):
        return self.tag_content + ' ' \
               + str(self.plan) + ' ' \
               + self.tag_related_user.user_name


class POMO(models.Model):
    # auto_increment PK pomo_id
    # Contents
    pomo_date = models.CharField(max_length=200)
    pomo_time = models.CharField(max_length=200)
    memo = models.CharField(max_length=200)
    # FK
    pomo_related_tag = models.ForeignKey(Tag)
    pomo_related_user = models.ForeignKey(User)

    def __unicode__(self):
        return self.pomo_date + ' ' \
               + self.pomo_time + ' ' \
               + str(self.pomo_related_tag.id) + ' ' \
               + self.pomo_related_user.user_name


