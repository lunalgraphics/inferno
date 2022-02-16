ygui.buildGUIsection([
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
        attr: { value: 1 }
    }
], document.querySelector("#guicontainer"));
ygui.buildGUIsection([
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
    {
        label: "Angle",
        id: "angle",
        type: "number",
        attr: { value: 0, step: 1, min: 0, max: 360 }
    },
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
ygui.buildGUIsection([
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