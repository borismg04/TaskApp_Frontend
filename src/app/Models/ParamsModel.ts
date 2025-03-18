export class ParamsModel {
  public name: string;
  public value: string | boolean | number | null | undefined;

  constructor() {
    this.name = "";
    this.value = "";
  }
}
