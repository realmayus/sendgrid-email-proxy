# sendgrid-email-proxy
A very simple email proxy which uses SendGrid's webhooks to redirect any incoming email to a specified email address.


## How to use
1. [Install Deno.](https://deno.land)
2. Clone this repo using `git clone https://github.com/realmayus/sendgrid-email-proxy`
3. `cd` to the cloned repository
4. Create a file called secrets.json in this directory with the following contents:
  ```json
  {
    "sendgridKey": "Your SendGrid API key",
    "destinationEmailAddress": "The email address the proxy should redirects incoming emails to"
  }
  ```
5. use `deno run --allow-net --allow-read index.ts` to start the proxy.
