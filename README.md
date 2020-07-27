Screenshot:
![Screenshot](https://github.com/Frontovichok/users-manager/blob/master/public/app-screenshot.png)

For run app in development mode:

```bash
git clone https://github.com/Frontovichok/users-manager.git
yarn install
yarn start
```

For run app on docker in development mode:

```bash
git clone https://github.com/Frontovichok/users-manager.git
cd users-manager
docker build -t users-manager .
docker run --name users-manager-container -p 8000:3000 -d users-manager
```

And open in docker-machine default ip(see below) on 8000 port

```bash
docker-machine default ip
```
