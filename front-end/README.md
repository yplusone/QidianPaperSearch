# 项目介绍

这里是起点论文网项目的前端部分

this is the front-end of QiDianPaper(PaperX)

# 效果图

![](display/display2.png)

![](display/display3.png)

![](display/display1.png)

# Deploy the Frontend
Following are the instructions on how to deploy the web on a Debian-based cloud server.

## 1. Clone the project
```bash
$ git clone https://github.com/Bill0412/QidianPaperSearch.git
```

or if this version is merged to the master,

```bash
$ git clone https://github.com/Bill0412/QidianPaperSearch.git
```

## 2. Install NPM on the server
```bash
$ sudo -i
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
$ sudo apt install nodejs
```
To make sure you have the right NPM and Node.js installed,
```bash
$ node --version
v10.16.3
$ npm --version
6.9.0
```

## 3. npm install - Install all the dependencies
```bash
$ cd QidianPaperSearch/front-end
$ npm install
```

## 4. Deploy
The following command runs the server at **port 80**
```bash
$ sudo nohup npm run serve &
```

## 5. References
1. Install NPM on Debian-based server: <https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/>


