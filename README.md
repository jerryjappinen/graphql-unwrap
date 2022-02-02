# graphql-unwrapper

Unwrap nested objects from GraphQL responses into a flat storage by ID. Works with [GraphCMS](https://graphcms.com) and other providers. Can be used either client-side or server-side.

GraphQL endpoints typically return nested data. Deep nesting and recursion can sometimes be hard to handle, though. This library turns every GraphQL response into a more manageable, flat data structure that makes client-side development easier.

Inspired with `fetch-deep-contentful-data`(https://observablehq.com/@jerryjappinen/contentful).



# Setup

Install dependency from [npm](https://npmjs.org/package/graphql-unwrap):

```sh
npm install graphql-unwrap
```

Import in your JavaScript code:

```js
import unwrap from 'graphql-unwrap'
```

# Usage

## Simple usage

```js
import { request } from 'graphql-request'
import unwrap from 'graphql-unwrap'

[entriesById, ids] = unwrap(await request('https://graphql.endpoint.com/', query)
```


## Deeply nested data

Let's think of the following example:

```js
import { request } from 'graphql-request'
import unwrap from 'graphql-unwrap'

const data = await request('https://graphql.endpoint.com/', `
  blogPosts (first: 20, orderBy: { field: created_at }) {
    __typename
    id
    title
    created_at

    authors {
      __typename
      id
      email

      country {
        __typename
        id
        name

        capital {
          __typename
          id
          name
        }
      }
    }
  }
`)

const [entriesById, blogPostIds] = unwrap(data)
```

We requested data nested on 4 levels. Once unwrapped, `entriesById` will include every unique resource only once. While the GraphQL data might include the same author, country and capital multiple times, `entriesById` will include it only once.

`entriesById` will also include all capitals and countries by their ID. You won't have to dig through arbitrary nested response data to use it.

We requested the 20 most recent blog posts. `blogPostIds` will have the IDs in correct order. In nested reference fields, the order will also be correct - just IDs instead of recursive data.

Output will look like this:



## Combining unwrapped data

In a typical application, you will make many queries that includes the same data. For example, when navigating from a blog post listing page into an actual blog post, some of the blog post data has already been loaded, while some is still missing.

The way to deal with this is to recursively merge new `entries` into the `entries` of previous responses, maintaining a single source of truth of the latest data that the API has sent. This way, it's easy to render the title of the blog post, even if the body text is still being loaded, for example.


```js
import { request } from 'graphql-request'
import unwrap from 'graphql-unwrap'
import merge from 'lodash/merge'

// This could be your Vuex store or other global state, or reusable in some other way
const allEntriesById = {}

function get (query) {

  // Request data
  [entriesById, ids] = unwrap(
    await request('https://graphql.endpoint.com/', query)
  )

  // Update store
  merge(allEntriesById, entriesById)

  // Return the IDs the response included in order
  return ids
}

const blogPostIds = await get(blogQuery)
```



# GraphQL server requirements

There are a couple of requirements that your GraphQL endpoints must satisfy for this library to work with it.

First, they must return a `__typename` for each type of entry. Secondly, each entry must have a globally unique ID.
