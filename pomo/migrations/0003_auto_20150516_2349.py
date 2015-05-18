# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pomo', '0002_auto_20150514_2011'),
    ]

    operations = [
        migrations.CreateModel(
            name='POMO',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('pomo_date', models.CharField(max_length=200)),
                ('pomo_time', models.CharField(max_length=200)),
                ('memo', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('tag_content', models.CharField(max_length=200)),
                ('plan', models.IntegerField()),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='break_time',
            field=models.IntegerField(default=60),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='work_time',
            field=models.IntegerField(default=120),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tag',
            name='user_name',
            field=models.ForeignKey(to='pomo.User'),
        ),
        migrations.AddField(
            model_name='pomo',
            name='tag_id',
            field=models.ForeignKey(to='pomo.Tag'),
        ),
        migrations.AddField(
            model_name='pomo',
            name='user_name',
            field=models.ForeignKey(to='pomo.User'),
        ),
    ]
