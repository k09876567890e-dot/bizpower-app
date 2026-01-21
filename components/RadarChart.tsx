
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

interface Props {
  data: { subject: string; A: number; fullMark: number }[];
}

const Chart: React.FC<Props> = ({ data }) => {
  // 320x320の固定サイズで描画。親要素のflex-centerにより中央に配置されます。
  return (
    <div className="flex items-center justify-center bg-slate-50/50 rounded-3xl border border-slate-100 overflow-hidden">
      <RadarChart 
        cx={160} 
        cy={160} 
        outerRadius={100} 
        width={320} 
        height={320} 
        data={data}
      >
        <PolarGrid stroke="#cbd5e1" />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fill: '#475569', fontSize: 12, fontWeight: 700 }} 
        />
        <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
        <Radar
          name="戦闘力"
          dataKey="A"
          stroke="#4f46e5"
          strokeWidth={3}
          fill="#6366f1"
          fillOpacity={0.3}
        />
      </RadarChart>
    </div>
  );
};

export default Chart;
