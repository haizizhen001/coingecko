### 1. Clone Repository and Install Dependencies

Clone repository from Github:

```bash
# git
https://github.com/haizizhen001/haile-20240505
```


### 2. Available Scripts Docker

In the project directory, you can run docker BE:
Docker FE:
```bash
docker build -t fe-coin .
docker run --publish 3000:3000 fe-coin
```
FE: http://localhost:3000



### 3. Start Server manual:
```bash
yarn install
```
```bash
yarn build
```
```bash
yarn start
```

### Question No.2
```bash
yarn runScript
```

Script handle calculateMaxProfit path: [script\calculateMaxProfit.ts](https://github.com/haizizhen001/haile-20240505/blob/main/script/calculateMaxProfit.ts)
