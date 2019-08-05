const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const clearCanvas = () => context.clearRect(0, 0, canvas.width, canvas.height);
const drawPixel = x => y => pixelSize => context.fillRect(x, y, pixelSize, pixelSize);
const stringToMatrix = s => s.split("\n").map(line => line.split(""));
const andThen = f => g => x => g(f(x));
const getById = id => document.getElementById(id);
const getValue = elem => elem.value;

const draw = matrix => colorMap => pixelSize => padding => (zoom = 100) => (upperLeft = {x: 0, y: 0}) => {
  canvas.style.display = "block";
  clearCanvas();
  var width = 0;
  var height = 0;
  var tasks = [];
  const zoomPercent = zoom / 100;
  const actualSize = zoomPercent * (pixelSize + padding);

  matrix.forEach((row, y) => {
    var currentWidth = 0;
    row.forEach((pixel, x) => {
      tasks.push(
        () => {
          context.fillStyle = colorMap[pixel] || 'white';
          drawPixel(upperLeft.x + x * actualSize)
            (upperLeft.y + y * actualSize)
            (zoomPercent * pixelSize)
      });
      currentWidth += 1;
    });
    if (currentWidth > width) {
      width = currentWidth;
    }
    height += 1;
  });
  sizeCanvas(width * actualSize)(height * actualSize);
  tasks.forEach(task => task());
};

const pixelate = andThen(stringToMatrix)(draw);

const getString = andThen(getById)(getValue);
const getNumber = andThen(getString)(Number);
const getObject = andThen(getString)(JSON.parse);

const pixelateUserInput =
  (id1, id2, id3, id4, id5) => pixelate(getString(id1))(getObject(id2))(getNumber(id3))(getNumber(id4))(getNumber(id5))();

const sizeCanvas = width => height => {
  canvas.width = width;
  canvas.height = height;
};

const toggleVisible = elem =>
  elem.style.display = elem.style.display == "none" ? "block" : "none";

const toggleVisibleById = andThen(getById)(toggleVisible);

const toggleLabel = labelId => {
  const label = getById(labelId);
  const labelText = label.innerHTML;
  if (labelText.includes("-")) {
    label.innerHTML = labelText.replace(/-/ig, "+");
  } else if (labelText.includes("+")) {
    label.innerHTML = labelText.replace(/\+/ig, "-");
  }
};
