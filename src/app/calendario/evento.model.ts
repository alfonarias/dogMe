export class Evento {
  constructor(
    public id: string,
    public title: string,
    public startTime: Date,
    public endTime: Date,
    public allDay: boolean,
    public userId: string
  ) {}
}
