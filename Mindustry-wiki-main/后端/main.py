import logger
import sqlite3
from flask import Flask, request, jsonify
import hashlib
#sha1
import time


logger.info("正在加载数据...")

conn = sqlite3.connect(
    database = "main.db",
    check_same_thread = False,
    )

conn.execute("""create table if not exists userdata (
id integer primary key autoincrement,
username text,
mail text,
password text,
permission text,
reg_time text,
token text,
head_pic text)""")
conn.commit()

app = Flask(__name__)


@app.route('/api/user/login', methods=['POST'])
def login():
    data = request.json  # 获取POST请求中的JSON数据
    username = data.get('username')
    password = data.get('password')


    cursor = conn.execute('select * from userdata where username = ?', (username,))
    user = cursor.fetchone()
    if user and hashlib.sha1(password.encode()).hexdigest() == user[3]:  # assuming password is at index 3
        return jsonify(
            {
                'status': 200,
                'message': 'ok',
                'describe': 'Login successful',
                'data': [
                    {
                        'token': '0a4d55a8d778e5022fab701977c5d840bbc486d0',  # Replace with actual token generation logic
                        'time': 3600
                    }
                ]
            }
        )
    return jsonify(
        {
            'status': -1,
            'message': 'error',
            'describe': 'No such user or the account password is incorrect.'
        }
    )

@app.route('/api/user/register')
def register():
    data = request.json  # 获取POST请求中的JSON数据
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    print(username,  password.encode(), email)

    hash = hashlib.sha1()
    hash.update(password.encode())
    
   
    
    # ...
    conn.execute('insert into userdata (username,mail,password,permission,reg_time,token) values ("' + username + '","' + email + '","' + hash.hexdigest() + '","'"-1"'",' + str(time.time()) + ',"'"0"'")')
    conn.commit()
    

    hash2 = hashlib.sha1()
    hash2.update(password.encode())

    '''
    if(username == 'admin' and password == '12345'):
        return jsonify(
            {
                'status': 200,
                'message': 'ok',
                'describe': 'Login successful',
                'data': [
                    {
                    'token': '00000000000000000000000000000000',
                    'time': 3600
                    }
                ]
            }
        )
    '''
    return jsonify(
        {
            'status': 200,
            'message': 'ok',
            'describe': 'registed.'
        }
    )


logger.info("启动服务器...")
app.run(
    host="0.0.0.0",
    port=5000,
    debug=True
)



#插件：any-rule  Regex Previewer
# https://developer.baidu.com/article/details/2775932
# https://blog.csdn.net/2301_78217634/article/details/142529065
'''
	"id"	INTEGER,            #自行增加
    #无
	"username"	TEXT,           #用户名
    #无
	"mail"	TEXT,               #邮箱
    #无
	"password"	TEXT,           #密码（sha1）
    #无
	"permission"	TEXT,       #权限（组）
    #...可尝试...[1,2,4,8,16...]
	"reg_time"	INTEGER,        #注册时间戳
    #无
	"token"	TEXT,               #sha1
    #id+username+reg_time+随机数
'''


'''
# 插入一条数据
conn.execute("insert into students_info (name,age,address) values ('Tom',18,'北京东路')")

# 增添或者修改数据只会必须要提交才能生效
conn.commit()

# 调用连接对象的cursor()方法返回游标对象
cursor = conn.cursor()

# 调用游标对象的execute()方法执行查询语句
cursor.execute("select * from students_info")

# 执行了查询语句后，查询的结果会保存到游标对象中，调用游标对象的方法可获取查询结果
# 此处调用fetchall方法返回一个列表，列表中存放的是元组，
# 每一个元组就是数据表中的一行数据
result = cursor.fetchall()

#遍历所有结果，并打印
for row in result:
    print(row)

#关闭
cursor.close()
conn.close()
————————————————

                            版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
                        
原文链接：https://blog.csdn.net/2301_78217634/article/details/142529065
'''