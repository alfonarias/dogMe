export class Calendar {
  constructor(
    public id: string,
    public type: string,
    public title: string,
    public description: string,
    public startTime: Date,
    public endTime: Date,
    public allDay: boolean,
    public dogId: string
  ) {}
}
