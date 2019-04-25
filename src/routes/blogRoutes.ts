import * as express from 'express';
import {Request, Response} from "express";

import { BlogController } from "../controllers/blogController";

//TODO: Edit routes to work with the dashboard

export class BlogRoutes {
  public express
  public blogController: BlogController = new BlogController();

  constructor () {
    this.express = express();
  }
  public blogRoutes(app): void {
    app.route('/blog')
    .get(this.blogController.getBlogPosts)
    .post(this.blogController.addBlogPost)

      // res.status(200).sendFile(
      //   'index.html', {root: __dirname + '/../public'}
      // )
    // })
    app.route('/blog/:postId')
    .get(this.blogController.getBlogPostID)
    .put(this.blogController.updateBlogPost)
    .delete(this.blogController.deleteBlogPost)
  }
}