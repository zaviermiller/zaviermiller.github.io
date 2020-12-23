---
title: GOing for the gold medal of Go
created: 12-16-20
category: tech
---

Empower your NuxtJS application with `@nuxtjs/content` module: write in a `content/` directory and fetch your Markdown, JSON, YAML and CSV files through a MongoDB like API, acting as a **Git-based Headless CMS**.

## Writing content

Learn how to write your `content/`, supporting Markdown, YAML, CSV and JSON: https://content.nuxtjs.org/writing.

## Fetching content

Learn how to fetch your content with `$content`: https://content.nuxtjs.org/fetching.

## Displaying content

Learn how to display your Markdown content with the `<nuxt-content>` component directly in your template: https://content.nuxtjs.org/displaying.

```go
// graphql.go
func (r *mutationResolver) AcceptFriendRequest(ctx context.Context, id int) (*models.User, error) {
	user := ctx.Value("currentUser").(*models.User)

	friend, err := user.AddFriend(r.AppCtx, id)
	if err != nil {
		return nil, err
	}

	return friend, nil
}
```