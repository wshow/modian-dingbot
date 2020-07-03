const axios = require('axios');
const dayjs = require('dayjs');

module.exports = async () => {
  const now = new Date();
  if (now.getHours() < 7) {
    return;
  }
  const result = await axios.get(
    `https://zhongchou.modian.com/realtime/get_simple_product?jsonpcallback=callback&ids=98241&if_all=1&_=${new Date() / 1}`
  );
  // eslint-disable-next-line quotes
  const data = JSON.parse(result.data.replace("window[decodeURIComponent('callback')]([", '').replace(']);', ''));
  const { rate, backer_money, backer_count } = data;
  await axios.post(`https://oapi.dingtalk.com/robot/send?access_token=${process.env.MODIAN_DINGBOT}`, {
    msgtype: 'markdown',
    markdown: {
      title: `摩点项目${dayjs().format('MM月DD日HH点')}进度`,
      text: `### 摩点项目${dayjs().format('MM月DD日HH点')}进度
- 完成进度：${rate}%
- 完成金额：${backer_money}元
- 支持认输：${backer_count}人
[查看详情](https://zhongchou.modian.com/item/98241.html)`
    }
  });
};
