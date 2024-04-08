# npm install
rm -rf dist
npm i
if [ $? -eq 0 ];then
   echo "yarn OK"
else
   exit 
fi

#npm audit fix
npm run build --prod
if [ $? -eq 0 ];then
   echo "ng build OK"
else
   exit 
fi
rm -rf ../../../dist
mkdir ../../../dist
cp -R dist/* ../../../dist
if [ $? -eq 0 ];then
   echo "cp dist OK"
   cd ..
else
   exit 
fi

rm -f /usr/local/nginx/conf/nginx.conf

sudo cp  -f ../default.conf /usr/local/nginx/conf/nginx.conf
if [ $? -eq 0 ];then
   echo "cp -R nginx.conf OK"
   cd ..
else
   exit 
fi

/usr/local/nginx/sbin/nginx -s reload


