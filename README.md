# REMOTE CONTROL APP

## Overview 🔍
🌐 This application allows remote control via WebSocket connection

## 🏗️ Install & Run🏃
**Requirements:** Node.js 18.12.1

Download or copy repository:

```bash
git clone https://github.com/AlexLevus/remote-control
```

Create .env file with ENV variables (see .env.example):

Install dependencies:
```bash
npm install
```

Run service:
```bash
npm run start
```

## Available commands 📚
- Navigation over the x and y axis
    - Move mouse up
    - Move mouse down
    - Move mouse left
    - Move mouse right
    - Send mouse coordinates
- Drawing
    - Draw circle with pushed left button:
    - Draw rectangle with pushed left button:
    - Draw square with pushed left button:
- Print screen
    - Make print screen command and send image (a base64 buffer of the 200 px square around the mouse position)

## License

[MIT](https://choosealicense.com/licenses/mit/)