`
composer install
yarn install --force
symfony console d:d:create
symfony console d:m:m
symfony console d:f:l
openssl genrsa -out config/jwt/private.pem -aes256 4096
openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem

`
