const axios = require("axios");

class Monday {
  constructor() {
    this.request = axios.create({
      baseURL: "https://api.jsmonday.dev",
      headers: {
        accept: "*/*",
        "content-type": "application/json",
        Referer: "https://www.jsmonday.dev/articles",
        "Sec-Fetch-Mode": "cors"
      }
    });
  }

  async getCount() {
    try {
      const count = await this.request({
        method: "GET",
        url: "/articles/count"
      });
      return count.data;
    } catch (err) {
      console.log("error with getCount ", err);
    }
  }

  async getTags() {
    try {
      const query = `
      query getTags {
        tags {
            id
            tag
            __typename
        }
      }
      `;
      const tags = await this.request({
        method: "POST",
        url: "/graphql",
        data: {
          query: query
        }
      });
      const response = tags.data;
      return response.data;
    } catch (err) {
      console.log("error with getTags ", err);
    }
  }

  async getArticles(limit = 5) {
    try {
      const query = `
      query getArticles {
        articles(sort: "publish_date:desc", limit: ${limit}, start: 0) {
          id
          title
          subtitle
          reading_time
          cover_image_url
          publish_date
          articleReads
          author {
            id
            full_name
            role
            company
            profile_image_url
            __typename
          }
          __typename
        }
      }
      `;
      const articles = await this.request({
        method: "POST",
        url: "/graphql",
        data: {
          query: query
        }
      });
      const response = articles.data;
      return response.data;
    } catch (err) {
      console.log("error with getArticles ", err);
    }
  }

  async getArticlesByTags(tagsId, limit = 5) {
    try {
      const query = `
          query getArticlesByTags {
            articles(where: {tags_in: [${tagsId}]}, sort: "publish_date:desc", limit: ${limit}, start: 0) {
              id
              title
              subtitle
              reading_time
              cover_image_url
              publish_date
              articleReads
              author {
                id
                full_name
                role
                company
                profile_image_url
                __typename
              }
              __typename
            }
          }
          `;
      const articles = await this.request({
        method: "POST",
        url: "/graphql",
        data: {
          query: query
        }
      });
      const response = articles.data;
      return response.data;
    } catch (err) {
      console.log("error with getArticlesByTags ", err);
    }
  }
}

module.exports = new Monday();
