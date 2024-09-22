import fs from 'fs';
import chalk from 'chalk';

// async function to check IP
const ipInfo = async () => {
    const url = "https://api.hamsterkombatgame.io/ip"

    const headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'authorization': '',
        'origin': 'https://hamsterkombatgame.io',
        'priority': 'u=1, i',
        'referer': 'https://hamsterkombatgame.io/',
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
    }

    while(true) {
        try {
            const response = await fetch(url, {
                method: 'get',
                headers: headers
            })

            return await response.json()
        } catch (err) {
            console.log(`Error to get IP, ${err}`)
        }
    }
}

// async funtion to get token
const getToken = async (query) => {
    const url = "https://api.hamsterkombatgame.io/auth/auth-by-telegram-webapp"

    const payload = JSON.stringify({
        "initDataRaw": `${query}`
    })

    const headers = {
        'accept': 'application/json',
        'accept-language': 'en-US,en;q=0.9',
        'authorization': '',
        'content-type': 'application/json',
        'origin': 'https://hamsterkombatgame.io',
        'priority': 'u=1, i',
        'referer': 'https://hamsterkombatgame.io/',
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
    }

    while(true) {
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: payload
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
        } catch (err) {
            console.log(`Error to get token, ${err}`)
        }
    }
}

// async function to get account info
const accountInfo = async (token) => {
    const url = "https://api.hamsterkombatgame.io/auth/account-info"

    const headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'authorization': `Bearer ${token}`,
        'content-length': '0',
        'origin': 'https://hamsterkombatgame.io',
        'priority': 'u=1, i',
        'referer': 'https://hamsterkombatgame.io/',
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
    }

    while(true) {
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
        } catch (err) {
            console.log(`Error to get account info, ${err}`)
        }
    }
}

// async function to get amount
const sync = async (token) => {
    const url = "https://api.hamsterkombatgame.io/interlude/sync"

    const headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'authorization': `Bearer ${token}`,
        'content-length': '0',
        'origin': 'https://hamsterkombatgame.io',
        'priority': 'u=1, i',
        'referer': 'https://hamsterkombatgame.io/',
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
    }

    while(true) {
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
        } catch (err) {
            console.log(`Error to get sync, ${err}`)
        }
    }
}

(async () => {
    console.clear()

    console.log('Gamster Kombat Token Checker JS\n')
    const ip = await ipInfo()
    const ipna = ip.ip
    const code = ip.country_code
    const isp = ip.asn_org
    console.log(`IP : ${chalk.green(ipna)} (${isp}) | Country code : ${code}\n`)

    try {
        // read query.txt
        const data = fs.readFileSync('query.txt', 'utf-8');
        const querys = data.split('\n')

        let totalall = 0
        let unclaimed_all = 0
        let nextunlock_all = 0
        for (let i=0; i<querys.length; i++) {
            if (querys[i] != "") {
                const tokens = await getToken(querys[i]) //.then(res => console.log(res))
                const token_access = tokens.authToken

                const info = await accountInfo(token_access)
                const user_id = info.accountInfo.id
                const name = info.accountInfo.name

                const user = await sync(token_access)
                const total = user.interludeUser.tokenBalance.total
                const claimed = user.interludeUser.tokenBalance.claimed
                const unclaimed = user.interludeUser.tokenBalance.unclaimed
                const nextUnlocked = user.interludeUser.tokenBalance.nextUnlocked
                const wdselect = user.interludeUser.withdraw.selected

                console.log(`${i+1}. Id : ${chalk.green(user_id)}\n   Name : ${name}`)
                console.log(`   Balance : ${chalk.yellow(total/1000000000)}\n   Unclaimed : ${chalk.yellow(unclaimed/1000000000)}\n   Next unlocked : ${chalk.yellow(nextUnlocked/1000000000)}\n   Withdraw to : ${chalk.green(wdselect)}\n`)
                
                totalall = totalall+total/1000000000
                unclaimed_all = unclaimed_all+unclaimed/1000000000
                nextunlock_all = nextunlock_all+nextUnlocked/1000000000
            }
        }

        console.log(`Total balance : ${chalk.yellow(totalall)}\nTotal unclaimed : ${chalk.yellow(unclaimed_all)}\nTotal next unlocked : ${chalk.yellow(nextunlock_all)}`)
    } catch (e) {
        // jika query.txt not exist
        if (e.code == 'ENOENT') {
            console.log('Fill the query.txt first!');
            fs.writeFileSync('query.txt', "query1\nquery2\netc...")
            return
        } else {
            throw e
        }
    }
})()