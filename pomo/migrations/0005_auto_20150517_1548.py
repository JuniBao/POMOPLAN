# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pomo', '0004_auto_20150517_1236'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pomo',
            old_name='tag_id',
            new_name='pomo_related_tag',
        ),
    ]
