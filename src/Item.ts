export class Item {
    constructor(
      public name: string,
      public quantity: number,
      public category: string = '',
      public isChecked: boolean = false
    ) {}
  }
  