'use client'

import { ReactFlow, useNodesState, useEdgesState, Edge, addEdge, Connection } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import React, { useCallback } from 'react'

interface notesType {
    id: any;
    title: any;
}


const styles = {
  color: 'black',
  width: '100%',
  height: 300,
}

export default function ClientFlow({ notes } : { notes : notesType[]} ) {
  const initialNodes = notes.map((note, index) => ({
    id: note.id.toString(),
    position: { x: 100, y: index * 120 },
    data: { label: note.title },
  }))

  const initialEdges : Edge[] = [] // Add custom edges here if you want

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params : Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        style={styles}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </div>
  )
}
