#!/bin/bash
# 获取安装包
wget https://github.com/pymumu/smartdns/releases/download/Release46.1/smartdns.1.2025.03.02-1533.x86_64-linux-all.tar.gz
# 解压
tar -zxf smartdns.*
cd smartdns
chmod +x ./install
# 安装
./install -i

echo "# 指定监听的端口号" >/etc/smartdns/smartdns.conf
echo "bind []:8888" >/etc/smartdns/smartdns.conf
echo "# 指定上游服务器" >/etc/smartdns/smartdns.conf
echo "server 1.1.1.1" >/etc/smartdns/smartdns.conf
echo "server-tls 8.8.8.8" >/etc/smartdns/smartdns.conf

# 启动服务
systemctl enable smartdns

# 验证是否修改
nslookup -querytype=ptr smartdns
