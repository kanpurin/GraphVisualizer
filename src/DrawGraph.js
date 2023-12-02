import React, { useEffect, useRef } from "react";
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css'; // BootstrapのCSSをインポート

// ノードを追加する関数
const addNode = (nodes, newNodeLabel, x, y) => {
  const newNodeId = uuidv4();
  nodes.add([{
    id: newNodeId,
    label: newNodeLabel,
    x: x,
    y: y,
    physics: true,
    color: {
      border: '#000000',
      background: '#FFFFFF',
      highlight: {
        border: '#000000',
        background: '#FFFFFF'
      },
      hover: {
        border: '#000000',
        background: '#FFFFFF'
      }
    }
  }]);
};

// 頂点を削除する関数
const removeNode = (nodes, edges, nodeId) => {
  const connectedEdges = edges.get({ filter: (edge) => edge.from === nodeId || edge.to === nodeId });
  const deleteLabel = nodes.get(nodeId).label;

  edges.remove(connectedEdges.map(edge => edge.id));
  nodes.remove({ id: nodeId });

  nodes.forEach((node) => {
    if (node.label > deleteLabel) {
      nodes.updateOnly({ id: node.id, label: `${node.label - 1}` });
    }
  });
};

// エッジを追加する関数
const addEdge = (edges, fromNodeId, toNodeId, isDirected) => {
  edges.add({
    color: { inherit: false },
		arrows: { to: { enabled: isDirected } },
    from: fromNodeId,
    to: toNodeId,
  });
};

// エッジを削除する関数
const removeEdge = (edges, edgeId) => {
  edges.remove({ id: edgeId });
};

// ノードのphysicsを切り替える関数
const toggleNodePhysics = (nodes, nodeId) => {
  const node = nodes.get(nodeId);
  const physics = !node.physics;
  const colorBackground = physics ? '#FFFFFF' : '#AAAAAA';
  nodes.update({
    id: nodeId,
    physics: physics,
    color: {
      background: colorBackground,
      highlight: { background: colorBackground },
      hover: { background: colorBackground }
    }
  });
};

