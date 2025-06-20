const isNetworkOkay = true;
//const isNetworkOkay = false;

const promiseOne = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (isNetworkOkay) {
      console.log("Network is okay");
      resolve("okay");
    } else {
      console.log("Network is not okay");
      reject("not okay");
    }
  }, 5000);
});


promiseOne
  .then((result) => {
    console.log(result);
    console.log("Promise resolved");
  })
  .catch((err) => {
    console.log(err);
    console.log("Promise rejected");
  })
  .finally(() => {
    console.log("Promise completed");
  });