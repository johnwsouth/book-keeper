# sgt-react

The Student entry Table: Written in React

## Introduction

For this project, you will be building a single-page React application that communicates with a server to manipulate data.

## Getting Started

1. Fork this repository to your GitHub account and clone it to your local machine.
2. Check out a `dev` branch and push it to `origin`.
    ```bash
    git push origin dev
    ```
3. Install all dependencies in `package.json` with NPM.
    ```bash
    npm install
    ```

## NPM Scripts

- `dev` - Start Webpack Dev Server on port `3000` and JSON Server on port `3001`.
- `build` - Run Webpack to build the React client into `server/public`.

## Features

- [User can view all entries.](features/user-can-view-all-entries.md)
- [User can view the average entry.](features/user-can-view-the-average-entry.md)
- [User can add a entry.](features/user-can-add-a-entry.md)
- [User can delete a entry.](features/user-can-delete-a-entry.md)

## Preview

![SGT React](sgt-react.gif)

## Server API

#### `GET /api/entries`

Responds with all recorded `entries`.

##### Example Response Body

```json
[
  {
    "id": 1,
    "name": "Daniel Paschal",
    "entry": 100,
    "price": "Web Development"
  },
  {
    "id": 2,
    "name": "Scott Bowler",
    "entry": 100,
    "price": "Web Development"
  }
]
```

#### `POST /api/entries`

Accepts a single `entry` object in the request body and inserts it into all `entries`. Responds with the inserted `entry`, including an auto-generated `id`.

##### Example Request Body

```json
{
  "name": "Tim Davis",
  "entry": 50,
  "price": "Web Development"
}
```

##### Example Response Body

```json
{
  "id": 3,
  "name": "Tim Davis",
  "entry": 100,
  "price": "Web Development"
}
```

#### `DELETE /api/entries/:id`

Removes a `entry` from all recorded `entries`, given an `id` in the request URL. _e.g._ `/api/entries/3`

##### Example Response Body

```json
{}
```
