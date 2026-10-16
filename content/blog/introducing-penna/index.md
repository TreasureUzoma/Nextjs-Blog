---
title: "I've Been Building Penna"
**description: "Why I built an open-source, developer-first newsletter platform."
image: penna-thumbnail.jpg
publishedAt: 2026-10-16 16:00:00
updatedAt: 2026-10-16 12:00:00
author: "Treasure Uzoma"
isPublished: true
tags:
  - penna
  - newsletter
  - ai
  - api
  - developer
slug: introducing-penna
---

Writing has been one of my longest-running hobbies. Around August 2024, I started a blog because I wanted a place to share my thoughts, document things I was learning, and write about whatever I found interesting.

But I soon realized that publishing a blog post was only half the job. I also needed a way to notify people who were interested in my writing whenever a new post went live. That meant I needed a newsletter.

While looking for a solution, I discovered **Buttondown**, a newsletter platform built with developers in mind. It offered a lot of the things I needed, including ways to manage subscribers and automate parts of the newsletter process.

However, I wanted more control over the software I was using. I wanted to customize the experience, integrate it with my own applications, and understand how everything worked under the hood. I didn't want to be limited by decisions made behind the walls of a closed-source platform.

And I'm sure other developers have run into similar frustrations with the tools they use.

So, naturally, I decided to build my own.

