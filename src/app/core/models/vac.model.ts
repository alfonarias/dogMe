export class Vaccine {
  constructor(
    public id: string,
    public name: string,
    public lastTime: Date,
    public dogId: string
  ) {}
}
