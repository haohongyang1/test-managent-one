import { useEffect } from "react"


const GptStream = () => {
    useEffect(() => {
        fetch(
      `/v1/completions`,
      //   `http://localhost:3000/rpc/platforms/go_pbs/maigpt/proxy/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions`,
      //   `http://localhost:3000/rpc/platforms/go_pbs/maigpt/ask?u=237507034&serialize=json&svtype=fill-content-optimize`,
      //   `http://localhost:3000/rpc/platforms/go_pbs/maigpt/proxy/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //   Authorization: 'Bearer fill-content-optimize',
          Authorization:
            'Bearer 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',
        },
        // body: JSON.stringify({
        //   messages: [{ role: 'user', content: '帮我生成前端工作内容' }],
        //   stream: true,
        // }),
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: 'Say this is a test!' }],
          temperature: 0.7,
          stream: true,
        }),
      }
    )
      .then((resp) => {
        if (resp.status !== 200) {
          throw new Error('OPENAI接口繁忙，请稍后再试');
        }

        return new Promise((resolve, reject) => {
          const reader = resp.body.getReader();
          const decoder = new TextDecoder();
          let totalMsg = '';
          let role = 'system';
          let rest = '';
          let finished = false;

          function finish() {
            if (finished) return;
            finished = true;
            resolve({
              choices: [
                {
                  message: {
                    role,
                    content: totalMsg,
                  },
                },
              ],
            });
          }

          function handleEvent(msg) {
            if (!msg.includes('[DONE]')) {
              const pureMsg = msg.replace(/^\s*data:\s*/, '');
              try {
                const json = JSON.parse(pureMsg);
                const content = json.choices[0].delta.content || '';
                const rl = json.choices[0].delta.role || '';
                if (rl) {
                  role = rl;
                }
                totalMsg += content;
                // streamCallback(content);
              } catch (err) {
                console.log('parse error:', pureMsg);
                console.log(err);
                reject(err);
              }
            } else {
              finish();
            }
          }

          function read() {
            return reader
              .read()
              .then(({ done, value }) => {
                const raw = decoder.decode(value);
                const constructed = rest + raw;
                const msgs = constructed.split(/ *\n\n */);

                if (msgs.length > 1) {
                  console.log('msgs====', msgs);
                  for (let i = 0; i < msgs.length - 1; i++) {
                    handleEvent(msgs[i]);
                  }
                  rest = msgs[msgs.length - 1];
                } else {
                  rest += raw;
                }

                if (done) {
                  finish();
                  return;
                }

                read();
              })
              .catch(reject);
          }
          read();
        });
      })
      .then((data) => {
        const msg = data.choices[0].message;
        return msg.content;
      })
      .catch((err) => {
        console.log(err);
        throw new Error('Error: OpenAI API request failed.');
      });
    },[])
    return <>测试</>
}
export default GptStream