function DrawGraph(props) {
  const containerRef = useRef(null);
  const networkRef = useRef(null); // Networkコンポーネントへの参照を保持するためのref
  const lastSelectedNodeId = useRef(null);
  const isDirected = useRef(false);

	// チェックボックスの変更イベントハンドラ
	const handleCheckboxChange = (e) => {
		isDirected.current = e.target.checked;
		const edges = networkRef.current.body.data.edges;
		const newEdges = edges.get().map((edge) => {
			edge.arrows = { to: { enabled: isDirected.current } }; // 有向グラフの場合は矢印を有効化
			return edge;
		});
		edges.update(newEdges);
	};

  useEffect(() => {
    const nodes = new DataSet();
    const edges = new DataSet();

    const data = {
      nodes: nodes,
      edges: edges,
    };

    const options = {
      interaction: { hover: true },
      manipulation: {
        enabled: true,
        initiallyActive: false,
        addNode: true,
        addEdge: true,
        deleteNode: true,
        deleteEdge: true,
        editNode: function(nodeData, callback) {
          callback(nodeData); // ノードを変更する場合はコールバックを呼び出す
        }
      },
      nodes: {
        widthConstraint: {
          minimum: 20
        },
        font: {
          size: 20
        }
      },
    };

    const network = new Network(containerRef.current, data, options);
    networkRef.current = network; // リファレンスをセットする

    network.on('doubleClick', function(params) {
      const clickedNodeId = params.nodes[0];
      const clickedEdgeId = params.edges[0];
    
      if (clickedNodeId === undefined && clickedEdgeId === undefined) {
        const newNodeLabel = `${nodes.length + 1}`;
        addNode(nodes, newNodeLabel, params.pointer.canvas.x, params.pointer.canvas.y);
      } else {
        if (clickedNodeId !== undefined) {
          removeNode(nodes, edges, clickedNodeId);
        } else if (clickedEdgeId !== undefined) {
          removeEdge(edges, clickedEdgeId);
        }
      }
      lastSelectedNodeId.current = undefined;
    });

    network.on('click', function(params) {
      const nodeId = params.nodes[0];
      const ctrlKey = params.event.srcEvent.ctrlKey;
      const shiftKey = params.event.srcEvent.shiftKey;
    
      if (ctrlKey && lastSelectedNodeId.current !== undefined && nodeId !== undefined) {
        addEdge(edges, lastSelectedNodeId.current, nodeId, isDirected.current);
      } else if (shiftKey && nodeId !== undefined) {
        toggleNodePhysics(nodes, nodeId);
      }
    
      lastSelectedNodeId.current = nodeId;
    });

    // ノードが変更されたときのイベントリスナー
    nodes.on("*", () => {
      const newNodes = [];
      nodes.get().map(node => newNodes.push(node.label));
      props.setNodesData(newNodes);
    });

    // エッジが変更されたときのイベントリスナー
    edges.on("*", () => {
      const newEdges = [];
      console.log(nodes);
      console.log(edges);
      edges.get().map(edge => {
        console.log(edge.from);
        const fromLabel = nodes.get(edge.from).label;
        const toLabel = nodes.get(edge.to).label;
        newEdges.push([fromLabel, toLabel]);
      });
      props.setEdgesData(newEdges);
    });

    const handleResize = () => {
      if (window.innerHeight > window.innerWidth) {
        networkRef.current.setOptions({ manipulation: { enabled: true } });
      } else {
        networkRef.current.setOptions({ manipulation: { enabled: false } });
      }
    };
  
    handleResize(); // 最初のレンダリング時にも呼び出す
  
    window.addEventListener('resize', handleResize); // 画面サイズ変更時に実行

    return () => {
      network.destroy();
      window.removeEventListener('resize', handleResize); // イベントリスナーのクリーンアップ
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const nodes = new DataSet();
    const edges = new DataSet();
    const existingNodes = networkRef.current.body.data.nodes.get();
    const existingEdges = networkRef.current.body.data.edges.get();

    // nodesDataにあってexistingNodesにないnodeをnodesに追加
    props.nodesData.forEach(nodeLabel => {
      const existingNode = existingNodes.find(node => node.label === `${nodeLabel}`);
      if (existingNode) {
        nodes.add(existingNode);
      } else {
        addNode(nodes, `${nodeLabel}`, 0, 0);
      }
    });

    // edgesDataにあってexistingEdgesにないedgeをcurrentに追加
    props.edgesData.forEach(edge => {
    const [label1, label2] = edge;
    const id1 = nodes.getIds({ filter: node => node.label === `${label1}` })[0];
    const id2 = nodes.getIds({ filter: node => node.label === `${label2}` })[0];
    if (id1 !== undefined && id2 !== undefined) {
      const existingEdge = existingEdges.find(e =>
        (e.from === id1 && e.to === id2) || (e.from === id2 && e.to === id1)
        );
        if (!existingEdge) {
          addEdge(edges, id1, id2, isDirected.current);
        }
      }
    });

    // existingEdgesにあってedgesDataにないedgeをcurrentから削除
    existingEdges.forEach(edge => {
      const existingEdge = props.edgesData.find(e => {
        const fromLabel = existingNodes.find(node => node.id === edge.from).label;
        const toLabel = existingNodes.find(node => node.id === edge.to).label;
        return fromLabel === `${e[0]}` && toLabel === `${e[1]}`
      });
      if (!existingEdge) {
        networkRef.current.body.data.edges.remove(edge);
      }
    });

    // existingNodesにあってnodesDataにないnodeをcurrentから削除
    existingNodes.forEach(node => {
      const existingNode = props.nodesData.find(nodeLabel => node.label === `${nodeLabel}`);
      if (!existingNode) {
        networkRef.current.body.data.nodes.remove(node);
      }
    });

    // nodesにあってexistingNodesにないnodeをcurrentに追加
    nodes.forEach(node => {
      const nonexistingNode = !existingNodes.find(n => n.id === node.id);
      if (nonexistingNode) {
        networkRef.current.body.data.nodes.add(node);
      }
    });

    // edgesにあってexistingEdgesにないedgeをcurrentに追加
    edges.forEach(edge => {
      const existingEdge = existingEdges.find(e =>
        (e.from === edge.from && e.to === edge.to) || (e.from === edge.to && e.to === edge.from)
      );
      if (!existingEdge) {
        networkRef.current.body.data.edges.add(edge);
      }
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.nodesData, props.edgesData]);
      
  return (
    <>
			<div className="form-check">
				<input className="form-check-input" type="checkbox" ref={isDirected} onChange={handleCheckboxChange} />
				<label className="form-check-label">
					有向グラフ
				</label>
			</div>
      <div className="my-1 border" id="mynetwork" ref={containerRef} style={{ height: '400px', borderRadius: '10px' }}></div>
    </>
  );
  
}

export default DrawGraph;
