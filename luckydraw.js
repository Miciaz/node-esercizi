luckyDraw('Joe')
  .then((result) => {
    console.log(result);
    return luckyDraw('Caroline');
  })
  .then((result) => {
    console.log(result);
    return luckyDraw('Sabrina');
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error.message);
  });