# Pizzeria

Pizzeria API

## Introduction

Welcome to version 1 of Pizzeria API. Below you will find the available method on the endpoint.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

To work with this project you need to have the following installed on your local machine

1. [NodeJS](https://nodejs.org)
2. [Git](https://git-scm.com/downloads)
3. [Postman](https://www.postman.com/downloads/)

## Install and run locally

```bash
git clone https://github.com/abejide001/pizzeria.git
cd pizzeria

export
mv .env.sample .env
npm i
npm run start:dev
```

## Running **Tests**

```bash
git clone https://github.com/abejide001/pizzeria.git
cd pizzeria

# rename .env.sample to .env, and set your environment variable

export
mv .env.sample .env
npm i
npm run test
```

## API Usage

API BASE URL(<https://pizzeria-2021.herokuapp.com/api/v1>).

### Authentication endpoints `/auth`

| method | route   | description | data                | priviledge             |
|--------|---------|-------------|---------------------|------------------------|
| POST   | /sigin  | Sign In     | `{email, password}` | admin, customer        |
| POST   | /signup | Sign up     | `{email, password}` | admin, customer        |

### Pizza endpoint `/pizza`

| method | route      | description      | data                                   |
|--------|------------|------------------|----------------------------------------|
| POST   | /pizza     | Create a pizza   | name, price, quantity                  |

### Order endpoint `/order`

| method | route      | description      | data                                   |
|--------|------------|------------------|----------------------------------------|
| POST   | /order     | Create an order  | items                                  |

## API Docs

<https://pizzeria-2021.herokuapp.com/api/v1/docs> (change the Schemes to HTTPS)

## App URL

<https://pizzeria-2021.herokuapp.com/api/v1>

## Author

Abejide Femi - abejidefemi1@gmail.com
