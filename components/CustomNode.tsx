import { Handle, Position } from '@xyflow/react'

export default function CustomNode({ data }: any) {
  return (
    <div className=" bg-gradient-to-br from-[#6D6E93] to-[#454888] hover:bg-gradient-to-bl focus:ring-4 rounded-xl border-2 border-[#6D6E93] bg-[#F3F1F5] p-4 shadow-md text-center transition transform duration-200 hover:scale-105 hover:shadow-xl">
      <div className="text-white text-lg">{data.label}</div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

