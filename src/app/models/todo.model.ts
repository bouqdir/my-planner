export class Todo {
  private _id: number;
  private _content: string;
  private _isDone: boolean;

  // Think about adding a method from JSON to convert the object array to Todo[]
  //pass JSON object with all the parameters
  constructor(todoId?: number, todoContent?: string, todoDone?: boolean) {
    if (
      todoContent != undefined &&
      todoId !== undefined &&
      todoDone !== undefined
    ) {
      this._content = todoContent;
      this._id = todoId;
      this._isDone = todoDone;
    }
  }

  get isDone(): boolean {
    return this._isDone;
  }

  set isDone(todoDone: boolean) {
    this._isDone = todoDone;
  }

  get content(): string {
    return this._content;
  }
  set content(todoContent: string) {
    this._content = todoContent;
  }

  set id(id: number) {
    this._id = id;
  }

  get id(): number {
    return this._id;
  }
}
