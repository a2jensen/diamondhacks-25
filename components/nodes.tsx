import { Handle, Position } from '@xyflow/react'

export default function ColoredNode({ }) {
  return (
    <div
      style={{
        padding: 10,
        border: '1px solid #ccc',
        borderRadius: 8,
        background: 'white',
        color: '#0070f3', // 👈 label color here
        fontWeight: 600,
      }}
    >
    </div>
  )
}
