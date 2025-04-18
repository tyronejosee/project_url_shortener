# **Lemon Squeezy**

Lemon Squeezy is a payment and subscription platform for websites and applications. It allows users to create subscriptions and pay using credit or debit cards. It is an alternative to Stripe and PayPal, offering a simpler user interface and faster checkout experience.

Here’s a step-by-step guide to create an account and configure your products and variants.

## 🍋 1. Create an Account on Lemon Squeezy

1. Go to [https://www.lemonsqueezy.com/](https://www.lemonsqueezy.com/)
2. Click **Get started for free**
3. Complete the following steps:
   - Email and password
   - Store name (unique slug)
   - Legal and tax information (required for selling)
   - Connect a bank account or Stripe to receive payments
4. Once registration is complete, you’ll have access to the **Dashboard**.

## 🛍️ 2. Create a Product with Variants (Subscriptions)

Lemon Squeezy does not have a "subscription plan" per se. Instead, subscriptions are modeled via **products + variants** configured as **recurring subscriptions**.

1. From the Dashboard, go to **Products → + New Product**
2. Enter:
   - **Name** (e.g., `Premium Plan`)
   - **Description**, image, etc.
   - **Type**: select **Subscription** (very important)
3. Save the product.

Once the product is created, click on it and go to the **Variants** tab:

1. Click on **+ Add Variant**
2. For each plan (Monthly, Annual, etc.):
   - Name: `Monthly`, `Annual`, etc.
   - Price: `7.00 USD`
   - Recurrence: select "Monthly", "Yearly", etc.
   - Add benefits or descriptions if desired

You can have multiple variants for a single product. These variants will be reflected in the API and used for issuing payments/subscriptions.

## 🔔 3. Configure Webhooks

Lemon Squeezy allows **sending POST events** to a URL whenever something happens (purchase, subscription, cancellation, etc.)

1. Go to **Settings → Webhooks**
2. Click **+ New Webhook**
3. Enter:
   - **Webhook URL** (e.g., `https://backend.com/api/webhooks/lemon-squeezy/`)
   - **Password**: Add a password to secure your webhooks (this is the webhook signature). Lemon Squeezy signs all events using an `X-Signature` header. This signature is an `HMAC SHA256`.
   - **Events**: Select the ones you need (see below)

## 📰 4. Recommended Events

| Event                          | Description                      |
| ------------------------------ | -------------------------------- |
| `subscription_created`         | When a subscription is created   |
| `subscription_updated`         | Status changes, renewal, etc.    |
| `subscription_cancelled`       | Manual or automatic cancellation |
| `subscription_payment_success` | Successful payment               |
| `subscription_payment_failed`  | Failed charge                    |

## 📌 5. Webhook Examples

- `subscription_payment_success`

```json
{
  "meta": {
    "test_mode": true,
    "event_name": "subscription_payment_success",
    "webhook_id": "2aef1923-e089-4739-8a34-33329f73d5d3"
  },
  "data": {
    "type": "subscription-invoices",
    "id": "3095117",
    "attributes": {
      "store_id": 162893,
      "subscription_id": 1126309,
      "customer_id": 5555081,
      "user_name": "John Doe",
      "user_email": "example@gmail.com",
      "billing_reason": "initial",
      "card_brand": "visa",
      "card_last_four": "4242",
      "currency": "USD",
      "currency_rate": "1.00000000",
      "status": "paid",
      "status_formatted": "Paid",
      "refunded": false,
      "refunded_at": "None",
      "subtotal": 1900,
      "discount_total": 0,
      "tax": 0,
      "tax_inclusive": false,
      "total": 1900,
      "refunded_amount": 0,
      "subtotal_usd": 1900,
      "discount_total_usd": 0,
      "tax_usd": 0,
      "total_usd": 1900,
      "refunded_amount_usd": 0,
      "subtotal_formatted": "$19.00",
      "discount_total_formatted": "$0.00",
      "tax_formatted": "$0.00",
      "total_formatted": "$19.00",
      "refunded_amount_formatted": "$0.00",
      "urls": {
        "invoice_url": "https://app.lemonsqueezy.com/my-orders/63428d7e-6e6c-42bf-b695-0a132e495d5f/subscription-invoice/3095117?expires=1744771739&signature=51a2aaf545fdb0c40bb9e90cb197ca1357f6d10ccbf05ec1d5d8ac01fd232cf5"
      },
      "created_at": "2025-04-15T20:48:57.000000Z",
      "updated_at": "2025-04-15T20:48:59.000000Z",
      "test_mode": true
    },
    "relationships": {
      "store": {
        "links": {
          "related": "https://api.lemonsqueezy.com/v1/subscription-invoices/3095117/store",
          "self": "https://api.lemonsqueezy.com/v1/subscription-invoices/3095117/relationships/store"
        }
      },
      "subscription": {
        "links": {
          "related": "https://api.lemonsqueezy.com/v1/subscription-invoices/3095117/subscription",
          "self": "https://api.lemonsqueezy.com/v1/subscription-invoices/3095117/relationships/subscription"
        }
      },
      "customer": {
        "links": {
          "related": "https://api.lemonsqueezy.com/v1/subscription-invoices/3095117/customer",
          "self": "https://api.lemonsqueezy.com/v1/subscription-invoices/3095117/relationships/customer"
        }
      }
    },
    "links": {
      "self": "https://api.lemonsqueezy.com/v1/subscription-invoices/3095117"
    }
  }
}
```

- `subscription_created`

```json
{
  "meta": {
    "test_mode": true,
    "event_name": "subscription_created",
    "webhook_id": "cea9d8f4-6207-40ad-b58f-3e4248b26a40"
  },
  "data": {
    "type": "subscriptions",
    "id": "1126309",
    "attributes": {
      "store_id": 162893,
      "customer_id": 5555081,
      "order_id": 5294423,
      "order_item_id": 5234431,
      "product_id": 491425,
      "variant_id": 763826,
      "product_name": "Premium Plan",
      "variant_name": "Monthly",
      "user_name": "John Doe",
      "user_email": "example@gmail.com",
      "status": "active",
      "status_formatted": "Active",
      "card_brand": "visa",
      "card_last_four": "4242",
      "pause": "None",
      "cancelled": false,
      "trial_ends_at": "None",
      "billing_anchor": 15,
      "first_subscription_item": {
        "id": 1664475,
        "subscription_id": 1126309,
        "price_id": 1173834,
        "quantity": 1,
        "is_usage_based": false,
        "created_at": "2025-04-15T20:48:58.000000Z",
        "updated_at": "2025-04-15T20:48:58.000000Z"
      },
      "urls": {
        "update_payment_method": "https://url-shortener.lemonsqueezy.com/subscription/1126309/payment-details?expires=1744771738&signature=85f5fada79be0368f15833d0ae90b04369a967d75c10cd655dcf7fff0abad346",
        "customer_portal": "https://url-shortener.lemonsqueezy.com/billing?expires=1744771738&test_mode=1&user=325870&signature=9905a3e472ee116d529519d4413bb613e050c0adde914154f957d6639435e131",
        "customer_portal_update_subscription": "https://url-shortener.lemonsqueezy.com/billing/1126309/update?expires=1744771738&user=325870&signature=75cd02af4cbbd75cf29f75348e80fa81dd83bea326b8bf9c4f1f03505a67e6e5"
      },
      "renews_at": "2025-05-15T20:48:51.000000Z",
      "ends_at": "None",
      "created_at": "2025-04-15T20:48:53.000000Z",
      "updated_at": "2025-04-15T20:48:58.000000Z",
      "test_mode": true
    },
    "relationships": {
      "store": {
        "links": {
          "related": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/store",
          "self": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/relationships/store"
        }
      },
      "customer": {
        "links": {
          "related": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/customer",
          "self": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/relationships/customer"
        }
      },
      "order": {
        "links": {
          "related": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/order",
          "self": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/relationships/order"
        }
      },
      "order-item": {
        "links": {
          "related": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/order-item",
          "self": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/relationships/order-item"
        }
      },
      "product": {
        "links": {
          "related": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/product",
          "self": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/relationships/product"
        }
      },
      "variant": {
        "links": {
          "related": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/variant",
          "self": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/relationships/variant"
        }
      },
      "subscription-items": {
        "links": {
          "related": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/subscription-items",
          "self": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/relationships/subscription-items"
        }
      },
      "subscription-invoices": {
        "links": {
          "related": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/subscription-invoices",
          "self": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/relationships/subscription-invoices"
        }
      }
    },
    "links": {
      "self": "https://api.lemonsqueezy.com/v1/subscriptions/1126309"
    }
  }
}
```

- `subscription_updated`

```json
{
  "meta": {
    "test_mode": true,
    "event_name": "subscription_updated",
    "webhook_id": "b37ed941-c77a-46ea-91f8-1e7b9ea19d99"
  },
  "data": {
    "type": "subscriptions",
    "id": "1126309",
    "attributes": {
      "store_id": 162893,
      "customer_id": 5555081,
      "order_id": 5294423,
      "order_item_id": 5234431,
      "product_id": 491425,
      "variant_id": 763826,
      "product_name": "Premium Plan",
      "variant_name": "Monthly",
      "user_name": "John Doe",
      "user_email": "example@gmail.com",
      "status": "active",
      "status_formatted": "Active",
      "card_brand": "visa",
      "card_last_four": "4242",
      "pause": "None",
      "cancelled": false,
      "trial_ends_at": "None",
      "billing_anchor": 15,
      "first_subscription_item": {
        "id": 1664475,
        "subscription_id": 1126309,
        "price_id": 1173834,
        "quantity": 1,
        "is_usage_based": false,
        "created_at": "2025-04-15T20:48:58.000000Z",
        "updated_at": "2025-04-15T20:49:28.000000Z"
      },
      "urls": {
        "update_payment_method": "https://url-shortener.lemonsqueezy.com/subscription/1126309/payment-details?expires=1744771768&signature=02f2d07b702576bada7465b12a9839efde3a6c169183b62134c17333fdb18153",
        "customer_portal": "https://url-shortener.lemonsqueezy.com/billing?expires=1744771768&test_mode=1&user=325870&signature=8b7e5092f65256dbc89612d9bf0dd96abf526046e9af4c5f1b52d6bff50e1905",
        "customer_portal_update_subscription": "https://url-shortener.lemonsqueezy.com/billing/1126309/update?expires=1744771768&user=325870&signature=1926f0258b89d660dd4cb8db1c5661d82809d2d0528bee49fe8e5f10053136d4"
      },
      "renews_at": "2025-05-15T20:48:51.000000Z",
      "ends_at": "None",
      "created_at": "2025-04-15T20:48:53.000000Z",
      "updated_at": "2025-04-15T20:48:58.000000Z",
      "test_mode": true
    },
    "relationships": {
      "store": {
        "links": {
          "related": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/store",
          "self": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/relationships/store"
        }
      },
      "customer": {
        "links": {
          "related": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/customer",
          "self": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/relationships/customer"
        }
      },
      "order": {
        "links": {
          "related": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/order",
          "self": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/relationships/order"
        }
      },
      "order-item": {
        "links": {
          "related": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/order-item",
          "self": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/relationships/order-item"
        }
      },
      "product": {
        "links": {
          "related": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/product",
          "self": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/relationships/product"
        }
      },
      "variant": {
        "links": {
          "related": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/variant",
          "self": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/relationships/variant"
        }
      },
      "subscription-items": {
        "links": {
          "related": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/subscription-items",
          "self": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/relationships/subscription-items"
        }
      },
      "subscription-invoices": {
        "links": {
          "related": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/subscription-invoices",
          "self": "https://api.lemonsqueezy.com/v1/subscriptions/1126309/relationships/subscription-invoices"
        }
      }
    },
    "links": {
      "self": "https://api.lemonsqueezy.com/v1/subscriptions/1126309"
    }
  }
}
```
