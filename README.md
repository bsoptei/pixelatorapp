# pixelatorapp
Very simple matrix based pixel art 

[Try it here!](http://pixelatorapp.herokuapp.com/)

## How to use the Pixelator

### Step 1
In the `Color map` field, define colors for different characters using a [JSON](https://en.wikipedia.org/wiki/JSON)-like syntax, putting keys and values between _double quotes_ like this:
```
{
  "x": "black",
  "_": "white",
  "O": "#abcdef"
}
```
You can use color aliases and hex color codes as well.
(Currently syntax errors are shown only in the console)

### Step 2
After defining your color map, start typing in the `Image text` field. You can use any character that has a color defined for it. Like this:
```
x_x_xxx_x___x____OO
x_x_x___x___x___O__O
xxx_xxx_x___x___O__O
x_x_x___x___x___O__O
x_x_xxx_xxx_xxx__OO
```

### Step 3
Adjust the image dimensions with the `Square size`, `Padding`, and `Zoom` fields.

### Step 4
Click on the `Pixelate` button. Your image will be drawn on the canvas at the top of the page.

### Step 5
Right click on the canvas, save your art to you computer.

#### For best experience
- You should use a proper keyboard instead of trying to use your phone's virtual one.
- The larger screen, the better.
- The app does not work in Internet Explorer. Use Firefox or Brave.
