# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pomo', '0003_auto_20150516_2349'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pomo',
            old_name='user_name',
            new_name='pomo_related_user',
        ),
        migrations.RenameField(
            model_name='tag',
            old_name='user_name',
            new_name='tag_related_user',
        ),
    ]
