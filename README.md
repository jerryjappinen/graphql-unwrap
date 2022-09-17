# graphql-unwrap

Unwrap nested objects from GraphQL responses into a flat storage by ID. Works with [Hygraph](https://hygraph.com) and other providers. Can be used either client-side or server-side.

GraphQL endpoints typically return nested data. Deep nesting and recursion can sometimes be hard to handle, though. This library turns every GraphQL response into a more manageable, flat data structure that makes client-side development easier.

Demo on Observable and Hygraph: [observablehq.com](https://observablehq.com/@jerryjappinen/graph)



# Setup

Install dependency from [npm](https://npmjs.org/package/graphql-unwrap):

```sh
npm install graphql-unwrap
```

Import in your JavaScript code:

```js
import unwrap from 'graphql-unwrap'
```

#### Requirements

For this client-side library to work, your GraphQL API must be able to return a globally unique ID and a type name for each entry. You must request these fields (`id` and `__typename` by default) in every query.

# Usage

## Quick start

#### `unwrap(data, [options])`

```js
import { request } from 'graphql-request'
import unwrap from 'graphql-unwrap'

// `data` must include `id` and `__typename` for every entry
const data = await request('https://graphql.api.com/', query)

[entriesById, idsByEndpoint] = unwrap(data)
```

You can choose to unwrap only some of the endpoints in your query:

```js
[entriesById, idsByEndpoint] = unwrap(data, ['posts', 'users'])
```

Or dig through multiple layers to get the items:

```js
[entriesById, idsByEndpoint] = unwrap({
  updateBlogPosts {
    returning: [
      { /* ... */ }
    ]
  }
}, {
  queryPath: 'returning'
})
```

To override all defaults:

```js
[entriesById, idsByEndpoint] = unwrap(data, {
  keys: ['posts', 'users'],
  queryPath: 'returning', // defaults to null
  itemsPath: 'items', // defaults to null
  idKey: 'uuid',
  typeKey: 'type'
})
```

#### `unwrapOne(data, [options])`

You can unwrap a single object or a list, which is handy when you have arbitrary GraphQL responses:

```js
import { request } from 'graphql-request'
import { unwrapOne } from 'graphql-unwrap'

const data = await request('https://graphql.api.com/', `{
  insert_todos (
    objects: [{
      title: "Foo bar"
    }]
  ) {
    returning {
      __typename
      id
      title

      created_by {
        __typename
        id
        email
      }
    }
  }
}`)

[entriesById, ids] = unwrapOne(data.insert_todos.returning)
```

## Deeply nested data

Let's think of the following example:

```js
import { request } from 'graphql-request'
import unwrap from 'graphql-unwrap'

const data = await request('https://graphql.api.com/', `
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

const [entriesById, blogPostIds] = unwrap(data, true)
```

We requested data nested on 4 levels. Once unwrapped, `entriesById` will include every unique resource only once, even though the GraphQL data might include the same author, country and capital multiple times. `entriesById` will also include all capitals and countries by their ID, even though they're nested in the original data.

As we requested the 20 most recent posts, `blogPostIds` will have their IDs in correct order. In nested reference fields, the order will also be correct - just IDs instead of recursive data.



## Combining unwrapped data

In a typical application, you will make many queries that includes the same data. For example, when navigating from a blog post listing page into an actual blog post, some of the blog post data has already been loaded, while some is still missing.

The way to deal with this is to recursively merge new `entries` into the `entries` of previous responses, maintaining a single source of truth of the latest data that the API has sent.

This way, it's easy to render the title of the blog post, even if the body text is still being loaded, for example.


```js
import { request } from 'graphql-request'
import unwrap from 'graphql-unwrap'
import merge from 'lodash-es/merge'

// This could be your Vuex store or other global state, or reusable in some other way
const allEntriesById = {}

function get (query) {

  // Request data
  [entriesById, ids] = unwrap(
    await request('https://graphql.api.com/', query)
  )

  // Update store
  merge(allEntriesById, entriesById)

  // Return the IDs the response included in order
  return ids
}

const blogPostIds = await get(blogQuery)
```

## Options reference

Different GraphQL APIs have slightly different query and response formats. `graphql-unwrap` can help you parse the responses, if you set the correct options.

|Provider|`queryPath` (queries)|`queryPath`(mutations)|`itemsPath` (queries)|`itemsPath` (mutations)|`richTextReferencesPath` (mutations)|
|-|-|-|-|-|-|
|Hygraph| – | – | – | – | – |
|Nhost| – | `'returning'` | – | – | – |
|8base| `'items'` | `'items'` | `'items'` | `'items'` | |
