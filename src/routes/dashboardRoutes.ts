import * as express from 'express';
import {Request, Response} from "express";

import { DashboardController } from "../controllers/dashboardController";

//TODO: Edit routes to work with the dashboard

export class DashboardRoutes {
  public express
  public dashboardController: DashboardController = new DashboardController();

  constructor () {
    this.express = express();
  }
  public dashboardRoutes(app): void {
    app.route('/dashboard')
    .get(this.dashboardController.generateDashboard)

//TODO: decide if these routes should go in the dashboard, and if so, if they should still remain in the blog controller
    // .post(this.blogController.addBlogPost)

    // app.route('/blog/:postId')
    // .get(this.blogController.getBlogPostID)
    // .put(this.blogController.updateBlogPost)
    // .delete(this.blogController.deleteBlogPost)
  }
}