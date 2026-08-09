import pymysql

# 1. Register PyMySQL as MySQLdb
pymysql.install_as_MySQLdb()

# 2. Patch Django's MySQL version check
from django.db.backends.mysql.base import DatabaseWrapper
DatabaseWrapper.check_database_version_supported = lambda self: None