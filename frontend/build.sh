npm install -g increase-memory-limit
/usr/local/nodejs/bin/increase-memory-limit
if [ $? -eq 0 ];then
   echo "increase-momory limit OK"
else
   exit
fi
# npm install
npm i
if [ $? -eq 0 ];then
   echo "yarn OK"
else
   exit 
fi

#npm audit fix
ng build --prod
if [ $? -eq 0 ];then
   echo "ng build OK"
else
   exit 
fi
rm -rf ../dist/*
cp -R dist/* ../../../dist/
if [ $? -eq 0 ];then
   echo "cp dist OK"
   cd ..
else
   exit 
fi


