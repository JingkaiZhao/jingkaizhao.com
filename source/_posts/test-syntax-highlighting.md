---
title: 测试代码高亮
date: 2019-03-04
tags:
---

```javascript
var name = 'Jingkai';
let age = 50;
const gender = 'male';
const isAlive = true;
const sKey = Symbol.for('something')

/**
 * Block comment here
 */
function Person(name, age, gender) {
    this.print = () => {
        console.log(name, age, gender); // I am inline comment
    }
}

let j = new Person(name, age, gender);
j.print();

const person = {
  name: 'zaihui',
  print() {
    console.log(this.name)
  }
}
console.log(person.name)

```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <h1>This is awesome!&nbsp;&nbsp;&#x00B7;</h1>
  <svg width="4" height="3" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <myapp:piechart xmlns:myapp="http://example.org/myapp" title="Sales by Region">
        <myapp:pieslice label="Northern Region" value="1.23"/>
        <myapp:pieslice label="Eastern Region" value="2.53"/>
        <myapp:pieslice label="Southern Region" value="3.89"/>
        <myapp:pieslice label="Western Region" value="2.04"/>
        <!-- Other private data goes here -->
      </myapp:piechart>
    </defs>
    <desc>This chart includes private data in another namespace</desc>
    <!-- In here would be the actual SVG graphics elements which
        draw the pie chart -->
  </svg>
</body>
</html>
```

```css
.divider > .circle-left,
.divider > .circle-right {
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #FFFFFF;
  box-shadow: 0 1px 5px 0 rgba(99,133,170,0.30) inset;
}

.divider > .circle-left {
  float: left;
  margin-left: -7px;
}

.divider > .circle-right {
  float: right;
  margin-right: -7px;
}

```