Meet **[Penna](https://penna.dev)**.

## What is Penna?

Penna is an open-source newsletter and subscriber management platform built for developers and creators who want more control over how they manage and communicate with their audiences.

The idea is simple: you should be able to own your newsletter workflow, integrate it into your existing applications, and customize it without fighting against the limitations of your tools.

I don't want Penna to be just another dashboard where you write an email, select a list of recipients, and click send. I want it to be something you can build on top of.

For example, imagine you're building a SaaS product and want to send product updates to your users. Or you have a blog and want visitors to subscribe without relying on a third-party embedded form. Maybe you're building a community platform that needs to send different updates to different groups of people.

With Penna, you can manage subscribers, organize them into segments, send newsletters through the dashboard or API, and integrate newsletter functionality directly into your applications.

And because it's open source, you can inspect the code, contribute to the project, or self-host it if you want to manage your own infrastructure.

## Built for developers, not just newsletter writers

One of the things I care about most when building software is how well it fits into the workflows of the people using it.

As a developer, I don't always want to log into another dashboard to perform an operation that could be automated with a few lines of code. Sometimes I want my application to handle it. Other times, I want to connect multiple services and let them work together.

That thinking influenced several parts of Penna.

### 1. An API you can actually build with

Penna provides an API for managing subscribers and sending newsletters programmatically.

Let's say you have a website and want to collect newsletter subscriptions. You can connect your subscription form directly to Penna instead of building your own email infrastructure from scratch.

Here's a simplified example using JavaScript:

```ts
const response = await fetch(
  "https://api.penna.dev/api/v1/external/newsletters/subscriber/new",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-penna-public-key": process.env.PENNA_PUBLIC_KEY,
    },
    body: JSON.stringify({
      email: "reader@example.com",
    }),
  },
);

if (!response.ok) {
  throw new Error("Failed to subscribe");
}
```

That's the basic idea: your application can communicate with Penna through a straightforward HTTP request.

The example above is suitable for a server-side integration. If you're submitting directly from a browser, use the public key as intended by the API and avoid exposing private credentials. In production, you'll also want proper form validation and user-facing feedback.

This opens up a lot of possibilities. You could automatically subscribe users who explicitly opt in during onboarding, build a custom subscription interface, or connect Penna to other services in your stack.

### 2. Newsletter automation without the manual work

Managing subscribers is one thing. Getting the right content to the right people is another.

Penna supports subscriber segmentation, allowing you to organize your audience into groups based on your needs. Instead of treating every subscriber as part of one enormous list, you can organize your communication around specific audiences.

For example, a developer tool could maintain separate segments for people interested in product announcements and people who signed up for technical tutorials.

You can then use those segments when sending newsletters through the API.

Here's another example:

```ts
const response = await fetch(
  "https://api.penna.dev/api/v1/external/newsletters/send",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-penna-public-key": process.env.PENNA_PUBLIC_KEY,
      "x-penna-private-key": process.env.PENNA_PRIVATE_KEY,
    },
    body: JSON.stringify({
      subject: "What's new this week?",
      content: "# Hello!\n\nHere are this week's updates.",
      segmentIds: ["YOUR_SEGMENT_ID"],
    }),
  },
);

if (!response.ok) {
  throw new Error("Failed to send newsletter");
}
```

This example should run on your server, where the private key can remain secret. The API supports targeting segments when sending newsletters, making it possible to integrate email delivery into larger application workflows.

Both examples are simplified illustrations of the API, not complete production-ready subscription or delivery systems. You can explore the full integration flow in the [Penna documentation](https://penna.dev/docs/getting-started).

## There's more to it than sending emails

As the project grew, I found myself thinking about the less obvious problems that come with running a newsletter platform.

How do you verify a sender's domain? How do you prevent someone from abusing an API key? What happens when a newsletter needs to reach thousands of subscribers? How do you let multiple people manage a newsletter without giving everyone unrestricted access?

These aren't necessarily the most exciting features to show in a product demo, but they're the kinds of problems that determine whether a product is useful beyond its initial release.

Penna now includes several pieces of infrastructure designed to address them.

- **Custom sending domains:** AWS SES integration with SPF, DKIM, and DMARC verification to help users configure their sending domains.
- **Team collaboration:** Role-based access for owners, admins, editors, and viewers, so newsletter management doesn't have to revolve around a single person.
- **Subscriber management:** Segmentation, CSV imports, duplicate detection, and unsubscribe handling.
- **Asynchronous delivery:** A workflow system for handling longer-running newsletter sends, including retries and scheduled delivery.
- **API security:** Scoped API keys and rate limiting to help control access and protect the service from abuse.
- **Billing:** Subscription management through Paddle, with plans and usage limits.
- **Markdown editing:** A writing experience that supports Markdown, live previews, and HTML email rendering.

I also integrated AI into two different parts of the platform.

The first is a FAQ assistant that helps visitors find answers to questions about Penna. The second is a content moderation pipeline that checks newsletter content for potential spam, phishing, and other abuse before API-triggered sends are processed.

I find the latter particularly interesting because AI isn't being added just to make the product look more modern. It has a specific job to do within the system.

Of course, no automated moderation system can catch everything, but it adds another layer of protection to a platform that handles email delivery.

## Building Penna has been a different kind of challenge

Penna is one of my most interesting projects because it has pushed me beyond building interfaces and implementing individual features.

I'm building an entire product with multiple applications, a shared codebase, a database, authentication, billing, email infrastructure, background workflows, and external integrations. Every new feature has implications for other parts of the system.

For example, implementing subscriber segmentation isn't just a matter of adding a filter to a dashboard. It also involves data modeling, query design, API validation, permissions, and making sure that the correct recipients are selected when a newsletter is sent.

Similarly, adding team collaboration affects authentication, authorization, database relationships, invitations, and billing decisions.

These connections are what make building a full product so interesting to me. The challenge isn't simply getting individual features to work. It's making them work together without turning the codebase into something difficult to maintain.

I built Penna as a Turborepo monorepo, with separate applications for the marketing website, dashboard, API server, and documentation. Shared packages let me reuse database logic, types, and validation schemas instead of duplicating them across applications.

The main stack includes Next.js, TypeScript, Hono, PostgreSQL through Neon, Drizzle ORM, and Redis through Upstash. AWS SES handles email infrastructure, while Paddle handles subscription billing.

There are a lot of moving parts, and I'm still learning from the decisions I've made along the way.

But that's also why I enjoy working on it. Penna gives me room to experiment with architecture, solve real engineering problems, and think about software as a complete system rather than a collection of screens.

## Why open source matters to me

I could have built Penna as a closed-source SaaS and kept every part of its implementation private. Instead, I wanted openness to be part of the product itself.

For developer tools, I think being able to inspect the software you're relying on is valuable. You can understand how it works, evaluate whether it fits your needs, and adapt it to your own environment.

Self-hosting is an important part of that idea, too. Some developers want the convenience of a managed service; others want more control over their data and infrastructure. I want Penna to accommodate both approaches.

Open source also means the project doesn't have to be shaped by my decisions alone. Other developers can explore the code, report issues, suggest improvements, and contribute features that I might never have considered.

I'm interested in seeing what people build with Penna, especially integrations and workflows that go beyond the use cases I've personally encountered.

You can explore the source code on [GitHub](https://github.com/treasureuzoma/penna).

## This blog's newsletter runs on Penna

There's something satisfying about using software you've built to solve the problem that inspired it in the first place.

The newsletter for this very blog is powered by Penna.

What started as a need to notify readers about new blog posts has turned into an ongoing project to build a newsletter platform that other developers can use for their own websites, applications, and businesses.

It also gives me a reason to keep improving the product from the perspective of someone who actually needs it. Every time I work on the newsletter side of my blog, I get another opportunity to evaluate the experience and identify things that could be better.

I'm building for other developers, but I'm also building for myself. Those two perspectives don't always produce the same requirements, and I think that's a good thing.

There are still plenty of things I want to improve, experiment with, and get right. Some ideas will come from my own use of the platform; others will come from people who decide to try it.

If you've ever wanted more control over your newsletter infrastructure, or you're simply curious about what I'm building, you can check out [Penna](https://penna.dev), read the [documentation](https://penna.dev/docs), or explore the project on [GitHub](https://github.com/treasureuzoma/penna).

I'm curious to see what comes out of building this one.
