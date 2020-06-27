import { Application } from "https://deno.land/x/abc@v1.0.0-rc10/mod.ts";

const app = new Application();
const port = 80
const decoder = new TextDecoder("utf-8");
const secretsRaw = await decoder.decode(await Deno.readFile("./secrets.json"));
const secrets = JSON.parse(secretsRaw);
const {sendgridKey, destinationEmailAddress} = secrets
const apiUrl = "https://api.sendgrid.com/v3"

app
    .post("/post", async (ctx: any) => {
        let email = await ctx.body();
        let res: any = await fetch(apiUrl + "/mail/send", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sendgridKey
            },
            body: JSON.stringify({
                personalizations: [
                    {
                        subject: email.subject,
                        to: [{
                                email: destinationEmailAddress
                            }]
                    }
                ],
                from: {
                    email: "noreply@realmayus.xyz",
                    name: "Email Proxy: " + email.from
                },
                reply_to: {
                    email: JSON.parse(email.envelope).from
                },
                content: [
                    {
                        type: "text/html",
                        value: email.text
                    }
                ]
            })
        })

        res = await res.text()
        return res;
    })
    .start({ port: port });

console.log(`server listening on http://localhost:${port}`);
