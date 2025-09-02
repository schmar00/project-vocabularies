var treeData;
treeChart = function (data) {
    treeData = data;
    // Specify the charts’ dimensions. The height is variable, depending on the layout.
    const width = 1480;
    const marginTop = 40;
    const marginRight = 10;
    const marginBottom = 10;
    const marginLeft = 200;

    // Rows are separated by dx pixels, columns by dy pixels. These names can be counter-intuitive
    // (dx is a height, and dy a width). This because the tree must be viewed with the root at the
    // “bottom”, in the data domain. The width of a column is based on the tree’s height.
    let root = d3.hierarchy(data);
    const dx = 20;
    let dy = (width - marginRight - marginLeft) / (1 + root.height);

    // Define the tree layout and the shape for links.
    let tree = d3.tree().nodeSize([dx, dy]);
    let diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x);

    // Create the SVG container, a layer for the links and a layer for the nodes.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", dx)
        .attr("viewBox", [-marginLeft, -marginTop, width + 200, width + 200])
        .attr("style", "max-width: 100%; height: auto; font-size: 14px; user-select: none;");

    const gLink = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5);

    const gNode = svg.append("g")
        .attr("cursor", "pointer")
        .attr("pointer-events", "all");

    function update(event, source) {
        const duration = event?.altKey ? 2500 : 250; // hold the alt key to slow down the transition
        const nodes = root.descendants().reverse();
        const links = root.links();

        // Compute the new tree layout.
        tree(root);

        let left = root;
        let right = root;
        root.eachBefore(node => {
            if (node.x < left.x) left = node;
            if (node.x > right.x) right = node;
        });

        const height = right.x - left.x + marginTop + marginBottom;

        const transition = svg.transition()
            .duration(duration)
            .attr("height", height)
            .attr("viewBox", [-marginLeft, left.x - marginTop, width, height])
            .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

        // Update the nodes…
        const node = gNode.selectAll("g")
            .data(nodes, d => d.id);

        // Enter any new nodes at the parent's previous position.
        const nodeEnter = node.enter().append("g")
            .attr("transform", d => `translate(${source.y0},${source.x0})`)
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", 0)
            .attr("style", d => d.data.c && d.data.c.length > 0 ? "cursor:pointer;" : "cursor: default;")
            .on("click", (event, d) => {
                if (d.data.c && d.data.c.length > 0 && !d.data.children) {
                    d.data.children = d.data.c;
                    d.data.expand = true;
                    chart = treeChart(treeData);
                    expandAfterExtension(root)
                    d3.select("#d3tree").html("");
                    d3.select("#d3tree").append(() => chart);
                } else {
                    d.children = d.children ? null : d._children;
                    d.data.expand = d.children != null;
                    update(event, d);
                }
            });

        nodeEnter.append("title").html(d => `<p class="title">${d.data.name}</p>`);

        nodeEnter.append("circle")
            .attr("r", 8)
            .attr("fill", d => d.data.color)
            .attr("stroke-width", 10);

        nodeEnter.append("text")
            .attr("dy", "0.31em")
            .attr("x", d => d._children ? -12 : 12)
            .attr("text-anchor", d => d._children ? "end" : "start")
            .attr("text-rendering", "optimizeLegibility")
            .text(d => nodeText(d.data.name))
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 0.25)
            .attr("fill", d => d.data.c && d.data.c.length > 0 ? "#2020ff" : "grey")
            .attr("style", d => d.data.c && d.data.c.length > 0 ? "text-decoration: underline;" : "")
            .attr("paint-order", "stroke");

        // Transition nodes to their new position.
        const nodeUpdate = node.merge(nodeEnter).transition(transition)
            .attr("transform", d => `translate(${d.y},${d.x})`)
            .attr("fill-opacity", 1)
            .attr("stroke-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        const nodeExit = node.exit().transition(transition).remove()
            .attr("transform", d => `translate(${source.y},${source.x})`)
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", 0);

        // Update the links…
        const link = gLink.selectAll("path")
            .data(links, d => d.target.id);

        // Enter any new links at the parent's previous position.
        const linkEnter = link.enter().append("path")
            .attr("d", d => {
                const o = { x: source.x0, y: source.y0 };
                return diagonal({ source: o, target: o });
            });

        // Transition links to their new position.
        link.merge(linkEnter).transition(transition)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition(transition).remove()
            .attr("d", d => {
                const o = { x: source.x, y: source.y };
                return diagonal({ source: o, target: o });
            });

        // Stash the old positions for transition.
        root.eachBefore(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    function expandAfterExtension(dr) {
        if (dr.data.expand) {
            dr.children = dr._children;
        }
        if (dr.children) {
            dr.data.expand = true;
            dr.children.forEach(child => expandAfterExtension(child));
        }
    }

    function nodeText(text) {
        if (text.startsWith("https://") && text.length > 20) {
            return text.substring(0, 20) + "...";
        }
        return text;
    }
    // Do the first update to the initial configuration of the tree — where a number of nodes
    // are open (arbitrarily selected as the root, plus nodes with 7 letters).
    root.x0 = dy / 2;
    root.y0 = 0;
    root.descendants().forEach((d, i) => {
        d.id = i;
        d._children = d.children;
        if (d.depth && d.data.name.length !== 7) d.children = null;
    });

    update(null, root);

    return svg.node();
}

/*
d3data.init(function (data) {
    chart = treeChart(data);
    d3.select("#d3tree").append(() => chart);
}, 10);
*/