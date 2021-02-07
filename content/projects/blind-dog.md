---
links: [{to: "https://www.blinddogclothing.com", icon: "mdi-open-in-new", name: "Blind Dog eCommerce website"}]
languages: ["Vue", "Ruby/Rails"]
color: "#fff"
date: "2019 - 2020"
name: "Blind Dog"
pageSize: "line-height: 16.5px; font-size: 12px;"
thumbSize: "line-height: 15px; font-size: 11px;"
role: "Founder/CEO"
---
When my friends and I started our apparel business, we realized we needed a good
storefront to sell our merchandise. We considered Shopify, but I decided to just build
an eCommerce platform from scratch in order to keep as much of the money we
earned as possible. I built a Ruby on Rails API which would be accessed by the
front-end, which I built using Vue. In order to process payments I had to integrate
with Stripe and as a result of this integration, I was able to keep all product info on
Stripe, build an admin dashboard, and automate some of the fulfillment process. This
integration helped keep the costs of the backend pretty low.

The biggest challenge when I built this platform was to create a working shopping
cart that had persistence. However, after a lot of research and Stack Overflow, I
found a good solution.