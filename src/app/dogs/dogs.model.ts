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
