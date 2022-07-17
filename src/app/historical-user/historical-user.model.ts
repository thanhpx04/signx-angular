export class HistoricalUser {
    public createdTime: string;
    public name: string;
    public description: string;
  
    constructor(createdTime: string, name: string, desc: string) {
      this.createdTime = createdTime;
      this.name = name;
      this.description = desc;
    }
  }