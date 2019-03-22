import * as mongoose from 'mongoose';
import { BlogSchema } from '../models/blogModel';
import { Request, Response } from 'express';

const Post = mongoose.model('Post', BlogSchema);

export class BlogController{
  //For all Blog Posts
  public addBlogPost (req: Request, res: Response) {
    let blogPost = new Post(req.body);

    blogPost.save((err, post) => {
      if(err){
          res.send(err);
      }
      res.json(post);
    });
  }

  public getBlogPosts (req: Request, res: Response) {
    let pgNo = parseInt(req.query.pgNo);
    let size = 5;
    let query = {};

    if(pgNo < 0 || pgNo === 0) {
        res = {"error" : true, "message" : "invalid page number, should start with 1"};
        return res.json(res);
    }

    query.skip = size *(pgNo -1);
    query.limit  = size;

    Post.find({}, {}, query, (err, post) => {
        if(err){
            res.send(err);
        }
        res.json(post);
    });
  }

  //For Individual Blog Posts
  public getBlogPostID (req: Request, res: Response) {
    Post.findById(req.params.contactId, (err, post) => {

        if(err){
            res.send(err);
        }
        res.json(post);
      }).limit(1);
  }

  public updateBlogPost (req: Request, res: Response) {
    Post.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, post) => {
        if(err){
            res.send(err);
        }
        res.json(post);
    });
  }

  public deleteBlogPost (req: Request, res: Response) {
    Post.remove({ _id: req.params.contactId }, (err, post) => {
        if(err){
            res.send(err);
        }
        res.json({ message: 'Successfully deleted the blog post!'});
    });
}
}