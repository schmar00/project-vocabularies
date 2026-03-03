eCharts_tree = function (rawData, elementId) {
  let chartDom = document.getElementById(elementId);

  //prevent default right click behavior
  chartDom.oncontextmenu = function (e) {
    e.preventDefault();
  };

  let myChart = echarts.init(chartDom, null, {
    renderer: "svg",
  });

  function outputsize() {
    myChart.resize();
  }
  new ResizeObserver(outputsize).observe(chartDom);

  data = prepData(rawData);

  const option = {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      formatter: function (params) {
        return `${params.name}`;
      },
    },
    series: [
      {
        type: "tree",
        data: [data],
        initialTreeDepth: 1,
        expandAndCollapse: true,
        top: "1%",
        left: "150",
        bottom: "1%",
        right: "20%",
        symbol: "emptyCircle",
        symbolSize: 9,

        label: {
          position: "left",
          verticalAlign: "middle",
          align: "right",
          fontSize: 12,
          width: 140,
          color: "#383838",
          formatter: function (params) {
            return middleTruncate(params.name);
          },
        },

        leaves: {
          label: {
            position: "right",
            verticalAlign: "middle",
            align: "left",
          },
        },
        emphasis: {
          focus: "descendant",
        },
        animationDuration: 550,
        animationDurationUpdate: 750,
      },
    ],
  };

  function prepData(rawData) {
    addColor(rawData);
    return rawData;
  }
  function addColor(node) {
    if (node.itemStyle.color === "") node.itemStyle.color = "#383838";
    if (node.color === "") node.color = "#383838";

    for (let i = 0; i < node.children.length; i++) {
      const childnode = node.children[i];
      if (childnode.children) {
        addColor(childnode);
      }
    }
  }

  function middleTruncate(label) {
    const maxLength = 20;
    if (!label || label.length <= maxLength) return label;

    const front = Math.ceil(maxLength / 2);
    const back = Math.floor(maxLength / 2);

    return label.slice(0, front) + " ... " + label.slice(-back);
  }

  function drawControls() {
    const text = `
        <p class="m-0 font-weight-bold">How to Navigate:</p>
        <p class="m-0">
          <span class="font-italic">Left Click: </span>
          Click on a node to expand or collapse its child sections.</p>
        <p class="m-0">
          <span class="font-italic">Right Click: </span>
          View its project vocabularies page.
        </p>
    `;
    document.getElementById("controls").innerHTML = text;
  }

  drawControls();

  option && myChart.setOption(option);

  myChart.on("mouseup", { seriesIndex: 0 }, function (params) {
    const mouseEvent = params.event.event;

    // right click
    if (mouseEvent.button === 2) {
      const uri = params.data?.title;
      if (uri) {
        window.open(uri, "_blank", "noopener,noreferrer");
      }
    }
  });
};
