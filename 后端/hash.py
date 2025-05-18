import hashlib

# 创建一个新的sha256哈希对象
hash_object1 = hashlib.md5()
hash_object2 = hashlib.sha224()
hash_object3 = hashlib.sha256()
hash_object4 = hashlib.sha384()
hash_object5 = hashlib.sha1()

# 更新哈希对象，这里的'b'前缀表示后面字符串是字节类型
hash_object1.update(b'Hello World')
hash_object2.update(b'Hello World')
hash_object3.update(b'Hello World')
hash_object4.update(b'Hello World')
hash_object5.update(b'Hello World')

# 获取十六进制格式的摘要
hash_digest1 = hash_object1.hexdigest()
hash_digest2 = hash_object2.hexdigest()
hash_digest3 = hash_object3.hexdigest()
hash_digest4 = hash_object4.hexdigest()
hash_digest5 = hash_object5.hexdigest()

# 打印摘要
print(hash_digest1)
print(hash_digest2)
print(hash_digest3)
print(hash_digest4)
print(hash_digest5)
