import React, { useEffect, useRef, useState } from "react";
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css'; // BootstrapのCSSをインポート
import { Button } from 'react-bootstrap'; // React BootstrapからButtonをインポート
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

function DrawUndirectedGraph() {
  const containerRef = useRef(null);
  const networkRef = useRef(null); // Networkコンポーネントへの参照を保持するためのref
  const [nodesData, setNodesData] = useState([]);
  const [edgesData, setEdgesData] = useState([]);
  const [textareaValue, setTextareaValue] = useState(''); // textareaの値を管理するstate

  useEffect(() => {
    const nodes = new DataSet();
    const edges = new DataSet();
    let lastSelectedNodeId = null;
    
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
      if ((params.nodes.length === 0) && (params.edges.length === 0)) {
        const newNodeId = uuidv4(); // UUIDを生成
        const newNodeLabel = `${nodes.length + 1}`; // ラベルを設定
        var updatedIds;
        updatedIds = nodes.add([{
          id: newNodeId, // 新しいノードのIDを設定
          label: newNodeLabel,
          x: params.pointer.canvas.x,
          y: params.pointer.canvas.y,
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
        network.selectNodes([updatedIds[0]]);
        network.editNode();
        lastSelectedNodeId = newNodeId;
      }
      else {
        const nodeId = params.nodes[0];
        const edgeId = params.edges[0];
        if (nodeId !== undefined) {
          // ノードを削除すると同時に、接続されたエッジも削除
          const connectedEdges = edges.get({ filter: (edge) => edge.from === nodeId || edge.to === nodeId });
          const deleteLabel = nodes.get(nodeId).label;
          edges.remove(connectedEdges.map(edge => edge.id));
          nodes.remove({ id: nodeId });
          // ノードが削除された後、削除されたIDより大きなIDを持つノードのIDを1つずつ減らす
          nodes.forEach((node) => {
            if (node.label > deleteLabel) {
              nodes.updateOnly({ id: node.id, label: `${node.label-1}` });
            }
          });
        } else if (edgeId !== undefined) {
          edges.remove({ id: edgeId });
        }
        lastSelectedNodeId = undefined;
      }
    });

    network.on('click', function(params) {
      const nodeId = params.nodes[0];
      if (params.event.srcEvent.ctrlKey) {
        if (lastSelectedNodeId !== undefined && nodeId !== undefined) {
          console.log('from:'+lastSelectedNodeId+" to:"+nodeId);
          edges.add({
            color: {inherit:false},
            from: lastSelectedNodeId,
            to: nodeId,
          });
        }
      }
      else if (params.event.srcEvent.shiftKey) {
        if (nodeId !== undefined) {
          const node = nodes.get(nodeId);
          const physics = !node.physics;
          const colorBackground = physics ? '#FFFFFF' : '#AAAAAA';
          nodes.update({ id: nodeId, physics: physics, 
            color: {
              background: colorBackground,
              highlight: { background: colorBackground },
              hover: { background: colorBackground }
            }
          });
        }
      }
      lastSelectedNodeId = nodeId;
    });

    // ノードが変更されたときのイベントリスナー
    nodes.on("*", () => {
      setNodesData(nodes.get());
    });

    // エッジが変更されたときのイベントリスナー
    edges.on("*", () => {
      setEdgesData(edges.get());
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
      window.removeEventListener('resize', handleResize); // イベントリスナーのクリーンアップ
    };
  }, []);

  useEffect(() => {
    const updatedTextareaValue = `${nodesData.length} ${edgesData.length}\n${edgesData.map(edge => {
      const fromNode = nodesData.find(node => node.id === edge.from);
      const toNode = nodesData.find(node => node.id === edge.to);
      const fromLabel = fromNode ? fromNode.label : '';
      const toLabel = toNode ? toNode.label : '';
      return `${fromLabel} ${toLabel}`;
    }).join('\n')}`;
    setTextareaValue(updatedTextareaValue);
  }, [nodesData, edgesData]);

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value); // ユーザーの入力をtextareaValueに反映
  };

  const handleOutputTextarea = () => {
  };

  return (
    <div className="my-3 container" style={{ position: 'relative' }}>
      <div className="my-1 border" id="mynetwork" ref={containerRef} style={{ height: '400px', borderRadius: '10px' }}></div>
      <div className="my-1 position-relative">
        <textarea className="form-control"
          value={textareaValue}
          onChange={handleTextareaChange}
          style={{ width: '100%', height: '300px' }}
        />
        <button className="btn btn-primary" onClick={() => navigator.clipboard.writeText(textareaValue)} style={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: 'transparent', border: 'none' }}>
          <FontAwesomeIcon icon={faCopy} style={{ color: 'gray' }} /> {/* FontAwesomeのコピーのアイコン */}
        </button>
      </div>
      <div className="d-flex justify-content-end">
        <Button variant="primary" onClick={handleOutputTextarea}>
          Draw Graph
        </Button>
      </div>
    </div>
  );
  
}

export default DrawUndirectedGraph;
