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

export class Dog {
  constructor(
    public id: string,
    public name: string,
    public sex: string,
    public breed: string,
    public birthDate: Date,
    public lastTimeSelected: Date,
    public userId: string
  ) {}
}

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
