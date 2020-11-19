class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getInfo(){
    return `${this.name} and he is ${this.age} years old`;
  }
}

export default Person;
