const axios = require('axios');

module.exports = {
  onError: async ({ error, constants, utils }) => {
    try {
        const clickUpToken = process.env.CLICKUP_API_TOKEN; 
        const chatViewId = process.env.CLICKUP_CHAT_VIEW_ID; 

        if (!clickUpToken || !chatViewId) {
            utils.build.failPlugin("CLICKUP_API_TOKEN ou CLICKUP_CHAT_VIEW_ID não configurados!");
        }

        const message = {
            comment_text: `🚨 **Deploy falhou no site ${constants.SITE_NAME}**\n\nErro: ${error.message}`,
            notify_all: true
        };

        const url = `https://api.clickup.com/api/v2/view/${chatViewId}/comment`;

        await axios.post(url, message, {
            headers: {
            Authorization: clickUpToken,
            "Content-Type": "application/json",
            },
        });

        console.log("Mensagem enviada ao canal de chat no ClickUp!");
    } catch (err) {
        utils.build.failPlugin("Erro ao enviar mensagem para o chat no ClickUp.", { error: err });
    }
  },
};
