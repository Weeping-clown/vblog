通过继承，子类可以继承并使用父类的属性和方法。提高代码的复用。js继承主要是对构造函数和原型属性的继承。本文描述几种继承方式：

## 原型链继承
```javascript
function Parent(name) {
  this.name = name
  this.assets = ['Hat']
}
Parent.prototype.sayName = function(){
    console.log(`My name is ${this.name}`)
}

function Child(name, age) {
    this.name = name
    this.age = age
}
Child.prototype = new Parent() // 核心

let xiaoming = new Child('xiaoming')
xiaoming.sayName() // My name is xiaoming

xiaoming.assets.push('shoes')
let xiaohong = new Child('xiaohong')
console.log(xiaohong.assets) // ['Hat', 'shoes']

xiaoming.__proto__.constructor === Child // false
xiaoming.__proto__.constructor === Parent // true

Child.prototype = new Parent() // 核心
Child.prototype.constructor = Child // 将构造函数重新指向子类
```
#### 优点：
1. 子类通过**prototype**指向父类的实例。实现原型链继承。子类实例访问属性时，没有的属性会通过原型链查找到父类。

#### 缺点：
1. 子类实例化无法向父类传参
2. 引用类型的属性被所有实例共享：如**assets**属性，子类实例**xiaoming**修改值，实例**xiaohong**取值也发生变化。

## 构造函数继承
```javascript
function Animal(sex) {
    this.sex = sex
    this.eat = function() {
        console.log('food')
    }
}
Animal.prototype.drink = function() {
    console.log('drink water')
}

function Dog(sex) {
    Animal.call(this, sex)
    this.cry = function() {
        console.log('wang wang')
    }
}

let dog = new Dog('male')
dog.eat()
dog.cry()
dog.drink() // 无法读取
dog instanceof Dog // true
```
#### 优点：
1. 可以向父类传参
2. 复用的父类属性不共享

#### 缺点：
1. 无法使用父类原型对象的方法

## 组合继承
原型链继承无法传参，但可以获取原型对象上的属性，构造函数无法获取原型对象上的属性，但是可以传参赋值构造函数内属性和方法。
两种方式结合即组合模式。
```javascript
function Parent() {
  this.assets = ['Hat']
}
Parent.prototype.sayName = function(){
    console.log(`My name is ${this.name}`)
}

function Child(name, age) {
    Parent.call(this)
    this.name = name
    this.age = age
}
Child.prototype = new Parent()
Child.prototype.constructor = Child

let xiaoming = new Child('xiaoming')
xiaoming.sayName()

xiaoming.assets.push('shoes')

let xiaohong = new Child('xiaohong')
console.log(xiaohong.assets) // ['Hat']
```
#### 优点：
1. 子类实例化可向父类传参。
2. 实现对构造函数和原型对象上的属性和方法的复用。

#### 缺点：
1. 父类new了两次。

## 原型式继承
```javascript
let animal = {
    sex: 'male',
    drink: function() {
        console.log('drink water');
    }
}

function extend(Obj) {
    let fn = function(){}
    fn.prototype = Obj
    return new fn()
}

let xiaoming = extend(animal)
xiaoming.drink() // 'drink water'
```
#### 优点：
1. 简单，单纯的通过原型链访问父类属性

#### 缺点：
1. 父类属性共享。

## 寄生式继承
对原型式的扩展
```javascript
let animal = {
    sex: 'male',
    drink: function() {
        console.log('drink water');
    }
}

function extend(Obj) {
    let fn = function(){}
    fn.prototype = Obj
    return new fn()
}

// 原型式基础上增加对象的优化。扩展属性和方法
function Dog(sex) {
    let vo = extend(animal)
    vo.eat = function() {
        console.log('eat')
    }
    return vo
}

let dog = Dog('male')
let bigDog = Dog('male')
```
#### 优点：
1. 对继承后对象增强，扩展属性和方法。

#### 缺点：
1. 同原型式一样，父类属性共享，没有类的概念。

## 寄生组合式继承
组合式继承两次调用父类。优化子类继承父类的原型对象的方法

```javascript
function Parent(name) {
    this.name = name
}
Parent.prototype.sayName = function(){
    console.log(`My name is ${this.name}`)
}
function Child(name, age) {
    Parent.call(this, name)
    this.age = age
}
// 修改子类的原型对象指向
function F(){}
F.prototype = Parent.prototype
Child.prototype = new F()
Child.prototype.constructor = Child

let xiaoming = new Child('xiaoming', 18)
```
1. 实现对调用父类构造函数、传参，也继承了父类原型上的方法。

## ES6继承
...待补充

学习文章[JavaScript深入之继承的多种方式和优缺点](https://github.com/mqyqingfeng/Blog/issues/16)
[Javascript面向对象编程](https://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)