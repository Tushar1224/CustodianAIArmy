# Promises

## The Callback Problem

Before promises, asynchronous code led to "callback hell":

```javascript
getUser(1, user => {
  getPosts(user.id, posts => {
    getComments(posts[0].id, comments => {
      console.log(comments);
    });
  });
});
```

## Creating a Promise

```javascript
const promise = new Promise((resolve, reject) => {
  // async operation
  if (success) {
    resolve(value);
  } else {
    reject(error);
  }
});
```

## Consuming Promises

```javascript
fetchUser(1)
  .then(user => console.log(user))
  .catch(error => console.error(error))
  .finally(() => console.log('done'));
```

## Promise Chaining

```javascript
fetchUser(1)
  .then(user => fetchPosts(user.id))
  .then(posts => fetchComments(posts[0].id))
  .then(comments => render(comments))
  .catch(error => handleError(error));
```

## Promise Utilities

```javascript
// Wait for all promises
const results = await Promise.all([p1, p2, p3]);

// First to resolve wins
const result = await Promise.race([p1, p2]);

// All settle (don't fail fast)
const outcomes = await Promise.allSettled([p1, p2]);

// Any (one succeeds)
const result = await Promise.any([p1, p2]);
```

## Promises vs Callbacks

- **Promises** are composable, chainable, and have proper error propagation
- **Promises** avoid callback nesting
- **Promises** integrate perfectly with `async/await`
