import * as mongoose from 'mongoose';
import { BlogSchema } from '../models/blogModel';
import { Request, Response } from 'express';

const Post = mongoose.model('Post', BlogSchema);

//TODO: send response parameter to communicate with dashboard.ejs file

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
    let pgNo = parseInt(req.query.pgNo) || 1;
    let size = 12;

    if(pgNo < 0 || pgNo === 0) {
        let message = {error : true, message : "invalid page number, should start with 1"};
        return res.json(message);
    }

    Post.find({})
    .skip(size *(pgNo -1))
    .limit(size)
    .populate('author')
    .populate('img')
    .exec( (err, posts) => {
      Post.countDocuments().exec( (err, count)=>{
        if(err){
          return res.send(err);
      }
      let pages = Math.ceil(count/size);
      res.render(`pages/blog.ejs`,{ posts, pages, pgNo });
    });
  });
  }

  //For Individual Blog Posts
  public getBlogPostID (req: Request, res: Response) {
    Post.findById(req.params.postId, (err, post) => {

        if(err){
            res.send(err);
        }
        res.json(post);
      }).limit(1);
  }

  public updateBlogPost (req: Request, res: Response) {
    Post.findOneAndUpdate({ _id: req.params.postId }, req.body, { new: true }, (err, post) => {
        if(err){
            res.send(err);
        }
        res.json(post);
    });
  }

  public deleteBlogPost (req: Request, res: Response) {
    Post.remove({ _id: req.params.postId }, (err, post) => {
        if(err){
            res.send(err);
        }
        res.json({post, message: 'Successfully deleted the blog post!'});
    });
}
}