import { Request, Response } from 'express';

//TODO: send response parameter to communicate with dashboard.ejs file

export class DashboardController{

  //TODO: Add variables and conditions for permissions...
          //Need to check what permission the user has
          //Send variables in the Response to generate that content
  public generateDashboard (req: Request, res: Response) {
    res.status(200).render(
      'dashboard.ejs'
    )
  }
}