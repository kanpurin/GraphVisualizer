/* eslint no-undef: 0 */
import React, { useRef, useEffect } from "react";

function DrawUndirectedGraph(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const nodes = new vis.DataSet(props.nodes.map((value) => {
      return {id: value, label: String(value)};
    }));
    const edges = new vis.DataSet(props.edges.map((value) => {
      return {from: value[0], to: value[1]};
    }));

    const options = {
      layout: {
        improvedLayout: false
      },
      physics: {
        barnesHut: {
          avoidOverlap: 1,
          centralGravity: 0.5,
          springConstant: 0.01,
          damping: 0.1
        },
        solver: 'barnesHut',
        stabilization: {
          iterations: 1000,
          fit: true
        }
      },
      nodes: {
        widthConstraint: {
          minimum: 14
        },
        font: {
          size: 14
        }
      },
      edges: {
        smooth: false // 直線にする
      }
    };

    const network = new vis.Network(containerRef.current, {nodes, edges}, options);

    return () => {
      network.destroy();
    };
  }, [props.nodes, props.edges]);

  return (
    <div ref={containerRef} className="w-auto" style={{height: 400+'px'}}/>
  );
}

export default DrawUndirectedGraph