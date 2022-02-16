var flametexturesmap = {
    "candle": "textures/candle.png",
    "fury": "textures/fury.png"
};
for (var x in flametexturesmap) getdataurl(flametexturesmap[x]).then(function(dataUrl) { flametexturesmap[x] = dataUrl; updateFromInputs(); });
getdataurl("test text.png").then(function(dataUrl) { document.querySelector("image").href = dataUrl });

var baseShapeInputs = ygui.buildGUIsection([
    {
        label: "<b>Base Shape</b>",
        id: "labelOnly1",
        type: "hidden"
    },
    {
        label: "Texture",
        id: "texture",
        type: "file",
        attr: { title: " " }
    },
    {
        label: "Scale",
        id: "scale",
        type: "number",
        attr: { value: 1, step: 0.1, min: 0 }
    }
], document.querySelector("#guicontainer"));
var flameShapeInputs = ygui.buildGUIsection([
    {
        label: "<b>Flame Shape</b>",
        id: "labelOnly2",
        type: "hidden"
    },
    {
        label: "Alpha Gradient",
        id: "alphagradient",
        type: "number",
        attr: { value: 0.069, min: 0, max: 1, step: 0.001 }
    },
    {
        label: "Distance",
        id: "distance",
        type: "number",
        attr: { value: -6.9, step: 0.1 }
    },
    /*{
        label: "Angle",
        id: "angle",
        type: "number",
        attr: { value: 0, step: 1, min: 0, max: 360 }
    },*/
    {
        label: "Softening",
        id: "softening",
        type: "number",
        attr: { value: 2, step: 0.1, min: 0 }
    },
    {
        label: "Layers",
        id: "layers",
        type: "number",
        attr: { value: 32, min: 0 }
    }
], document.querySelector("#guicontainer"));
var flameTextureInputs = ygui.buildGUIsection([
    {
        label: "<b>Flame Texture</b>",
        id: "labelOnly3",
        type: "hidden"
    },
    {
        label: "Energy Type",
        id: "energytype",
        type: "select",
        options: ["candle", "fury"]
    },
    {
        label: "Flames Width",
        id: "flameswidth",
        type: "number",
        attr: { value: 1000 }
    },
    {
        label: "Flames Height",
        id: "flamesheight",
        type: "number",
        attr: { value: 4000 }
    },
    {
        label: "Color",
        id: "color",
        type: "color",
        attr: { value: "#ff7b00" }
    }
], document.querySelector("#guicontainer"));

var allInputs = baseShapeInputs.concat(flameShapeInputs).concat(flameTextureInputs);
var inputElems = {};
for (var input of allInputs) inputElems[input.id] = input;

var updateFromInputs = function() {
    document.querySelector("image").setAttribute("width",  1200 * parseFloat(inputElems.scale.value));
    document.querySelector("image").setAttribute("height",  1200 * parseFloat(inputElems.scale.value));
    document.querySelector("image").setAttribute("transform",  `translate(${- inputElems.scale.value * 600}, ${- inputElems.scale.value * 600})`);
    document.querySelector("#transform1 feColorMatrix").setAttribute("values", "1 0 0 0 0\n0 1 0 0 0\n0 0 1 0 0\n0 0 0 " + inputElems.alphagradient.value + " 0");
    document.querySelector("#transform1 feOffset").setAttribute("dy",  inputElems.distance.value);
    document.querySelector("#transform1 feGaussianBlur").setAttribute("stdDeviation",  inputElems.softening.value);
    document.querySelector("image").setAttribute("filter",  "url(#transform1) ".repeat(parseFloat(inputElems.layers.value)) + "url(#greyflood)");
    document.querySelectorAll("image")[1].setAttribute("href",  flametexturesmap[inputElems.energytype.value]);
    document.querySelectorAll("image")[1].setAttribute("width",  inputElems.flameswidth.value);
    document.querySelectorAll("image")[1].setAttribute("height",  inputElems.flamesheight.value);
    document.querySelectorAll("image")[1].setAttribute("transform",  `translate(${- inputElems.flameswidth.value / 2}, ${- inputElems.flamesheight.value / 2})`);
    document.querySelectorAll("rect")[1].style.fill = inputElems.color.value;
    document.querySelectorAll("rect")[2].style.fill = inputElems.color.value;
};
for (var inputId in inputElems) {
    var input = inputElems[inputId];
    if (inputId != "texture") {
        input.addEventListener("input", updateFromInputs);
    }
    else {
        input.addEventListener("change", function() {
            var file = this.files[0];
            var fileReader = new FileReader();
            fileReader.onloadend = function(e) {
                var dataURI = e.target.result;
                document.querySelector("image").setAttribute("href", dataURI);
            }
            fileReader.readAsDataURL(file);
        });
    }
}