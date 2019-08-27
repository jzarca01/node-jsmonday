# node-jsmonday

An API Wrapper for [https://jsmonday.dev](https://jsmonday.dev)

## Installation

```shell
npm install node-jsmonday
```

## Usage

```javascript
const monday = require('node-jsmonday');
```

## Methods

### Get articles count

```javascript
monday.getCount()
```
### Get tags

```javascript
monday.getTags()
```
### Get articles

```javascript
monday.getArticles(limit = 5)
```
### Get articles by tags

```javascript
monday.getArticlesByTags(['1','2'], limit = 5)
```
