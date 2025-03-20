# Project Setup

This project is built with Symfony and requires the following steps for installation and setup.

## Installation

Run the following commands to set up the project:

```sh
composer install
```

```sh
yarn install --force
```

## Database Setup

Create the database:

```sh
symfony console d:d:create
```

Run migrations:

```sh
symfony console d:m:m
```

Load fixtures:

```sh
symfony console d:f:l
```

## JWT Configuration

Generate private and public keys for JWT authentication:

```sh
openssl genrsa -out config/jwt/private.pem -aes256 4096
```

```sh
openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
```

## Description

This project is a Symfony-based web application that includes authentication using JWT tokens. It requires setting up a database and installing dependencies using Composer and Yarn. The application supports data migrations and fixtures for easier development and testing. Ensure that OpenSSL is installed to generate the necessary JWT keys.

