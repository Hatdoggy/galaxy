import items from "./items.json";

const hide = () => {
  let pop = document.querySelector(".pop");
  pop.style.animation = ".5s hide";
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, 300);
  });
};

const blink = () => {
  let bulb = document.querySelectorAll(".bulb");

  bulb.forEach((elem) => {
    elem.classList.add("blink");
    setTimeout(() => {
      elem.classList.remove("blink");
    }, 2500);
  });
};

const drop = (val) => {
  let handle = document.querySelector("#lever");
  let height = document
    .querySelector("#leverHeight")
    .getBoundingClientRect().height;

  handle.style.transform = `translateY(${height}px)`;
  setTimeout(() => {
    handle.style.transform = `translateY(0)`;
  }, 500);

  return new Promise((res) => {
    setTimeout(
      () => {
        res();
      },
      val ? 7500 : 5000
    );
  });
};

const find = (arr, num) => {
  return arr.includes(num);
};

function getURLParameter(name) {
  return decodeURI(
    (RegExp(name + "=" + "(.+?)(&|$)").exec(window.location.search) || [
      ,
      null,
    ])[1] || ""
  );
}

let subid = getURLParameter("subid");
let subid2 = getURLParameter("subid2");
let firstname = getURLParameter("firstname");
let surname = getURLParameter("surname");
let city = getURLParameter("city");
let zipcode = getURLParameter("zipcode");
let address = getURLParameter("address");
let phone = getURLParameter("phone");
let mobile = getURLParameter("mobile");
let pid = getURLParameter("pid");
let nrp = getURLParameter("nrp");

let ffdomain = "https://" + getURLParameter("ffdomain");
let session = getURLParameter("session");
let fluxf = getURLParameter("fluxf");
let fluxffn = getURLParameter("fluxffn");

function ActionRedirect(action) {
  window.location.replace(
    ffdomain +
      "/?flux_action=" +
      action +
      "&flux_f=" +
      fluxf +
      "&flux_ffn=" +
      fluxffn +
      "&flux_sess=" +
      session
  );
}

/* slot machine */

let list = [...items];
let curArr = [...list];
let click = 0;

const shuffle = ([...arr], ctr) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  curArr.push(arr[arr.length - 1]);
  return arr;
};

const createImg = (pool, boxesClone, door, ctr) => {
  const box = document.createElement("div");
  const img = document.createElement("img");

  box.classList.add("box", "trans");

  img.src = pool[ctr].src;
  img.alt = pool[ctr].alt;
  img.classList.add("w-100", "trans");

  box.appendChild(img);
  box.style.width = "100%";
  box.style.height = door.clientHeight + "px";
  boxesClone.appendChild(box);
};

async function spin(ctr) {
  document.querySelector('button.spinBtn').removeEventListener('click', click)
  click++;
  const doors = document.querySelectorAll(".door");
  init(false, 1, 2, ctr);
  for (const door of doors) {
    const boxes = door.querySelector(".boxes");
    const duration = parseInt(boxes.style.transitionDuration);
    boxes.style.transform = "translateY(0)";
    await new Promise((resolve) => setTimeout(resolve, duration * 150));
  }

  if (ctr === 3 || ctr === 1) {
    blink();
  }
}

export default spin;

const init = (firstInit = true, groups = 1, duration = 1, ctr) => {
  let pool = [];
  const doors = document.querySelectorAll(".door");

  pool.push(list[0]);

  for (const door of doors) {
    if (firstInit) {
      door.dataset.spinned = "0";
    } else if (door.dataset.spinned === "1") {
      return;
    }

    const boxes = door.querySelector(".boxes");
    const boxesClone = boxes.cloneNode(false);

    if (!firstInit) {
      const arr = [];
      for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
        arr.push(...list);
      }
      switch (ctr) {
        case 3:
          arr[arr.length - 1] = list[3];
          pool.push(...arr);
          break;
        case 1:
          arr[arr.length - 1] = list[0];
          pool.push(...arr);
          break;
        default:
          pool.push(...shuffle(arr, ctr));
          break;
      }
    }

    for (let i = pool.length - 1; i >= 0; i--) {
      createImg(pool, boxesClone, door, i);
    }

    boxesClone.style.transitionDuration = `${duration > 0 ? duration : 3}s`;
    boxesClone.style.transform = `translateY(-${
      door.clientHeight * (pool.length - 1)
    }px)`;
    door.replaceChild(boxesClone, boxes);
  }
};

const handleResize = () => {
  let glass = document
    .querySelector("#glassHeight")
    .getBoundingClientRect().height+20;
  let width = document
    .querySelector("#glassHeight")
    .getBoundingClientRect().width;
  let slot = document.getElementById("slot");
  slot.style.height = `${Math.round(glass)}px`;
  slot.style.width = `${Math.round(width)}px`;
};

const resize = (spin) => {
  window.onresize = function (elem) {
    handleResize();
  };
};

export { hide, blink, drop, find, ActionRedirect, init, handleResize, resize };
