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
        console.log("resp===", resp);
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
