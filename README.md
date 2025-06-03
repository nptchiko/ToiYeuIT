

# EngHub - TOEIC online test preparation system 
Backend service for EngHub
## Requirements

For building and running the application you need:

- [JDK 21](https://www.oracle.com/java/technologies/downloads/#java21)
- [Maven 3.9.9](https://maven.apache.org)
- [Docker](https://www.docker.com/) (Optional)

## Prequisite
Generate RSA key for JWT authentication:
- Visit: [https://cryptotools.net/rsagen](https://cryptotools.net/rsagen)
- Generate new private key and public key.
- Copy and paste keys:
  + Move to directory `certs`:
   ```shell
   cd backend/src/resources/certs
   ```
  + Copy private key to `private.pem`
  + Copy public key to `public.pem`

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
## Copyright

Released under the Apache License 2.0. See the [LICENSE](https://github.com/codecentric/springboot-sample-app/blob/master/LICENSE) file.
