export class Event {
  constructor(
    public id: string,
    public type: string,
    public type2: string,
    public type3: string,
    public date: Date,
    public reminder: Date,
    public notes: string,
    public dogId: string,
    public userId: string
  ) {}
}
