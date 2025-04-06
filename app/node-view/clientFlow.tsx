'use client'

import { ReactFlow, useNodesState, useEdgesState, Edge, addEdge, Connection } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import CustomNode from '@/components/CustomNode';

interface notesType {
    id: any;
    title: any;
}

const nodeTypes = {
  custom: CustomNode,
};


const styles = {
  color: 'black',
  width: '100%',
  height: 300,
}

export default function ClientFlow({ notes }: { notes: notesType[] }) {
  const router = useRouter()
  const initialNodes = notes.map((note, index) => ({
    id: note.id.toString(),
    type: 'custom',
    position: { x: 200, y: index * 120 },
    data: { label: note.title},
  }))

  const initialEdges : Edge[] = [] // Add custom edges here if you want

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params : Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div>
    <h1 className="text-2xl font-bold text-[#454888] mb-6 -mt-10">Node Diagrams</h1>
    <div style={{ width: '100vw', height: '100vh'}}>
      <ReactFlow
        style={styles}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={(event, node) => {
            console.log('Node clicked:', node.id)
                router.push(`/notes/${node.id}`)
            }}
      />
      <pre>{JSON.stringify(notes, null, 2)}</pre>
      </div>
      </div>
  )
}
