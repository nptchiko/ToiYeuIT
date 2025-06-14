# EngHub - TOEIC online test preparation system

## Requirements

For building and running the application you need:

- [JDK 21](https://www.oracle.com/java/technologies/downloads/#java21)
- [Maven 3.9.9](https://maven.apache.org)
- [Docker](https://www.docker.com/) (Recommend)

## Prequisite

Generate RSA key for JWT authentication:

**Linux:**

- Run this:
  ```shell
  chmod +x gen_cert.sh
  ./gen_cert.sh
  ```
- Check `certs` directory to ensure script worked

**Windows:**

- Visit: [RSA generator](https://emn178.github.io/online-tools/rsa/key-generator/)
- **Note**: choose PKCS#8 format
- Copy and paste keys:
  - Move to directory `certs`:
  ```shell
  mkdir backend/src/main/resources/certs
  cd backend/src/main/resources/certs
  ```
  - Copy private key to `private.pem`
  - Copy public key to `public.pem`

Running MySQL service with host `localhost:3306`

## How to run

### First setup:

- Clone this repository:

```shell
git clone https://github.com/nptchiko/ToiYeuIT.git
```

### Run project

- Docker (recommend)

```shell
docker compose up -d
```

- IDE using Intelliji
  press: `Shift + F10`

- Maven:

```shell
mvn spring-boot:run
```

or

```shell
mvn clean package
java -jar target/ToiYeuIt.jar
```

### How to get Google Gemini API for free

- Visit (https://aistudio.google.com/prompts/new_chat)

- Sign in with your Google account.

- Click "Get API key" → select "Generate API key in new project".

- Copy and store API keys securely (never share publicly).
