# hamsterkombat-checker-botjs

check hamster kombat token with query_id https://t.me/hamster_kombat_bot

<img width="238" alt="Code_4Lb5L6T3Sd" src="https://github.com/user-attachments/assets/d7b66d3f-a84a-4fbf-8bfd-25d5a9577750">

## Features
- Auto create token (login by query_id)
- Auto check balance, unclaimed, and next unlocked
- Calculate total balance,unclaimed, and next unlocked (all account)

## Requirement
- Node.js

## How to run
1. Clone/download this repository
2. Extract and go to that folder
3. Open cmd for that folder
4. Fill query.txt
5. > npm install
6. > node index

## How to get query_id?
1. Open telegram web/desktop
2. Go to Settings - Advanced - Experimental settings - Enable webview inspecting
3. Open bot https://t.me/hamster_kombat_bot
4. Press F12 or right click then select inspect element
5. Go to Application tab - Session storage - Select hamsterkombat - Select '__telegram__initParams' - Select tgWebAppData and copy value start with ```query_id=```
6. Separate query_id with the newline (for multiple account)
