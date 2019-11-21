#!/usr/bin

yum update -y
yum install git -y
yum install nodejs npm --enablerepo=epel -y
cd /home/ec2-user
git clone https://github.com/renanbym/ec2.git
