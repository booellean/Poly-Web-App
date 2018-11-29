class loadBar{

  endString: Date;
  endDate: number;
  startString: Date;
  startDate: number;
  todayDate: number;
  refreshRate: number;
  barItem: any;
  dateDiff: number;
  newDateDiff: number;
  dateDivide: number;
  progressResults: number;

  constructor(end: any, start: any, bar, refresh: any){
    //convert initiated dates to unix timestamp
    this.endString = new Date(end);
    this.endDate = this.endString.getTime()/1000;
    this.startString = new Date(start);
    this.startDate = this.startString.getTime()/1000;
    this.refreshRate = refresh;

    this.barItem = document.querySelector(`${bar}`);

    if( ((new Date().getTime())/1000) > this.endDate){
      this.barItem.style.width = `100%`;
    }else{
      window.setInterval( () => {
        this.setProgress()
      }, this.refreshRate);
    }
  }

  setProgress(){
    this.todayDate = new Date().getTime()/1000;
    this.dateDiff = this.endDate - this.startDate; //difference of start and end dates, to be used in calculation
    this.newDateDiff = this.endDate - this.todayDate; //difference of today's date and end date, also to be used in calculation

    this.dateDivide = this.newDateDiff/this.dateDiff;
    this.progressResults = (1 - this.dateDivide)*100;

    // console.log(this.progressResults);
    this.barItem.style.width = `${this.progressResults}%`;

    document.querySelector('#loading-bar').setAttribute('aria-label', `This is a loading bar. The progress percentage until launch is ${Math.floor(this.progressResults)}%`);
  }

}