var router = require('express').Router();

router.get('/chart_c3', (req, res) => {
  res.render('c3', {});
});

router.get('/chart_d3', (req, res) => {
  res.render('d3', {});
});

router.get('/chart_data/', (req, res) => {
  var data = [];
  const length = 50;

  var line1 = ['Line 1'];
  for (let pos = 0; pos < length; pos++) {
    let random = Math.floor(Math.random() * 20);
    line1.push(pos ? random + line1[pos] : random);
  }
  data.push(line1);

  var line2 = ['Line 2'];
  for (let pos = 0; pos < length; pos++) {
    let random = Math.floor(Math.random() * 50);
    line2.push(random);
  }
  data.push(line2);

  res.json(data);
});

router.get('/chart_data_d3/', (req, res) => {
  var data = {
    maxX: 50,
  };
  const length = 50;
  var maxY = 0;

  var line1 = [];
  for (let pos = 0; pos < length; pos++) {
    let random = Math.floor(Math.random() * 20);
    let value = pos ? random + line1[pos - 1] : random;
    line1.push(value);

    if (value > maxY) {
      maxY = value
    }
  }
  data.line1 = {
    title: 'Line 1',
    data: line1,
  };

  var line2 = [];
  for (let pos = 0; pos < length; pos++) {
    let random = Math.floor(Math.random() * 50);
    line2.push(random);
  }
  data.line2 = {
    title: 'Line 2',
    data: line2,
  };

  data.maxY = maxY;

  res.json(data);
});

module.exports = router;
