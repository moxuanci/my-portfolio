'use client'; // Next.js 13+ App Router需要此指令

import { useRef, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

export default function Scene(props: any) {
  const ref = useRef<any>();

  // 生成随机点云
  const particles = random.inSphere(new Float32Array(5000), { radius: 1.5 });

  // 每一帧更新旋转
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={particles}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#888" // 点的颜色，建议用灰色系
          size={0.005} // 点的大小
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}