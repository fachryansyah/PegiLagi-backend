const axios = require('axios');

module.exports = {
    push: async (content) => {
        let data = JSON.stringify({
            "app_id": "f92710d4-e273-40f1-b57a-ca5ccb1d05c3",
            "included_segments": ["Active Users"],
            "contents": {
                "en": content
            },
            "headings": {
                "en": "PegiLagi"
            }
        })
        axios.post('https://onesignal.com/api/v1/notifications', data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic ZDAzN2RmNTktYzRlZi00ZjJiLWJmNTItOTU3NWYzZWE5ZDk4"
            }
        })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}