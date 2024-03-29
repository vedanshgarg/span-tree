export const applyOpenedPageStyling = (width) => {
  if (document.querySelector("nav.super-sidebar")) {
    document.querySelector(".content-wrapper").style.paddingLeft = width + "px";
    document.querySelector('[data-testid="top-bar"]').style.paddingLeft =
      24 + width + "px";
    const sidebar = document.querySelector("nav.super-sidebar");
    if (extractE(window.getComputedStyle(sidebar).transform)) {
      // sidebar.style.transform = `translateX(0px)`;
    } else {
      sidebar.style.transform = `translateX(${width + "px"})`;
    }
  } else {
    document.querySelector("header").style.left = width + "px";
    document.querySelector("body").style.marginLeft = width + "px";
    document.querySelector("body").style.overflowX = "auto";
    if (document.querySelector(".nav-sidebar")) {
      document.querySelector(".nav-sidebar").style.left = width + "px";
    }
  }
};

export const applyClosedPageStyling = () => {
  if (document.querySelector("nav.super-sidebar")) {
    document.querySelector(".content-wrapper").style.paddingLeft = 0 + "px";
    document.querySelector('[data-testid="top-bar"]').style.paddingLeft =
      24 + "px";
    const sidebar = document.querySelector("nav.super-sidebar");
    if (extractE(window.getComputedStyle(sidebar).transform) > 0) {
      sidebar.style.transform = `translateX(0px)`;
    }
  } else {
    document.querySelector("header").style.left = "0";
    document.querySelector("body").style.marginLeft = "0";
    if (document.querySelector(".nav-sidebar")) {
      document.querySelector(".nav-sidebar").style.left = "0";
    }
  }
};

function extractE(transformValue) {
  // Check if the provided transform value is in matrix format
  if (transformValue && transformValue.startsWith("matrix")) {
    // Extract the matrix values
    var matrixRegex =
      /matrix\((-?\d*\.?\d+), (-?\d*\.?\d+), (-?\d*\.?\d+), (-?\d*\.?\d+), (-?\d*\.?\d+), (-?\d*\.?\d+)\)/;
    var match = matrixRegex.exec(transformValue);

    // If the regex matched successfully
    if (match) {
      // Return the 'e' value (horizontal translation)
      return parseFloat(match[5]);
    }
  }

  // If the transform value is not in matrix format or if extraction fails, return null
  return null;
}
